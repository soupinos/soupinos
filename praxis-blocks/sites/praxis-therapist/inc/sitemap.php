<?php
/**
 * Praxis Therapist — Custom XML sitemap at /sitemap.xml
 *
 * Generic: homepage + published pages + published posts.
 * NOTE: After activating the theme, visit Settings → Permalinks → Save
 *       once to flush rewrite rules.
 */

function pt_sitemap_rewrite() {
    add_rewrite_rule( '^sitemap\.xml$', 'index.php?pt_sitemap=1', 'top' );
}
add_action( 'init', 'pt_sitemap_rewrite' );

function pt_sitemap_query_var( $vars ) {
    $vars[] = 'pt_sitemap';
    return $vars;
}
add_filter( 'query_vars', 'pt_sitemap_query_var' );

function pt_output_sitemap() {
    if ( ! intval( get_query_var( 'pt_sitemap' ) ) ) {
        return;
    }

    nocache_headers();
    header( 'Content-Type: application/xml; charset=UTF-8', true );

    $base  = home_url( '/' );
    $today = gmdate( 'Y-m-d' );

    echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    echo "<url><loc>" . esc_url( $base ) . "</loc>"
       . "<lastmod>$today</lastmod>"
       . "<priority>1.0</priority>"
       . "<changefreq>monthly</changefreq></url>\n";

    foreach ( [ 'page' => '0.8', 'post' => '0.6' ] as $ptype => $pri ) {
        $items = get_posts( [
            'post_type'   => $ptype,
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby'     => 'date',
            'order'       => 'DESC',
        ] );
        foreach ( $items as $item ) {
            if ( 'page' === $ptype && (int) get_option( 'page_on_front' ) === $item->ID ) {
                continue; // homepage already emitted
            }
            if ( 'sample-page' === $item->post_name ) {
                continue;
            }
            $mod = get_the_modified_date( 'Y-m-d', $item->ID ) ?: $today;
            echo "<url><loc>" . esc_url( get_permalink( $item->ID ) ) . "</loc>"
               . "<lastmod>$mod</lastmod>"
               . "<priority>$pri</priority>"
               . "<changefreq>monthly</changefreq></url>\n";
        }
    }

    echo '</urlset>';
    exit;
}
add_action( 'template_redirect', 'pt_output_sitemap', 1 );

function pt_sitemap_robots( $output ) {
    return $output . "\nSitemap: " . home_url( '/sitemap.xml' ) . "\n";
}
add_filter( 'robots_txt', 'pt_sitemap_robots' );
