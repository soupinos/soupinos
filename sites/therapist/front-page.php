<?php
/**
 * Praxis Therapist — front-page.php v3
 * Fully ACF-driven. ΜΗΔΕΝ hardcoded content.
 */

get_header();

$has_acf = function_exists( 'get_field' );

/* ── field values ── */
$phone = px_f( 'acf_global_phone', '[ΤΗΛΕΦΩΝΟ]' );
$email = px_f( 'acf_global_email', '[EMAIL]' );
$city  = px_f( 'acf_global_city',  '[ΠΟΛΗ]' );
?>

<!-- HERO -->
<section id="hero" data-screen-label="Hero">
  <div class="hero-media" data-mask="hero" aria-hidden="true">
    <?php
    $hero_img = $has_acf ? get_field( 'acf_hero_image' ) : null;
    $hero_bg  = ( ! empty( $hero_img['url'] ) )
      ? 'background-image:url(' . esc_url( $hero_img['url'] ) . ')'
      : "background-image:url('https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1500&q=80')";
    ?>
    <div class="hero-media__img" data-parallax="hero" style="<?php echo esc_attr( $hero_bg ); ?>"></div>
  </div>
  <div class="hero-accent" aria-hidden="true">
    <svg viewBox="0 0 240 380" fill="none" aria-hidden="true">
      <path class="ha-stem" d="M128 384 C110 334 150 302 132 260 C116 224 152 192 134 152 C120 118 150 88 132 52 C122 32 132 14 138 -8"></path>
      <path class="ha-leaf" d="M0 0 C11 -11 28 -9 37 5 C26 13 9 13 0 0 Z" transform="translate(132 258) rotate(26)"></path>
      <path class="ha-leaf" d="M0 0 C-11 -11 -28 -9 -37 5 C-26 13 -9 13 0 0 Z" transform="translate(124 206) rotate(-20)"></path>
      <path class="ha-leaf" d="M0 0 C11 -11 28 -9 37 5 C26 13 9 13 0 0 Z" transform="translate(140 150) rotate(32)"></path>
      <path class="ha-leaf" d="M0 0 C-11 -11 -28 -9 -37 5 C-26 13 -9 13 0 0 Z" transform="translate(128 96) rotate(-26)"></path>
      <path class="ha-leaf" d="M0 0 C11 -11 28 -9 37 5 C26 13 9 13 0 0 Z" transform="translate(135 44) rotate(30)"></path>
    </svg>
  </div>
  <div class="hero-inner">
    <div class="hero-content">
      <p class="hero-eyebrow" data-anim="fade">
        <?php echo esc_html( px_gr_upper( px_f( 'acf_hero_eyebrow', 'Δημήτρης Κουκούλης — Ψυχολόγος | Ψυχοθεραπευτής' ) ) ); ?>
      </p>
      <h1 class="hero-headline">
        <span class="hl-line hl-line--1" data-split="words">
          <?php echo esc_html( px_f( 'acf_hero_hl1', '«Δεν θα σου πω ότι όλα θα πάνε καλά.' ) ); ?>
        </span>
        <span class="hl-line hl-line--2" data-split="words">
          <?php echo esc_html( px_f( 'acf_hero_hl2', 'Θα σου πω: κάτσε να δούμε γιατί δεν πάνε.»' ) ); ?>
        </span>
      </h1>
      <p class="hero-sub" data-anim="fade">
        <?php
        if ( $has_acf && have_rows( 'acf_hero_sub_lines' ) ) {
          $lines = [];
          while ( have_rows( 'acf_hero_sub_lines' ) ) {
            the_row();
            $lines[] = esc_html( get_sub_field( 'line' ) );
          }
          echo implode( '<br>' . "\n        ", $lines );
        } else {
          echo "Ψυχοθεραπεία χωρίς εύκολες υποσχέσεις.<br>\n        Χωρίς life coaching.<br>\n        Χωρίς έτοιμες συνταγές.<br>\n        Χωρίς συνθήματα αυτοβελτίωσης.";
        }
        ?>
      </p>
      <a href="#" class="btn-primary" data-anim="fade" data-open-modal>
        <?php echo esc_html( px_f( 'acf_hero_cta_text', 'Κλείσε ένα ραντεβού — χωρίς δέσμευση' ) ); ?>
      </a>
    </div>
  </div>
