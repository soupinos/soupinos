<?php
/**
 * Praxis Therapist — functions.php v3
 * Theme setup, ACF registration, asset enqueueing,
 * dynamic FAQ + Person JSON-LD via wp_head, AJAX contact handler.
 */

/* ── ACF LOCAL FIELD GROUPS ── */
require_once get_template_directory() . '/inc/acf-fields.php';

/* ── ACF REPEATER FIRST-RUN SEED ── */
require_once get_template_directory() . '/inc/acf-seed-defaults.php';

/* ── ACF JSON SYNC DIR ── */
add_filter( 'acf/settings/save_json', function () {
	return get_template_directory() . '/acf-json';
} );
add_filter( 'acf/settings/load_json', function ( $paths ) {
	$paths[] = get_template_directory() . '/acf-json';
	return $paths;
} );

/* ── THEME SETUP ── */
add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', [
		'style', 'script', 'search-form', 'comment-form',
		'comment-list', 'gallery', 'caption',
	] );
	add_theme_support( 'custom-logo' );
} );

/* ── ENQUEUE ASSETS ── */
add_action( 'wp_enqueue_scripts', function () {

	$ver = wp_get_theme()->get( 'Version' );
	$uri = get_template_directory_uri();

	wp_enqueue_style(
		'praxis-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,500;0,600;0,700;1,500;1,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap',
		[],
		null
	);

	wp_enqueue_style(
		'praxis-therapist-style',
		get_stylesheet_uri(),
		[ 'praxis-fonts' ],
		$ver
	);

	/* GSAP 3.12.5 + ScrollTrigger */
	wp_enqueue_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', [], '3.12.5', true );
	wp_enqueue_script( 'gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', [ 'gsap' ], '3.12.5', true );

	/* main GSAP choreography */
	wp_enqueue_script(
		'praxis-main',
		$uri . '/assets/js/main.js',
		[ 'gsap', 'gsap-scrolltrigger' ],
		$ver,
		true
	);

	/* mobile nav */
	wp_enqueue_script(
		'praxis-mobile-nav',
		$uri . '/assets/js/mobile-nav.js',
		[ 'gsap' ],
		$ver,
		true
	);

	/* FAQ accordion — front page only */
	if ( is_front_page() ) {
		wp_enqueue_script(
			'px-faq',
			$uri . '/assets/js/px-faq.js',
			[ 'gsap' ],
			$ver,
			true
		);
	}

	/* contact modal — front page only */
	if ( is_front_page() ) {
		wp_enqueue_script(
			'praxis-modal',
			$uri . '/assets/js/contact-modal.js',
			[ 'gsap' ],
			$ver,
			true
		);
		wp_localize_script(
			'praxis-modal',
			'pxAjax',
			[
				'url'   => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'px_contact' ),
			]
		);
	}
} );

