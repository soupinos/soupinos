<?php
/**
 * Lefkimmi Lines — Custom XML sitemap at /sitemap.xml
 *
 * Adds a rewrite rule so /sitemap.xml returns a dynamic sitemap
 * including all published pages and posts.
 *
 * NOTE: After activating the theme go to Settings → Permalinks → Save
 *       once to flush rewrite rules.
 */

function ll_sitemap_rewrite() {
    add_rewrite_rule( '^sitemap\.xml$', 'index.php?ll_sitemap=1', 'top' );
}
add_action( 'init', 'll_sitemap_rewrite' );

function ll_sitemap_query_var( $vars ) {
    $vars[] = 'll_sitemap';
    return $vars;
}
add_filter( 'query_vars', 'll_sitemap_query_var' );

function ll_output_sitemap() {
    if ( ! intval( get_query_var( 'll_sitemap' ) ) ) {
        return;
    }

    nocache_headers();
    header( 'Content-Type: application/xml; charset=UTF-8', true );

    $base   = home_url( '/' );
    $today  = gmdate( 'Y-m-d' );

    echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    // Homepage
    echo "<url><loc>" . esc_url( $base ) . "</loc>"
       . "<lastmod>$today</lastmod>"
       . "<priority>1.0</priority>"
       . "<changefreq>monthly</changefreq></url>\n";

    // Published pages (exclude WP defaults like sample-page)
    $pages = get_posts( [
        'post_type'      => 'page',
        'post_status'    => 'publish',
        'numberposts'    => -1,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ] );
    foreach ( $pages as $page ) {
        $slug = $page->post_name;
        if ( in_array( $slug, [ 'sample-page', 'privacy-policy' ], true )
             && $slug !== 'privacy-policy' ) {
            continue;
        }
        $mod = get_the_modified_date( 'Y-m-d', $page->ID ) ?: $today;
        $pri = ( $page->ID === (int) get_option( 'page_on_front' ) ) ? '1.0' : '0.8';
        echo "<url><loc>" . esc_url( get_permalink( $page->ID ) ) . "</loc>"
           . "<lastmod>$mod</lastmod>"
           . "<priority>$pri</priority>"
           . "<changefreq>monthly</changefreq></url>\n";
    }

    // Published posts (blog articles)
    $posts = get_posts( [
        'post_type'   => 'post',
        'post_status' => 'publish',
        'numberposts' => -1,
        'orderby'     => 'date',
        'order'       => 'DESC',
    ] );
    foreach ( $posts as $post ) {
        $mod = get_the_modified_date( 'Y-m-d', $post->ID ) ?: $today;
        echo "<url><loc>" . esc_url( get_permalink( $post->ID ) ) . "</loc>"
           . "<lastmod>$mod</lastmod>"
           . "<priority>0.6</priority>"
           . "<changefreq>weekly</changefreq></url>\n";
    }

    echo '</urlset>';
    exit;
}
add_action( 'template_redirect', 'll_output_sitemap', 1 );

// Tell WordPress to expose our sitemap URL
function ll_sitemap_robots( $output ) {
    return $output . "\nSitemap: " . home_url( '/sitemap.xml' ) . "\n";
}
add_filter( 'robots_txt', 'll_sitemap_robots' );