</section>

<!-- STATEMENT -->
<section id="statement" data-screen-label="Statement">
  <div class="statement-inner">
    <span class="statement-quote" aria-hidden="true">"</span>
    <p class="statement-kicker kicker kicker--plain" data-anim="fade">
      <?php echo esc_html( px_gr_upper( px_f( 'acf_stmt_kicker', 'Η προσέγγιση' ) ) ); ?>
    </p>
    <p class="statement-reveal" data-split="words-blur">
      <?php echo esc_html( px_f( 'acf_stmt_text', 'Δεν είμαι εδώ για να σε διορθώσω. Δεν είμαι εδώ για να σου μάθω πώς να γίνεις μια καλύτερη εκδοχή του εαυτού σου. Είμαι εδώ για να ακούσω την ιστορία σου, να καταλάβουμε μαζί τι σε δυσκολεύει και να δώσουμε χώρο σε όσα μέχρι τώρα έμεναν χωρίς λόγια.' ) ); ?>
    </p>
    <span class="statement-rule" data-anim="fade"></span>
  </div>
  <div class="botanica botanica--statement" data-float="1" aria-hidden="true">
    <svg viewBox="0 0 80 120"><path d="M40 118 C36 92 44 74 38 52 C33 33 43 18 40 2"></path><path class="bo-leaf" d="M0 0 C9 -8 22 -6 29 4 C20 11 6 10 0 0Z" transform="translate(39 52) rotate(22)"></path><path class="bo-leaf" d="M0 0 C-9 -8 -22 -6 -29 4 C-20 11 -6 10 0 0Z" transform="translate(37 78) rotate(-18)"></path><path class="bo-leaf" d="M0 0 C9 -8 22 -6 29 4 C20 11 6 10 0 0Z" transform="translate(40 26) rotate(28)"></path></svg>
  </div>
</section>

