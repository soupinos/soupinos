<?php
/**
 * DB-12 · Footer Editorial — the "back cover".
 *
 * Wordmark, locality, socials, the pages list and contact details come from
 * the site-wide options (shared with the nav); epigraph, summary, headings
 * and the legal line are footer-section fields.
 *
 * @package villa-lefki
 */

$wordmark      = px_opt( 'wordmark', 'ΒΙΛΑ ΛΕΥΚΗ' );
$locality_full = px_opt( 'locality_full', 'ΛΕΥΚΙΜΜΗ · ΝΟΤΙΑ ΚΕΡΚΥΡΑ' );
$contact_email = px_opt( 'contact_email', 'stay@lefki-corfu.example' );
$phone         = px_opt( 'phone', '' );
$phone_tel     = px_opt( 'phone_tel', '' );
$address       = px_opt( 'address', '' );
$socials       = px_opt( 'socials', array() );
$nav_items     = px_opt( 'nav_items', array() );

$epigraph      = px_field( 'footer_epigraph', '' );
$summary       = px_field( 'footer_summary', '' );
$pages_heading = px_field( 'footer_pages_heading', 'ΣΕΛΙΔΕΣ' );
$contact_head  = px_field( 'footer_contact_heading', 'ΕΠΙΚΟΙΝΩΝΙΑ' );
$copyright     = px_field( 'footer_copyright', '' );
$legal         = px_field( 'footer_legal', '' );
?>
<footer class="db-footer-editorial" data-spacing="s" data-fx-init="fx-01" data-screen-label="Footer">
  <div class="db-footer-editorial__cover" data-fx-target="reveal">
    <p class="db-footer-editorial__wordmark"><?php echo esc_html( $wordmark ); ?><span><?php echo esc_html( $locality_full ); ?></span></p>
    <hr class="db-footer-editorial__rule">

    <div class="db-footer-editorial__body">
      <div class="db-footer-editorial__major">
        <p class="db-footer-editorial__epigraph"><?php echo esc_html( $epigraph ); ?></p>
        <p class="db-footer-editorial__summary"><?php echo esc_html( $summary ); ?></p>
        <div class="db-footer-editorial__social">
          <?php foreach ( (array) $socials as $social ) : ?>
            <?php
            $network = $social['network'] ?? '';
            $url     = $social['url'] ?? '#';
            $svg     = villa_social_icon_svg( $network );
            if ( ! $svg ) {
                continue;
            }
            ?>
            <a href="<?php echo esc_url( $url ); ?>" aria-label="<?php echo esc_attr( ucfirst( $network ) ); ?>">
              <?php echo $svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- fixed SVG from code-owned registry. ?>
            </a>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="db-footer-editorial__minor">
        <div>
          <h4><?php echo esc_html( $pages_heading ); ?></h4>
          <ul>
            <?php foreach ( (array) $nav_items as $item ) : ?>
              <li><a href="<?php echo esc_attr( $item['target'] ?? '#' ); ?>"><?php echo esc_html( $item['label'] ?? '' ); ?></a></li>
            <?php endforeach; ?>
          </ul>
        </div>
        <div>
          <h4><?php echo esc_html( $contact_head ); ?></h4>
          <ul>
            <?php if ( $address ) : ?><li><?php echo esc_html( $address ); ?></li><?php endif; ?>
            <?php if ( $contact_email ) : ?><li><a href="mailto:<?php echo esc_attr( $contact_email ); ?>"><?php echo esc_html( $contact_email ); ?></a></li><?php endif; ?>
            <?php if ( $phone ) : ?><li><a href="tel:<?php echo esc_attr( $phone_tel ? $phone_tel : $phone ); ?>"><?php echo esc_html( $phone ); ?></a></li><?php endif; ?>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="db-footer-editorial__bottom">
    <span><?php echo esc_html( $copyright ); ?></span>
    <span><?php echo esc_html( $legal ); ?></span>
  </div>
</footer>
