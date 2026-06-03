<?php get_header(); ?>

<?php
/* Landing page for «Δρομολόγια Ηγουμενίτσα – Κέρκυρα».
 * Assign this template to a WP page with slug: igoumenitsa-kerkyra
 */
?>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Αρχική", "item": "<?php echo esc_url( home_url('/') ); ?>" },
    { "@type": "ListItem", "position": 2, "name": "Δρομολόγια" },
    { "@type": "ListItem", "position": 3, "name": "Ηγουμενίτσα – Κέρκυρα", "item": "<?php echo esc_url( home_url('/igoumenitsa-kerkyra/') ); ?>" }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Πόσο κρατάει Ηγουμενίτσα Κέρκυρα με Lefkimmi Lines;",
      "acceptedAnswer": { "@type": "Answer", "text": "50 λεπτά — από Ηγουμενίτσα στο λιμάνι Λευκίμμης." }
    },
    {
      "@type": "Question",
      "name": "Ποιο είναι το φθηνότερο πλοίο Ηγουμενίτσα Κέρκυρα;",
      "acceptedAnswer": { "@type": "Answer", "text": "Η γραμμή Ηγουμενίτσα–Λευκίμμη με Lefkimmi Lines ξεκινά από 7,30€." }
    },
    {
      "@type": "Question",
      "name": "Μεταφέρω αυτοκίνητο Ηγουμενίτσα Κέρκυρα;",
      "acceptedAnswer": { "@type": "Answer", "text": "Ναι — τα πλοία Αγία Τριάδα & Ιωάννης Καποδίστριας είναι οχηματαγωγά. Τιμή οχήματος από ~30€." }
    }
  ]
}
</script>

