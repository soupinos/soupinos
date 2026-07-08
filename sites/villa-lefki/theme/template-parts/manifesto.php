<?php
/**
 * DB-04 · Manifesto Asymmetric.
 *
 * FX-01 reveal targets the body; FX-04 split targets the blockquote — two
 * different data-fx-target nodes, one transform channel each (the design
 * rule). The body is a WYSIWYG field so an editor controls the paragraph
 * breaks that the source hard-coded.
 *
 * @package villa-lefki
 */

$body     = px_field( 'manifesto_body', '' );
$quote    = px_field( 'manifesto_quote', '' );
$citation = px_field( 'manifesto_citation', '' );
?>
<section class="db-manifesto" data-spacing="s" data-fx-init="fx-01 fx-04" data-screen-label="Manifesto">
  <div class="db-manifesto__grid">
    <div class="db-manifesto__body" data-fx-target="reveal">
      <?php echo wp_kses_post( $body ); ?>
    </div>
    <aside class="db-manifesto__quote">
      <blockquote data-fx-target="split"><?php echo esc_html( $quote ); ?></blockquote>
      <cite><?php echo esc_html( $citation ); ?></cite>
    </aside>
  </div>
</section>
