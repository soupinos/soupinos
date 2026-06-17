<?php
/**
 * Praxis Therapist — header.php v3
 * ACF-driven nav: centered grid, botanical logo mark, dropdown, hamburger ≤1024px.
 */
$has_acf   = function_exists( 'get_field' );
$site_name = $has_acf ? get_field( 'acf_global_site_name' ) : '';
$site_name = $site_name ?: 'Δημήτρης Κουκούλης';
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- NAV -->
<nav id="nav">
  <a href="<?php echo esc_url( home_url( '/' ) ); ?>#hero" class="nav-logo">
    <span class="nav-logo__mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke-linecap="round"></path>
        <path d="M12 6C12 6 15 9 15 12C15 15 12 18 12 18" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M12 6C12 6 9 9 9 12C9 15 12 18 12 18" stroke-linecap="round" stroke-linejoin="round"></path>
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"></circle>
      </svg>
    </span>
    <span><?php echo esc_html( $site_name ); ?></span>
  </a>
  <ul class="nav-links">
    <li class="nav-dd">
      <a href="#services" class="nav-dd__trigger" aria-haspopup="true" aria-expanded="false">
        <?php esc_html_e( 'Υπηρεσίες', 'praxis-therapist' ); ?>
        <svg class="nav-dd__caret" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </a>
      <div class="dropdown-menu" role="menu">
        <a href="#services" role="menuitem"><?php esc_html_e( 'Ψυχοθεραπεία', 'praxis-therapist' ); ?></a>
        <a href="#services" role="menuitem"><?php esc_html_e( 'Σκοπός ζωής', 'praxis-therapist' ); ?></a>
        <a href="#services" role="menuitem"><?php esc_html_e( 'Έφηβοι & μεταέφηβοι', 'praxis-therapist' ); ?></a>
      </div>
    </li>
    <li><a href="#about"><?php esc_html_e( 'Σχετικά', 'praxis-therapist' ); ?></a></li>
    <li><a href="#why"><?php esc_html_e( 'Φιλοσοφία', 'praxis-therapist' ); ?></a></li>
    <li><a href="#contact"><?php esc_html_e( 'Επικοινωνία', 'praxis-therapist' ); ?></a></li>
  </ul>
  <a href="#" class="nav-cta" data-open-modal><?php esc_html_e( 'Ραντεβού →', 'praxis-therapist' ); ?></a>
  <button class="nav-burger" id="nav-burger" type="button"
    aria-label="<?php esc_attr_e( 'Άνοιγμα μενού', 'praxis-therapist' ); ?>"
    aria-expanded="false" aria-controls="nav-panel">
    <span class="nav-burger__bar"></span>
    <span class="nav-burger__bar"></span>
    <span class="nav-burger__bar"></span>
  </button>
</nav>

<!-- MOBILE NAV PANEL -->
<div class="nav-panel" id="nav-panel" aria-hidden="true">
  <div class="nav-panel__overlay" id="nav-overlay"></div>
  <div class="nav-panel__inner" id="nav-panel-inner">
    <button class="nav-panel__close" id="nav-close" type="button"
      aria-label="<?php esc_attr_e( 'Κλείσιμο μενού', 'praxis-therapist' ); ?>">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav-panel__logo">
      <?php echo esc_html( $site_name ); ?>
    </a>
    <ul class="nav-panel__list">
      <li><a href="#services"><?php esc_html_e( 'Υπηρεσίες', 'praxis-therapist' ); ?></a></li>
      <li class="nav-panel__sub"><a href="#services"><?php esc_html_e( 'Ψυχοθεραπεία', 'praxis-therapist' ); ?></a></li>
      <li class="nav-panel__sub"><a href="#services"><?php esc_html_e( 'Σκοπός ζωής', 'praxis-therapist' ); ?></a></li>
      <li class="nav-panel__sub"><a href="#services"><?php esc_html_e( 'Έφηβοι & μεταέφηβοι', 'praxis-therapist' ); ?></a></li>
      <li><a href="#about"><?php esc_html_e( 'Σχετικά', 'praxis-therapist' ); ?></a></li>
      <li><a href="#why"><?php esc_html_e( 'Φιλοσοφία', 'praxis-therapist' ); ?></a></li>
      <li><a href="#faq"><?php esc_html_e( 'FAQ', 'praxis-therapist' ); ?></a></li>
      <li><a href="#contact"><?php esc_html_e( 'Επικοινωνία', 'praxis-therapist' ); ?></a></li>
    </ul>
    <div class="nav-panel__cta-wrap">
      <a href="#" class="nav-panel__cta" data-open-modal><?php esc_html_e( 'Ραντεβού →', 'praxis-therapist' ); ?></a>
    </div>
  </div>
</div>
