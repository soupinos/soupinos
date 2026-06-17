<?php
/**
 * Fallback template — redirects to front page.
 * WordPress requires index.php; all content is served via front-page.php.
 */
get_header();
?>
<main id="main" class="site-main">
	<?php
	if ( have_posts() ) :
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile;
	endif;
	?>
</main>
<?php
get_footer();
