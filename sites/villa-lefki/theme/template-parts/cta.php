<?php
/**
 * DB-11 · CTA Modal Trigger + booking modal.
 *
 * The trigger button carries FX-05 (magnetic, desktop only) + FX-12 (modal
 * open/close with focus-trap). The form posts to a real AJAX handler
 * (inc/contact-form.php); theme-fx.js swaps the submit button to the success
 * message, preserving the source UX. data-villa-contact + data-success let
 * the JS find the form and its success string.
 *
 * @package villa-lefki
 */

$eyebrow     = px_field( 'cta_eyebrow', 'ΟΙ ΜΕΡΕΣ ΓΕΜΙΖΟΥΝ ΝΩΡΙΣ' );
$button      = px_field( 'cta_button_label', 'Κράτησε τις μέρες σου →' );
$modal_title = px_field( 'cta_modal_title', '' );
$name_label  = px_field( 'cta_name_label', 'Όνομα' );
$email_label = px_field( 'cta_email_label', 'Email' );
$dates_label = px_field( 'cta_dates_label', 'Ημερομηνίες' );
$dates_ph    = px_field( 'cta_dates_placeholder', 'Ημερομηνίες (π.χ. 12–16 Ιουνίου)' );
$submit      = px_field( 'cta_submit_label', 'Αποστολή' );
$success     = px_field( 'cta_success_message', 'Λάβαμε το μήνυμά σου ✓' );
$booking_tgt = px_opt( 'booking_target', '#krathsh' );
$anchor      = ltrim( $booking_tgt, '#' );
?>
<section class="db-cta-trigger" data-spacing="xl" id="<?php echo esc_attr( $anchor ); ?>" data-screen-label="CTA">
  <p class="db-cta-trigger__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
  <button type="button" class="db-cta-trigger__button" data-fx-init="fx-05 fx-12" data-fx-modal="#cta-modal"><?php echo esc_html( $button ); ?></button>
</section>

<div class="db-cta-modal" id="cta-modal" aria-hidden="true">
  <div class="db-cta-modal__backdrop" data-fx-target="backdrop"></div>
  <div class="db-cta-modal__panel" data-fx-target="panel" role="dialog" aria-modal="true" aria-labelledby="cta-modal-title">
    <button type="button" class="db-cta-modal__close" data-fx-close aria-label="Κλείσιμο">×</button>
    <h3 class="db-cta-modal__title" id="cta-modal-title"><?php echo esc_html( $modal_title ); ?></h3>
    <form data-villa-contact data-success="<?php echo esc_attr( $success ); ?>">
      <label class="sr-only" for="cta-name"><?php echo esc_html( $name_label ); ?></label>
      <input class="db-cta-modal__field" id="cta-name" name="name" type="text" placeholder="<?php echo esc_attr( $name_label ); ?>" autocomplete="name">
      <label class="sr-only" for="cta-email"><?php echo esc_html( $email_label ); ?></label>
      <input class="db-cta-modal__field" id="cta-email" name="email" type="email" placeholder="<?php echo esc_attr( $email_label ); ?>" autocomplete="email">
      <label class="sr-only" for="cta-dates"><?php echo esc_html( $dates_label ); ?></label>
      <input class="db-cta-modal__field" id="cta-dates" name="dates" type="text" placeholder="<?php echo esc_attr( $dates_ph ); ?>" autocomplete="off">
      <button type="submit" class="db-cta-modal__submit"><?php echo esc_html( $submit ); ?></button>
    </form>
  </div>
</div>
