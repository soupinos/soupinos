<?php
/**
 * BLOCK #35 — px-contact-modal (server side)
 *
 * Full-stack companion to block.css / block.js. Drop into a theme and
 * require it from functions.php:
 *
 *     require_once get_stylesheet_directory() . '/blocks/35-px-contact-modal/block.php';
 *
 * Provides:
 *   • SCF/ACF local field group (copy is CMS-editable) — registered on
 *     acf/init, guarded by function_exists('acf_add_local_field_group').
 *     NO plugin beyond SCF/ACF.
 *   • Enqueue of block.css/block.js + wp_localize_script('pxModal') with
 *     the admin-ajax url + a fresh nonce.
 *   • AJAX handler with honeypot + nonce + function_exists() guards.
 *   • wp_footer render of the modal markup; Greek caps via px_gr_upper().
 *
 * Self-contained: every WP call is guarded so the file is harmless if
 * included outside a fully-booted WordPress (e.g. partial test harness).
 *
 * @package praxis-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ---------------------------------------------------------------------------
 * Helpers (guarded — a host theme may already define these)
 * ------------------------------------------------------------------------- */

if ( ! function_exists( 'px_modal_field' ) ) {
	/**
	 * Read an ACF/SCF field with a fallback, safe when ACF is absent.
	 *
	 * @param string $key      Field name.
	 * @param string $fallback Default when empty/missing.
	 * @return string
	 */
	function px_modal_field( $key, $fallback = '' ) {
		if ( function_exists( 'get_field' ) ) {
			$v = get_field( $key );
			if ( $v !== null && $v !== false && $v !== '' ) {
				return $v;
			}
		}
		return $fallback;
	}
}

if ( ! function_exists( 'px_gr_upper' ) ) {
	/**
	 * Ελληνικά ΚΕΦΑΛΑΙΑ χωρίς τόνους (διαλυτικά διατηρούνται).
	 * Local copy so the block works even without the host theme helper.
	 *
	 * @param string $s
	 * @return string
	 */
	function px_gr_upper( $s ) {
		$map = [
			'ά' => 'Α', 'έ' => 'Ε', 'ή' => 'Η', 'ί' => 'Ι', 'ό' => 'Ο', 'ύ' => 'Υ',
			'ώ' => 'Ω', 'ϊ' => 'Ϊ', 'ϋ' => 'Ϋ', 'ΐ' => 'Ι', 'ΰ' => 'Υ',
			'Ά' => 'Α', 'Έ' => 'Ε', 'Ή' => 'Η', 'Ί' => 'Ι', 'Ό' => 'Ο', 'Ύ' => 'Υ', 'Ώ' => 'Ω',
		];
		return function_exists( 'mb_strtoupper' )
			? mb_strtoupper( strtr( (string) $s, $map ), 'UTF-8' )
			: strtoupper( strtr( (string) $s, $map ) );
	}
}

/* ---------------------------------------------------------------------------
 * SCF / ACF field group — CMS-editable modal copy.
 * Runs on acf/init so ACF is fully loaded; guarded so a missing plugin
 * is a no-op (the block then renders its warm Greek defaults).
 * ------------------------------------------------------------------------- */

add_action( 'acf/init', function () {

	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	/* Give the copy fields an editing home. Guarded: if the options-page
	   API is unavailable the group simply stays hidden and the block
	   renders its defaults. No plugin beyond SCF/ACF. */
	if ( function_exists( 'acf_add_options_page' ) ) {
		acf_add_options_page( [
			'page_title' => 'Modal Επικοινωνίας',
			'menu_title' => 'Modal Επικοινωνίας',
			'menu_slug'  => 'acf-options',
			'capability' => 'manage_options',
			'redirect'   => false,
		] );
	}

	acf_add_local_field_group( [
		'key'    => 'group_px_contact_modal',
		'title'  => '🪟 Modal Επικοινωνίας (px-contact-modal)',
		'fields' => [
			[ 'key' => 'field_pxm_eyebrow', 'label' => 'Eyebrow',          'name' => 'pxm_eyebrow', 'type' => 'text',     'default_value' => 'Ραντεβού' ],
			[ 'key' => 'field_pxm_title',   'label' => 'Τίτλος',           'name' => 'pxm_title',   'type' => 'text',     'default_value' => 'Ας τα πούμε από κοντά' ],
			[ 'key' => 'field_pxm_sub',     'label' => 'Υπότιτλος',        'name' => 'pxm_sub',     'type' => 'textarea', 'default_value' => 'Άφησε τηλέφωνο ή email και επικοινωνώ μαζί σου σύντομα — χωρίς καμία δέσμευση.' ],
			[ 'key' => 'field_pxm_success', 'label' => 'Μήνυμα επιτυχίας', 'name' => 'pxm_success', 'type' => 'text',     'default_value' => 'Ευχαριστώ — θα επικοινωνήσω πολύ σύντομα.' ],
			[ 'key' => 'field_pxm_to',      'label' => 'Email παραλήπτη (κενό = admin email)', 'name' => 'pxm_to', 'type' => 'email', 'default_value' => '' ],
		],
		'location'   => [ [ [ 'param' => 'options_page', 'operator' => '==', 'value' => 'acf-options' ] ] ],
		'menu_order' => 95,
	] );
} );

