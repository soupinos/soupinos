<?php
/**
 * DB-15 · ReviewsCarousel.
 *
 * Trap #2 (no drift): the SCF reviews repeater is the SINGLE source. Slide 0
 * is rendered into the static card (so a no-JS / reduced-motion page shows a
 * real first review) AND the full list is emitted as JSON into
 * [data-fx-target="reviews-data"] for FX-15. Both come from $reviews here, so
 * they can never disagree.
 *
 * FX-15 wraps the quote in curly quotation marks at runtime, so the JSON
 * quote is stored raw (no quotes) while the static slide-0 card adds the same
 * curly quotes the source hard-coded — keeping the initial paint identical.
 *
 * @package villa-lefki
 */

$eyebrow = px_field( 'reviews_eyebrow', 'ΟΙ ΦΙΛΟΞΕΝΟΥΜΕΝΟΙ ΜΑΣ' );
$title   = px_field( 'reviews_title', '' );
$reviews = px_field( 'reviews_items', array() );
$bg      = px_bg_style( get_field( 'reviews_bg_image' ) );

// Build the carousel payload from the SAME repeater.
$payload = array();
foreach ( (array) $reviews as $r ) {
	$payload[] = array(
		'quote' => (string) ( $r['quote'] ?? '' ),
		'name'  => (string) ( $r['name'] ?? '' ),
		'loc'   => (string) ( $r['loc'] ?? '' ),
	);
}
$slide0 = ! empty( $payload ) ? $payload[0] : array(
	'quote' => '',
	'name'  => '',
	'loc'   => '',
);

$star = '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>';
?>
<section class="db-reviews-carousel" data-spacing="m" id="reviews" data-fx-init="fx-02" data-fx-amount="10" data-screen-label="Reviews">
  <div class="db-reviews-carousel__media" data-fx-target="parallax"<?php echo $bg ? ' style="' . esc_attr( $bg ) . '"' : ''; ?>></div>
  <div class="db-reviews-carousel__shade"></div>

  <div class="db-reviews-carousel__inner" data-fx-init="fx-15">
    <div data-fx-target="reviews-data" style="display:none"><?php echo esc_html( wp_json_encode( $payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) ); ?></div>

    <div class="db-reviews-carousel__head">
      <p class="db-reviews-carousel__eyebrow"><span></span><?php echo esc_html( $eyebrow ); ?></p>
      <h2 class="db-reviews-carousel__title"><?php echo esc_html( $title ); ?></h2>
    </div>

    <div class="db-reviews-carousel__cardwrap">
      <button type="button" class="db-reviews-carousel__arrow" data-fx-prev aria-label="Προηγούμενη κριτική">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 5l-7 7 7 7"/></svg>
      </button>

      <div class="db-reviews-carousel__card">
        <div class="db-reviews-carousel__stars">
          <?php echo str_repeat( $star, 5 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- fixed decorative SVG. ?>
        </div>
        <blockquote class="db-reviews-carousel__quote" data-fx-target="quote"><?php echo esc_html( '“' . $slide0['quote'] . '”' ); ?></blockquote>
        <p class="db-reviews-carousel__name" data-fx-target="name"><?php echo esc_html( $slide0['name'] ); ?></p>
        <p class="db-reviews-carousel__loc" data-fx-target="loc"><?php echo esc_html( $slide0['loc'] ); ?></p>
      </div>

      <button type="button" class="db-reviews-carousel__arrow" data-fx-next aria-label="Επόμενη κριτική">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  </div>
</section>
