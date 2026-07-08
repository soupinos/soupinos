<?php
/**
 * DB-14 · FaqCards.
 *
 * Trap #3 (two columns): the source hand-split 4 items into two column DIVs.
 * Here a variable-length repeater is auto-distributed — the first ceil(n/2)
 * items into column one, the rest into column two — so any count stays
 * balanced. FX-14 scans [data-fx-target="card"] across the whole __cols
 * wrapper, so it still finds every card regardless of the split, and the
 * "one card open at a time" behaviour spans both columns.
 *
 * @package villa-lefki
 */

$eyebrow = px_field( 'faq_eyebrow', 'ΚΑΛΟ ΝΑ ΞΕΡΕΤΕ' );
$title   = px_field( 'faq_title', '' );
$lead    = px_field( 'faq_lead', '' );
$items   = array_values( (array) px_field( 'faq_items', array() ) );

$total = count( $items );
$split = (int) ceil( $total / 2 );
$cols  = array(
	array_slice( $items, 0, $split ),
	array_slice( $items, $split ),
);
?>
<section class="db-faq-cards" data-spacing="m" id="faq" data-screen-label="FAQ">
  <div class="db-faq-cards__head">
    <div>
      <p class="db-faq-cards__eyebrow"><span></span><?php echo esc_html( $eyebrow ); ?></p>
      <h2 class="db-faq-cards__title"><?php echo esc_html( $title ); ?></h2>
    </div>
    <p class="db-faq-cards__lead"><?php echo esc_html( $lead ); ?></p>
  </div>

  <div class="db-faq-cards__cols" data-fx-init="fx-14">
    <?php foreach ( $cols as $col ) : ?>
    <div class="db-faq-cards__col">
      <?php foreach ( $col as $item ) : ?>
      <div class="db-faq-cards__item" data-fx-target="card">
        <button class="db-faq-cards__q" data-fx-q>
          <span class="db-faq-cards__q-text"><?php echo esc_html( $item['question'] ?? '' ); ?></span>
          <span class="db-faq-cards__icon" data-fx-icon aria-hidden="true"><span></span><span></span></span>
        </button>
        <div class="db-faq-cards__a" data-fx-a>
          <?php echo wp_kses_post( $item['answer'] ?? '' ); ?>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    <?php endforeach; ?>
  </div>
</section>
