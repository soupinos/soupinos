<?php
defined( 'ABSPATH' ) || exit;

// ── Theme setup ──────────────────────────────────────────────────────────────
function praxis_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ] );
	add_theme_support( 'custom-logo', [
		'height'      => 40,
		'width'       => 120,
		'flex-height' => true,
		'flex-width'  => true,
	] );
	add_theme_support( 'editor-color-palette', [
		[ 'name' => 'Brand Red',   'slug' => 'brand-red',   'color' => '#FF3B00' ],
		[ 'name' => 'Background',  'slug' => 'bg',          'color' => '#080808' ],
		[ 'name' => 'White',       'slug' => 'white',       'color' => '#F0EDE8' ],
		[ 'name' => 'Muted',       'slug' => 'muted',       'color' => '#666666' ],
	] );

	register_nav_menus( [
		'primary' => __( 'Primary Menu', 'praxis' ),
	] );
}
add_action( 'after_setup_theme', 'praxis_setup' );

// ── Enqueue assets ────────────────────────────────────────────────────────────
function praxis_assets() {
	$ver = wp_get_theme()->get( 'Version' );

	// Google Fonts: DM Sans + Exo 2
	wp_enqueue_style(
		'praxis-fonts',
		'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400&family=Exo+2:wght@700;800&display=swap',
		[],
		null
	);

	wp_enqueue_style( 'praxis-main',           get_template_directory_uri() . '/assets/css/main.css',            [ 'praxis-fonts' ], $ver );
	wp_enqueue_style( 'praxis-theme-switcher', get_template_directory_uri() . '/assets/css/theme-switcher.css',   [ 'praxis-main' ],  $ver );

	wp_enqueue_script( 'praxis-main',           get_template_directory_uri() . '/assets/js/main.js',            [], $ver, true );
	wp_enqueue_script( 'praxis-lang-switcher',  get_template_directory_uri() . '/assets/js/theme-switcher.js',  [], $ver, true );

	// Pass dynamic data to JS (WhatsApp/email from Customizer)
	wp_localize_script( 'praxis-main', 'praxisData', [
		'waLink'    => get_theme_mod( 'praxis_whatsapp_link', 'https://wa.me/302100000000' ),
		'emailLink' => get_theme_mod( 'praxis_email', 'hello@praxis.gr' ),
	] );
}
add_action( 'wp_enqueue_scripts', 'praxis_assets' );

// ── Customizer settings ───────────────────────────────────────────────────────
function praxis_customizer( WP_Customize_Manager $wp_customize ) {
	$wp_customize->add_section( 'praxis_contact', [
		'title'    => __( 'Στοιχεία Επικοινωνίας', 'praxis' ),
		'priority' => 30,
	] );

	$fields = [
		'praxis_whatsapp_link' => [ 'WhatsApp Link', 'https://wa.me/302100000000' ],
		'praxis_email'         => [ 'Email', 'hello@praxis.gr' ],
	];

	foreach ( $fields as $id => [ $label, $default ] ) {
		$wp_customize->add_setting( $id, [ 'default' => $default, 'sanitize_callback' => 'sanitize_text_field' ] );
		$wp_customize->add_control( $id, [ 'label' => $label, 'section' => 'praxis_contact', 'type' => 'text' ] );
	}
}
add_action( 'customize_register', 'praxis_customizer' );

// ── Disable admin bar on front-end (optional — remove if unwanted) ────────────
// add_filter( 'show_admin_bar', '__return_false' );

// ── Widgets ───────────────────────────────────────────────────────────────────
function praxis_widgets_init() {
	register_sidebar( [
		'name'          => __( 'Footer Widget Area', 'praxis' ),
		'id'            => 'footer-1',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	] );
}
add_action( 'widgets_init', 'praxis_widgets_init' );
