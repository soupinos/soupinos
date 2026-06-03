<?php get_header(); ?>
<?php /* Template Name: Blog – Νότια Κέρκυρα Οδηγός */ ?>

<main>
  <article style="padding:80px 0 120px;">
    <div class="wrap" style="max-width:740px;">

      <nav aria-label="breadcrumb" style="font-size:13px;color:var(--muted);margin-bottom:28px;">
        <a href="<?php echo esc_url(home_url('/')); ?>" style="color:var(--muted);">Αρχική</a>
        <span style="margin:0 8px;">›</span>
        <a href="<?php echo esc_url(home_url('/blog/')); ?>" style="color:var(--muted);">Blog</a>
        <span style="margin:0 8px;">›</span>
        <span>Νότια Κέρκυρα</span>
      </nav>

      <span style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);">Οδηγός</span>
      <h1 style="font-family:var(--fontH);color:var(--navy);font-size:clamp(28px,4vw,50px);line-height:1.15;margin:12px 0 20px;">
        Νότια Κέρκυρα — τι να δεις, πώς να φτάσεις
      </h1>
      <p style="color:var(--muted);font-size:14px;margin-bottom:40px;">
        <?php echo esc_html( date_i18n('d F Y') ); ?> · 5 λεπτά ανάγνωση
      </p>

      <div style="font-size:16px;line-height:1.75;color:var(--body-ink);">

        <h2 style="font-family:var(--fontH);color:var(--navy);font-size:26px;margin:0 0 14px;">Γιατί νότια Κέρκυρα;</h2>
        <p>Ενώ ο τουρισμός συγκεντρώνεται στα βόρεια και το Κανόνι, η νότια Κέρκυρα διατηρεί τον αυθεντικό της χαρακτήρα: ήρεμες παραλίες, ψαροχώρια, απέραντες ελαιώνες. Κοντά βρίσκονται τα πιο εντυπωσιακά χωριά του νησιού — και ο Κάβος, που σφύζει από ζωή κάθε καλοκαίρι.</p>

        <h2 style="font-family:var(--fontH);color:var(--navy);font-size:26px;margin:36px 0 14px;">Πώς να φτάσεις — η πιο εύκολη λύση</h2>
        <p>Η πιο γρήγορη και οικονομική επιλογή: το πλοίο από <strong>Ηγουμενίτσα → Λευκίμμη</strong> με τη <strong>Lefkimmi Lines</strong>. Μόνο <strong>50 λεπτά</strong> ταξίδι, από 7,30€, και αποβιβάζεσαι κατευθείαν στη νότια Κέρκυρα — χωρίς να κολλήσεις στην κίνηση της πόλης.</p>
        <p>Εναλλακτικά υπάρχει η γραμμή Ηγουμενίτσα→Κέρκυρα πόλη (1,5 ώρα), αλλά μετά χρειάζεσαι 45+ λεπτά με αυτοκίνητο για να φτάσεις νότια.</p>

        <h2 style="font-family:var(--fontH);color:var(--navy);font-size:26px;margin:36px 0 14px;">Τι να δεις στη νότια Κέρκυρα</h2>
        <ul style="padding-left:20px;">
          <li style="margin-bottom:10px;"><strong>Μπούκαρι</strong> — ένα από τα ομορφότερα ψαροχώρια της Ελλάδας, με ταβέρνες στο νερό.</li>
          <li style="margin-bottom:10px;"><strong>Κάβος</strong> — ζωντανό beach resort, ιδανικό για νέους ταξιδιώτες.</li>
          <li style="margin-bottom:10px;"><strong>Άγιος Γεώργιος Αργυράδων</strong> — τεράστια αμμουδερή παραλία, υπέροχη για οικογένειες.</li>
          <li style="margin-bottom:10px;"><strong>Αργυράδες</strong> — παραδοσιακό χωριό με εκκλησίες και πέτρινα σπίτια.</li>
          <li style="margin-bottom:10px;"><strong>Λευκίμμη</strong> — η «πρωτεύουσα» του νότου, με ποτάμι, γέφυρες και αυθεντική ατμόσφαιρα.</li>
        </ul>

        <h2 style="font-family:var(--fontH);color:var(--navy);font-size:26px;margin:36px 0 14px;">Πότε να πας</h2>
        <p>Ιούνιος–Σεπτέμβριος είναι η peak season. Για ησυχία, Ιούνιο–αρχές Ιουλίου. Ο Αύγουστος είναι πολυσύχναστος — αλλά γι' αυτό είναι και τόσο ζωντανός.</p>

        <div style="background:var(--gold-tint);border-left:4px solid var(--gold);padding:20px 24px;border-radius:0 8px 8px 0;margin:36px 0;">
          <p style="margin:0 0 12px;font-size:15px;font-weight:600;color:var(--navy);">Ετοιμάζεις ταξίδι στη νότια Κέρκυρα;</p>
          <a class="btn btn-gold" href="https://lefkimmilines.gr/el/arxiki/" target="_blank" rel="noopener" style="font-size:14px;padding:12px 28px;">
            Κλείστε το πλοίο σας →
          </a>
        </div>

      </div>
    </div>
  </article>
</main>

<?php get_footer(); ?>
