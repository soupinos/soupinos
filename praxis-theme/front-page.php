<?php get_header(); ?>

<main id="main" role="main">

  <!-- ═══════════════════════════════════════════════════════ 01 HERO -->
  <section id="hero" aria-labelledby="hero-headline">
    <canvas id="particleCanvas" aria-hidden="true"></canvas>
    <div class="hero-content">
      <p class="hero-eyebrow"><?php esc_html_e( 'Online παρουσία για ελληνικές επιχειρήσεις', 'praxis' ); ?></p>
      <h1 id="hero-headline" class="hero-headline">
        <span id="tw"></span><span class="tw-cursor" aria-hidden="true">|</span>
      </h1>
      <p class="hero-sub">
        <?php esc_html_e( 'Σε 48 ώρες σε βρίσκουν. Από €20 το μήνα.', 'praxis' ); ?>
      </p>
      <div class="hero-ctas">
        <a href="#contact" class="btn-primary"><?php esc_html_e( 'Ξεκίνα σήμερα →', 'praxis' ); ?></a>
        <a href="#demo"    class="btn-ghost"><?php esc_html_e( 'δες πώς θα έμοιαζε το site σου ↓', 'praxis' ); ?></a>
      </div>
      <div class="scroll-indicator" aria-hidden="true">
        <span><?php esc_html_e( 'scroll', 'praxis' ); ?></span>
        <div class="scroll-arrow"></div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════════════════ 02 NUMBERS -->
  <div id="numbers" aria-label="<?php esc_attr_e( 'Στατιστικά', 'praxis' ); ?>">
    <div class="numbers-grid">
      <div class="num-item reveal">
        <div class="num-val"><span class="counter" data-target="48">0</span><sup class="num-unit">h</sup></div>
        <p class="num-lbl"><?php esc_html_e( 'Χρόνος παράδοσης της παρουσίας σου', 'praxis' ); ?></p>
      </div>
      <div class="num-item reveal d1">
        <div class="num-val"><span class="num-euro">€</span><span class="counter" data-target="20">0</span><sup class="num-unit">/μήνα</sup></div>
        <p class="num-lbl"><?php esc_html_e( 'Το μήνα αρκεί για να υπάρχεις online', 'praxis' ); ?></p>
      </div>
      <div class="num-item reveal d2">
        <div class="num-val"><span class="counter" data-target="100">0</span><sup class="num-unit">%</sup></div>
        <p class="num-lbl"><?php esc_html_e( 'Ελληνικές επιχειρήσεις χρειάζονται online παρουσία', 'praxis' ); ?></p>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════ 03 PROBLEM -->
  <div id="problem">
    <div class="problem-grid">
      <div class="problem-text">
        <span class="section-label reveal"><?php esc_html_e( 'Το πρόβλημα', 'praxis' ); ?></span>
        <h2 class="reveal d1"><?php esc_html_e( 'Ο ανταγωνιστής σου είναι online. Εσύ όχι.', 'praxis' ); ?></h2>
        <p class="reveal d2">
          <?php esc_html_e( 'Κάθε μέρα που δεν υπάρχεις στο διαδίκτυο, χάνεις πελάτες που ψάχνουν ακριβώς αυτό που προσφέρεις. Δεν σε βρίσκουν. Πάνε αλλού.', 'praxis' ); ?>
        </p>
        <p class="reveal d3">
          <?php esc_html_e( 'Η online παρουσία δεν είναι πολυτέλεια — είναι η πόρτα της επιχείρησής σου. Και η πόρτα του ανταγωνιστή σου είναι ανοιχτή 24/7.', 'praxis' ); ?>
        </p>
      </div>

      <div class="story-card reveal d2">
        <div class="story-avatar" aria-hidden="true">Ν</div>
        <div class="story-info">
          <strong><?php esc_html_e( 'Ο Νίκος', 'praxis' ); ?></strong>
          <span><?php esc_html_e( 'Ιδιοκτήτης εστιατορίου · Θεσσαλονίκη', 'praxis' ); ?></span>
        </div>
        <blockquote>
          <?php esc_html_e( '"Είχα 3 τραπέζια άδεια κάθε βράδυ. Τώρα έχω λίστα αναμονής κάθε Σαββατοκύριακο."', 'praxis' ); ?>
        </blockquote>
        <div class="story-stats">
          <div class="story-stat">
            <span class="story-stat-val">+340%</span>
            <span class="story-stat-lbl"><?php esc_html_e( 'κρατήσεις', 'praxis' ); ?></span>
          </div>
          <div class="story-stat">
            <span class="story-stat-val">48h</span>
            <span class="story-stat-lbl"><?php esc_html_e( 'παράδοση', 'praxis' ); ?></span>
          </div>
          <div class="story-stat">
            <span class="story-stat-val">€20</span>
            <span class="story-stat-lbl"><?php esc_html_e( 'το μήνα', 'praxis' ); ?></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════ 04 SERVICES -->
  <div id="services">
    <div class="section-header reveal">
      <span class="section-label"><?php esc_html_e( 'Υπηρεσίες', 'praxis' ); ?></span>
      <h2><?php esc_html_e( 'Τι κάνουμε.', 'praxis' ); ?></h2>
    </div>
    <div class="services-grid">
      <div class="svc-card reveal">
        <div class="svc-icon" aria-hidden="true">🌐</div>
        <h3><?php esc_html_e( 'Η βιτρίνα που δουλεύει 24/7', 'praxis' ); ?></h3>
        <p><?php esc_html_e( 'Custom website που αντικατοπτρίζει την επιχείρησή σου. Design, hosting, SEO — τα πάντα έτοιμα.', 'praxis' ); ?></p>
        <span class="svc-price">€350 <?php esc_html_e( 'εφάπαξ', 'praxis' ); ?></span>
      </div>
      <div class="svc-card reveal d1">
        <div class="svc-icon" aria-hidden="true">📱</div>
        <h3><?php esc_html_e( 'Οι πελάτες σου είναι στο Instagram. Εσύ πού είσαι;', 'praxis' ); ?></h3>
        <p><?php esc_html_e( 'Δημιουργία και διαχείριση social media. Posts, stories, engagement — εσύ δεν κάνεις τίποτα.', 'praxis' ); ?></p>
        <span class="svc-price">€80/<?php esc_html_e( 'μήνα', 'praxis' ); ?></span>
      </div>
      <div class="svc-card reveal d2">
        <div class="svc-icon" aria-hidden="true">⚡</div>
        <h3><?php esc_html_e( 'Υπάρχεις. Από σήμερα.', 'praxis' ); ?></h3>
        <p><?php esc_html_e( 'Google Business, online presence, βασικό site — όλα στημένα σε 48 ώρες. Το ελάχιστο που χρειάζεσαι για να σε βρίσκουν οι πελάτες σου.', 'praxis' ); ?></p>
        <span class="svc-price">€20/<?php esc_html_e( 'μήνα', 'praxis' ); ?></span>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════ 05 PROCESS -->
  <div id="process">
    <div class="section-header reveal">
      <span class="section-label"><?php esc_html_e( 'Πώς δουλεύουμε', 'praxis' ); ?></span>
      <h2><?php esc_html_e( 'Απλά. Γρήγορα.', 'praxis' ); ?></h2>
      <span class="process-badge">⚡ <?php esc_html_e( 'Παράδοση σε 48 ώρες', 'praxis' ); ?></span>
    </div>
    <div class="steps-row">
      <div class="step reveal">
        <div class="step-num">01</div>
        <h3><?php esc_html_e( 'Μιλάμε', 'praxis' ); ?></h3>
        <p><?php esc_html_e( '15 λεπτά αρκούν. Καταλαβαίνουμε τι χρειάζεσαι και σου προτείνουμε την καλύτερη λύση.', 'praxis' ); ?></p>
      </div>
      <div class="step-conn" aria-hidden="true"></div>
      <div class="step reveal d1">
        <div class="step-num">02</div>
        <h3><?php esc_html_e( 'Φτιάχνουμε', 'praxis' ); ?></h3>
        <p><?php esc_html_e( 'Αναλαμβάνουμε τα πάντα. Design, περιεχόμενο, τεχνικά — εσύ δεν κάνεις τίποτα.', 'praxis' ); ?></p>
      </div>
      <div class="step-conn" aria-hidden="true"></div>
      <div class="step reveal d2">
        <div class="step-num">03</div>
        <h3><?php esc_html_e( 'Υπάρχεις.', 'praxis' ); ?></h3>
        <p><?php esc_html_e( 'Σε 48 ώρες είσαι online. Οι πελάτες σε βρίσκουν. Εσύ ασχολείσαι με αυτό που ξέρεις.', 'praxis' ); ?></p>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════ 06 PRICING -->
  <div id="pricing">
    <div class="section-header reveal">
      <span class="section-label"><?php esc_html_e( 'Τιμές', 'praxis' ); ?></span>
      <h2><?php esc_html_e( 'Διαλέξτε το πλάνο σας.', 'praxis' ); ?></h2>
    </div>
    <div class="pricing-grid">

      <!-- Plan 1 -->
      <div class="p-card reveal">
        <h3 class="p-name"><?php esc_html_e( 'ΠΑΡΟΥΣΙΑ', 'praxis' ); ?></h3>
        <div class="p-price"><span class="p-currency">€</span>20<sup class="p-period" data-i18n="price_month">/<?php esc_html_e( 'μήνα', 'praxis' ); ?></sup></div>
        <ul class="p-features">
          <li><?php esc_html_e( 'Google Business Profile', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'Βασική ιστοσελίδα 1 σελίδας', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'WhatsApp επικοινωνία', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'Παράδοση σε 48 ώρες', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'Hosting περιλαμβάνεται', 'praxis' ); ?></li>
        </ul>
        <a href="#contact" class="p-cta"><?php esc_html_e( 'Ξεκίνα →', 'praxis' ); ?></a>
      </div>

      <!-- Plan 2 (featured) -->
      <div class="p-card featured reveal d1">
        <span class="p-badge" data-i18n="price_popular"><?php esc_html_e( 'Δημοφιλές', 'praxis' ); ?></span>
        <h3 class="p-name"><?php esc_html_e( 'ΠΑΡΟΥΣΙΑ+', 'praxis' ); ?></h3>
        <div class="p-price"><span class="p-currency">€</span>80<sup class="p-period" data-i18n="price_month">/<?php esc_html_e( 'μήνα', 'praxis' ); ?></sup></div>
        <ul class="p-features">
          <li><?php esc_html_e( 'Όλα του ΠΑΡΟΥΣΙΑ', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'Διαχείριση Instagram', 'praxis' ); ?></li>
          <li><?php esc_html_e( '4 posts ανά μήνα', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'Stories & engagement', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'Μηνιαία αναφορά', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'Προτεραιότητα υποστήριξης', 'praxis' ); ?></li>
        </ul>
        <a href="#contact" class="p-cta"><?php esc_html_e( 'Ξεκίνα →', 'praxis' ); ?></a>
      </div>

      <!-- Plan 3 -->
      <div class="p-card reveal d2">
        <h3 class="p-name"><?php esc_html_e( 'ΚΥΡΙΑΡΧΙΑ', 'praxis' ); ?></h3>
        <div class="p-price"><span class="p-currency">€</span>350<sup class="p-period" data-i18n="price_once"><?php esc_html_e( 'εφάπαξ', 'praxis' ); ?></sup></div>
        <ul class="p-features">
          <li><?php esc_html_e( 'Πλήρες custom website', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'SEO βελτιστοποίηση', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'Φόρμα επικοινωνίας', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'Google Analytics', 'praxis' ); ?></li>
          <li><?php esc_html_e( 'Responsive design', 'praxis' ); ?></li>
          <li><?php esc_html_e( '6 μήνες δωρεάν υποστήριξη', 'praxis' ); ?></li>
        </ul>
        <a href="#contact" class="p-cta"><?php esc_html_e( 'Ξεκίνα →', 'praxis' ); ?></a>
      </div>

    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════ 07 LIVE DEMO -->
  <div id="demo">
    <div class="demo-inner">
      <div class="section-header reveal">
        <span class="section-label"><?php esc_html_e( 'Live Demo', 'praxis' ); ?></span>
        <h2><?php esc_html_e( 'Δες πώς θα έμοιαζε το site σου.', 'praxis' ); ?></h2>
        <p class="demo-sub">
          <?php esc_html_e( 'Γράψε το όνομα της επιχείρησής σου και δες μια πρόταση στιγμιαία.', 'praxis' ); ?>
        </p>
      </div>
      <div class="demo-row reveal d1">
        <input
          id="demoInput"
          class="demo-input"
          type="text"
          placeholder="<?php esc_attr_e( 'π.χ. Ταβέρνα Μανώλης, Ιατρείο Παπαδόπουλος, CrossFit Athens…', 'praxis' ); ?>"
          aria-label="<?php esc_attr_e( 'Όνομα επιχείρησης', 'praxis' ); ?>"
          maxlength="80"
        >
        <button id="demoRun" class="demo-run"><?php esc_html_e( 'Δες το →', 'praxis' ); ?></button>
      </div>
      <div id="demoOut" class="demo-out" aria-live="polite"></div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════ 08 CONTACT -->
  <div id="contact">
    <div class="contact-inner reveal">
      <h2 class="contact-h">
        <?php esc_html_e( 'Μιλάμε ', 'praxis' ); ?><span class="hl"><?php esc_html_e( 'σήμερα.', 'praxis' ); ?></span>
      </h2>
      <p class="contact-sub">
        <?php esc_html_e( 'Δωρεάν ανάλυση της επιχείρησής σου. Χωρίς δέσμευση.', 'praxis' ); ?>
      </p>
      <div class="contact-btns">
        <a
          href="<?php echo esc_url( get_theme_mod( 'praxis_whatsapp_link', 'https://wa.me/302100000000' ) ); ?>"
          class="btn-wa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <?php esc_html_e( 'WhatsApp →', 'praxis' ); ?>
        </a>
        <a
          href="mailto:<?php echo esc_attr( get_theme_mod( 'praxis_email', 'hello@praxis.gr' ) ); ?>"
          class="btn-em"
        >
          <?php echo esc_html( get_theme_mod( 'praxis_email', 'hello@praxis.gr' ) ); ?>
        </a>
      </div>
      <p class="contact-note">
        <?php esc_html_e( 'Απαντάμε εντός 2 ωρών · Δωρεάν ανάλυση · Χωρίς δέσμευση', 'praxis' ); ?>
      </p>
    </div>
  </div>

</main>

<?php get_footer(); ?>
