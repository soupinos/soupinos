<?php
/**
 * Praxis Therapist — footer.php v3
 * 5-col footer + ACF fields + contact modal.
 */
$has_acf  = function_exists( 'get_field' );
$linkedin = $has_acf ? get_field( 'acf_global_linkedin' )  : '[LINKEDIN_URL]';
$instagram= $has_acf ? get_field( 'acf_global_instagram' ) : '[INSTAGRAM_URL]';
$phone    = $has_acf ? get_field( 'acf_global_phone' )     : '[ΤΗΛΕΦΩΝΟ]';
$email    = $has_acf ? get_field( 'acf_global_email' )     : '[EMAIL]';
$city     = $has_acf ? get_field( 'acf_global_city' )      : '[ΠΟΛΗ]';

function px_footer( $key, $fallback = '' ) {
	if ( function_exists( 'get_field' ) ) {
		$v = get_field( $key );
		return ( $v !== false && $v !== null && $v !== '' ) ? $v : $fallback;
	}
	return $fallback;
}

$brand_name  = px_footer( 'acf_footer_brand_name', 'Δημήτρης Κουκούλης' );
$brand_desc  = px_footer( 'acf_footer_brand_desc', 'Ψυχολόγος – Ψυχοθεραπευτής. Συνεδρίες δια ζώσης & εξ αποστάσεως.' );
$hours_wd    = px_footer( 'acf_footer_hours_wd',   'Δευτέρα – Παρασκευή' );
$hours_wd_t  = px_footer( 'acf_footer_hours_wd_t', '09:00 – 21:00' );
$hours_we    = px_footer( 'acf_footer_hours_we',   'Σάββατο – Κυριακή' );
$hours_we_t  = px_footer( 'acf_footer_hours_we_t', 'Κλειστά' );
$copyright   = px_footer( 'acf_footer_copyright',  '© ' . date( 'Y' ) . ' Δημήτρης Κουκούλης' );
$role_label  = px_footer( 'acf_footer_role_label', 'Ψυχολόγος – Ψυχοθεραπευτής' );

/* modal fields */
$modal_eyebrow = px_footer( 'acf_modal_eyebrow', 'Ραντεβού' );
$modal_title   = px_footer( 'acf_modal_title',   'Η πρώτη γνωριμία' );
$modal_sub     = px_footer( 'acf_modal_sub',     '15 λεπτά κουβέντα, χωρίς χρέωση. Άφησε τα στοιχεία σου και επικοινωνώ σύντομα.' );
$modal_success = px_footer( 'acf_modal_success', 'Ευχαριστώ — θα επικοινωνήσω σύντομα.' );
?>

<!-- FOOTER -->
<footer data-screen-label="Footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <span class="foot-name"><?php echo esc_html( $brand_name ); ?></span>
      <p><?php echo esc_html( $brand_desc ); ?></p>
    </div>
    <div class="footer-col">
      <h4><?php echo esc_html( px_gr_upper( __( 'Πλοήγηση', 'praxis-therapist' ) ) ); ?></h4>
      <ul>
        <li><a href="#services"><?php esc_html_e( 'Υπηρεσίες', 'praxis-therapist' ); ?></a></li>
        <li><a href="#about"><?php esc_html_e( 'Σχετικά', 'praxis-therapist' ); ?></a></li>
        <li><a href="#why"><?php esc_html_e( 'Φιλοσοφία', 'praxis-therapist' ); ?></a></li>
        <li><a href="#faq"><?php esc_html_e( 'Συχνές ερωτήσεις', 'praxis-therapist' ); ?></a></li>
        <li><a href="#contact"><?php esc_html_e( 'Επικοινωνία', 'praxis-therapist' ); ?></a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4><?php echo esc_html( px_gr_upper( __( 'Επικοινωνία', 'praxis-therapist' ) ) ); ?></h4>
      <ul>
        <li><a href="tel:<?php echo esc_attr( $phone ); ?>"><?php echo esc_html( $phone ); ?></a></li>
        <li><a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a></li>
        <li><span><?php echo esc_html( $city ); ?></span></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4><?php echo esc_html( px_gr_upper( __( 'Ωράριο', 'praxis-therapist' ) ) ); ?></h4>
      <ul>
        <li><span><?php echo esc_html( $hours_wd ); ?><br><?php echo esc_html( $hours_wd_t ); ?></span></li>
        <li><span><?php echo esc_html( $hours_we ); ?><br><?php echo esc_html( $hours_we_t ); ?></span></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4><?php echo esc_html( px_gr_upper( __( 'Ακολούθησε', 'praxis-therapist' ) ) ); ?></h4>
      <div class="px-social" role="list" aria-label="<?php esc_attr_e( 'Social media', 'praxis-therapist' ); ?>">
        <a class="px-social__link" href="<?php echo esc_url( $linkedin ?: '#' ); ?>" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <svg class="px-social__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
        </a>
        <a class="px-social__link" href="<?php echo esc_url( $instagram ?: '#' ); ?>" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <svg class="px-social__icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01"/></svg>
        </a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span><?php echo esc_html( $role_label ); ?></span>
    <span><?php echo esc_html( $copyright ); ?></span>
  </div>
