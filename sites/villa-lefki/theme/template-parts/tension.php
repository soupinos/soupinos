<?php
/**
 * DB-03 · Tension Statement.
 *
 * @package villa-lefki
 */

$kicker    = px_field( 'tension_kicker', 'ΗΣΥΧΙΑ, ΣΚΟΠΙΜΑ' );
$statement = px_field( 'tension_statement', '' );
?>
<section class="db-tension-statement" data-spacing="xl" data-fx-init="fx-03" data-fx-distance="100" data-screen-label="Tension">
  <div>
    <span class="db-tension-statement__mark"><?php echo esc_html( $kicker ); ?></span>
    <p class="db-tension-statement__line" data-fx-target="statement"><?php echo esc_html( $statement ); ?></p>
  </div>
</section>
