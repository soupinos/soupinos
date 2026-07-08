<?php
/**
 * DB-05 · Editorial Split — alternating image/text rows.
 *
 * Layout alternation (normal / --reverse) is derived from row position, not
 * an editable field: odd rows get the reverse modifier, exactly as the source
 * alternated its three hand-authored rows. Each media layer is a parallax
 * DIV (FX-02) — the photo goes on as a background-image (trap #1), never an
 * <img>, so the transform target is unchanged.
 *
 * @package villa-lefki
 */

$rows = px_field( 'editorial_rows', array() );
if ( empty( $rows ) ) {
	return;
}
?>
<section class="db-editorial-split" data-spacing="m" id="spaces" data-screen-label="Editorial">

  <?php foreach ( (array) $rows as $i => $row ) : ?>
    <?php
    $reverse   = ( 1 === $i % 2 ) ? ' db-editorial-split__row--reverse' : '';
    $image_alt = px_image_alt( $row['image'] ?? null, $row['image_alt'] ?? '' );
    $bg        = px_bg_style( $row['image'] ?? null );
    ?>
    <div class="db-editorial-split__row<?php echo esc_attr( $reverse ); ?>" data-fx-init="fx-02 fx-01">
      <figure class="db-editorial-split__media">
        <div class="db-editorial-split__media-layer" data-fx-target="parallax" role="img" aria-label="<?php echo esc_attr( $image_alt ); ?>"<?php echo $bg ? ' style="' . esc_attr( $bg ) . '"' : ''; ?>></div>
      </figure>
      <div class="db-editorial-split__text" data-fx-target="reveal">
        <p class="db-editorial-split__eyebrow"><?php echo esc_html( $row['eyebrow'] ?? '' ); ?></p>
        <h3 class="db-editorial-split__title"><?php echo esc_html( $row['title'] ?? '' ); ?></h3>
        <p class="db-editorial-split__body"><?php echo esc_html( $row['body'] ?? '' ); ?></p>
      </div>
    </div>
  <?php endforeach; ?>

</section>
