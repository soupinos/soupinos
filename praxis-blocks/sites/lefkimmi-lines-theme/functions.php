<?php
/**
 * Lefkimmi Lines Theme — functions.php
 * Enqueue assets, include modules, provide schedule JSON helper.
 */

/* ── Theme setup ─────────────────────────────────────────── */
function ll_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'html5', [ 'search-form', 'comment-form', 'gallery', 'caption', 'style', 'script' ] );
    add_theme_support( 'custom-logo' );
    load_theme_textdomain( 'lefkimmi-lines', get_template_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'll_theme_setup' );

/* ── Enqueue scripts & styles ────────────────────────────── */
function ll_enqueue_assets() {
    $v  = '1.0';
    $tu = get_template_directory_uri();

    // Google Fonts
    wp_enqueue_style(
        'll-fonts',
        'https://fonts.googleapis.com/css2?family=Marcellus&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap',
        [],
        null
    );

    // Styles
    wp_enqueue_style( 'll-caldera',  $tu . '/assets/caldera.css',  [ 'll-fonts' ], $v );
    wp_enqueue_style( 'll-block21',  $tu . '/assets/block21.css',  [ 'll-caldera' ], $v );
    wp_enqueue_style( 'll-block23',  $tu . '/assets/block23.css',  [ 'll-caldera' ], $v );
    wp_enqueue_style( 'll-block24',  $tu . '/assets/block24.css',  [ 'll-caldera' ], $v );
    wp_enqueue_style( 'll-cookie',   $tu . '/assets/cookie-consent.css', [ 'll-caldera' ], $v );

    // Scripts — CRITICAL ORDER: blocks must execute before i18n.js
    // so that data-i18n elements are in DOM when i18n.js caches originals.
    wp_enqueue_script( 'll-block21', $tu . '/assets/block21.js', [],                             $v, true );
    wp_enqueue_script( 'll-block23', $tu . '/assets/block23.js', [],                             $v, true );
    wp_enqueue_script( 'll-block24', $tu . '/assets/block24.js', [],                             $v, true );
    wp_enqueue_script( 'll-i18n',   $tu . '/assets/i18n.js',    [ 'll-block21', 'll-block23' ], $v, true );
    wp_enqueue_script( 'll-app',    $tu . '/assets/app.js',     [ 'll-i18n' ],                  $v, true );
    wp_enqueue_script( 'll-skin',   $tu . '/assets/skin-picker.js', [ 'll-app' ],               $v, true );
    wp_enqueue_script( 'll-cookie',   $tu . '/assets/cookie-consent.js', [ 'll-i18n' ],           $v, true );
    wp_enqueue_script( 'll-contact', $tu . '/assets/contact-form.js',   [ 'll-i18n' ],            $v, true );
    wp_localize_script( 'll-contact', 'llContact', [
        'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
        'errFields' => __( 'Παρακαλώ συμπληρώστε όλα τα πεδία.', 'lefkimmi-lines' ),
        'errServer' => __( 'Σφάλμα αποστολής. Δοκιμάστε ξανά ή στείλτε email στο info@lefkimmilines.gr.', 'lefkimmi-lines' ),
        'err_limit' => __( 'Πολλές αποστολές. Δοκιμάστε ξανά σε λίγη ώρα.', 'lefkimmi-lines' ),
        'err_smtp'  => __( 'Σφάλμα αποστολής. Δοκιμάστε ξανά ή στείλτε email στο info@lefkimmilines.gr.', 'lefkimmi-lines' ),
        'err_fields'=> __( 'Παρακαλώ συμπληρώστε όλα τα πεδία σωστά.', 'lefkimmi-lines' ),
    ] );
}
add_action( 'wp_enqueue_scripts', 'll_enqueue_assets' );

/* ── Preconnect Google Fonts ─────────────────────────────── */
function ll_preconnect_fonts() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com" />' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' . "\n";
}
add_action( 'wp_head', 'll_preconnect_fonts', 1 );

/* ── Default meta description (plugins like Yoast override) */
function ll_default_meta() {
    if ( is_front_page() && ! defined( 'WPSEO_VERSION' ) && ! class_exists( 'AIOSEO' ) ) {
        echo '<meta name="description" content="' . esc_attr__(
            'Καθημερινά δρομολόγια Λευκίμμη–Ηγουμενίτσα σε 50 λεπτά. Ο συντομότερος &amp; φθηνότερος δρόμος για την Κέρκυρα. Εισιτήρια από 7,30€.',
            'lefkimmi-lines'
        ) . '" />' . "\n";
    }
}
add_action( 'wp_head', 'll_default_meta', 2 );

