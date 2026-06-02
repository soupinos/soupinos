<!-- ============================ FOOTER ============================ -->
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="lk-txt"><span class="ln1">Lefkimmi Lines</span></div>
        <p data-i18n="footer.tagline">Ο συντομότερος δρόμος για την Κέρκυρα.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/lefkimmilines" aria-label="Facebook">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z"/></svg>
          </a>
          <a href="https://www.instagram.com/lefkimmi_lines" aria-label="Instagram">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer.nav">Πλοήγηση</h4>
        <a href="#about"    data-i18n="nav.about">Ποιοι είμαστε</a>
        <a href="#why"      data-i18n="nav.why">Γιατί Λευκίμμη</a>
        <a href="#prices"   data-i18n="nav.prices">Τιμές</a>
        <a href="#schedule" data-i18n="nav.schedule">Δρομολόγια</a>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer.useful">Χρήσιμα</h4>
        <a href="https://lefkimmilines.gr/metaforiko-isodynamo/" data-i18n="footer.mi">Μεταφορικό Ισοδύναμο</a>
        <a href="https://lefkimmilines.gr/genikoi-oroi-taksidiou/" data-i18n="footer.terms">Όροι ταξιδιού</a>
        <a href="<?php echo esc_url( get_privacy_policy_url() ?: '#' ); ?>" data-i18n="footer.privacy">Απόρρητο</a>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer.contact">Επικοινωνία</h4>
        <a href="mailto:info@lefkimmilines.gr">info@lefkimmilines.gr</a>
        <a href="tel:+302662023200">(+30) 26620-23200</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span id="yr"></span> <span data-i18n="footer.rights">Lefkimmi Lines — Λευκίμμη, Κέρκυρα. Όλα τα δικαιώματα διατηρούνται.</span></span>
      <div class="links">
        <a href="https://lefkimmilines.gr/genikoi-oroi-taksidiou/" data-i18n="footer.terms">Όροι ταξιδιού</a>
        <a href="<?php echo esc_url( get_privacy_policy_url() ?: '#' ); ?>" data-i18n="footer.privacy">Απόρρητο</a>
      </div>
    </div>
  </div>
</footer>

<script>document.getElementById('yr').textContent = new Date().getFullYear();</script>
<?php wp_footer(); ?>
</body>
</html>
