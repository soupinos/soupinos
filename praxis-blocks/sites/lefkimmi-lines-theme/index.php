<?php
/**
 * Fallback template — WordPress uses this when no more-specific template exists.
 * The real homepage is front-page.php.
 */
get_header();
?>
<main id="main" style="padding:120px 0 60px;max-width:860px;margin:0 auto;">
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <article>
      <h1><?php the_title(); ?></h1>
      <div><?php the_content(); ?></div>
    </article>
  <?php endwhile; else : ?>
    <p><?php _e( 'Δεν βρέθηκε περιεχόμενο.', 'lefkimmi-lines' ); ?></p>
  <?php endif; ?>
</main>
<?php get_footer(); ?>
