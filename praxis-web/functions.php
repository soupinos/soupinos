<?php
/**
 * Praxis Web — functions.php
 * praxisweb.gr ΑΡΧΙΚΗ, champagne skin (version B).
 * Depends on: SCF/ACF (Secure Custom Fields plugin), GSAP 3 + Lenis (CDN).
 */

defined( 'ABSPATH' ) || exit;

/* ═══════════════════════════════════════════════════════════════════
 * HELPERS
 * ══════════════════════════════════════════════════════════════════ */

if ( ! function_exists( 'px_gr_upper' ) ) {
	/**
	 * Greek uppercase without tonos; dialytika preserved.
	 * Block #35 defines a local copy; this global version loads first
	 * (functions.php → before block.php inclusion) so it wins.
	 */
	function px_gr_upper( string $s ): string {
		$map = [
			'ά' => 'Α', 'έ' => 'Ε', 'ή' => 'Η', 'ί' => 'Ι', 'ό' => 'Ο', 'ύ' => 'Υ',
			'ώ' => 'Ω', 'ϊ' => 'Ϊ', 'ϋ' => 'Ϋ', 'ΐ' => 'Ι', 'ΰ' => 'Υ',
			'Ά' => 'Α', 'Έ' => 'Ε', 'Ή' => 'Η', 'Ί' => 'Ι', 'Ό' => 'Ο', 'Ύ' => 'Υ', 'Ώ' => 'Ω',
		];
		return mb_strtoupper( strtr( $s, $map ), 'UTF-8' );
	}
}

if ( ! function_exists( 'px_web_field' ) ) {
	/**
	 * Read an SCF/ACF field safely with a fallback string.
	 *
	 * @param string     $name     Field name.
	 * @param string     $fallback Returned when field is empty or SCF absent.
	 * @param int|string $pid      Post ID / 'options' (default: current post).
	 */
	function px_web_field( string $name, string $fallback = '', $pid = false ): string {
		if ( ! function_exists( 'get_field' ) ) {
			return $fallback;
		}
		$val = get_field( $name, $pid );
		if ( $val === null || $val === false || $val === '' ) {
			return $fallback;
		}
		return (string) $val;
	}
}

/* ═══════════════════════════════════════════════════════════════════
 * THEME SETUP
 * ══════════════════════════════════════════════════════════════════ */

function praxis_web_setup(): void {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ] );
	add_theme_support( 'custom-logo', [
		'height'      => 40,
		'width'       => 160,
		'flex-height' => true,
		'flex-width'  => true,
	] );
	add_theme_support( 'editor-color-palette', [
		[ 'name' => 'Champagne',      'slug' => 'champagne',    'color' => '#9A8866' ],
		[ 'name' => 'Champagne Soft', 'slug' => 'champ-soft',   'color' => '#B8A179' ],
		[ 'name' => 'Near Black',     'slug' => 'near-black',   'color' => '#1C1714' ],
		[ 'name' => 'Warm White',     'slug' => 'warm-white',   'color' => '#F9F7F4' ],
		[ 'name' => 'Muted',          'slug' => 'muted',        'color' => '#7A6F65' ],
	] );
	register_nav_menus( [
		'primary' => __( 'Primary Menu', 'praxis-web' ),
		'footer'  => __( 'Footer Menu',  'praxis-web' ),
	] );
}
add_action( 'after_theme_supports', 'praxis_web_setup' );
add_action( 'after_setup_theme',    'praxis_web_setup' );

/* ═══════════════════════════════════════════════════════════════════
 * FONT PRECONNECT  (earliest possible hook, priority 2)
 * ══════════════════════════════════════════════════════════════════ */

function praxis_web_preconnect(): void {
	echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
	echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
}
add_action( 'wp_head', 'praxis_web_preconnect', 2 );

/* ═══════════════════════════════════════════════════════════════════
 * ENQUEUE
 * Load order matters:
 *   1. GSAP + ScrollTrigger + Lenis  (registered first so block #35 can dep on 'gsap')
 *   2. tokens-champagne.css          (overrides all CSS custom props)
 *   3. Block CSS (01, 02, 04, 11, 25, 26, 30, 32, 34)
 *   4. skin.css + layout.css         (component + section overrides, after block CSS)
 *   5. motion.css + grain.css
 *   6. Block JS (01, 02, 04, 11, 32, 34)
 *   7. motion.js  (after GSAP, ScrollTrigger, Lenis, block inits)
 *   Block #35 enqueues its own CSS + JS via block.php (included below).
 * ══════════════════════════════════════════════════════════════════ */

