<?php
/**
 * Lefkimmi Lines — Contact form AJAX handler
 *
 * Endpoint:  wp_ajax_ll_contact  (logged-out + logged-in)
 * Security:  nonce · honeypot · rate-limit (3/hour per IP)
 * Sends to:  info@lefkimmilines.gr via wp_mail()
 */

add_action( 'wp_ajax_ll_contact',        'll_handle_contact' );
add_action( 'wp_ajax_nopriv_ll_contact', 'll_handle_contact' );

function ll_handle_contact() {

    /* 1. Nonce */
    if ( ! isset( $_POST['ll_nonce'] )
         || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['ll_nonce'] ) ), 'll_contact_nonce' ) ) {
        wp_send_json_error( [ 'code' => 'nonce' ], 403 );
    }

    /* 2. Honeypot (must be empty) */
    if ( ! empty( $_POST['ll_website'] ) ) {
        wp_send_json_success( [ 'code' => 'ok' ] ); // silent drop
    }

    /* 3. Sanitise + validate */
    $name  = sanitize_text_field( wp_unslash( $_POST['fname']  ?? '' ) );
    $email = sanitize_email(      wp_unslash( $_POST['femail'] ?? '' ) );
    $msg   = sanitize_textarea_field( wp_unslash( $_POST['fmsg'] ?? '' ) );

    if ( ! $name || ! is_email( $email ) || strlen( $msg ) < 5 ) {
        wp_send_json_error( [ 'code' => 'fields' ], 422 );
    }

    /* 4. Rate-limit: max 3 submissions / hour per IP */
    $ip_key = 'll_cf_' . md5( sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '' ) );
    $hits   = (int) get_transient( $ip_key );
    if ( $hits >= 3 ) {
        wp_send_json_error( [ 'code' => 'limit' ], 429 );
    }
    set_transient( $ip_key, $hits + 1, HOUR_IN_SECONDS );

    /* 5. Send */
    $to      = 'info@lefkimmilines.gr';
    $subject = wp_strip_all_tags( 'Νέο μήνυμα από ' . $name . ' — lefkimmilines.gr' );
    $body    = "Όνομα: $name\nEmail: $email\n\nΜήνυμα:\n$msg";
    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'Reply-To: ' . wp_strip_all_tags( $name ) . ' <' . $email . '>',
    ];

    if ( wp_mail( $to, $subject, $body, $headers ) ) {
        wp_send_json_success( [ 'code' => 'ok' ] );
    } else {
        wp_send_json_error( [ 'code' => 'smtp' ], 500 );
    }
}
