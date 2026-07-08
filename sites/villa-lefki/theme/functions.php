<?php
/**
 * Villa Lefki theme bootstrap.
 *
 * @package villa-lefki
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'VILLA_LEFKI_VERSION', '1.0.0' );

require_once get_template_directory() . '/inc/helpers.php';
require_once get_template_directory() . '/inc/scf-fields.php';
require_once get_template_directory() . '/inc/contact-form.php';

/**
 * Theme supports.
 */
add_action(
	'after_setup_theme',
	function () {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array( 'style', 'script' ) );
	}
);

/**
 * The stylesheet cascade, enqueued in the EXACT order the source
 * `Villa Lefki.dc.html` linked it — this order is load-bearing:
 *
 *   ds/*     : reconstructed design-system bundle. core tokens FIRST
 *              (the "stale" fixed-ish floor set), then the skin, then the
 *              DB block styles.
 *   local/*  : the source's own overrides, enqueued AFTER the bundle so
 *              they win the cascade — core-fluid.css re-floors the fluid
 *              type tokens (or the hero oversizes at 360px), and the
 *              DB-13/14/15/16/12 retunes override the bundle's versions.
 *
 * Each file depends on the previous handle so WordPress can never reorder
 * them. The final handle carries the page-local <style> from the .dc.html
 * <head> via wp_add_inline_style, so it lands after everything.
 */
add_action(
	'wp_enqueue_scripts',
	function () {
		$dir = get_template_directory();
		$uri = get_template_directory_uri();

		// Ordered cascade: [handle-suffix, relative-path].
		$sheets = array();

		foreach ( glob( $dir . '/assets/css/ds/*.css' ) as $file ) {
			$sheets[] = array( 'ds-' . basename( $file, '.css' ), 'assets/css/ds/' . basename( $file ) );
		}
		foreach ( glob( $dir . '/assets/css/local/*.css' ) as $file ) {
			$sheets[] = array( 'local-' . basename( $file, '.css' ), 'assets/css/local/' . basename( $file ) );
		}

		$prev = array();
		$last = '';
		foreach ( $sheets as $s ) {
			$handle = 'villa-' . $s[0];
			wp_enqueue_style( $handle, $uri . '/' . $s[1], $prev, VILLA_LEFKI_VERSION );
			$prev = array( $handle );
			$last = $handle;
		}

		// Page-local <style> from the .dc.html <head>, verbatim. Attached to
		// the last sheet so it applies after the whole cascade.
		$inline = 'html, body { margin: 0; padding: 0; }'
			. 'html { scroll-padding-top: 6rem; }'
			. 'body { background: var(--sand-100, #f4ecdd); overflow-x: hidden; }'
			. 'section[id], footer[id] { scroll-margin-top: 6rem; }'
			. '.db-hero-cinematic__title { font-size: clamp(2.75rem, 6vw + 1rem, var(--px-type-500, 6.875rem)); }';
		if ( $last ) {
			wp_add_inline_style( $last, $inline );
		}

		// WordPress' own style.css header sheet (identity only, no rules) —
		// enqueue last, harmless, keeps theme-check happy.
		wp_enqueue_style( 'villa-lefki-style', get_stylesheet_uri(), array( $last ), VILLA_LEFKI_VERSION );

		// --- FX runtime (footer) ---
		// theme-fx.js re-homes the source's inline DCLogic Component: it loads
		// the animation libraries in the required order
		// (GSAP -> ScrollTrigger -> Lenis -> fx-core -> fx-catalog), then does
		// the data-fx-init -> data-fx deferred promotion and activateFx(),
		// then settleScroll(); plus the language switcher, scrollspy and the
		// contact-form submit. fx-core/fx-catalog are the unchanged
		// design-system files.
		wp_enqueue_script( 'villa-fx', $uri . '/assets/js/theme-fx.js', array(), VILLA_LEFKI_VERSION, true );

		/**
		 * Animation library URLs. Default = the exact jsDelivr CDN URLs the
		 * source used, so the shipped theme is byte-faithful to the design.
		 * Filterable so an environment without CDN egress can point them at
		 * local copies without touching the theme.
		 *
		 * @param array $libs URLs keyed gsap|scrolltrigger|lenis|fxcore|fxcatalog.
		 */
		$libs = apply_filters(
			'villa_fx_lib_urls',
			array(
				'gsap'         => 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
				'scrolltrigger' => 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',
				'lenis'        => 'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js',
				'fxcore'       => $uri . '/assets/js/fx-core.js',
				'fxcatalog'    => $uri . '/assets/js/fx-catalog.js',
			)
		);

		wp_localize_script(
			'villa-fx',
			'VillaFXData',
			array(
				'libs'     => $libs,
				'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'villa_contact' ),
				'reduced'  => false,
			)
		);
	}
);

/**
 * The front page carries no post_content — every section is an SCF field. In
 * the block editor those fields land in the collapsed "Meta Boxes" drawer,
 * which is a poor editing experience. Switch the front page (only) to the
 * classic editor so all field groups render inline in document order. This is
 * an admin-side convenience; it changes nothing about the front-end design.
 */
add_filter(
	'use_block_editor_for_post',
	function ( $use, $post ) {
		if ( $post && (int) get_option( 'page_on_front' ) === (int) $post->ID ) {
			return false;
		}
		return $use;
	},
	10,
	2
);