function praxis_web_enqueue(): void {
	$tu = get_template_directory_uri();
	$td = get_template_directory();
	$v  = wp_get_theme()->get( 'Version' );

	/* ── 1. Google Fonts: Inter (Greek-verified thin weights) ─────── */
	wp_enqueue_style(
		'praxis-web-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap',
		[],
		null
	);

	/* ── 2. GSAP CDN — registered so block #35 can declare dep ───── */
	wp_register_script(
		'gsap',
		'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
		[],
		'3.12.5',
		true
	);
	wp_register_script(
		'gsap-scrolltrigger',
		'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
		[ 'gsap' ],
		'3.12.5',
		true
	);
	/* Lenis 1.1 — window.Lenis from UMD build */
	wp_register_script(
		'lenis',
		'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js',
		[],
		'1.1.14',
		true
	);
	wp_enqueue_script( 'gsap' );
	wp_enqueue_script( 'gsap-scrolltrigger' );
	wp_enqueue_script( 'lenis' );

	/* ── 3. Champagne skin tokens — FIRST so block CSS vars resolve ─ */
	wp_enqueue_style( 'praxis-web-tokens', "$tu/assets/css/tokens-champagne.css", [ 'praxis-web-fonts' ], $v );

	/* ── 4. Block CSS (file-existence guard keeps theme valid pre-assembly) */
	$block_styles = [
		'pw-b01' => 'blocks/01-header-dropdown/block.css',
		'pw-b02' => 'blocks/02-hero-video/block.css',
		'pw-b04' => 'blocks/04-footer/block.css',
		'pw-b11' => 'blocks/11-counters/block.css',
		'pw-b25' => 'blocks/25-services-cards/block.css',
		'pw-b26' => 'blocks/26-statement-list/block.css',
		'pw-b30' => 'blocks/30-px-cta-multi/block.css',
		'pw-b32' => 'blocks/32-px-key-facts/block.css',
		'pw-b34' => 'blocks/34-px-nav-mobile/block.css',
		/* b35 self-enqueues via its own block.php */
	];
	foreach ( $block_styles as $handle => $rel ) {
		if ( file_exists( "$td/$rel" ) ) {
			wp_enqueue_style( $handle, "$tu/$rel", [ 'praxis-web-tokens' ], $v );
		}
	}

	/* ── 5. Skin + layout overrides — AFTER block CSS ─────────────── */
	wp_enqueue_style( 'praxis-web-skin',   "$tu/assets/css/skin.css",   [ 'pw-b01', 'pw-b04', 'pw-b34' ], $v );
	wp_enqueue_style( 'praxis-web-layout', "$tu/assets/css/layout.css", [ 'praxis-web-skin' ], $v );
	wp_enqueue_style( 'praxis-web-motion', "$tu/assets/css/motion.css", [ 'praxis-web-tokens' ], $v );
	wp_enqueue_style( 'praxis-web-grain',  "$tu/assets/css/grain.css",  [ 'praxis-web-tokens' ], $v );

	/* ── 6. Block JS ──────────────────────────────────────────────── */
	$block_scripts = [
		/* handle         => [ relative path,               deps ] */
		'pw-b01-js' => [ 'blocks/01-header-dropdown/block.js', [] ],
		'pw-b02-js' => [ 'blocks/02-hero-video/block.js',      [] ],
		'pw-b04-js' => [ 'blocks/04-footer/block.js',          [] ],
		'pw-b11-js' => [ 'blocks/11-counters/block.js',        [] ],
		'pw-b32-js' => [ 'blocks/32-px-key-facts/block.js',    [ 'gsap' ] ],
		'pw-b34-js' => [ 'blocks/34-px-nav-mobile/block.js',   [ 'gsap' ] ],
		/* b35 JS enqueued by block.php */
	];
	foreach ( $block_scripts as $handle => [ $rel, $deps ] ) {
		if ( file_exists( "$td/$rel" ) ) {
			wp_enqueue_script( $handle, "$tu/$rel", $deps, $v, true );
		}
	}

	/* ── 7. Theme motion — GSAP + Lenis: reveals, parallax, counters ─ */
	if ( file_exists( "$td/assets/js/motion.js" ) ) {
		wp_enqueue_script(
			'praxis-web-motion',
			"$tu/assets/js/motion.js",
			[ 'gsap', 'gsap-scrolltrigger', 'lenis', 'pw-b01-js', 'pw-b02-js' ],
			$v,
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'praxis_web_enqueue' );

/* ═══════════════════════════════════════════════════════════════════
 * SCF FIELD GROUPS
 * ══════════════════════════════════════════════════════════════════ */

require_once get_template_directory() . '/inc/scf-fields.php';

/* ═══════════════════════════════════════════════════════════════════
 * CONTACT MODAL — Block #35 (self-contained: SCF group + AJAX + render)
 * Must be included AFTER px_gr_upper() is defined (above).
 * ══════════════════════════════════════════════════════════════════ */

$_pw_modal = get_template_directory() . '/blocks/35-px-contact-modal/block.php';
if ( file_exists( $_pw_modal ) ) {
	require_once $_pw_modal;
}
unset( $_pw_modal );
