<?php
/**
 * Front page — PHASE 2 (full assembly).
 *
 * Sections in order: HERO · #about(20) · #services(25 ×3) · #why(26)
 * · CTA(.book-banner) · #reviews(27, off until real) · #contact.
 * GR static copy, [placeholders] kept. Caldera/sand tokens only.
 */
get_header(); ?>

<!-- ============================ HERO (static image + soft Ken Burns) ============================ -->
<section class="hero" id="hero" data-layout="left">
  <div class="media">
    <!-- PLACEHOLDER [φωτο hero]: real, eye-to-camera, natural-light, un-posed
         portrait of Δημήτρης. Replace the gradient with:
         <img class="kb" src="…" alt="[ΟΝΟΜΑ]" /> -->
    <div class="kb" style="background:linear-gradient(135deg,#5C3D2E 0%,#3a2118 60%,#2b190f 100%);" role="img" aria-label="[φωτο hero — πορτρέτο Δημήτρη]"></div>
  </div>
  <div class="scrim"></div>

  <div class="hero-inner">
    <div class="hero-block">
      <h1>«Δεν θα σου πω <span class="serif-it">“όλα θα πάνε καλά”.</span><br>
        Θα σου πω <span class="gold serif-it">“κάτσε να δούμε γιατί δεν πάνε”.»</span></h1>
      <p class="hero-sub">Ψυχοθεραπεία χωρίς εμπορευματοποίηση. Χωρίς life coaching. Χωρίς 5 βήματα για την ευτυχία.</p>
      <div class="hero-ctas">
        <a class="btn btn-gold" href="#contact">Κλείσε ένα ραντεβού — χωρίς δέσμευση</a>
      </div>
    </div>
  </div>

  <a class="scroll-cue" href="#about" aria-label="Συνέχεια">
    <span>ΓΝΩΡΙΣΕ ΜΕ</span><span class="chev"></span>
  </a>
</section>

<!-- ============================ ΠΟΙΟΣ ΕΙΜΑΙ — block 20 ============================ -->
<section class="section paper" id="about">
  <div class="wrap">
    <div class="px-at-root reveal" data-align="center">
      <span class="px-at-eyebrow">Ποιός είμαι</span>
      <h2 class="px-at-title">Με λένε [ΟΝΟΜΑ]. Και δεν πιστεύω στην εμπορευματοποίηση της ψυχής.</h2>
      <p class="px-at-body">Ξέρω τι σκέφτεσαι: «ακόμα ένας ψυχολόγος». Το σκέφτομαι κι εγώ — κάθε φορά που η ψυχοθεραπεία αντιμετωπίζεται σαν συνδρομή γυμναστηρίου: πακέτα, προσφορές, εύκολες υποσχέσεις.</p>
      <p class="px-at-body">Δεν είμαι εδώ για να σε «διορθώσω». Είμαι εδώ για να σε ακούσω — αληθινά.</p>
      <!-- FLAGGED credential — keep until confirmed -->
      <p class="px-at-credential">Κλινική &amp; Κοινωνική Ψυχολογία</p>
    </div>
  </div>
</section>

<!-- ============================ ΤΙ ΚΑΝΩ — block 25 ×3 ============================ -->
<section class="section paper-2" id="services">
  <div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow"><span class="ln"></span><span>Τι κάνω</span></span>
    </div>
    <div class="px-sc-grid" data-cols="3">
      <article class="px-sc-card reveal">
        <span class="px-sc-icon" aria-hidden="true">✦</span>
        <h3 class="px-sc-title"><span class="px-sc-num">1 ·</span> Ψυχοθεραπεία</h3>
        <p class="px-sc-text">Χωρίς φάρμακα. Χωρίς συνταγές. Μόνο κουβέντα που σε πάει πιο κάτω.</p>
      </article>
      <article class="px-sc-card reveal d1">
        <span class="px-sc-icon" aria-hidden="true">✦</span>
        <h3 class="px-sc-title"><span class="px-sc-num">2 ·</span> Σκοπός ζωής</h3>
        <p class="px-sc-text">Δεν είναι φιλοσοφία. Είναι η πιο πρακτική ερώτηση: «γιατί ξυπνάω το πρωί;»</p>
      </article>
      <article class="px-sc-card reveal d2">
        <span class="px-sc-icon" aria-hidden="true">✦</span>
        <h3 class="px-sc-title"><span class="px-sc-num">3 ·</span> Έφηβοι &amp; μεταέφηβοι</h3>
        <p class="px-sc-text">Η μεγαλύτερη πίεση σήμερα: να είσαι τέλειος. Αμέσως. Εδώ δεν υπάρχει «πρέπει».</p>
      </article>
    </div>
  </div>
</section>

<!-- ============================ ΓΙΑΤΙ ΕΓΩ — block 26 ============================ -->
<section class="section paper" id="why">
  <div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow"><span class="ln"></span><span>Γιατί εγώ</span></span>
    </div>
    <div class="px-sl-root" data-variant="light">
      <p class="px-sl-item reveal"><span class="px-sl-mark" aria-hidden="true">✦</span><span class="px-sl-text">Δεν θα σε πω «πελάτη» — είσαι άνθρωπος.</span></p>
      <p class="px-sl-item reveal d1"><span class="px-sl-mark" aria-hidden="true">✦</span><span class="px-sl-text">Δεν θα στείλεις ραντεβού σε γραμματεία — απαντάω εγώ.</span></p>
      <p class="px-sl-item reveal d2"><span class="px-sl-mark" aria-hidden="true">✦</span><span class="px-sl-text">Δεν θα σου πουλήσω πακέτο — η ψυχή δεν είναι συνδρομή.</span></p>
      <p class="px-sl-item reveal d3"><span class="px-sl-mark" aria-hidden="true">✦</span><span class="px-sl-text">Δεν θα προσποιηθώ ότι τα ξέρω όλα. Αλλά ξέρω να ακούω.</span></p>
    </div>
  </div>
