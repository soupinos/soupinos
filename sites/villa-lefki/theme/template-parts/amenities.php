<?php
/**
 * DB-16 · AmenitiesQuiet — icon + label grid.
 *
 * Icons come from the fixed pre-approved picker (see inc/icons.php) so the
 * design system's "icon restraint" rule can't be broken by an editor. The
 * SVG is emitted verbatim from the source.
 *
 * @package villa-lefki
 */

$eyebrow = px_field( 'amenities_eyebrow', 'ΠΑΡΟΧΕΣ' );
$title   = px_field( 'amenities_title', '' );
$items   = px_field( 'amenities_items', array() );
?>
<section class="db-amenities-quiet" data-spacing="m" id="amenities" data-screen-label="Amenities">
  <div class="db-amenities-quiet__inner">
    <div class="db-amenities-quiet__head">
      <p class="db-amenities-quiet__eyebrow"><span></span><?php echo esc_html( $eyebrow ); ?><span></span></p>
      <h2 class="db-amenities-quiet__title"><?php echo esc_html( $title ); ?></h2>
    </div>

    <div class="db-amenities-quiet__grid" data-fx-init="fx-07">

      <?php foreach ( (array) $items as $item ) : ?>
        <div class="db-amenities-quiet__item" data-fx-target="item">
          <?php echo villa_amenity_icon_svg( $item['icon'] ?? '' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- fixed, sanitised SVG from the code-owned icon registry. ?>
          <span class="db-amenities-quiet__label"><?php echo esc_html( $item['label'] ?? '' ); ?></span>
        </div>
      <?php endforeach; ?>

    </div>
  </div>
</section>
