<?php
/**
 * Fallback template — the bottom of the WordPress template hierarchy.
 *
 * The site is a single page rendered by front-page.php; this file only runs
 * for requests that fall through to no more specific template (a stray post,
 * an archive, a search, a 404). It reuses the same document shell as the rest
 * of the theme — get_header() brings the persistent nav chrome (DB-13) and
 * wp_head(); get_footer() emits wp_footer() and the FX runtime — so any such
 * page still carries the theme's chrome, styling and behaviour.
 *
 * @package villa-lefki
 */

get_header();
?>
<main class="villa-fallback" data-spacing="m" style="max-width:var(--px-measure,65ch);margin:0 auto;padding:var(--px-breath-m,5.5625rem) var(--px-space-4,2.125rem);">
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<article <?php post_class(); ?>>
				<h1 class="db-editorial-split__title"><?php the_title(); ?></h1>
				<div class="db-editorial-split__body">
					<?php the_content(); ?>
				</div>
			</article>
		<?php endwhile; ?>

		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<h1 class="db-editorial-split__title"><?php esc_html_e( 'Δεν βρέθηκε περιεχόμενο', 'villa-lefki' ); ?></h1>
		<p class="db-editorial-split__body">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Επιστροφή στην αρχική', 'villa-lefki' ); ?></a>
		</p>
	<?php endif; ?>
</main>
<?php
get_footer();