</section>

<!-- ============================ Η ΠΡΩΤΗ ΓΝΩΡΙΜΙΑ — CTA banner ============================ -->
<section class="book-banner" id="first-talk">
  <div class="wrap">
    <div class="bb-inner reveal">
      <span class="eyebrow on-dark"><span class="ln"></span><span>Η πρώτη γνωριμία</span></span>
      <h2 class="h2 on-dark">Η πρώτη συνεδρία δεν ξεκινάει με χρέωση.</h2>
      <p class="bb-sub">Ξεκινάει με 15 λεπτά κουβέντα — για να δούμε αν ταιριάζουμε. Γιατί η θεραπεία δεν γίνεται χωρίς εμπιστοσύνη.</p>
      <div class="bb-cta">
        <a class="btn btn-gold btn-xl" href="#contact">Κλείσε τα πρώτα 15 λεπτά — δωρεάν</a>
      </div>
    </div>
  </div>
</section>

<!-- ============================ ΜΑΡΤΥΡΙΕΣ — block 27 (OFF until real+consented) ============================ -->
<section class="section navy" id="reviews">
  <div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow on-dark"><span class="ln"></span><span>Μαρτυρίες</span></span>
    </div>
    <!-- data-render="off" → block.js removes the whole #reviews section at runtime.
         To go live: set data-render="auto" and add real, consented .px-ts-card items. -->
    <div class="px-ts-root" data-variant="dark" data-render="off" data-hide-target="#reviews">
      <div class="px-ts-grid">
        <!-- EXAMPLE (commented — never ship demo testimonials):
        <article class="px-ts-card reveal">
          <div class="px-ts-quote" aria-hidden="true">&ldquo;</div>
          <p class="px-ts-text">[πραγματική, συναινετική μαρτυρία]</p>
          <div class="px-ts-author"><span class="px-ts-avatar" aria-hidden="true">—</span><div><div class="px-ts-name">[Όνομα]</div><div class="px-ts-meta">[έτος]</div></div></div>
        </article>
        -->
      </div>
    </div>
  </div>
</section>

<!-- ============================ ΕΠΙΚΟΙΝΩΝΙΑ ============================ -->
<section class="section paper" id="contact">
  <div class="wrap">
    <div class="contact-grid">

      <div class="contact-info reveal">
        <span class="eyebrow"><span class="ln"></span><span>Επικοινωνία</span></span>
        <h2 class="h2">Ας μιλήσουμε.</h2>
        <p class="lede" style="margin-bottom:18px;">Όλα όσα μοιράζεσαι παραμένουν απολύτως εμπιστευτικά.</p>

        <div class="row">
          <span class="ic" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/></svg>
          </span>
          <div>
            <div class="k">WhatsApp</div>
            <!-- PLACEHOLDER: replace [ΤΗΛΕΦΩΝΟ] in both text and wa.me link -->
            <div class="v"><a href="https://wa.me/[ΤΗΛΕΦΩΝΟ]" target="_blank" rel="noopener">[ΤΗΛΕΦΩΝΟ]</a></div>
          </div>
        </div>

        <div class="row">
          <span class="ic" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
          </span>
          <div>
            <div class="k">Email</div>
            <div class="v"><a href="mailto:[EMAIL]">[EMAIL]</a></div>
          </div>
        </div>

        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px;">
          <a class="btn btn-gold" href="https://wa.me/[ΤΗΛΕΦΩΝΟ]" target="_blank" rel="noopener">WhatsApp</a>
          <a class="btn btn-ghost-navy" href="mailto:[EMAIL]">Email</a>
        </div>
      </div>

      <div class="reveal">
        <form id="ll-cform" class="cform" novalidate>
          <?php if ( function_exists( 'wp_nonce_field' ) ) wp_nonce_field( 'll_contact_nonce', 'll_nonce' ); ?>
          <!-- honeypot (hidden from humans) -->
          <div style="position:absolute;left:-9999px;" aria-hidden="true">
            <label>Μην το συμπληρώνετε<input type="text" name="ll_website" tabindex="-1" autocomplete="off"></label>
          </div>

          <div class="field">
            <label for="cf-name">Όνομα</label>
            <input id="cf-name" type="text" name="fname" required>
          </div>
          <div class="field">
            <label for="cf-email">Email</label>
            <input id="cf-email" type="email" name="femail" required>
          </div>
          <div class="field">
            <label for="cf-msg">Μήνυμα</label>
            <textarea id="cf-msg" name="fmsg" required></textarea>
          </div>
          <p class="consent">Στέλνοντας αυτή τη φόρμα συμφωνείς να επικοινωνήσουμε μαζί σου σχετικά με το αίτημά σου.</p>
          <button type="submit" class="btn btn-gold" style="width:100%;">Στείλε μήνυμα</button>
        </form>

        <div class="form-ok">
          <div class="tick" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h3>Το μήνυμα στάλθηκε.</h3>
          <p class="lede" style="margin:0 auto;">Θα σου απαντήσω ο ίδιος, σύντομα.</p>
        </div>
        <div class="form-err" role="alert"></div>
      </div>

    </div>
  </div>
</section>

<?php get_footer(); ?>
