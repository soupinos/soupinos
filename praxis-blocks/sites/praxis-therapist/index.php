<?php
/**
 * Fallback template — used when no more-specific template exists.
 * The homepage is front-page.php. header.php already opens <main id="main">.
 */
get_header(); ?>

<div class="wrap" style="padding:140px 0 80px;max-width:820px;">
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <article>
      <h1 class="h2"><?php the_title(); ?></h1>
      <div class="lede" style="max-width:none;"><?php the_content(); ?></div>
    </article>
  <?php endwhile; else : ?>
    <p class="lede"><?php esc_html_e( 'Δεν βρέθηκε περιεχόμενο.', 'praxis-therapist' ); ?></p>
  <?php endif; ?>
</div>

<?php get_footer(); ?>
