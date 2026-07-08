<?php
/**
 * DB-07 · Proof Strip — count-up stats.
 *
 * Trap #4 (counters): the real value goes in data-fx-to (FX-08 counts up to
 * it, deriving decimals from the value string, e.g. 9.8 -> one decimal); the
 * visible cell text stays "0" so a no-JS / reduced-motion page still shows a
 * sane number.
 *
 * @package villa-lefki
 */

$stats = px_field( 'proof_stats', array() );
if ( empty( $stats ) ) {
	return;
}
?>
<section class="db-proof-strip" data-spacing="s" data-screen-label="Proof">
  <div class="db-proof-strip__stats" data-fx-init="fx-08">
    <?php foreach ( (array) $stats as $stat ) : ?>
    <div>
      <span class="db-proof-strip__number" data-fx-target="counter" data-fx-to="<?php echo esc_attr( $stat['number'] ?? '0' ); ?>">0</span>
      <span class="db-proof-strip__label"><?php echo esc_html( $stat['label'] ?? '' ); ?></span>
    </div>
    <?php endforeach; ?>
  </div>
</section>
