<?php
/**
 * Front page — assembles the Villa Lefki single page from its section
 * partials, in the exact top-to-bottom order of the source .dc.html.
 *
 * @package villa-lefki
 */

get_header();

get_template_part( 'template-parts/hero' );
get_template_part( 'template-parts/tension' );
get_template_part( 'template-parts/manifesto' );
get_template_part( 'template-parts/editorial' );
get_template_part( 'template-parts/amenities' );
get_template_part( 'template-parts/proof' );
get_template_part( 'template-parts/reviews' );
get_template_part( 'template-parts/faq' );
get_template_part( 'template-parts/cta' );
get_template_part( 'template-parts/footer-editorial' );

get_footer();
