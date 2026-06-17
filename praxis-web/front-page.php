<?php
/**
 * front-page.php — praxis-web ΑΡΧΙΚΗ (champagne skin)
 *
 * Render order:
 *   1. Block #34 panel + overlay (DOM-first for z-index)
 *   2. Block #01 header  (center logo + #34 burger)
 *   3. Block #02 hero    (video or image, SCF data-* attrs)
 *   4. Block #25 services-cards (SCF repeater)
 *   5. Block #26 statement-list / Manifesto (SCF repeater)
 *   6. Block #32 key-facts / stats (SCF repeater)
 *   7. Block #30 CTA multi (data-open-modal → block #35)
 *   8. Block #04 footer
 *   Block #35 modal is injected by wp_footer via block.php.
 *
 * All copy is SCF-editable. No hardcoded Greek text in production.
 */

get_header();

/* ── Helpers ───────────────────────────────────────────────── */
$f = 'px_web_field'; /* alias → px_web_field(name, fallback, pid) */

/* ╔═══════════════════════════════════════════════════════════╗
 * ║  BLOCK #34 — px-nav-mobile panel                        ║
 * ║  Must appear before the header in DOM order so the       ║
 * ║  overlay z-index (1400) stacks above everything.         ║
 * ╚═══════════════════════════════════════════════════════════╝ */

$nav_items = ( function_exists( 'get_field' ) ? get_field( 'pw_nav_items', 'options' ) : [] ) ?: [];
$header_cta_text = $f( 'pw_header_cta_text', 'Επικοινωνία', 'options' );
?>

