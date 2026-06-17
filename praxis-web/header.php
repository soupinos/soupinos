<?php
/**
 * header.php — Minimal WP <head> wrapper.
 * Visual header (px-nav) is rendered in front-page.php, NOT here.
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php
  /* ── SCF-driven SEO tags ───────────────────────────────── */
  if ( function_exists( 'get_field' ) ) {
    $seo_desc  = get_field( 'pw_seo_desc' );
    $seo_img   = get_field( 'pw_seo_og_image' );
    $seo_title = get_field( 'pw_seo_title' );

    if ( $seo_title ) {
      add_filter( 'pre_get_document_title', function () use ( $seo_title ) {
        return esc_html( $seo_title );
      }, 20 );
    }

    if ( $seo_desc ) {
      printf(
        '<meta name="description" content="%s">' . "\n" .
        '<meta property="og:description" content="%s">' . "\n",
        esc_attr( $seo_desc ),
        esc_attr( $seo_desc )
      );
    }

    if ( $seo_img ) {
      printf( '<meta property="og:image" content="%s">' . "\n", esc_url( $seo_img ) );
    }

    printf( '<meta property="og:type" content="website">' . "\n" );
    printf( '<meta property="og:url" content="%s">' . "\n", esc_url( home_url( $_SERVER['REQUEST_URI'] ?? '/' ) ) );
  }
  ?>
  <?php wp_head(); ?>
</head>
<body <?php body_class( 'praxis-web' ); ?>>
<?php wp_body_open(); ?>