<!-- ABOUT -->
<section id="about" data-screen-label="About">
  <div class="botanica botanica--about" data-float="2" aria-hidden="true">
    <svg viewBox="0 0 80 110"><path d="M40 108 C44 84 34 66 41 44 C46 27 37 14 40 2"></path><path class="bo-leaf" d="M0 0 C-9 -8 -22 -6 -29 4 C-20 11 -6 10 0 0Z" transform="translate(40 46) rotate(-22)"></path><path class="bo-leaf" d="M0 0 C9 -8 22 -6 29 4 C20 11 6 10 0 0Z" transform="translate(41 72) rotate(20)"></path></svg>
  </div>
  <div class="about-grid">
    <div class="about-media">
      <span class="about-ring" data-spin aria-hidden="true"></span>
      <span class="about-plus" aria-hidden="true"></span>
      <div class="about-photo about-photo--main">
        <?php
        $ap_main = $has_acf ? get_field( 'acf_about_photo_main' ) : null;
        if ( ! empty( $ap_main['url'] ) ) {
          echo '<img data-parallax="about-a" src="' . esc_url( $ap_main['url'] ) . '" alt="' . esc_attr( $ap_main['alt'] ) . '">';
        } else {
          echo '<img data-parallax="about-a" src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80" alt="">';
        }
        ?>
      </div>
      <div class="about-photo about-photo--accent">
        <?php
        $ap_acc = $has_acf ? get_field( 'acf_about_photo_acc' ) : null;
        if ( ! empty( $ap_acc['url'] ) ) {
          echo '<img data-parallax="about-b" src="' . esc_url( $ap_acc['url'] ) . '" alt="' . esc_attr( $ap_acc['alt'] ) . '">';
        } else {
          echo '<img data-parallax="about-b" src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80" alt="">';
        }
        ?>
      </div>
    </div>
    <div class="about-text">
      <span class="about-kicker kicker" data-anim="fade">
        <?php echo esc_html( px_gr_upper( px_f( 'acf_about_kicker', 'Σχετικά' ) ) ); ?>
      </span>
      <h2 data-anim="fade"><?php echo esc_html( px_f( 'acf_about_title', 'Με λένε Δημήτρη Κουκούλη και είμαι ψυχολόγος – ψυχοθεραπευτής.' ) ); ?></h2>
      <p class="about-lead" data-anim="fade">
        <?php echo esc_html( px_f( 'acf_about_lead', 'Δεν πιστεύω ότι η ψυχοθεραπεία είναι προϊόν.' ) ); ?>
      </p>
      <div class="about-body">
        <?php
        $body_default = '<p>Ξέρω τι ίσως σκέφτεσαι: «Άλλος ένας ψυχολόγος». Το σκέφτομαι κι εγώ — κάθε φορά που βλέπω την ψυχοθεραπεία να παρουσιάζεται σαν συνδρομή γυμναστηρίου. Πακέτα. Προσφορές. Εγγυημένα αποτελέσματα. Εύκολες υποσχέσεις.</p><p>Δεν είμαι εδώ για να σε διορθώσω. Είμαι εδώ για να σε ακούσω. Πραγματικά.</p>';
        echo wp_kses_post( px_f( 'acf_about_body', $body_default ) );
        ?>
      </div>
      <div class="about-sign" data-anim="fade">
        <span class="about-signature"><?php echo esc_html( px_f( 'acf_about_signature', 'Δημήτρης Κουκούλης' ) ); ?></span>
        <span class="about-credential"><?php echo esc_html( px_gr_upper( px_f( 'acf_about_credential', 'Ψυχολόγος – Ψυχοθεραπευτής' ) ) ); ?></span>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section id="services" data-screen-label="Services">
  <div class="botanica botanica--services" data-parallax-deco="0.4" aria-hidden="true">
    <svg viewBox="0 0 240 280"><path d="M120 278 C108 220 150 188 126 132 C108 90 150 54 124 6"></path><path class="bo-leaf" d="M0 0 C16 -14 40 -11 53 7 C36 20 11 18 0 0Z" transform="translate(128 130) rotate(24)"></path><path class="bo-leaf" d="M0 0 C-16 -14 -40 -11 -53 7 C-36 20 -11 18 0 0Z" transform="translate(120 188) rotate(-20)"></path><path class="bo-leaf" d="M0 0 C16 -14 40 -11 53 7 C36 20 11 18 0 0Z" transform="translate(126 70) rotate(30)"></path></svg>
  </div>
  <div class="botanica botanica--services-2" data-parallax-deco="0.25" aria-hidden="true">
    <svg viewBox="0 0 220 240"><path d="M100 238 C112 188 78 156 102 108 C120 72 86 40 110 4"></path><path class="bo-leaf" d="M0 0 C-14 -12 -36 -10 -48 6 C-32 18 -10 16 0 0Z" transform="translate(102 106) rotate(-22)"></path><path class="bo-leaf" d="M0 0 C14 -12 36 -10 48 6 C32 18 10 16 0 0Z" transform="translate(106 162) rotate(20)"></path></svg>
  </div>
  <div class="section-wrap">
    <div class="services-head">
      <span class="kicker" data-anim="fade"><?php echo esc_html( px_gr_upper( px_f( 'acf_svc_kicker', 'Υπηρεσίες' ) ) ); ?></span>
      <h2 class="sec-title" data-anim="fade"><?php echo esc_html( px_f( 'acf_svc_title', 'Τομείς εξειδίκευσης.' ) ); ?></h2>
      <p class="sec-sub" data-anim="fade"><?php echo esc_html( px_f( 'acf_svc_sub', 'Ψυχοθεραπεία ενηλίκων — ατομική, πρόσωπο με πρόσωπο ή εξ αποστάσεως.' ) ); ?></p>
    </div>
    <div class="services-grid">
      <?php
      $svc_icons = [
        '<path d="M2 13h4l2-6 3.5 11L15 8l2 5h5"/>',
        '<path d="M3 18h18"/><path d="M5 18a7 7 0 0 1 14 0"/><path d="M12 4v2.5"/><path d="M19.5 7.5l-1.6 1.6"/><path d="M4.5 7.5l1.6 1.6"/>',
        '<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>',
      ];
      $svc_default_imgs = [
        'https://images.unsplash.com/photo-1486946255434-2466348c2166?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=900&q=80',
      ];
      $svc_defaults = [
        [ 'num' => '1', 'title' => 'Ψυχοθεραπεία', 'desc' => 'Χωρίς φάρμακα. Χωρίς συνταγές. Μόνο κουβέντα που σε πάει πιο κάτω.' ],
        [ 'num' => '2', 'title' => 'Σκοπός ζωής', 'desc' => 'Δεν είναι φιλοσοφία. Είναι η πιο πρακτική ερώτηση: «γιατί ξυπνάω το πρωί;»' ],
        [ 'num' => '3', 'title' => 'Έφηβοι & μεταέφηβοι', 'desc' => 'Η μεγαλύτερη πίεση σήμερα: να είσαι τέλειος. Αμέσως. Εδώ δεν υπάρχει «πρέπει».' ],
      ];

      if ( $has_acf && have_rows( 'acf_svc_cards' ) ) {
        $i = 0;
        while ( have_rows( 'acf_svc_cards' ) ) {
          the_row();
          $num   = get_sub_field( 'num' );
          $title = get_sub_field( 'title' );
          $desc  = get_sub_field( 'desc' );
          $img   = get_sub_field( 'image' );
          $icon  = $svc_icons[ $i % count( $svc_icons ) ];
          $img_src = ( is_array( $img ) && ! empty( $img['url'] ) )
            ? esc_url( $img['url'] )
            : esc_url( $svc_default_imgs[ $i % count( $svc_default_imgs ) ] );
          $img_alt = ( is_array( $img ) && ! empty( $img['alt'] ) ) ? esc_attr( $img['alt'] ) : '';
          ?>
          <article class="svc-card" data-anim="card">
            <div class="svc-media">
              <img src="<?php echo $img_src; ?>" alt="<?php echo $img_alt; ?>">
              <span class="svc-badge"><svg viewBox="0 0 24 24"><?php echo $icon; ?></svg></span>
            </div>
            <div class="svc-body">
              <h3 class="svc-title"><?php echo esc_html( $num ); ?> · <?php echo esc_html( $title ); ?></h3>
              <p class="svc-desc"><?php echo esc_html( $desc ); ?></p>
            </div>
          </article>
          <?php
          $i++;
        }
      } else {
        foreach ( $svc_defaults as $i => $svc ) {
          $icon = $svc_icons[ $i % count( $svc_icons ) ];
          ?>
          <article class="svc-card" data-anim="card">
            <div class="svc-media">
              <img src="<?php echo esc_url( $svc_default_imgs[ $i ] ); ?>" alt="">
              <span class="svc-badge"><svg viewBox="0 0 24 24"><?php echo $icon; ?></svg></span>
            </div>
            <div class="svc-body">
              <h3 class="svc-title"><?php echo esc_html( $svc['num'] ); ?> · <?php echo esc_html( $svc['title'] ); ?></h3>
              <p class="svc-desc"><?php echo esc_html( $svc['desc'] ); ?></p>
            </div>
          </article>
          <?php
        }
      }
      ?>
    </div>
  </div>
