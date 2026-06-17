<?php
// Fallback template — redirects to front page or shows blog loop.
get_header();
?>
<main id="main" role="main" style="padding:120px 48px 80px;max-width:1200px;margin:0 auto;">
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <article <?php post_class(); ?>>
      <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
      <div class="entry-content"><?php the_excerpt(); ?></div>
    </article>
  <?php endwhile; else : ?>
    <p><?php esc_html_e( 'Δεν βρέθηκε περιεχόμενο.', 'praxis' ); ?></p>
  <?php endif; ?>
</main>
<?php
get_footer();
