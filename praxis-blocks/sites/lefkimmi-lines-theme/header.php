<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Πόσο κρατάει το ταξίδι Λευκίμμη Ηγουμενίτσα;",
      "acceptedAnswer": { "@type": "Answer", "text": "Το ταξίδι διαρκεί περίπου 50 λεπτά." }
    },
    {
      "@type": "Question",
      "name": "Πόσο κοστίζει το εισιτήριο Λευκίμμη Ηγουμενίτσα;",
      "acceptedAnswer": { "@type": "Answer", "text": "Εισιτήρια από 7,30€ για επιβάτη με Μεταφορικό Ισοδύναμο. Με αυτοκίνητο από ~30€." }
    },
    {
      "@type": "Question",
      "name": "Πόσα δρομολόγια υπάρχουν την ημέρα;",
      "acceptedAnswer": { "@type": "Answer", "text": "6+ δρομολόγια Λευκίμμη–Ηγουμενίτσα και 10+ Ηγουμενίτσα–Λευκίμμη καθημερινά." }
    },
    {
      "@type": "Question",
      "name": "Πού βρίσκεται το λιμάνι της Λευκίμμης;",
      "acceptedAnswer": { "@type": "Answer", "text": "Στη νότια Κέρκυρα, 3 χλμ από τον οικισμό. Εξυπηρετεί Κάβο, Μπούκαρι, Άγιο Γεώργιο." }
    },
    {
      "@type": "Question",
      "name": "Μπορώ να μεταφέρω αυτοκίνητο;",
      "acceptedAnswer": { "@type": "Answer", "text": "Ναι, τα πλοία Αγία Τριάδα & Ιωάννης Καποδίστριας είναι οχηματαγωγά." }
    }
  ]
}
</script>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- ============================ HEADER ============================ -->
<header class="site-header">
  <a class="lockup" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Lefkimmi Lines">
    <span class="mark">
      <svg width="34" height="40" viewBox="0 0 34 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 2L29 13V36H5V13L17 2Z" stroke="#c2a35b" stroke-width="1.4"/>
        <path d="M9 26C12 23 22 23 25 26C22 30 12 30 9 26Z" fill="#c2a35b"/>
        <path d="M17 11L17 24" stroke="#c2a35b" stroke-width="1.4"/>
        <path d="M17 13L23 21H11L17 13Z" fill="#c2a35b" opacity=".55"/>
      </svg>
    </span>
    <span class="lk-txt">
      <span class="ln1">Lefkimmi Lines</span>
      <span class="ln2">Κέρκυρα · Ηγουμενίτσα</span>
    </span>
  </a>

  <nav class="main-nav">
    <a class="navlink" href="#about"    data-i18n="nav.about">Ποιοι είμαστε</a>
    <a class="navlink" href="#why"      data-i18n="nav.why">Γιατί Λευκίμμη</a>
    <a class="navlink" href="#prices"   data-i18n="nav.prices">Τιμές</a>
    <a class="navlink" href="#fleet"    data-i18n="nav.fleet">Στόλος</a>
    <a class="navlink" href="#schedule" data-i18n="nav.schedule">Δρομολόγια</a>
    <a class="navlink" href="#contact"  data-i18n="nav.contact">Επικοινωνία</a>

    <div class="lang" data-lang>
      <button class="lang-btn" data-lang-btn aria-label="Language">
        <span data-lang-current>EL</span><span class="chev"></span>
      </button>
      <div class="lang-menu" data-lang-menu></div>
    </div>

    <a class="btn btn-gold" href="https://lefkimmilines.gr/el/arxiki/" data-i18n="nav.book">Κλείσε εισιτήριο</a>
    <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
  </nav>
</header>

<!-- mobile drawer -->
<div class="drawer">
  <button class="close" aria-label="Close">&times;</button>
  <a href="#about"    data-i18n="nav.about">Ποιοι είμαστε</a>
  <a href="#why"      data-i18n="nav.why">Γιατί Λευκίμμη</a>
  <a href="#prices"   data-i18n="nav.prices">Τιμές</a>
  <a href="#fleet"    data-i18n="nav.fleet">Στόλος</a>
  <a href="#schedule" data-i18n="nav.schedule">Δρομολόγια</a>
  <a href="#contact"  data-i18n="nav.contact">Επικοινωνία</a>
</div>