</section>

<!-- PHILOSOPHY (WHY) -->
<section id="why" data-screen-label="Why me">
  <div class="why-inner">
    <div class="why-grid">
      <div class="why-head">
        <span class="kicker" data-anim="fade"><?php echo esc_html( px_gr_upper( px_f( 'acf_philo_kicker', 'Φιλοσοφία' ) ) ); ?></span>
        <h2 class="sec-title" data-anim="fade"><?php echo esc_html( px_f( 'acf_philo_title', 'Η φιλοσοφία μου.' ) ); ?></h2>
        <p class="why-intro" data-anim="fade">
          <?php echo esc_html( px_f( 'acf_philo_intro', 'Η θεραπεία δεν είναι ένας δρόμος που περπατάς μόνος σου. Είναι μια συνεργασία όπου χτίζουμε μαζί τη διαδρομή από την αρχή.' ) ); ?>
        </p>
      </div>
      <div class="why-manifesto">
        <span class="why-line" data-drawline aria-hidden="true"></span>
        <div class="botanica botanica--philo" aria-hidden="true">
          <svg viewBox="0 0 80 460" preserveAspectRatio="xMidYMid meet">
            <path class="bo-grow" d="M40 458 C30 392 52 348 38 286 C26 232 52 184 36 122 C26 80 46 44 40 4" pathLength="1"></path>
            <path class="bo-leaf bo-bloom" d="M0 0 C10 -9 26 -7 34 5 C23 13 7 12 0 0Z" transform="translate(40 300) rotate(24)"></path>
            <path class="bo-leaf bo-bloom" d="M0 0 C-10 -9 -26 -7 -34 5 C-23 13 -7 12 0 0Z" transform="translate(36 220) rotate(-20)"></path>
            <path class="bo-leaf bo-bloom" d="M0 0 C10 -9 26 -7 34 5 C23 13 7 12 0 0Z" transform="translate(42 140) rotate(28)"></path>
            <path class="bo-leaf bo-bloom" d="M0 0 C-10 -9 -26 -7 -34 5 C-23 13 -7 12 0 0Z" transform="translate(38 64) rotate(-24)"></path>
          </svg>
        </div>
        <ul class="why-list">
          <?php
          $philo_defaults = [
            'Δεν θα σε πω «πελάτη» — είσαι άνθρωπος.',
            'Δεν θα στείλεις ραντεβού σε γραμματεία — απαντάω εγώ.',
            'Δεν θα σου πουλήσω πακέτο — η ψυχή δεν είναι συνδρομή.',
            'Δεν θα προσποιηθώ ότι τα ξέρω όλα. Αλλά ξέρω να ακούω.',
          ];

          if ( $has_acf && have_rows( 'acf_philo_items' ) ) {
            while ( have_rows( 'acf_philo_items' ) ) {
              the_row();
              $text = get_sub_field( 'text' );
              echo '<li data-anim="manifesto"><span class="why-dot" aria-hidden="true"></span>' . esc_html( $text ) . '</li>';
            }
          } else {
            foreach ( $philo_defaults as $item ) {
              echo '<li data-anim="manifesto"><span class="why-dot" aria-hidden="true"></span>' . esc_html( $item ) . '</li>';
            }
          }
          ?>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" data-screen-label="FAQ">
  <div class="section-wrap">
    <div class="faq-head">
      <span class="kicker" data-anim="fade"><?php echo esc_html( px_gr_upper( px_f( 'acf_faq_kicker', 'Συχνές ερωτήσεις' ) ) ); ?></span>
      <h2 class="sec-title" data-anim="fade"><?php echo esc_html( px_f( 'acf_faq_title', 'Ό,τι ίσως αναρωτιέσαι.' ) ); ?></h2>
    </div>
    <div class="px-faq" data-anim="fade" data-block="px-faq" aria-label="<?php esc_attr_e( 'Συχνές ερωτήσεις', 'praxis-therapist' ); ?>">
      <div class="px-faq__inner">
        <ul class="px-faq__list" role="list">
          <?php
          $faq_defaults = [
            [ 'q' => 'Πόσο διαρκεί μια συνεδρία;', 'a' => '<p>Κάθε συνεδρία διαρκεί περίπου 50 λεπτά. Δεν είναι τυχαίος αριθμός — είναι αρκετός χρόνος για να ανοίξεις κάτι ουσιαστικό, αλλά όχι τόσος που να σε εξαντλήσει συναισθηματικά. Η ψυχή χρειάζεται χρόνο για να μιλήσει, αλλά χρειάζεται και όρια για να νιώσει ασφάλεια. Σε αυτά τα 50 λεπτά δεν τρέχουμε να «λύσουμε» κάτι. Καθόμαστε, ακούμε, καταλαβαίνουμε. Κάποιες φορές θα φύγεις με μια απάντηση. Άλλες φορές θα φύγεις με μια καλύτερη ερώτηση — κι αυτό συχνά αξίζει περισσότερο. Η συχνότητα των συνεδριών την αποφασίζουμε μαζί, ανάλογα με το τι χρειάζεσαι εσύ, όχι με κάποιο τυποποιημένο πρόγραμμα.</p>' ],
            [ 'q' => 'Γίνονται online συνεδρίες;',  'a' => '<p>Ναι. Οι online συνεδρίες γίνονται μέσω ασφαλούς βιντεοκλήσης, με την ίδια προσοχή και εμπιστευτικότητα όπως δια ζώσης. Καταλαβαίνω ότι κάποιοι διστάζουν — «θα είναι το ίδιο μέσα από οθόνη;». Η εμπειρία δείχνει πως ναι: αυτό που μετράει είναι η σχέση, όχι ο χώρος. Η online επιλογή υπάρχει γιατί η ζωή δεν σταματάει — ταξίδια, φόρτος, απόσταση, μέρες που απλώς δεν αντέχεις να βγεις από το σπίτι. Δεν θέλω η απόσταση να γίνει δικαιολογία για να μη φροντίσεις τον εαυτό σου. Το μόνο που χρειάζεσαι είναι ένας ήσυχος χώρος, σύνδεση στο ίντερνετ, και η διάθεση να μιλήσεις ειλικρινά.</p>' ],
            [ 'q' => 'Πόσο κοστίζει;',              'a' => '<p>Το κόστος κάθε συνεδρίας είναι [ΤΙΜΗ]. Προτιμώ να μιλάμε ανοιχτά για τα χρήματα από την αρχή — η διαφάνεια είναι κομμάτι της εμπιστοσύνης. Δεν θα βρεις εδώ «πακέτα», «προσφορές» ή εκπτώσεις για πολλές συνεδρίες, γιατί η ψυχοθεραπεία δεν είναι συνδρομή γυμναστηρίου. Πληρώνεις για τον χρόνο και την προσοχή μιας συνάντησης, όχι για ένα προϊόν με «εγγυημένο αποτέλεσμα». Αν η οικονομική κατάσταση είναι δύσκολη, μίλησέ μου — υπάρχουν περιπτώσεις όπου μπορούμε να βρούμε μια λύση.</p>' ],
            [ 'q' => 'Χρειάζεται παραπεμπτικό;',   'a' => '<p>Όχι, δεν χρειάζεσαι παραπεμπτικό από γιατρό ή οποιονδήποτε άλλον για να κλείσεις ραντεβού. Μπορείς να επικοινωνήσεις απευθείας, μόνος σου, όποτε νιώσεις ότι θέλεις να μιλήσεις με κάποιον. Η ψυχοθεραπεία δεν είναι ιατρική πράξη που απαιτεί συνταγή — είναι μια προσωπική απόφαση να φροντίσεις τον εαυτό σου. Δεν χρειάζεται να έχεις κάποια «διάγνωση» ή να περνάς κρίση για να έρθεις. Πολλοί άνθρωποι ξεκινούν θεραπεία απλώς επειδή νιώθουν ότι κάτι δεν πάει καλά, χωρίς να μπορούν να το ονομάσουν. Αυτό αρκεί.</p>' ],
            [ 'q' => 'Τι γίνεται στην πρώτη συνεδρία;', 'a' => '<p>Η πρώτη φορά είναι απλώς μια γνωριμία. Δεν χρειάζεται να έχεις ετοιμάσει τι θα πεις, ούτε να «αποδείξεις» ότι το πρόβλημά σου είναι αρκετά σοβαρό. Καθόμαστε, μιλάμε, και βλέπουμε αν νιώθεις άνετα μαζί μου — γιατί η θεραπεία δεν δουλεύει χωρίς εμπιστοσύνη, κι αυτή δεν επιβάλλεται, χτίζεται. Θα σε ρωτήσω κάποια πράγματα, αλλά μόνο όσα είσαι έτοιμος να μοιραστείς. Αν στο τέλος νιώσεις ότι ταιριάζουμε, συνεχίζουμε. Αν όχι, κανένα πρόβλημα — θα σε βοηθήσω να βρεις κάποιον πιο κατάλληλο. Τα πρώτα 15 λεπτά αυτής της γνωριμίας είναι δωρεάν.</p>' ],
          ];

          if ( $has_acf && have_rows( 'acf_faq_items' ) ) {
            while ( have_rows( 'acf_faq_items' ) ) {
              the_row();
              $q = get_sub_field( 'question' );
              $a = get_sub_field( 'answer' );
              ?>
              <li class="px-faq__item" data-question="<?php echo esc_attr( $q ); ?>">
                <?php echo wp_kses_post( $a ); ?>
              </li>
              <?php
            }
          } else {
            foreach ( $faq_defaults as $item ) {
              ?>
              <li class="px-faq__item" data-question="<?php echo esc_attr( $item['q'] ); ?>">
                <?php echo wp_kses_post( $item['a'] ); ?>
              </li>
              <?php
            }
          }
          ?>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section id="cta-banner" data-screen-label="CTA">
  <?php
  $cta_img = $has_acf ? get_field( 'acf_cta_image' ) : null;
  $cta_bg  = ( ! empty( $cta_img['url'] ) )
    ? esc_url( $cta_img['url'] )
    : 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80';
  ?>
  <div class="cta-bg" data-parallax="cta" aria-hidden="true" style="background-image:url('<?php echo esc_url( $cta_bg ); ?>')"></div>
  <div class="botanica botanica--cta" data-rotate-deco="1" aria-hidden="true">
    <svg viewBox="0 0 130 150"><path d="M65 148 C58 116 80 96 66 64 C55 42 78 24 64 2"></path><path class="bo-leaf" d="M0 0 C12 -10 30 -8 40 5 C27 14 8 13 0 0Z" transform="translate(66 62) rotate(24)"></path><path class="bo-leaf" d="M0 0 C-12 -10 -30 -8 -40 5 C-27 14 -8 13 0 0Z" transform="translate(62 100) rotate(-20)"></path></svg>
  </div>
  <div class="botanica botanica--cta-2" data-rotate-deco="-1" aria-hidden="true">
    <svg viewBox="0 0 104 130"><path d="M52 128 C46 100 66 82 53 54 C44 36 64 20 52 2"></path><path class="bo-leaf" d="M0 0 C-10 -9 -26 -7 -34 4 C-23 12 -7 11 0 0Z" transform="translate(53 52) rotate(-22)"></path><path class="bo-leaf" d="M0 0 C10 -9 26 -7 34 4 C23 12 7 11 0 0Z" transform="translate(55 88) rotate(20)"></path></svg>
  </div>
  <div class="px-cta-multi__inner">
    <span class="px-cta-multi__eyebrow" data-anim="fade">
      <?php echo esc_html( px_gr_upper( px_f( 'acf_cta_eyebrow', 'Ραντεβού' ) ) ); ?>
    </span>
    <h2 class="px-cta-multi__title" data-anim="fade">
      <?php echo esc_html( px_f( 'acf_cta_title', 'Η πρώτη γνωριμία' ) ); ?>
    </h2>
    <p class="px-cta-multi__subtitle" data-anim="fade">
      <?php echo esc_html( px_f( 'acf_cta_subtitle', '15 λεπτά κουβέντα, χωρίς χρέωση.' ) ); ?>
    </p>
    <a class="px-cta-multi__btn" href="#" data-anim="fade" data-open-modal>
      <?php echo esc_html( px_f( 'acf_cta_btn', 'Κλείσε τα πρώτα 15 λεπτά — δωρεάν' ) ); ?>
    </a>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" data-screen-label="Contact">
  <div class="contact-grid">
    <div class="contact-wrap">
      <span class="kicker" data-anim="fade">
        <?php echo esc_html( px_gr_upper( px_f( 'acf_contact_kicker', 'Επικοινωνία' ) ) ); ?>
      </span>
      <h2 data-anim="fade"><?php echo esc_html( px_f( 'acf_contact_title', 'Ας μιλήσουμε.' ) ); ?></h2>
      <p class="contact-sub" data-anim="fade">
        <?php echo esc_html( px_f( 'acf_contact_sub', 'Δεν χρειάζεται να ξέρεις τι ακριβώς ψάχνεις. Αρκεί να νιώθεις ότι κάτι δεν κυλάει όπως θα ήθελες. Στείλε μήνυμα ή κάλεσε — εντελώς χωρίς δέσμευση.' ) ); ?>
      </p>
      <div class="contact-details" data-anim="fade">
        <div class="contact-row">
          <strong><?php echo esc_html( px_gr_upper( __( 'Τηλέφωνο', 'praxis-therapist' ) ) ); ?></strong>
          <a href="tel:<?php echo esc_attr( $phone ); ?>"><?php echo esc_html( $phone ); ?></a>
        </div>
        <div class="contact-row">
          <strong><?php echo esc_html( px_gr_upper( __( 'Email', 'praxis-therapist' ) ) ); ?></strong>
          <a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a>
        </div>
        <div class="contact-row">
          <strong><?php echo esc_html( px_gr_upper( __( 'Τοποθεσία', 'praxis-therapist' ) ) ); ?></strong>
          <span><?php echo esc_html( $city ); ?></span>
        </div>
      </div>
      <div class="contact-cta" data-anim="fade">
        <a href="#" class="btn-primary" data-open-modal>
          <?php echo esc_html( px_f( 'acf_contact_cta_text', 'Κλείσε ένα ραντεβού — χωρίς δέσμευση' ) ); ?>
        </a>
      </div>
      <p class="contact-note" data-anim="fade">
        <?php
        $note = px_f( 'acf_contact_note', "Όλα όσα μοιράζεσαι παραμένουν απολύτως εμπιστευτικά.\nΔημήτρης Κουκούλης — Ψυχολόγος – Ψυχοθεραπευτής\nΣυνεδρίες δια ζώσης & εξ αποστάσεως (βιντεοκλήση)" );
        echo nl2br( esc_html( $note ) );
        ?>
      </p>
    </div>
    <div class="contact-media" data-mask="contact">
      <?php
      $contact_img = $has_acf ? get_field( 'acf_contact_image' ) : null;
      if ( ! empty( $contact_img['url'] ) ) {
        echo '<img data-parallax="contact" src="' . esc_url( $contact_img['url'] ) . '" alt="' . esc_attr( $contact_img['alt'] ) . '">';
      } else {
        echo '<img data-parallax="contact" src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=80" alt="">';
      }
      ?>
    </div>
  </div>
</section>

<?php get_footer(); ?>
