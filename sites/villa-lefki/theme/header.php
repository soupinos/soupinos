<?php
/**
 * Head + opening body. The persistent nav chrome (DB-13) is part of the body
 * and is rendered here so it sits above every section on every view.
 *
 * @package villa-lefki
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php get_template_part( 'template-parts/nav' ); ?>
