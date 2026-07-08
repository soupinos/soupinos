<?php
/**
 * DB-13 · NavEditorial — fixed bar + fullscreen overlay.
 *
 * @package villa-lefki
 */

$wordmark      = px_opt( 'wordmark', 'ΒΙΛΑ ΛΕΥΚΗ' );
$locality_nav  = px_opt( 'locality_nav', 'ΛΕΥΚΙΜΜΗ · ΚΕΡΚΥΡΑ' );
$locality_full = px_opt( 'locality_full', 'ΛΕΥΚΙΜΜΗ · ΝΟΤΙΑ ΚΕΡΚΥΡΑ' );
$menu_label    = px_opt( 'menu_label', 'ΜΕΝΟΥ' );
$close_label   = px_opt( 'close_label', 'ΚΛΕΙΣΕ' );
$booking_label = px_opt( 'booking_label', 'ΚΡΑΤΗΣΗ' );
$booking_tgt   = px_opt( 'booking_target', '#krathsh' );
$contact_email = px_opt( 'contact_email', 'stay@lefki-corfu.example' );

$nav_items = px_opt( 'nav_items', array() );
$languages = px_opt( 'languages', array() );

// The default (active) language drives the compact trigger label.
$active_code  = 'EL';
foreach ( (array) $languages as $lang ) {
	if ( ! empty( $lang['is_default'] ) ) {
		$active_code = $lang['label'];
		break;
	}
}
if ( 'EL' === $active_code && ! empty( $languages[0]['label'] ) ) {
	$active_code = $languages[0]['label'];
}
?>
<header class="db-nav-editorial" data-spacing="s">
  <div class="db-nav-editorial__bar">
    <span class="db-nav-editorial__hairline db-nav-editorial__hairline--l" aria-hidden="true"></span>
    <span class="db-nav-editorial__hairline db-nav-editorial__hairline--r" aria-hidden="true"></span>

    <div class="db-nav-editorial__left">
      <button type="button" class="db-nav-editorial__trigger" data-fx-init="fx-13" data-fx-modal="#nav-menu" aria-haspopup="true">
        <span class="db-nav-editorial__burger" aria-hidden="true"><span></span><span></span></span>
        <span><?php echo esc_html( $menu_label ); ?></span>
      </button>
    </div>

    <a href="#top" class="db-nav-editorial__word">
      <span class="db-nav-editorial__word-a"><?php echo esc_html( $wordmark ); ?></span>
      <span class="db-nav-editorial__word-b"><?php echo esc_html( $locality_nav ); ?></span>
    </a>

    <div class="db-nav-editorial__right">
      <a href="<?php echo esc_attr( $booking_tgt ); ?>" class="db-nav-editorial__contact"><?php echo esc_html( $booking_label ); ?></a>
      <div class="db-nav-editorial__langpick">
        <button type="button" class="db-nav-editorial__langtrigger" data-langtrigger aria-haspopup="true" aria-expanded="false">
          <span data-langcurrent><?php echo esc_html( $active_code ); ?></span> <span aria-hidden="true">·</span>
        </button>
        <ul class="db-nav-editorial__langmenu" data-langmenu hidden>
          <?php foreach ( (array) $languages as $i => $lang ) : ?>
            <?php $is_active = ! empty( $lang['is_default'] ) || ( 0 === $i && ! villa_has_default_lang( $languages ) ); ?>
            <li><button type="button"<?php echo $is_active ? ' class="is-active"' : ''; ?> data-lang="<?php echo esc_attr( $lang['code'] ); ?>"><?php echo esc_html( $lang['label'] ); ?></button></li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
  </div>
</header>

<div id="nav-menu" class="db-nav-editorial__overlay" aria-hidden="true">
  <div class="db-nav-editorial__overlay-media" aria-hidden="true"></div>
  <div class="db-nav-editorial__overlay-inner">
    <div class="db-nav-editorial__overlay-top">
      <span class="db-nav-editorial__overlay-word"><?php echo esc_html( $wordmark ); ?></span>
      <button type="button" class="db-nav-editorial__close" data-fx-close>
        <span><?php echo esc_html( $close_label ); ?></span> <span aria-hidden="true">✕</span>
      </button>
    </div>

    <nav class="db-nav-editorial__list" aria-label="Κύριο μενού">
      <?php foreach ( (array) $nav_items as $item ) : ?>
        <a class="db-nav-editorial__item" href="<?php echo esc_attr( $item['target'] ); ?>" data-fx-target="navitem" data-fx-navlink><span class="db-nav-editorial__num"><?php echo esc_html( $item['number'] ); ?></span><?php echo esc_html( $item['label'] ); ?></a>
      <?php endforeach; ?>
    </nav>

    <div class="db-nav-editorial__overlay-bottom" data-fx-target="navitem">
      <div class="db-nav-editorial__overlay-langs" aria-label="Γλώσσα">
        <?php foreach ( (array) $languages as $i => $lang ) : ?>
          <?php $is_active = ! empty( $lang['is_default'] ) || ( 0 === $i && ! villa_has_default_lang( $languages ) ); ?>
          <button type="button"<?php echo $is_active ? ' class="is-active"' : ''; ?> data-lang="<?php echo esc_attr( $lang['code'] ); ?>"><?php echo esc_html( $lang['label'] ); ?></button>
        <?php endforeach; ?>
      </div>
      <a class="db-nav-editorial__overlay-contact" href="mailto:<?php echo esc_attr( $contact_email ); ?>"><?php echo esc_html( $contact_email ); ?></a>
    </div>
  </div>
</div>