<div class="px-mnav" data-side="right">

  <div class="px-mnav__overlay" id="px-mnav-overlay"></div>

  <div class="px-mnav__panel" id="px-mnav-panel" aria-hidden="true"
       role="dialog" aria-modal="true" aria-label="<?php echo esc_attr( px_gr_upper( 'Πλοήγηση' ) ); ?>">
    <div class="px-mnav__inner" id="px-mnav-inner">

      <div class="px-mnav__top">
        <button class="px-mnav__close" id="px-mnav-close" type="button" aria-label="<?php esc_attr_e( 'Κλείσιμο', 'praxis-web' ); ?>">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>
      </div>

      <ul class="px-mnav__list" role="list">
        <?php if ( $nav_items ) :
          foreach ( $nav_items as $item ) : ?>
          <li>
            <a href="<?php echo esc_url( $item['url'] ?? '#' ); ?>">
              <?php echo esc_html( $item['label'] ?? '' ); ?>
            </a>
          </li>
          <?php endforeach;
        else : /* Fallback nav when Options fields not yet seeded */ ?>
          <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Αρχική</a></li>
          <li><a href="<?php echo esc_url( home_url( '/υπηρεσιες' ) ); ?>">Υπηρεσίες</a></li>
          <li><a href="<?php echo esc_url( home_url( '/portfolio' ) ); ?>">Portfolio</a></li>
          <li><a href="<?php echo esc_url( home_url( '/blog' ) ); ?>">Blog</a></li>
        <?php endif; ?>
      </ul>

      <!-- CTA dispatches px:open-modal (block #35 listens; block #34 closes menu first) -->
      <button class="px-mnav__cta" type="button" data-open-modal>
        <?php echo esc_html( px_gr_upper( $header_cta_text ) ); ?>
      </button>

    </div><!-- /.px-mnav__inner -->
  </div><!-- /.px-mnav__panel -->

</div><!-- /.px-mnav -->

<?php
/* ╔═══════════════════════════════════════════════════════════╗
 * ║  BLOCK #01 — px-nav header                              ║
 * ║  Center-logo layout (skin.css grid override).            ║
 * ║  .px-nav-menu and .px-nav-hamburger are hidden by skin.  ║
 * ║  Block #34's burger lives inside .px-nav-inner instead.  ║
 * ╚═══════════════════════════════════════════════════════════╝ */

$logo_raw  = $f( 'pw_logo_text', 'PRAXIS', 'options' );
$logo_mark = mb_substr( $logo_raw, 0, 1, 'UTF-8' );  /* first letter → champagne dot */
$logo_rest = mb_substr( $logo_raw, 1, null, 'UTF-8' ); /* rest → wordmark text */
?>

<header class="px-nav" data-transparent="true" data-logo="<?php echo esc_attr( $logo_raw ); ?>">
  <div class="px-nav-inner">

    <!-- Logo — center cell (grid-column:2 via skin.css) -->
    <a class="px-nav-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>"
       aria-label="<?php echo esc_attr( $logo_raw ); ?> — Αρχική">
      <!-- Mark: the JS from block.js writes the letter; skin.css hides it with font-size:0 -->
      <span class="px-nav-logo-mark" aria-hidden="true"><?php echo esc_html( $logo_mark ); ?></span>
      <span class="px-nav-logo-text"><?php echo esc_html( $logo_rest ); ?></span>
    </a>

    <!-- Block #34 burger — right cell (grid-column:3 via skin.css) -->
    <button class="px-mnav__burger" id="px-mnav-burger" type="button"
            aria-label="<?php esc_attr_e( 'Άνοιγμα μενού', 'praxis-web' ); ?>"
            aria-expanded="false"
            aria-controls="px-mnav-panel">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
        <line x1="3" y1="6"  x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>

  </div>
</header><!-- /.px-nav -->

<?php
/* ╔═══════════════════════════════════════════════════════════╗
 * ║  BLOCK #02 — px-hero-video                              ║
 * ║  block.js builds the entire DOM from data-* attrs.       ║
 * ║  SCF values are output as data-attributes here.          ║
 * ╚═══════════════════════════════════════════════════════════╝ */

$hero_headline = $f( 'pw_hero_headline', 'Χτίζουμε&nbsp;το&nbsp;Digital&nbsp;σας&nbsp;Αύριο' );
$hero_subline  = $f( 'pw_hero_subline',  'Web design, e-commerce και performance marketing που παράγουν αποτελέσματα.' );
$hero_cta1_txt = $f( 'pw_hero_cta1_txt', 'Δείτε το Portfolio' );
$hero_cta1_url = $f( 'pw_hero_cta1_url', home_url( '/portfolio' ) );
$hero_cta2_txt = $f( 'pw_hero_cta2_txt', 'Επικοινωνία' );
$hero_cta2_url = '#contact';  /* always opens the CTA section / modal trigger */
$hero_video    = $f( 'pw_hero_video',  '' );
$hero_poster   = $f( 'pw_hero_poster', '' );
?>

<section class="px-hero-video"
         data-src="<?php echo esc_attr( $hero_video ); ?>"
         data-poster="<?php echo esc_attr( $hero_poster ); ?>"
         data-headline="<?php echo esc_attr( $hero_headline ); ?>"
         data-sub="<?php echo esc_attr( $hero_subline ); ?>"
         data-eyebrow=""
         data-cta-text="<?php echo esc_attr( $hero_cta1_txt ); ?>"
         data-cta-href="<?php echo esc_url( $hero_cta1_url ); ?>"
         data-cta2-text="<?php echo esc_attr( $hero_cta2_txt ); ?>"
         data-cta2-href="<?php echo esc_attr( $hero_cta2_url ); ?>">
</section><!-- /.px-hero-video -->

<?php
/* ╔═══════════════════════════════════════════════════════════╗
 * ║  BLOCK #25 — services-cards (3 κάρτες → υπο-σελίδες)   ║
 * ╚═══════════════════════════════════════════════════════════╝ */

$cards = ( function_exists( 'get_field' ) ? get_field( 'pw_cards' ) : [] ) ?: [];
?>

<section class="pw-section pw-section--cards" id="services" aria-label="Υπηρεσίες">
  <div class="pw-wrap">
    <div class="px-sc-grid" data-cols="3">

      <?php
      if ( $cards ) :
        foreach ( $cards as $i => $card ) :
          /* Stagger delay classes d1, d2 for cards 2 and 3 */
          $delay = $i > 0 ? ' d' . min( $i, 3 ) : '';
          ?>
          <article class="px-sc-card reveal<?php echo esc_attr( $delay ); ?>">

            <?php if ( ! empty( $card['tag'] ) ) : ?>
              <span class="px-sc-tag" aria-hidden="true">
                <?php echo esc_html( px_gr_upper( $card['tag'] ) ); ?>
              </span>
            <?php endif; ?>

            <span class="px-sc-icon" aria-hidden="true">✦</span>

            <h3 class="px-sc-title">
              <?php if ( ! empty( $card['num'] ) ) : ?>
                <span class="px-sc-num"><?php echo esc_html( $card['num'] ); ?> ·</span>
              <?php endif; ?>
              <?php echo esc_html( $card['title'] ?? '' ); ?>
            </h3>

            <?php if ( ! empty( $card['desc'] ) ) : ?>
              <p class="px-sc-text"><?php echo esc_html( $card['desc'] ); ?></p>
            <?php endif; ?>

            <?php if ( ! empty( $card['link'] ) ) : ?>
              <a class="px-sc-link"
                 href="<?php echo esc_url( $card['link'] ); ?>"
                 aria-label="<?php echo esc_attr( sprintf( 'Περισσότερα για %s', $card['title'] ?? '' ) ); ?>">
                Μάθε περισσότερα
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            <?php endif; ?>

          </article>
        <?php endforeach;

      else : /* Fallback: 3 placeholder cards when SCF not yet seeded */
        $placeholders = [
          [ 'tag' => 'WEB DESIGN',    'num' => '01', 'title' => 'Web Design & Development', 'desc' => 'Responsive websites και landing pages που πωλούν.' ],
          [ 'tag' => 'E-COMMERCE',    'num' => '02', 'title' => 'E-Commerce & WooCommerce',  'desc' => 'Ηλεκτρονικά καταστήματα με focus στη μετατροπή.' ],
          [ 'tag' => 'PERFORMANCE',   'num' => '03', 'title' => 'SEO & Performance Marketing','desc' => 'Google, Meta και organic growth που μετριέται.' ],
        ];
        foreach ( $placeholders as $i => $ph ) :
          $delay = $i > 0 ? ' d' . $i : '';
          ?>
          <article class="px-sc-card reveal<?php echo esc_attr( $delay ); ?>">
            <span class="px-sc-tag" aria-hidden="true"><?php echo esc_html( $ph['tag'] ); ?></span>
            <span class="px-sc-icon" aria-hidden="true">✦</span>
            <h3 class="px-sc-title">
              <span class="px-sc-num"><?php echo esc_html( $ph['num'] ); ?> ·</span>
              <?php echo esc_html( $ph['title'] ); ?>
            </h3>
            <p class="px-sc-text"><?php echo esc_html( $ph['desc'] ); ?></p>
          </article>
        <?php endforeach;
      endif; ?>

    </div><!-- /.px-sc-grid -->
  </div><!-- /.pw-wrap -->
</section>

<?php
/* ╔═══════════════════════════════════════════════════════════╗
 * ║  BLOCK #26 — statement-list / Manifesto                 ║
 * ║  motion.js will word-split .px-sl-text on load.          ║
 * ╚═══════════════════════════════════════════════════════════╝ */

$manifesto_eyebrow = $f( 'pw_manifesto_eyebrow', 'Τι πιστεύουμε' );
$manifesto_items   = ( function_exists( 'get_field' ) ? get_field( 'pw_manifesto_items' ) : [] ) ?: [];
?>

<section class="pw-section pw-section--manifesto pw-section--alt" id="manifesto" aria-label="Manifesto">
  <div class="pw-wrap">

    <?php if ( $manifesto_eyebrow ) : ?>
      <p class="pw-eyebrow reveal">
        <?php echo esc_html( px_gr_upper( $manifesto_eyebrow ) ); ?>
      </p>
    <?php endif; ?>

    <div class="px-sl-root" data-variant="light">
      <?php
      if ( $manifesto_items ) :
        foreach ( $manifesto_items as $i => $item ) :
          $delay = $i > 0 ? ' d' . min( $i, 3 ) : '';
          ?>
          <p class="px-sl-item reveal<?php echo esc_attr( $delay ); ?>">
            <span class="px-sl-mark" aria-hidden="true">✦</span>
            <!-- wp_kses_post: allows <strong>,<em>,<br> only — safe for GSAP word-split -->
            <span class="px-sl-text">
              <?php echo wp_kses_post( $item['text'] ?? '' ); ?>
            </span>
          </p>
        <?php endforeach;
      else : /* Fallback statements */
        $stmts = [
          'Δεν πουλάμε packages — αναλύουμε το πρόβλημά σου πρώτα.',
          'Κάθε pixel έχει λόγο. Κάθε copy έχει στόχο.',
          'Οι μετρήσεις δεν είναι εργαλείο — είναι η αλήθεια.',
        ];
        foreach ( $stmts as $i => $stmt ) :
          $delay = $i > 0 ? ' d' . min( $i, 3 ) : '';
          ?>
          <p class="px-sl-item reveal<?php echo esc_attr( $delay ); ?>">
            <span class="px-sl-mark" aria-hidden="true">✦</span>
            <span class="px-sl-text"><?php echo esc_html( $stmt ); ?></span>
          </p>
        <?php endforeach;
      endif; ?>
    </div><!-- /.px-sl-root -->

  </div><!-- /.pw-wrap -->
</section>

<?php
/* ╔═══════════════════════════════════════════════════════════╗
 * ║  BLOCK #32 — px-key-facts / Stats                       ║
 * ║  data-count="on" + data-count-to → block.js count-up.   ║
 * ╚═══════════════════════════════════════════════════════════╝ */

$stats_heading = $f( 'pw_stats_heading', 'Αποτελέσματα σε αριθμούς' );
$stats         = ( function_exists( 'get_field' ) ? get_field( 'pw_stats' ) : [] ) ?: [
  [ 'num' => '180', 'suffix' => '+',   'label' => 'Ολοκληρωμένα Projects' ],
  [ 'num' => '340', 'suffix' => '%',   'label' => 'Αύξηση Organic Traffic' ],
  [ 'num' => '98',  'suffix' => '%',   'label' => 'Ικανοποίηση Πελατών' ],
  [ 'num' => '12',  'suffix' => '+',   'label' => 'Χρόνια Εμπειρίας' ],
];
$stats_cols = count( $stats ) <= 2 ? '2' : ( count( $stats ) === 3 ? '3' : '4' );
?>

<section class="pw-section pw-section--stats" id="stats" aria-label="Stats">
  <div class="pw-wrap">

    <?php if ( $stats_heading ) : ?>
      <h2 class="pw-section-heading reveal">
        <?php echo esc_html( $stats_heading ); ?>
      </h2>
    <?php endif; ?>

    <!-- Block #32: editorial hairline grid, champagne numbers -->
    <div class="px-kf" data-cols="<?php echo esc_attr( $stats_cols ); ?>" data-count="on">
      <div class="px-kf__grid">
        <?php foreach ( $stats as $stat ) :
          $num    = $stat['num']    ?? '0';
          $suffix = $stat['suffix'] ?? '';
          $label  = $stat['label']  ?? '';
          ?>
          <div class="px-kf__item">
            <span class="px-kf__fig" data-count-to="<?php echo esc_attr( $num ); ?>">
              <?php echo esc_html( $num ); ?><?php echo esc_html( $suffix ); ?>
            </span>
            <span class="px-kf__label"><?php echo esc_html( $label ); ?></span>
          </div>
        <?php endforeach; ?>
      </div>
    </div><!-- /.px-kf -->

  </div><!-- /.pw-wrap -->
</section>

<?php
/* ╔═══════════════════════════════════════════════════════════╗
 * ║  BLOCK #30 — px-cta-multi                               ║
 * ║  "solid" button opens contact modal (data-open-modal).   ║
 * ║  Ghost link → telephone.                                 ║
 * ╚═══════════════════════════════════════════════════════════╝ */

$cta_heading = $f( 'pw_cta_heading', 'Ξεκινήστε σήμερα' );
$cta_text    = $f( 'pw_cta_text',    'Μία συζήτηση αρκεί για να δούμε αν ταιριάζουμε.' );
$cta_btn_txt = $f( 'pw_cta_btn_txt', 'Κλείστε Ραντεβού' );
$cta_phone   = $f( 'pw_cta_phone',   '+30 210 123 4567' );
$phone_href  = 'tel:' . preg_replace( '/[^+\d]/', '', $cta_phone );
?>

<section class="pw-section pw-section--cta" id="contact" aria-label="Επικοινωνία">
  <div class="pw-wrap">

    <div class="pw-cta-copy reveal">
      <?php if ( $cta_heading ) : ?>
        <h2><?php echo esc_html( $cta_heading ); ?></h2>
      <?php endif; ?>
      <?php if ( $cta_text ) : ?>
        <p><?php echo esc_html( $cta_text ); ?></p>
      <?php endif; ?>
    </div>

    <!-- Block #30 multi-CTA row -->
    <div class="px-cta-multi reveal d1" data-align="center">
      <div class="px-cta-multi__row">

        <!-- Solid near-black → opens contact modal -->
        <button class="px-cta" data-variant="solid" type="button" data-open-modal>
          <span class="px-cta__label"><?php echo esc_html( px_gr_upper( $cta_btn_txt ) ); ?></span>
          <svg class="px-cta__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Ghost → telephone link -->
        <?php if ( $cta_phone ) : ?>
          <a class="px-cta" data-variant="ghost" href="<?php echo esc_attr( $phone_href ); ?>">
            <span class="px-cta__label">ή καλέστε <?php echo esc_html( $cta_phone ); ?></span>
          </a>
        <?php endif; ?>

      </div>
    </div><!-- /.px-cta-multi -->

  </div><!-- /.pw-wrap -->
</section>

<?php
/* ╔═══════════════════════════════════════════════════════════╗
 * ║  BLOCK #04 — px-footer                                  ║
 * ║  Dark surface override is in skin.css.                   ║
 * ║  Agent: replace static copy with SCF footer fields       ║
 * ║  (or WP nav menus) in Phase 2.                          ║
 * ╚═══════════════════════════════════════════════════════════╝ */
?>

<footer class="px-footer">
  <div class="px-footer-inner">

    <!-- Brand column -->
    <div class="px-footer-brand">
      <a class="px-footer-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Praxis — Αρχική">
        <span class="px-footer-logo-mark" aria-hidden="true"></span>
        <span class="px-footer-logo-text">PRAXIS</span>
      </a>
      <p class="px-footer-tagline">
        Χτίζουμε digital παρουσίες που πωλούν — από web design έως performance marketing.
      </p>
    </div>

    <!-- Nav columns -->
    <nav class="px-footer-nav" aria-label="Υπηρεσίες">
      <h3>Υπηρεσίες</h3>
      <ul role="list">
        <li><a href="<?php echo esc_url( home_url( '/web-design' ) ); ?>">Web Design</a></li>
        <li><a href="<?php echo esc_url( home_url( '/e-commerce' ) ); ?>">E-Commerce</a></li>
        <li><a href="<?php echo esc_url( home_url( '/branding' ) ); ?>">Branding</a></li>
        <li><a href="<?php echo esc_url( home_url( '/seo' ) ); ?>">SEO</a></li>
        <li><a href="<?php echo esc_url( home_url( '/google-ads' ) ); ?>">Google Ads</a></li>
      </ul>
    </nav>

    <nav class="px-footer-nav" aria-label="Εταιρεία">
      <h3>Εταιρεία</h3>
      <ul role="list">
        <li><a href="<?php echo esc_url( home_url( '/about' ) ); ?>">Σχετικά</a></li>
        <li><a href="<?php echo esc_url( home_url( '/portfolio' ) ); ?>">Portfolio</a></li>
        <li><a href="<?php echo esc_url( home_url( '/blog' ) ); ?>">Blog</a></li>
      </ul>
    </nav>

    <!-- Contact column -->
    <div class="px-footer-contact">
      <h3>Επικοινωνία</h3>
      <ul role="list">
        <li>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <a href="<?php echo esc_attr( $phone_href ); ?>"><?php echo esc_html( $cta_phone ); ?></a>
        </li>
        <li>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <a href="mailto:hello@praxisweb.gr">hello@praxisweb.gr</a>
        </li>
      </ul>
    </div>

  </div><!-- /.px-footer-inner -->

  <div class="px-footer-bottom">
    <div class="px-footer-bottom-inner">
      <p class="px-footer-legal">
        &copy; <span class="px-footer-year"></span>
        <span class="px-footer-company">Praxis Studio</span>.
        Όλα τα δικαιώματα διατηρούνται.
      </p>
      <nav class="px-footer-legal-links" aria-label="Νομικά">
        <a href="<?php echo esc_url( home_url( '/privacy' ) ); ?>">Πολιτική Απορρήτου</a>
        <a href="<?php echo esc_url( home_url( '/terms' ) ); ?>">Όροι Χρήσης</a>
        <a href="<?php echo esc_url( home_url( '/cookies' ) ); ?>">Cookies</a>
      </nav>
    </div>
  </div>

</footer><!-- /.px-footer -->

<?php
/* Block #35 modal is injected into wp_footer by block.php */
get_footer();
