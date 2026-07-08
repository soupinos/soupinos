<?php
/**
 * DB-01 · Hero Cinematic.
 *
 * Trap #1 (images): the media is a role="img" DIV that FX-06 ken-burns by
 * animating transform:scale. We must NOT swap it for an <img> — that would
 * change the transformed node. Instead we set the photo as a background-image
 * on the exact same div (px_bg_style), leaving the block CSS gradient
 * placeholder to show through when no image is set. The alt/description stays
 * in aria-label, sourced from the paired image-alt field.
 *
 * @package villa-lefki
 */

$eyebrow    = px_field( 'hero_eyebrow', 'ΛΕΥΚΙΜΜΗ · ΝΟΤΙΑ ΚΕΡΚΥΡΑ' );
$title      = px_field( 'hero_title', 'ΦΩΣ ΚΑΙ ΑΛΑΤΙ' );
$lede       = px_field( 'hero_lede', '' );
$cta_label  = px_field( 'hero_cta_label', 'Δες τη διαμονή →' );
$cta_target = px_field( 'hero_cta_target', '#spaces' );
$image      = get_field( 'hero_image' );
$image_alt  = px_image_alt( $image, px_field( 'hero_image_alt', '' ) );
$bg         = px_bg_style( $image );
?>
<section class="db-hero-cinematic px-grain px-bleed" data-spacing="xl" id="top" data-fx-init="fx-06 fx-04" data-screen-label="Hero">
  <div class="db-hero-cinematic__media" data-fx-target="kenburns" role="img" aria-label="<?php echo esc_attr( $image_alt ); ?>"<?php echo $bg ? ' style="' . esc_attr( $bg ) . '"' : ''; ?>></div>
  <div class="db-hero-cinematic__scrim" aria-hidden="true"></div>
  <div class="db-hero-cinematic__content">
    <p class="db-hero-cinematic__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
    <h1 class="db-hero-cinematic__title" data-fx-target="split"><?php echo esc_html( $title ); ?></h1>
    <p class="db-hero-cinematic__lede"><?php echo esc_html( $lede ); ?></p>
    <a class="db-hero-cinematic__cta" href="<?php echo esc_attr( $cta_target ); ?>"><?php echo esc_html( $cta_label ); ?></a>
  </div>
</section>