<main>

  <!-- HERO BANNER -->
  <section style="background:var(--navy-deep);padding:80px 0 60px;color:#fff;">
    <div class="wrap" style="max-width:900px;">
      <nav aria-label="breadcrumb" style="font-size:13px;color:rgba(255,255,255,.5);margin-bottom:24px;">
        <a href="<?php echo esc_url(home_url('/')); ?>" style="color:rgba(255,255,255,.5);">Αρχική</a>
        <span style="margin:0 8px;">›</span>
        <span>Δρομολόγια</span>
        <span style="margin:0 8px;">›</span>
        <span style="color:#fff;">Ηγουμενίτσα – Κέρκυρα</span>
      </nav>
      <h1 style="font-family:var(--fontH);font-size:clamp(32px,5vw,58px);margin:0 0 20px;line-height:1.1;">
        Δρομολόγια Ηγουμενίτσα – Κέρκυρα
      </h1>
      <p style="font-size:18px;line-height:1.65;color:rgba(255,255,255,.84);max-width:640px;margin:0 0 32px;">
        Ψάχνεις δρομολόγιο Ηγουμενίτσα – Κέρκυρα; Υπάρχουν δύο επιλογές: το κεντρικό λιμάνι Κέρκυρας (1,5 ώρα) και το λιμάνι Λευκίμμης στη νότια Κέρκυρα (μόλις 50 λεπτά). Αν ο προορισμός σου είναι νότια Κέρκυρα — Κάβος, Μπούκαρι, Άγιος Γεώργιος, Αργυράδες — η γραμμή Ηγουμενίτσα–Λευκίμμη είναι ο συντομότερος και οικονομικότερος δρόμος. Η Lefkimmi Lines εκτελεί καθημερινά 10+ δρομολόγια Ηγουμενίτσα–Λευκίμμη, με εισιτήρια από 7,30€ για επιβάτη.
      </p>
      <a class="btn btn-gold btn-xl" href="https://lefkimmilines.gr/el/arxiki/" target="_blank" rel="noopener"
         style="font-size:16px;padding:18px 48px;">Κλείσε εισιτήριο τώρα</a>
    </div>
  </section>

  <!-- COMPARISON TABLE -->
  <section class="section paper" style="padding:72px 0;">
    <div class="wrap" style="max-width:900px;">
      <h2 style="font-family:var(--fontH);color:var(--navy);font-size:clamp(22px,3vw,36px);margin-bottom:32px;">
        Σύγκριση γραμμών: Κέρκυρα πόλη vs Λευκίμμη
      </h2>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <thead>
            <tr style="background:var(--navy);color:#fff;">
              <th style="padding:14px 18px;text-align:left;font-weight:500;"></th>
              <th style="padding:14px 18px;text-align:center;font-weight:500;">Ηγουμ. → Κέρκυρα πόλη</th>
              <th style="padding:14px 18px;text-align:center;font-weight:500;background:var(--gold-deep);">Ηγουμ. → Λευκίμμη ✅</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--line);">
              <td style="padding:14px 18px;font-weight:600;color:var(--navy);">Διάρκεια</td>
              <td style="padding:14px 18px;text-align:center;">~1,5 ώρα</td>
              <td style="padding:14px 18px;text-align:center;font-weight:700;color:var(--navy);">50 λεπτά ✅</td>
            </tr>
            <tr style="border-bottom:1px solid var(--line);background:var(--paper-2);">
              <td style="padding:14px 18px;font-weight:600;color:var(--navy);">Τιμή επιβάτη</td>
              <td style="padding:14px 18px;text-align:center;">~10–15€</td>
              <td style="padding:14px 18px;text-align:center;font-weight:700;color:var(--navy);">από 7,30€ ✅</td>
            </tr>
            <tr style="border-bottom:1px solid var(--line);">
              <td style="padding:14px 18px;font-weight:600;color:var(--navy);">Δρομολόγια/μέρα</td>
              <td style="padding:14px 18px;text-align:center;">~22 (καλοκαίρι)</td>
              <td style="padding:14px 18px;text-align:center;">10+</td>
            </tr>
            <tr style="border-bottom:1px solid var(--line);background:var(--paper-2);">
              <td style="padding:14px 18px;font-weight:600;color:var(--navy);">Ιδανικό για</td>
              <td style="padding:14px 18px;text-align:center;">Βόρεια/Κεντρική Κέρκυρα</td>
              <td style="padding:14px 18px;text-align:center;font-weight:600;color:var(--navy);">Νότια Κέρκυρα ✅</td>
            </tr>
            <tr>
              <td style="padding:14px 18px;font-weight:600;color:var(--navy);">Εταιρεία</td>
              <td style="padding:14px 18px;text-align:center;">Kerkyra Lines / Seaways</td>
              <td style="padding:14px 18px;text-align:center;font-weight:700;color:var(--navy);">Lefkimmi Lines ✅</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- SCHEDULE BLOCK #21 -->
  <section class="section paper-2" style="padding:72px 0;" id="schedule-ik">
    <div class="wrap" style="max-width:900px;">
      <h2 style="font-family:var(--fontH);color:var(--navy);font-size:clamp(22px,3vw,36px);margin-bottom:32px;">
        Δρομολόγια Ηγουμενίτσα – Λευκίμμη σήμερα
      </h2>
      <div class="px-sc-root" data-book-url="https://lefkimmilines.gr/el/reservation/" data-default-tab="hl">
        <script type="application/json" class="px-sched-data">
          <?php echo wp_json_encode( ll_get_schedule_json(), JSON_UNESCAPED_UNICODE ); ?>
        </script>
      </div>
    </div>
  </section>

  <!-- BOOKING FORM BLOCK #23 -->
  <section class="section paper" style="padding:72px 0;">
    <div class="wrap" style="max-width:900px;">
      <h2 style="font-family:var(--fontH);color:var(--navy);font-size:clamp(22px,3vw,36px);margin-bottom:32px;">
        Κλείστε εισιτήριο Ηγουμενίτσα – Κέρκυρα (Λευκίμμη)
      </h2>
      <div class="px-bf-root" data-book-url="https://lefkimmilines.gr/el/reservation/"></div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section paper-2" style="padding:72px 0;">
    <div class="wrap" style="max-width:780px;">
      <h2 style="font-family:var(--fontH);color:var(--navy);font-size:clamp(22px,3vw,36px);margin-bottom:32px;">
        Συχνές ερωτήσεις
      </h2>
      <div class="faq-list">
        <details class="faq-item" open>
          <summary class="faq-q">Πόσο κρατάει Ηγουμενίτσα Κέρκυρα με Lefkimmi Lines;</summary>
          <p class="faq-a">50 λεπτά — από Ηγουμενίτσα στο λιμάνι Λευκίμμης.</p>
        </details>
        <details class="faq-item">
          <summary class="faq-q">Ποιο είναι το φθηνότερο πλοίο Ηγουμενίτσα Κέρκυρα;</summary>
          <p class="faq-a">Η γραμμή Ηγουμενίτσα–Λευκίμμη με Lefkimmi Lines ξεκινά από 7,30€ — από τις πιο οικονομικές επιλογές.</p>
        </details>
        <details class="faq-item">
          <summary class="faq-q">Μεταφέρω αυτοκίνητο Ηγουμενίτσα Κέρκυρα;</summary>
          <p class="faq-a">Ναι — τα πλοία Αγία Τριάδα &amp; Ιωάννης Καποδίστριας είναι οχηματαγωγά. Τιμή οχήματος από ~30€.</p>
        </details>
      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>
