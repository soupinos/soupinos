<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div class="c-dot"  id="cDot"  aria-hidden="true"></div>
<div class="c-ring" id="cRing" aria-hidden="true"></div>

<nav id="nav" role="navigation" aria-label="<?php esc_attr_e( 'Primary', 'praxis' ); ?>">
  <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav-logo">
    <?php
    if ( has_custom_logo() ) :
      the_custom_logo();
    else :
    ?>
      praxis.
    <?php endif; ?>
  </a>

  <div class="nav-links">
    <?php
    wp_nav_menu( [
      'theme_location' => 'primary',
      'container'      => false,
      'menu_class'     => '',
      'fallback_cb'    => 'praxis_fallback_nav',
      'items_wrap'     => '%3$s',
      'depth'          => 1,
    ] );
    ?>
  </div>

  <div id="theme-switcher">
    <button id="theme-toggle" aria-haspopup="listbox" aria-expanded="false" aria-label="<?php esc_attr_e( 'Αλλαγή θέματος', 'praxis' ); ?>">⊞ THEME</button>
    <div id="theme-panel" role="listbox" aria-label="<?php esc_attr_e( 'Επιλογή θέματος', 'praxis' ); ?>"></div>
  </div>

  <a href="#contact" class="nav-cta"><?php esc_html_e( 'Ξεκίνα →', 'praxis' ); ?></a>
</nav>
<?php

function praxis_fallback_nav() {
  ?>
  <a href="#services"><?php esc_html_e( 'Υπηρεσίες', 'praxis' ); ?></a>
  <a href="#pricing"><?php esc_html_e( 'Τιμές', 'praxis' ); ?></a>
  <a href="#demo"><?php esc_html_e( 'Demo', 'praxis' ); ?></a>
  <?php
}