/* ---------------------------------------------------------------------------
 * Enqueue assets + localize the AJAX endpoint and nonce.
 * ------------------------------------------------------------------------- */

add_action( 'wp_enqueue_scripts', function () {

	$dir = get_stylesheet_directory()     . '/blocks/35-px-contact-modal';
	$uri = get_stylesheet_directory_uri() . '/blocks/35-px-contact-modal';

	$css_ver = file_exists( "$dir/block.css" ) ? filemtime( "$dir/block.css" ) : false;
	$js_ver  = file_exists( "$dir/block.js" )  ? filemtime( "$dir/block.js" )  : false;

	wp_enqueue_style( 'px-contact-modal', "$uri/block.css", [], $css_ver );

	$deps = wp_script_is( 'gsap', 'registered' ) ? [ 'gsap' ] : [];
	wp_enqueue_script( 'px-contact-modal', "$uri/block.js", $deps, $js_ver, true );

	wp_localize_script( 'px-contact-modal', 'pxModal', [
		'url'   => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'px_contact_modal' ),
	] );
} );

/* ---------------------------------------------------------------------------
 * AJAX handler — honeypot + nonce + sanitization, then wp_mail().
 * ------------------------------------------------------------------------- */

add_action( 'wp_ajax_nopriv_px_contact_modal', 'px_contact_modal_handle' );
add_action( 'wp_ajax_px_contact_modal',        'px_contact_modal_handle' );

