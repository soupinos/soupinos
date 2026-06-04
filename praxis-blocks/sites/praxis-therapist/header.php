<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" type="image/svg+xml" href="<?php echo esc_url( get_template_directory_uri() . '/assets/favicon.svg' ); ?>" />
<link rel="apple-touch-icon" href="<?php echo esc_url( get_template_directory_uri() . '/assets/favicon.svg' ); ?>" />
<!-- Open Graph (generic — page-specific meta handled by SEO plugin if installed) -->
<meta property="og:type"      content="website" />
<meta property="og:site_name" content="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" />
<meta property="og:locale"    content="el_GR" />
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- ============================ HEADER ============================ -->
<header class="site-header">
  <a class="lockup" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Praxis">
    <span class="mark" aria-hidden="true">
      <svg width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="14" r="9" stroke="var(--gold-soft, #d4b56a)" stroke-width="1.4"/>
        <path d="M15 23V37" stroke="var(--gold-soft, #d4b56a)" stroke-width="1.4"/>
        <path d="M7 30C10 27 20 27 23 30" stroke="var(--gold-soft, #d4b56a)" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
    </span>
    <span class="lk-txt">
      <span class="ln1">Praxis</span>
      <span class="ln2"><?php echo esc_html__( 'Ψυχοθεραπεία', 'praxis-therapist' ); ?></span>
    </span>
  </a>

  <nav class="main-nav" aria-label="<?php esc_attr_e( 'Κύριο μενού', 'praxis-therapist' ); ?>">
    <a class="navlink" href="#about">Ποιός είμαι</a>
    <a class="navlink" href="#services">Τι κάνω</a>
    <a class="navlink" href="#why">Γιατί εγώ</a>
    <a class="navlink" href="#contact">Επικοινωνία</a>
    <button class="burger" aria-label="<?php esc_attr_e( 'Μενού', 'praxis-therapist' ); ?>"><span></span><span></span><span></span></button>
  </nav>
</header>

<!-- mobile drawer -->
<div class="drawer">
  <button class="close" aria-label="<?php esc_attr_e( 'Κλείσιμο', 'praxis-therapist' ); ?>">&times;</button>
  <a href="#about">Ποιός είμαι</a>
  <a href="#services">Τι κάνω</a>
  <a href="#why">Γιατί εγώ</a>
  <a href="#contact">Επικοινωνία</a>
</div>

<main id="main">