/* ── AJAX CONTACT HANDLER ── */
add_action( 'wp_ajax_nopriv_px_contact', 'px_handle_contact' );
add_action( 'wp_ajax_px_contact', 'px_handle_contact' );
function px_handle_contact() {
	if ( ! empty( $_POST['px_website'] ) ) {
		wp_send_json_success( [ 'ok' => true ] );
	}

	if ( empty( $_POST['px_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['px_nonce'] ) ), 'px_contact' ) ) {
		wp_send_json_error( [ 'msg' => 'Σφάλμα επαλήθευσης. Φόρτωσε ξανά τη σελίδα.' ] );
	}

	$name    = sanitize_text_field( wp_unslash( $_POST['name']    ?? '' ) );
	$phone   = sanitize_text_field( wp_unslash( $_POST['phone']   ?? '' ) );
	$email   = sanitize_email( wp_unslash( $_POST['email']   ?? '' ) );
	$message = sanitize_textarea_field( wp_unslash( $_POST['message'] ?? '' ) );

	if ( ! $name ) {
		wp_send_json_error( [ 'msg' => 'Συμπλήρωσε το όνομά σου.' ] );
	}
	if ( ! $phone && ! $email ) {
		wp_send_json_error( [ 'msg' => 'Συμπλήρωσε τηλέφωνο ή email.' ] );
	}

	$to      = get_option( 'admin_email' );
	$subject = 'Νέο αίτημα ραντεβού — ' . $name;
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

/* ── FAQ JSON-LD (FAQPage schema) — dynamic from ACF ── */
add_action( 'wp_head', function () {
	if ( ! is_front_page() ) {
		return;
	}

	$entities = [];

	if ( function_exists( 'get_field' ) && have_rows( 'acf_faq_items' ) ) {
		while ( have_rows( 'acf_faq_items' ) ) {
			the_row();
			$q = get_sub_field( 'question' );
			$a = wp_strip_all_tags( get_sub_field( 'answer' ) );
			if ( $q && $a ) {
				$entities[] = [
					'@type'          => 'Question',
					'name'           => $q,
					'acceptedAnswer' => [ '@type' => 'Answer', 'text' => $a ],
				];
			}
		}
	}

	/* static fallback if ACF not active */
	if ( empty( $entities ) ) {
		$fallback = [
			[ 'Πόσο διαρκεί μια συνεδρία;', 'Κάθε συνεδρία διαρκεί περίπου 50 λεπτά.' ],
			[ 'Γίνονται online συνεδρίες;',  'Ναι. Μέσω ασφαλούς βιντεοκλήσης.' ],
			[ 'Χρειάζεται παραπεμπτικό;',    'Όχι, δεν χρειάζεται παραπεμπτικό.' ],
		];
		foreach ( $fallback as $item ) {
			$entities[] = [
				'@type'          => 'Question',
				'name'           => $item[0],
				'acceptedAnswer' => [ '@type' => 'Answer', 'text' => $item[1] ],
			];
		}
	}

	$schema = [
		'@context'   => 'https://schema.org',
		'@type'      => 'FAQPage',
		'mainEntity' => $entities,
	];

	echo '<script type="application/ld+json">'
		. wp_json_encode( $schema, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT )
		. '</script>' . "\n";
} );

/* ── PERSON JSON-LD — dynamic from ACF ── */
add_action( 'wp_head', function () {
	if ( ! is_front_page() ) {
		return;
	}

	$has_acf = function_exists( 'get_field' );
	$phone   = $has_acf ? get_field( 'acf_global_phone' )    : '[ΤΗΛΕΦΩΝΟ]';
	$email   = $has_acf ? get_field( 'acf_global_email' )    : '[EMAIL]';
	$city    = $has_acf ? get_field( 'acf_global_city' )     : '[ΠΟΛΗ]';
	$price   = $has_acf ? get_field( 'acf_global_price' )    : '[ΤΙΜΗ]';
	$name    = $has_acf ? get_field( 'acf_global_site_name' ): 'Δημήτρης Κουκούλης';

	$schema = [
		'@context'    => 'https://schema.org',
		'@type'       => 'Person',
		'name'        => $name ?: 'Δημήτρης Κουκούλης',
		'jobTitle'    => 'Ψυχολόγος – Ψυχοθεραπευτής',
		'url'         => home_url( '/' ),
		'telephone'   => $phone,
		'email'       => $email,
		'address'     => [
			'@type'           => 'PostalAddress',
			'addressLocality' => $city,
			'addressCountry'  => 'GR',
		],
		'knowsLanguage' => [ 'el' ],
		'offers'        => [
			[
				'@type'         => 'Offer',
				'name'          => 'Ατομική ψυχοθεραπεία',
				'description'   => 'Συνεδρίες 50 λεπτών, δια ζώσης ή online.',
				'price'         => $price,
				'priceCurrency' => 'EUR',
			],
		],
	];

	echo '<script type="application/ld+json">'
		. wp_json_encode( $schema, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT )
		. '</script>' . "\n";
} );

/* ── HELPER ── */
if ( ! function_exists( 'px_f' ) ) {
	function px_f( $key, $fallback = '' ) {
		$v = get_field( $key );
		return ( $v !== null && $v !== '' ) ? $v : $fallback;
	}
}

/* Ελληνικά ΚΕΦΑΛΑΙΑ χωρίς τόνους — για kicker/eyebrow/uppercase labels.
   Κανόνας: κεφαλαία → χωρίς τόνους (διαλυτικά διατηρούνται). */
if ( ! function_exists( 'px_gr_upper' ) ) {
	function px_gr_upper( $s ) {
		$map = [
			'ά' => 'Α', 'έ' => 'Ε', 'ή' => 'Η', 'ί' => 'Ι', 'ό' => 'Ο', 'ύ' => 'Υ',
			'ώ' => 'Ω', 'ϊ' => 'Ϊ', 'ϋ' => 'Ϋ', 'ΐ' => 'Ι', 'ΰ' => 'Υ',
			'Ά' => 'Α', 'Έ' => 'Ε', 'Ή' => 'Η', 'Ί' => 'Ι', 'Ό' => 'Ο', 'Ύ' => 'Υ', 'Ώ' => 'Ω',
		];
		return mb_strtoupper( strtr( (string) $s, $map ), 'UTF-8' );
	}
}
