</main><!-- #main -->

<!-- ============================ FOOTER ============================ -->
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="lk-txt"><span class="ln1">Praxis</span></div>
        <!-- PLACEHOLDER: real full name pending -->
        <p>[ΟΝΟΜΑ]</p>
        <!-- FLAGGED credential — keep as placeholder until confirmed -->
        <div class="footer-col" style="margin-top:6px;">
          <span class="v">Κλινική &amp; Κοινωνική Ψυχολογία</span>
        </div>
      </div>

      <div class="footer-col">
        <h4>Επικοινωνία</h4>
        <span class="v">📞 [ΤΗΛΕΦΩΝΟ]</span>
        <span class="v">✉️ [EMAIL]</span>
        <span class="v">📍 [ΠΟΛΗ]</span>
        <span class="v">Συνεδρίες δια ζώσης &amp; online</span>
      </div>

      <div class="footer-col">
        <h4>Μενού</h4>
        <a href="#about">Ποιός είμαι</a>
        <a href="#services">Τι κάνω</a>
        <a href="#why">Γιατί εγώ</a>
        <a href="#contact">Επικοινωνία</a>
      </div>
    </div>

    <p class="footer-note">
      Τα ραντεβού είναι πάντα στην ώρα τους. Η διακριτικότητα είναι δεδομένη.
      Η ανθρωπιά, όχι διαπραγματεύσιμη.
    </p>
    <div class="footer-bottom">
      <span>&copy; <span id="yr"></span> Praxis — [ΟΝΟΜΑ]</span>
      <div class="links">
        <a href="<?php echo esc_url( get_privacy_policy_url() ?: '#' ); ?>">Απόρρητο</a>
      </div>
    </div>
  </div>
</footer>

<script>document.getElementById('yr').textContent = new Date().getFullYear();</script>
<?php wp_footer(); ?>
</body>
</html>