</footer>

<!-- CONTACT MODAL -->
<div class="px-modal" id="contact-modal" aria-hidden="true">
  <div class="px-modal__overlay" data-modal-close></div>
  <div class="px-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="px-modal-title">
    <button class="px-modal__close" type="button" aria-label="<?php esc_attr_e( 'Κλείσιμο', 'praxis-therapist' ); ?>" data-modal-close>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <div class="px-modal__body">
      <span class="px-modal__eyebrow"><?php echo esc_html( px_gr_upper( $modal_eyebrow ) ); ?></span>
      <h2 class="px-modal__title" id="px-modal-title"><?php echo esc_html( $modal_title ); ?></h2>
      <p class="px-modal__sub"><?php echo esc_html( $modal_sub ); ?></p>

      <form class="px-modal__form" id="contact-form" novalidate>
        <div class="px-hp" aria-hidden="true">
          <label><?php esc_html_e( 'Μην συμπληρώνεις αυτό το πεδίο', 'praxis-therapist' ); ?>
            <input type="text" name="px_website" tabindex="-1" autocomplete="off">
          </label>
        </div>
        <input type="hidden" name="action" value="px_contact">
        <input type="hidden" name="px_nonce" value="<?php echo esc_attr( wp_create_nonce( 'px_contact' ) ); ?>">

        <div class="px-field">
          <label for="cf-name"><?php echo esc_html( px_gr_upper( __( 'Όνομα *', 'praxis-therapist' ) ) ); ?></label>
          <input type="text" id="cf-name" name="name" autocomplete="name" required aria-describedby="err-name">
          <p class="px-form-error px-field-error" id="err-name" role="alert" hidden><?php esc_html_e( 'Συμπλήρωσε το όνομά σου.', 'praxis-therapist' ); ?></p>
        </div>
        <div class="px-field">
          <label for="cf-phone"><?php echo esc_html( px_gr_upper( __( 'Τηλέφωνο', 'praxis-therapist' ) ) ); ?></label>
          <input type="tel" id="cf-phone" name="phone" autocomplete="tel" aria-describedby="err-phone">
          <p class="px-form-error px-field-error" id="err-phone" role="alert" hidden><?php esc_html_e( 'Εισέραγε έναν έγκυρο αριθμό τηλεφώνου.', 'praxis-therapist' ); ?></p>
        </div>
        <div class="px-field">
          <label for="cf-email"><?php echo esc_html( px_gr_upper( __( 'Email', 'praxis-therapist' ) ) ); ?></label>
          <input type="email" id="cf-email" name="email" autocomplete="email" aria-describedby="err-email">
          <p class="px-form-error px-field-error" id="err-email" role="alert" hidden><?php esc_html_e( 'Εισέραγε ένα έγκυρο email.', 'praxis-therapist' ); ?></p>
        </div>
        <p class="px-field__hint"><?php esc_html_e( 'Συμπλήρωσε τηλέφωνο ή email — τουλάχιστον ένα από τα δύο.', 'praxis-therapist' ); ?></p>
        <div class="px-field">
          <label for="cf-msg"><?php echo esc_html( px_gr_upper( __( 'Μήνυμα', 'praxis-therapist' ) ) ); ?></label>
          <textarea id="cf-msg" name="message" rows="4"></textarea>
        </div>
        <button type="submit" class="px-modal__submit"><?php esc_html_e( 'Αποστολή', 'praxis-therapist' ); ?></button>
        <p class="px-form-error" role="alert" hidden></p>
      </form>

      <div class="px-modal__success" hidden>
        <svg class="px-check" viewBox="0 0 52 52" aria-hidden="true">
          <circle class="px-check__circle" cx="26" cy="26" r="24"/>
          <path class="px-check__mark" d="M14 27l8 8 16-16"/>
        </svg>
        <p><?php echo esc_html( $modal_success ); ?></p>
      </div>
    </div>
  </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
