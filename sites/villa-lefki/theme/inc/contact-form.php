<?php
/**
 * Villa Lefki — CTA booking-enquiry form handler.
 *
 * A real submit handler (unlike the source, whose onSubmit only swapped the
 * button text). It validates the nonce, sanitises the fields and emails the
 * site contact address via wp_mail(). The front-end JS swaps the submit
 * button to the success message on completion, preserving the source UX.
 *
 * NOTE: delivery depends on the host having a working mailer (wp_mail / an
 * SMTP plugin). On a bare install with no MTA, wp_mail() returns false and no
 * message is sent — the handler still responds success so the visitor UX is
 * unchanged, and the failure is logged. Wire an SMTP plugin in production.
 *
 * @package villa-lefki
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'wp_ajax_villa_contact', 'villa_lefki_handle_contact' );
add_action( 'wp_ajax_nopriv_villa_contact', 'villa_lefki_handle_contact' );

/**
 * Handle the booking-enquiry AJAX submission.
 */
function villa_lefki_handle_contact() {
	$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';
	if ( ! wp_verify_nonce( $nonce, 'villa_contact' ) ) {
		wp_send_json_error( array( 'message' => 'invalid_nonce' ), 403 );
	}

	$name  = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
	$email = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$dates = isset( $_POST['dates'] ) ? sanitize_text_field( wp_unslash( $_POST['dates'] ) ) : '';

	$to = px_opt( 'contact_email', get_option( 'admin_email' ) );
	if ( function_exists( 'is_email' ) && ! is_email( $to ) ) {
		$to = get_option( 'admin_email' );
	}

	$subject = 'Villa Lefki — booking enquiry';
	$body    = "Name: {$name}\nEmail: {$email}\nDates: {$dates}\n";
	$headers = array();
	if ( $email && is_email( $email ) ) {
		$headers[] = 'Reply-To: ' . $email;
	}

	$sent = wp_mail( $to, $subject, $body, $headers );
	if ( ! $sent ) {
		// No MTA configured — log, but keep the visitor's success UX.
		error_log( '[villa-lefki] booking enquiry could not be emailed (no mailer configured). Payload: ' . $body );
	}

	wp_send_json_success( array( 'sent' => (bool) $sent ) );
}
