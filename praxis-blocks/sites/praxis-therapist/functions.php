<?php
/**
 * Praxis Therapist — functions.php
 *
 * Lean enqueue for a GR-only one-page therapist site.
 * No ferry modules, no schedule CPT, no i18n (monolingual v1),
 * no skin picker (the "sand" skin is baked into main.css).
 */

/* ── Theme setup ─────────────────────────────────────────── */
function pt_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'html5', [ 'search-form', 'comment-form', 'gallery', 'caption', 'style', 'script' ] );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'pt_theme_setup' );

/* ── Preconnect Google Fonts (perf) ──────────────────────── */
function pt_preconnect_fonts() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com" />' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' . "\n";
}
add_action( 'wp_head', 'pt_preconnect_fonts', 1 );

/* ── Enqueue assets ──────────────────────────────────────── */
function pt_enqueue_assets() {
    $v  = '0.1.0';
    $tu = get_template_directory_uri();

    /* Greek-verified fonts only: EB Garamond (headings) + Inter (body).
       NOTE: the sand skin's original Playfair Display has NO Greek subset,
       so it is intentionally NOT used. */
    wp_enqueue_style(
        'pt-fonts',
        'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap&subset=greek,latin',
        [],
        null
    );

    /* Engine stylesheet (skin baked in). */
    wp_enqueue_style( 'pt-main',   $tu . '/assets/main.css',           [ 'pt-fonts' ], $v );
    wp_enqueue_style( 'pt-cookie', $tu . '/assets/cookie-consent.css', [ 'pt-main' ],  $v );

    /* Block stylesheets — only enqueued if the block file exists
       (sections wired in Phase 2). Keeps the theme valid before assembly. */
    foreach ( [ 'about-text' => 20, 'services-cards' => 25, 'statement-list' => 26, 'testimonials' => 27 ] as $name => $n ) {
        $rel = "/assets/block{$n}.css";
        if ( file_exists( get_template_directory() . $rel ) ) {
            wp_enqueue_style( "pt-block{$n}", $tu . $rel, [ 'pt-main' ], $v );
        }
    }

    /* Scripts (footer, deferred). */
    wp_enqueue_script( 'pt-app',     $tu . '/assets/app.js',            [],          $v, true );
    wp_enqueue_script( 'pt-cookie',  $tu . '/assets/cookie-consent.js', [],          $v, true );
    wp_enqueue_script( 'pt-contact', $tu . '/assets/contact-form.js',   [],          $v, true );

    /* Block scripts — only if present. */
    $rel = '/assets/block27.js';
    if ( file_exists( get_template_directory() . $rel ) ) {
        wp_enqueue_script( 'pt-block27', $tu . $rel, [], $v, true );
    }

    /* Contact form strings + endpoint. Recipient is the WP admin email
       (set at install) — NEVER an invented address. */
    wp_localize_script( 'pt-contact', 'llContact', [
        'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
        'errFields' => __( 'Παρακαλώ συμπληρώστε όλα τα πεδία.', 'praxis-therapist' ),
        'errServer' => __( 'Σφάλμα αποστολής. Δοκιμάστε ξανά ή στείλτε email απευθείας.', 'praxis-therapist' ),
        'err_limit' => __( 'Πολλές αποστολές. Δοκιμάστε ξανά σε λίγη ώρα.', 'praxis-therapist' ),
        'err_smtp'  => __( 'Σφάλμα αποστολής. Δοκιμάστε ξανά ή στείλτε email απευθείας.', 'praxis-therapist' ),
        'err_fields'=> __( 'Παρακαλώ συμπληρώστε όλα τα πεδία σωστά.', 'praxis-therapist' ),
    ] );
}
add_action( 'wp_enqueue_scripts', 'pt_enqueue_assets' );

/* ── Include modules ─────────────────────────────────────── */
require_once get_template_directory() . '/inc/contact-handler.php';
require_once get_template_directory() . '/inc/sitemap.php';