/* ── Include modules ─────────────────────────────────────── */
require_once get_template_directory() . '/inc/schedule-cpt.php';
require_once get_template_directory() . '/inc/skin-options.php';
require_once get_template_directory() . '/inc/contact-handler.php';
require_once get_template_directory() . '/inc/sitemap.php';

/* ── Schedule JSON helper ────────────────────────────────── */

/**
 * Returns the ferry schedule as an associative array keyed by line (ll/hl/lp/pl).
 * Reads from ferry_schedule CPT when posts exist; falls back to static defaults.
 *
 * @return array{ ll: list<array>, hl: list<array>, lp: list<array>, pl: list<array> }
 */
function ll_get_schedule_json() {
    $lines = [ 'll' => [], 'hl' => [], 'lp' => [], 'pl' => [] ];

    $posts = get_posts( [
        'post_type'      => 'ferry_schedule',
        'posts_per_page' => -1,
        'orderby'        => 'meta_value',
        'meta_key'       => '_ll_dep',
        'order'          => 'ASC',
        'meta_query'     => [ [
            'key'     => '_ll_active',
            'value'   => '1',
            'compare' => '=',
        ] ],
    ] );

    foreach ( $posts as $p ) {
        $line = get_post_meta( $p->ID, '_ll_line', true );
        $ship = get_post_meta( $p->ID, '_ll_ship', true );
        $dep  = get_post_meta( $p->ID, '_ll_dep',  true );
        $arr  = get_post_meta( $p->ID, '_ll_arr',  true );

        if ( isset( $lines[ $line ] ) && $ship && $dep && $arr ) {
            $lines[ $line ][] = [
                'ship' => sanitize_text_field( $ship ),
                'dep'  => sanitize_text_field( $dep ),
                'arr'  => sanitize_text_field( $arr ),
            ];
        }
    }

    // Fallback when no CPT entries exist yet
    if ( array_sum( array_map( 'count', $lines ) ) === 0 ) {
        return ll_default_schedule();
    }

    return $lines;
}

/**
 * Static fallback — mirrors the current live schedule.
 */
function ll_default_schedule() {
    return [
        'll' => [
            [ 'ship' => 'Αγία Τριάδα',          'dep' => '06:00', 'arr' => '06:50' ],
            [ 'ship' => 'Αγία Τριάδα',          'dep' => '09:00', 'arr' => '09:50' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας', 'dep' => '11:45', 'arr' => '12:35' ],
            [ 'ship' => 'Αγία Τριάδα',          'dep' => '14:00', 'arr' => '14:50' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας', 'dep' => '16:00', 'arr' => '16:50' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας', 'dep' => '19:00', 'arr' => '19:50' ],
        ],
        'hl' => [
            [ 'ship' => 'Λευκίμμη',             'dep' => '07:30', 'arr' => '08:20' ],
            [ 'ship' => 'Αγία Τριάδα',          'dep' => '09:00', 'arr' => '09:50' ],
            [ 'ship' => 'Λευκίμμη',             'dep' => '11:30', 'arr' => '12:20' ],
            [ 'ship' => 'Αγία Τριάδα',          'dep' => '13:00', 'arr' => '13:50' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας', 'dep' => '14:00', 'arr' => '14:50' ],
            [ 'ship' => 'Λευκίμμη',             'dep' => '15:30', 'arr' => '16:20' ],
            [ 'ship' => 'Αγία Τριάδα',          'dep' => '16:30', 'arr' => '17:20' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας', 'dep' => '18:00', 'arr' => '18:50' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας', 'dep' => '21:00', 'arr' => '21:50' ],
            [ 'ship' => 'Αγία Τριάδα',          'dep' => '22:30', 'arr' => '23:20' ],
        ],
        'lp' => [
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '09:15', 'arr' => '10:00' ],
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '14:30', 'arr' => '15:15' ],
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '17:45', 'arr' => '18:30' ],
        ],
        'pl' => [
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '07:45', 'arr' => '08:30' ],
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '12:00', 'arr' => '12:45' ],
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '16:30', 'arr' => '17:15' ],
        ],
    ];
}