if ( ! function_exists( 'px_contact_modal_handle' ) ) {
	function px_contact_modal_handle() {

		/* honeypot — pretend success so bots don't retry */
		if ( ! empty( $_POST['px_website'] ) ) {
			wp_send_json_success( [ 'ok' => true ] );
		}

		/* nonce */
		$nonce = isset( $_POST['px_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['px_nonce'] ) ) : '';
		if ( ! $nonce || ! wp_verify_nonce( $nonce, 'px_contact_modal' ) ) {
			wp_send_json_error( [ 'msg' => 'Σφάλμα επαλήθευσης. Φόρτωσε ξανά τη σελίδα.' ] );
		}

		$name    = sanitize_text_field(     wp_unslash( $_POST['name']    ?? '' ) );
		$phone   = sanitize_text_field(     wp_unslash( $_POST['phone']   ?? '' ) );
		$email   = sanitize_email(          wp_unslash( $_POST['email']   ?? '' ) );
		$message = sanitize_textarea_field( wp_unslash( $_POST['message'] ?? '' ) );

		if ( '' === $name ) {
			wp_send_json_error( [ 'msg' => 'Συμπλήρωσε το όνομά σου.' ] );
		}
		if ( '' === $phone && '' === $email ) {
			wp_send_json_error( [ 'msg' => 'Συμπλήρωσε τηλέφωνο ή email — τουλάχιστον ένα.' ] );
		}

		$to = px_modal_field( 'pxm_to', '' );
		if ( '' === $to ) {
			$to = get_option( 'admin_email' );
		}

		$subject = 'Νέο αίτημα επικοινωνίας — ' . $name;
		$body    = implode( "\n", [
			"Όνομα: {$name}",
			"Τηλέφωνο: {$phone}",
			"Email: {$email}",
			'',
			"Μήνυμα:\n{$message}",
		] );

		wp_mail( $to, $subject, $body );
		wp_send_json_success( [ 'ok' => true ] );
	}
}

/* ---------------------------------------------------------------------------
 * Render the modal markup in the footer. Greek caps via px_gr_upper().
 * ------------------------------------------------------------------------- */

add_action( 'wp_footer', 'px_contact_modal_render' );

if ( ! function_exists( 'px_contact_modal_render' ) ) {
	function px_contact_modal_render() {

		$eyebrow = px_modal_field( 'pxm_eyebrow', 'Ραντεβού' );
		$title   = px_modal_field( 'pxm_title',   'Ας τα πούμε από κοντά' );
		$sub     = px_modal_field( 'pxm_sub',     'Άφησε τηλέφωνο ή email και επικοινωνώ μαζί σου σύντομα — χωρίς καμία δέσμευση.' );
		$success = px_modal_field( 'pxm_success', 'Ευχαριστώ — θα επικοινωνήσω πολύ σύντομα.' );
		?>
		<div class="px-modal" id="px-contact-modal" aria-hidden="true">
			<div class="px-modal__overlay" data-modal-close></div>
			<div class="px-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="px-modal-title">
				<button class="px-modal__close" type="button" aria-label="Κλείσιμο" data-modal-close>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
				</button>
				<div class="px-modal__body">
					<span class="px-modal__eyebrow"><?php echo esc_html( px_gr_upper( $eyebrow ) ); ?></span>
					<h2 class="px-modal__title" id="px-modal-title"><?php echo esc_html( $title ); ?></h2>
					<p class="px-modal__sub"><?php echo esc_html( $sub ); ?></p>

					<form class="px-modal__form" id="px-contact-form" novalidate>
						<div class="px-hp" aria-hidden="true">
							<label>Μην συμπληρώνεις αυτό το πεδίο
								<input type="text" name="px_website" tabindex="-1" autocomplete="off">
							</label>
						</div>
						<input type="hidden" name="action" value="px_contact_modal">
						<input type="hidden" name="px_nonce" value="<?php echo esc_attr( wp_create_nonce( 'px_contact_modal' ) ); ?>">

						<div class="px-field">
							<label for="pxm-name"><?php echo esc_html( px_gr_upper( 'Όνομα' ) ); ?> *</label>
							<input type="text" id="pxm-name" name="name" autocomplete="name" required aria-describedby="px-err-name">
							<p class="px-form-error px-field-error" id="px-err-name" role="alert" hidden>Συμπλήρωσε το όνομά σου.</p>
						</div>
						<div class="px-field">
							<label for="pxm-phone"><?php echo esc_html( px_gr_upper( 'Τηλέφωνο' ) ); ?></label>
							<input type="tel" id="pxm-phone" name="phone" autocomplete="tel" aria-describedby="px-err-phone">
							<p class="px-form-error px-field-error" id="px-err-phone" role="alert" hidden>Δώσε έναν έγκυρο αριθμό τηλεφώνου.</p>
						</div>
						<div class="px-field">
							<label for="pxm-email"><?php echo esc_html( px_gr_upper( 'Email' ) ); ?></label>
							<input type="email" id="pxm-email" name="email" autocomplete="email" aria-describedby="px-err-email">
							<p class="px-form-error px-field-error" id="px-err-email" role="alert" hidden>Δώσε ένα έγκυρο email.</p>
						</div>
						<p class="px-field__hint">Συμπλήρωσε τηλέφωνο ή email — τουλάχιστον ένα από τα δύο.</p>
						<div class="px-field">
							<label for="pxm-msg"><?php echo esc_html( px_gr_upper( 'Μήνυμα' ) ); ?></label>
							<textarea id="pxm-msg" name="message" rows="4"></textarea>
						</div>
						<button type="submit" class="px-modal__submit">Αποστολή</button>
						<p class="px-form-error" role="alert" hidden></p>
					</form>

					<div class="px-modal__success" hidden>
						<svg class="px-check" viewBox="0 0 52 52" aria-hidden="true">
							<circle class="px-check__circle" cx="26" cy="26" r="24"/>
							<path class="px-check__mark" d="M14 27l8 8 16-16"/>
						</svg>
						<p><?php echo esc_html( $success ); ?></p>
					</div>
				</div>
			</div>
		</div>
		<?php
	}
}
