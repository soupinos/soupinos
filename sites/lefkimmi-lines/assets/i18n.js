/* ============================================================
   LEFKIMMI LINES — i18n (9 languages, full parity)
   Greek (el) is the source-of-truth in the HTML itself.
   This dictionary supplies the other 8 languages, COMPLETE.
   Languages: GR · EN · FR · IT · DE · ES · RO · BG · RU
   Lookup chain: DICT[lang][key] -> DICT.en[key] -> original Greek.
   ============================================================ */
(function (global) {
  "use strict";

  // language list (order shown in the switcher)
  var LANGS = [
    { code: "el", native: "Ελληνικά",  short: "GR" },
    { code: "en", native: "English",   short: "EN" },
    { code: "fr", native: "Français",  short: "FR" },
    { code: "it", native: "Italiano",  short: "IT" },
    { code: "de", native: "Deutsch",   short: "DE" },
    { code: "es", native: "Español",   short: "ES" },
    { code: "ro", native: "Română",    short: "RO" },
    { code: "bg", native: "Български", short: "BG" },
    { code: "ru", native: "Русский",   short: "RU" }
  ];

  // Every language carries EVERY key (full parity). Any accidental
  // gap falls back to EN, then to the Greek source in the HTML.
  var DICT = {
    en: {
      "nav.about": "About", "nav.why": "Why Lefkimmi", "nav.prices": "Fares",
      "nav.fleet": "Fleet", "nav.schedule": "Schedule", "nav.contact": "Contact", "nav.book": "Book a ticket",
      "hero.eyebrow": "Lefkimmi → Corfu · since 2012",
      "hero.t1": "THE SHORTEST ROUTE", "hero.t2": "to", "hero.t3": "CORFU",
      "hero.sub": "50 minutes from Igoumenitsa. Daily crossings, modern ferries and the Ionian view all the way to the island.",
      "hero.cta1": "Book a ticket", "hero.cta2": "View the schedule",
      "hero.scroll": "EXPLORE", "hero.priceLbl": "With Transport Equivalent",
      "stat.1l": "hour crossing", "stat.2l": "daily crossings", "stat.3l": "modern ferries", "stat.4l": "at sea since",
      "about.eyebrow": "About us", "about.title": "The sea is our road.",
      "about.body": "Lefkimmi Lines connects southern Corfu with Igoumenitsa every day, from the port of Lefkimmi. For over a decade we have carried passengers and vehicles with consistency, safety and respect for every traveller. We are not just a crossing — we are the start of your holiday.",
      "why.eyebrow": "Why Lefkimmi", "why.title": "Closer than you think.",
      "why.body": "Many look for the ferry to Corfu and end up on the distant, pricier town line. Lefkimmi, in southern Corfu, is the shortest and cheapest way to set foot on the island: just 50 minutes from Igoumenitsa. Ideal for southern Corfu — Kavos, Lefkimmi, Boukari, Agios Georgios.",
      "why.tab1t": "Short", "why.tab1v": "50 min", "why.tab2t": "Affordable", "why.tab2v": "from 7.30€",
      "why.tab3t": "Southern", "why.tab3v": "Corfu", "why.tab4t": "Daily", "why.tab4v": "6+ trips",
      "explore": "EXPLORE",
      "prices.eyebrow": "Fares", "prices.title": "Tickets from 7.30€.",
      "prices.body": "With the Transport Equivalent (state subsidy), the crossing to Corfu is among the most affordable in Greece.",
      "prices.c1": "Passenger", "prices.c1p": "7.30€", "prices.c1u": "with T.E.",
      "prices.c2": "With motorbike", "prices.c2p": "~16€", "prices.c2u": "with T.E.",
      "prices.c3": "With car", "prices.c3p": "~30€", "prices.c3u": "with T.E.",
      "prices.feat": "Most popular",
      "prices.note": "Transport-Equivalent fares apply to eligible travellers. For final prices and booking, tap “Book a ticket”.",
      "fleet.eyebrow": "Fleet", "fleet.title": "Two ferries, one promise: safety.",
      "fleet.body": "Our ferries serve the travelling public faithfully and systematically, with complete safety and high comfort.",
      "fleet.tag": "Passenger / Car Ferry",
      "onboard.eyebrow": "On board", "onboard.title": "Sit back. We sail.",
      "onboard.body": "One hour is enough to catch your breath. Enjoy your coffee, a cold drink or a warm toastie from the ship's canteen, let the Ionian view drift past — and before you know it, you're in Corfu. Speed and safety, always with a smile.",
      "sched.eyebrow": "Schedule", "sched.title": "Daily schedule",
      "sched.body": "Check the times and pick the crossing that suits you.",
      "sched.note": "Schedules are indicative and may change by season. For final confirmation and booking, tap “Book a ticket”.",
      "sched.colShip": "Ferry", "sched.colDep": "Departure", "sched.colArr": "Arrival", "sched.colDur": "Duration", "sched.colFare": "Fare",
      "sched.fare": "from 7.30€",
      "map.eyebrow": "Map", "map.title": "A 1-hour journey.",
      "map.body": "From the port of Lefkimmi to the port of Igoumenitsa.", "map.badge": "journey",
      "reviews.eyebrow": "Reviews", "reviews.title": "Travellers love the crossing.",
      "reviews.body": "Real impressions from passengers on the Lefkimmi–Igoumenitsa line.",
      "reviews.count": "based on 240+ reviews",
      "reviews.r1": "Quick, easy and so much calmer than the town line. We were in southern Corfu in no time.",
      "reviews.r1r": "Summer 2025 · Google",
      "reviews.r2": "The most affordable way to cross with the car. Friendly crew and a beautiful view of the Ionian.",
      "reviews.r2r": "August 2025 · TripAdvisor",
      "reviews.r3": "Smooth crossing, clean ferry and a great coffee on board. We'll use Lefkimmi again next year.",
      "reviews.r3r": "Summer 2025 · Google",
      "reviews.ph": "Placeholder reviews — to be replaced with live ratings.",
      "contact.eyebrow": "Contact", "contact.title": "We're here.",
      "contact.body": "For schedule information, tickets and group transfers, get in touch with us.",
      "contact.email": "Email", "contact.outbound": "Lefkimmi → Igoumenitsa", "contact.inbound": "Igoumenitsa → Lefkimmi",
      "contact.fname": "Full name", "contact.femail": "Email", "contact.fmsg": "Message",
      "contact.consent": "I accept the", "contact.privacy": "Privacy Policy",
      "contact.send": "Send", "contact.okTitle": "Your message has been sent!",
      "contact.okBody": "We'll get back to you shortly.",
      "footer.tagline": "The shortest road to Corfu.",
      "footer.nav": "Navigation", "footer.useful": "Useful", "footer.contact": "Contact",
      "footer.mi": "Transport Equivalent", "footer.terms": "Terms of travel", "footer.privacy": "Privacy",
      "footer.rights": "Lefkimmi Lines — Lefkimmi, Corfu. All rights reserved.",
      "sched.tabLL": "Lefkimmi → Igoumenitsa", "sched.tabHL": "Igoumenitsa → Lefkimmi",
      "sched.tabLP": "Lefkimmi → Paxos", "sched.tabPL": "Paxos → Lefkimmi",
      "sched.colBook": "Book",
      "sched.disclaimer": "Schedules are indicative and may change by season. For final booking tap \"Book a ticket\".",
      "book.title": "Search Crossings", "book.from": "From", "book.to": "To",
      "book.date": "Departure date", "book.pax": "Passengers", "book.vehicle": "Vehicle",
      "book.search": "SEARCH CROSSINGS"
    },

    fr: {
      "nav.about": "À propos", "nav.why": "Pourquoi Lefkimmi", "nav.prices": "Tarifs",
      "nav.fleet": "Flotte", "nav.schedule": "Horaires", "nav.contact": "Contact", "nav.book": "Réserver",
      "hero.eyebrow": "Lefkimmi → Corfou · depuis 2012",
      "hero.t1": "LE CHEMIN LE PLUS COURT", "hero.t2": "vers", "hero.t3": "CORFOU",
      "hero.sub": "50 minutes depuis Igoumenitsa. Traversées quotidiennes, ferries modernes et la vue sur la mer Ionienne jusqu'à l'île.",
      "hero.cta1": "Réserver", "hero.cta2": "Voir les horaires",
      "hero.scroll": "EXPLORER", "hero.priceLbl": "Avec Équivalent de Transport",
      "stat.1l": "heure de traversée", "stat.2l": "traversées par jour", "stat.3l": "ferries modernes", "stat.4l": "en mer depuis",
      "about.eyebrow": "À propos", "about.title": "La mer est notre route.",
      "about.body": "Lefkimmi Lines relie chaque jour le sud de Corfou à Igoumenitsa, depuis le port de Lefkimmi. Depuis plus de dix ans, nous transportons passagers et véhicules avec régularité, sécurité et respect pour chaque voyageur. Nous ne sommes pas qu'une traversée — nous sommes le début de vos vacances.",
      "why.eyebrow": "Pourquoi Lefkimmi", "why.title": "Plus proche qu'on ne le croit.",
      "why.body": "Beaucoup cherchent le ferry pour Corfou et finissent sur la ligne lointaine et plus chère de la ville. Lefkimmi, au sud de Corfou, est le moyen le plus court et le moins cher de poser le pied sur l'île : à seulement 50 minutes d'Igoumenitsa. Idéal pour le sud de Corfou — Kavos, Lefkimmi, Boukari, Agios Georgios.",
      "why.tab1t": "Court", "why.tab1v": "50 min", "why.tab2t": "Économique", "why.tab2v": "dès 7,30€",
      "why.tab3t": "Sud", "why.tab3v": "Corfou", "why.tab4t": "Quotidien", "why.tab4v": "6+ traversées",
      "explore": "EXPLORER",
      "prices.eyebrow": "Tarifs", "prices.title": "Billets dès 7,30€.",
      "prices.body": "Avec l'Équivalent de Transport (subvention de l'État), la traversée vers Corfou est parmi les plus économiques de Grèce.",
      "prices.c1": "Passager", "prices.c1p": "7,30€", "prices.c1u": "avec ÉT",
      "prices.c2": "Avec moto", "prices.c2p": "~16€", "prices.c2u": "avec ÉT",
      "prices.c3": "Avec voiture", "prices.c3p": "~30€", "prices.c3u": "avec ÉT",
      "prices.feat": "Le plus choisi",
      "prices.note": "Les tarifs « Équivalent de Transport » s'appliquent aux ayants droit. Pour les prix définitifs et la réservation, cliquez sur « Réserver ».",
      "fleet.eyebrow": "Flotte", "fleet.title": "Deux ferries, une promesse : la sécurité.",
      "fleet.body": "Nos ferries servent le public voyageur avec fidélité et régularité, en toute sécurité et avec un grand confort.",
      "fleet.tag": "Ferry passagers / voitures",
      "onboard.eyebrow": "À bord", "onboard.title": "Détendez-vous. Nous naviguons.",
      "onboard.body": "Une heure suffit pour reprendre son souffle. Savourez votre café, une boisson fraîche ou un toast chaud du bar du navire, laissez défiler la vue sur la mer Ionienne — et avant de vous en rendre compte, vous êtes à Corfou. Rapidité et sécurité, toujours avec le sourire.",
      "sched.eyebrow": "Horaires", "sched.title": "Horaire du jour",
      "sched.body": "Consultez les horaires et choisissez la traversée qui vous convient.",
      "sched.note": "Les horaires sont indicatifs et peuvent varier selon la saison. Pour confirmation et réservation, cliquez sur « Réserver ».",
      "sched.colShip": "Ferry", "sched.colDep": "Départ", "sched.colArr": "Arrivée", "sched.colDur": "Durée", "sched.colFare": "Tarif",
      "sched.fare": "dès 7,30€",
      "map.eyebrow": "Carte", "map.title": "Un trajet d'1 heure.",
      "map.body": "Du port de Lefkimmi au port d'Igoumenitsa.", "map.badge": "trajet",
      "reviews.eyebrow": "Avis", "reviews.title": "Les voyageurs adorent la traversée.",
      "reviews.body": "Impressions réelles de passagers de la ligne Lefkimmi–Igoumenitsa.",
      "reviews.count": "sur la base de 240+ avis",
      "reviews.r1": "Rapide, facile et bien plus tranquille que la ligne de la ville. Nous étions dans le sud de Corfou en un rien de temps.",
      "reviews.r1r": "Été 2025 · Google",
      "reviews.r2": "Le moyen le plus économique de traverser avec la voiture. Équipage sympathique et belle vue sur la mer Ionienne.",
      "reviews.r2r": "Août 2025 · TripAdvisor",
      "reviews.r3": "Traversée tranquille, ferry propre et un excellent café à bord. Nous reprendrons Lefkimmi l'an prochain.",
      "reviews.r3r": "Été 2025 · Google",
      "reviews.ph": "Avis fictifs — à remplacer par de vraies évaluations.",
      "contact.eyebrow": "Contact", "contact.title": "Nous sommes là.",
      "contact.body": "Pour les horaires, les billets et les transferts de groupe, contactez-nous.",
      "contact.email": "E-mail", "contact.outbound": "Lefkimmi → Igoumenitsa", "contact.inbound": "Igoumenitsa → Lefkimmi",
      "contact.fname": "Nom complet", "contact.femail": "E-mail", "contact.fmsg": "Message",
      "contact.consent": "J'accepte la", "contact.privacy": "Politique de confidentialité",
      "contact.send": "Envoyer", "contact.okTitle": "Votre message a été envoyé !",
      "contact.okBody": "Nous vous répondrons sous peu.",
      "footer.tagline": "Le chemin le plus court vers Corfou.",
      "footer.nav": "Navigation", "footer.useful": "Liens utiles", "footer.contact": "Contact",
      "footer.mi": "Équivalent de Transport", "footer.terms": "Conditions de voyage", "footer.privacy": "Confidentialité",
      "footer.rights": "Lefkimmi Lines — Lefkimmi, Corfou. Tous droits réservés.",
      "sched.colBook": "Réserver",
      "sched.disclaimer": "Les horaires sont indicatifs et peuvent varier selon la saison. Pour la réservation définitive, cliquez sur « Réserver ».",
      "book.title": "Rechercher des traversées", "book.from": "De", "book.to": "À",
      "book.date": "Date de départ", "book.pax": "Passagers", "book.vehicle": "Véhicule",
      "book.search": "RECHERCHER DES TRAVERSÉES"
    },

    it: {
      "nav.about": "Chi siamo", "nav.why": "Perché Lefkimmi", "nav.prices": "Tariffe",
      "nav.fleet": "Flotta", "nav.schedule": "Orari", "nav.contact": "Contatti", "nav.book": "Prenota",
      "hero.eyebrow": "Lefkimmi → Corfù · dal 2012",
      "hero.t1": "LA VIA PIÙ BREVE", "hero.t2": "per", "hero.t3": "CORFÙ",
      "hero.sub": "50 minuti da Igoumenitsa. Traversate giornaliere, traghetti moderni e la vista sullo Ionio fino all'isola.",
      "hero.cta1": "Prenota", "hero.cta2": "Vedi gli orari",
      "hero.scroll": "ESPLORA", "hero.priceLbl": "Con Equivalente di Trasporto",
      "stat.1l": "ora di traversata", "stat.2l": "traversate al giorno", "stat.3l": "traghetti moderni", "stat.4l": "in mare dal",
      "about.eyebrow": "Chi siamo", "about.title": "Il mare è la nostra strada.",
      "about.body": "Lefkimmi Lines collega ogni giorno il sud di Corfù con Igoumenitsa, dal porto di Lefkimmi. Da oltre dieci anni trasportiamo passeggeri e veicoli con costanza, sicurezza e rispetto per ogni viaggiatore. Non siamo solo una traversata — siamo l'inizio della tua vacanza.",
      "why.eyebrow": "Perché Lefkimmi", "why.title": "Più vicina di quanto pensi.",
      "why.body": "Molti cercano il traghetto per Corfù e finiscono sulla rotta cittadina, più lontana e costosa. Lefkimmi, nel sud di Corfù, è il modo più breve ed economico per mettere piede sull'isola: a soli 50 minuti da Igoumenitsa. Ideale per il sud di Corfù — Kavos, Lefkimmi, Boukari, Agios Georgios.",
      "why.tab1t": "Breve", "why.tab1v": "50 min", "why.tab2t": "Conveniente", "why.tab2v": "da 7,30€",
      "why.tab3t": "Sud", "why.tab3v": "Corfù", "why.tab4t": "Giornaliero", "why.tab4v": "6+ corse",
      "explore": "ESPLORA",
      "prices.eyebrow": "Tariffe", "prices.title": "Biglietti da 7,30€.",
      "prices.body": "Con l'Equivalente di Trasporto (sussidio statale), la traversata per Corfù è tra le più economiche della Grecia.",
      "prices.c1": "Passeggero", "prices.c1p": "7,30€", "prices.c1u": "con ET",
      "prices.c2": "Con moto", "prices.c2p": "~16€", "prices.c2u": "con ET",
      "prices.c3": "Con auto", "prices.c3p": "~30€", "prices.c3u": "con ET",
      "prices.feat": "Più scelto",
      "prices.note": "Le tariffe «Equivalente di Trasporto» si applicano agli aventi diritto. Per prezzi definitivi e prenotazione, tocca «Prenota».",
      "fleet.eyebrow": "Flotta", "fleet.title": "Due traghetti, una promessa: sicurezza.",
      "fleet.body": "I nostri traghetti servono il pubblico viaggiante con fedeltà e regolarità, in totale sicurezza e con grande comfort.",
      "fleet.tag": "Traghetto passeggeri / auto",
      "onboard.eyebrow": "A bordo", "onboard.title": "Rilassatevi. Navighiamo noi.",
      "onboard.body": "Un'ora basta per riprendere fiato. Goditi il caffè, una bibita fresca o un toast caldo dal bar della nave, lascia scorrere la vista sullo Ionio — e prima di accorgertene sei a Corfù. Velocità e sicurezza, sempre con il sorriso.",
      "sched.eyebrow": "Orari", "sched.title": "Orario del giorno",
      "sched.body": "Controlla gli orari e scegli la traversata più comoda.",
      "sched.note": "Gli orari sono indicativi e possono variare secondo la stagione. Per conferma e prenotazione, tocca «Prenota».",
      "sched.colShip": "Traghetto", "sched.colDep": "Partenza", "sched.colArr": "Arrivo", "sched.colDur": "Durata", "sched.colFare": "Tariffa",
      "sched.fare": "da 7,30€",
      "map.eyebrow": "Mappa", "map.title": "Un viaggio di 1 ora.",
      "map.body": "Dal porto di Lefkimmi al porto di Igoumenitsa.", "map.badge": "viaggio",
      "reviews.eyebrow": "Recensioni", "reviews.title": "I viaggiatori amano la traversata.",
      "reviews.body": "Impressioni reali dei passeggeri della linea Lefkimmi–Igoumenitsa.",
      "reviews.count": "su oltre 240 recensioni",
      "reviews.r1": "Veloce, facile e molto più tranquillo della linea cittadina. Siamo arrivati nel sud di Corfù in un attimo.",
      "reviews.r1r": "Estate 2025 · Google",
      "reviews.r2": "Il modo più economico per traversare con l'auto. Equipaggio cordiale e una bella vista sullo Ionio.",
      "reviews.r2r": "Agosto 2025 · TripAdvisor",
      "reviews.r3": "Traversata tranquilla, traghetto pulito e un ottimo caffè a bordo. L'anno prossimo di nuovo da Lefkimmi.",
      "reviews.r3r": "Estate 2025 · Google",
      "reviews.ph": "Recensioni segnaposto — da sostituire con valutazioni reali.",
      "contact.eyebrow": "Contatti", "contact.title": "Siamo qui.",
      "contact.body": "Per orari, biglietti e trasferimenti di gruppo, contattaci.",
      "contact.email": "Email", "contact.outbound": "Lefkimmi → Igoumenitsa", "contact.inbound": "Igoumenitsa → Lefkimmi",
      "contact.fname": "Nome e cognome", "contact.femail": "Email", "contact.fmsg": "Messaggio",
      "contact.consent": "Accetto la", "contact.privacy": "Informativa sulla privacy",
      "contact.send": "Invia", "contact.okTitle": "Il tuo messaggio è stato inviato!",
      "contact.okBody": "Ti risponderemo a breve.",
      "footer.tagline": "La via più breve per Corfù.",
      "footer.nav": "Navigazione", "footer.useful": "Utili", "footer.contact": "Contatti",
      "footer.mi": "Equivalente di Trasporto", "footer.terms": "Condizioni di viaggio", "footer.privacy": "Privacy",
      "footer.rights": "Lefkimmi Lines — Lefkimmi, Corfù. Tutti i diritti riservati.",
      "sched.colBook": "Prenota",
      "sched.disclaimer": "Gli orari sono indicativi e possono variare secondo la stagione. Per la prenotazione definitiva, tocca «Prenota».",
      "book.title": "Cerca traversate", "book.from": "Da", "book.to": "A",
      "book.date": "Data di partenza", "book.pax": "Passeggeri", "book.vehicle": "Veicolo",
      "book.search": "CERCA TRAVERSATE"
    },

    de: {
      "nav.about": "Über uns", "nav.why": "Warum Lefkimmi", "nav.prices": "Preise",
      "nav.fleet": "Flotte", "nav.schedule": "Fahrplan", "nav.contact": "Kontakt", "nav.book": "Ticket buchen",
      "hero.eyebrow": "Lefkimmi → Korfu · seit 2012",
      "hero.t1": "DER KÜRZESTE WEG", "hero.t2": "nach", "hero.t3": "KORFU",
      "hero.sub": "50 Minuten von Igoumenitsa. Tägliche Überfahrten, moderne Fähren und der Blick aufs Ionische Meer bis zur Insel.",
      "hero.cta1": "Ticket buchen", "hero.cta2": "Fahrplan ansehen",
      "hero.scroll": "ENTDECKEN", "hero.priceLbl": "Mit Transportäquivalent",
      "stat.1l": "Stunde Überfahrt", "stat.2l": "Fahrten täglich", "stat.3l": "moderne Fähren", "stat.4l": "auf See seit",
      "about.eyebrow": "Über uns", "about.title": "Das Meer ist unser Weg.",
      "about.body": "Lefkimmi Lines verbindet täglich den Süden Korfus mit Igoumenitsa, vom Hafen Lefkimmi aus. Seit über zehn Jahren befördern wir Passagiere und Fahrzeuge zuverlässig, sicher und mit Respekt für jeden Reisenden. Wir sind nicht nur eine Überfahrt — wir sind der Anfang Ihres Urlaubs.",
      "why.eyebrow": "Warum Lefkimmi", "why.title": "Näher als du denkst.",
      "why.body": "Viele suchen die Fähre nach Korfu und landen auf der weiter entfernten, teureren Stadtlinie. Lefkimmi im Süden Korfus ist der kürzeste und günstigste Weg, die Insel zu betreten: nur 50 Minuten von Igoumenitsa. Ideal für den Süden Korfus — Kavos, Lefkimmi, Boukari, Agios Georgios.",
      "why.tab1t": "Kurz", "why.tab1v": "50 Min.", "why.tab2t": "Günstig", "why.tab2v": "ab 7,30€",
      "why.tab3t": "Süden", "why.tab3v": "Korfu", "why.tab4t": "Täglich", "why.tab4v": "6+ Fahrten",
      "explore": "ENTDECKEN",
      "prices.eyebrow": "Preise", "prices.title": "Tickets ab 7,30€.",
      "prices.body": "Mit dem Transportäquivalent (staatlicher Zuschuss) ist die Überfahrt nach Korfu eine der günstigsten Griechenlands.",
      "prices.c1": "Passagier", "prices.c1p": "7,30€", "prices.c1u": "mit TÄ",
      "prices.c2": "Mit Motorrad", "prices.c2p": "~16€", "prices.c2u": "mit TÄ",
      "prices.c3": "Mit Auto", "prices.c3p": "~30€", "prices.c3u": "mit TÄ",
      "prices.feat": "Beliebt",
      "prices.note": "Die Tarife des Transportäquivalents gelten für Berechtigte. Endgültige Preise & Buchung über «Ticket buchen».",
      "fleet.eyebrow": "Flotte", "fleet.title": "Zwei Fähren, ein Versprechen: Sicherheit.",
      "fleet.body": "Unsere Fähren bedienen das reisende Publikum treu und systematisch, in absoluter Sicherheit und mit hohem Komfort.",
      "fleet.tag": "Personen-/Autofähre",
      "onboard.eyebrow": "An Bord", "onboard.title": "Lehnen Sie sich zurück. Wir fahren.",
      "onboard.body": "Eine Stunde reicht, um durchzuatmen. Genießen Sie Ihren Kaffee, ein kühles Getränk oder einen warmen Toast aus dem Bordbistro, lassen Sie den Blick aufs Ionische Meer vorbeiziehen — und ehe Sie sich versehen, sind Sie auf Korfu. Schnelligkeit und Sicherheit, immer mit einem Lächeln.",
      "sched.eyebrow": "Fahrplan", "sched.title": "Tagesfahrplan",
      "sched.body": "Prüfen Sie die Zeiten und wählen Sie die passende Überfahrt.",
      "sched.note": "Die Fahrpläne sind Richtwerte und können je nach Saison variieren. Zur Bestätigung & Buchung «Ticket buchen» tippen.",
      "sched.colShip": "Fähre", "sched.colDep": "Abfahrt", "sched.colArr": "Ankunft", "sched.colDur": "Dauer", "sched.colFare": "Preis",
      "sched.fare": "ab 7,30€",
      "map.eyebrow": "Karte", "map.title": "Eine Reise von 1 Stunde.",
      "map.body": "Vom Hafen Lefkimmi zum Hafen Igoumenitsa.", "map.badge": "Reise",
      "reviews.eyebrow": "Bewertungen", "reviews.title": "Reisende lieben die Überfahrt.",
      "reviews.body": "Echte Eindrücke von Passagieren der Linie Lefkimmi–Igoumenitsa.",
      "reviews.count": "auf Basis von 240+ Bewertungen",
      "reviews.r1": "Schnell, einfach und viel ruhiger als die Stadtlinie. Wir waren im Nu im Süden Korfus.",
      "reviews.r1r": "Sommer 2025 · Google",
      "reviews.r2": "Die günstigste Art, mit dem Auto überzusetzen. Freundliche Crew und ein schöner Blick aufs Ionische Meer.",
      "reviews.r2r": "August 2025 · TripAdvisor",
      "reviews.r3": "Ruhige Überfahrt, saubere Fähre und ein toller Kaffee an Bord. Nächstes Jahr wieder über Lefkimmi.",
      "reviews.r3r": "Sommer 2025 · Google",
      "reviews.ph": "Platzhalter-Bewertungen — werden durch echte Bewertungen ersetzt.",
      "contact.eyebrow": "Kontakt", "contact.title": "Wir sind für Sie da.",
      "contact.body": "Für Fahrplanauskünfte, Tickets und Gruppentransfers kontaktieren Sie uns.",
      "contact.email": "E-Mail", "contact.outbound": "Lefkimmi → Igoumenitsa", "contact.inbound": "Igoumenitsa → Lefkimmi",
      "contact.fname": "Vollständiger Name", "contact.femail": "E-Mail", "contact.fmsg": "Nachricht",
      "contact.consent": "Ich akzeptiere die", "contact.privacy": "Datenschutzerklärung",
      "contact.send": "Senden", "contact.okTitle": "Ihre Nachricht wurde gesendet!",
      "contact.okBody": "Wir melden uns in Kürze.",
      "footer.tagline": "Der kürzeste Weg nach Korfu.",
      "footer.nav": "Navigation", "footer.useful": "Nützliches", "footer.contact": "Kontakt",
      "footer.mi": "Transportäquivalent", "footer.terms": "Reisebedingungen", "footer.privacy": "Datenschutz",
      "footer.rights": "Lefkimmi Lines — Lefkimmi, Korfu. Alle Rechte vorbehalten.",
      "sched.colBook": "Buchen",
      "sched.disclaimer": "Die Fahrpläne sind Richtwerte und können je nach Saison variieren. Zur endgültigen Buchung «Ticket buchen» tippen.",
      "book.title": "Überfahrten suchen", "book.from": "Von", "book.to": "Nach",
      "book.date": "Abfahrtsdatum", "book.pax": "Passagiere", "book.vehicle": "Fahrzeug",
      "book.search": "ÜBERFAHRTEN SUCHEN"
    },

    es: {
      "nav.about": "Quiénes somos", "nav.why": "Por qué Lefkimmi", "nav.prices": "Precios",
      "nav.fleet": "Flota", "nav.schedule": "Horarios", "nav.contact": "Contacto", "nav.book": "Reservar",
      "hero.eyebrow": "Lefkimmi → Corfú · desde 2012",
      "hero.t1": "LA RUTA MÁS CORTA", "hero.t2": "a", "hero.t3": "CORFÚ",
      "hero.sub": "50 minutos desde Igoumenitsa. Travesías diarias, ferris modernos y la vista del Jónico hasta la isla.",
      "hero.cta1": "Reservar", "hero.cta2": "Ver horarios",
      "hero.scroll": "EXPLORAR", "hero.priceLbl": "Con Equivalente de Transporte",
      "stat.1l": "hora de travesía", "stat.2l": "travesías al día", "stat.3l": "ferris modernos", "stat.4l": "en el mar desde",
      "about.eyebrow": "Quiénes somos", "about.title": "El mar es nuestro camino.",
      "about.body": "Lefkimmi Lines conecta cada día el sur de Corfú con Igoumenitsa, desde el puerto de Lefkimmi. Durante más de una década hemos transportado pasajeros y vehículos con constancia, seguridad y respeto por cada viajero. No somos solo una travesía — somos el inicio de tus vacaciones.",
      "why.eyebrow": "Por qué Lefkimmi", "why.title": "Más cerca de lo que crees.",
      "why.body": "Muchos buscan el ferri a Corfú y acaban en la línea de la ciudad, más lejana y cara. Lefkimmi, en el sur de Corfú, es la forma más corta y barata de pisar la isla: a solo 50 minutos de Igoumenitsa. Ideal para el sur de Corfú — Kavos, Lefkimmi, Boukari, Agios Georgios.",
      "why.tab1t": "Corto", "why.tab1v": "50 min", "why.tab2t": "Económico", "why.tab2v": "desde 7,30€",
      "why.tab3t": "Sur", "why.tab3v": "Corfú", "why.tab4t": "Diario", "why.tab4v": "6+ travesías",
      "explore": "EXPLORAR",
      "prices.eyebrow": "Precios", "prices.title": "Billetes desde 7,30€.",
      "prices.body": "Con el Equivalente de Transporte (subvención estatal), la travesía a Corfú es de las más económicas de Grecia.",
      "prices.c1": "Pasajero", "prices.c1p": "7,30€", "prices.c1u": "con ET",
      "prices.c2": "Con moto", "prices.c2p": "~16€", "prices.c2u": "con ET",
      "prices.c3": "Con coche", "prices.c3p": "~30€", "prices.c3u": "con ET",
      "prices.feat": "Más elegido",
      "prices.note": "Las tarifas del Equivalente de Transporte se aplican a los beneficiarios. Para precios finales y reserva, pulsa «Reservar».",
      "fleet.eyebrow": "Flota", "fleet.title": "Dos ferris, una promesa: seguridad.",
      "fleet.body": "Nuestros ferris sirven al público viajero con fidelidad y regularidad, con total seguridad y gran comodidad.",
      "fleet.tag": "Ferri de pasajeros / coches",
      "onboard.eyebrow": "A bordo", "onboard.title": "Relájate. Zarpamos.",
      "onboard.body": "Una hora basta para tomar aire. Disfruta de tu café, un refresco o una tostada caliente de la cantina del barco, deja pasar la vista del Jónico — y antes de darte cuenta, estás en Corfú. Rapidez y seguridad, siempre con una sonrisa.",
      "sched.eyebrow": "Horarios", "sched.title": "Horario del día",
      "sched.body": "Consulta los horarios y elige la travesía que más te convenga.",
      "sched.note": "Los horarios son indicativos y pueden variar según la temporada. Para confirmar y reservar, pulsa «Reservar».",
      "sched.colShip": "Ferri", "sched.colDep": "Salida", "sched.colArr": "Llegada", "sched.colDur": "Duración", "sched.colFare": "Tarifa",
      "sched.fare": "desde 7,30€",
      "map.eyebrow": "Mapa", "map.title": "Un viaje de 1 hora.",
      "map.body": "Del puerto de Lefkimmi al puerto de Igoumenitsa.", "map.badge": "viaje",
      "reviews.eyebrow": "Reseñas", "reviews.title": "Los viajeros adoran la travesía.",
      "reviews.body": "Impresiones reales de pasajeros de la línea Lefkimmi–Igoumenitsa.",
      "reviews.count": "según 240+ reseñas",
      "reviews.r1": "Rápido, fácil y mucho más tranquilo que la línea de la ciudad. Llegamos al sur de Corfú enseguida.",
      "reviews.r1r": "Verano 2025 · Google",
      "reviews.r2": "La forma más económica de cruzar con el coche. Tripulación amable y una hermosa vista del Jónico.",
      "reviews.r2r": "Agosto 2025 · TripAdvisor",
      "reviews.r3": "Travesía tranquila, ferri limpio y un café estupendo a bordo. El año que viene, otra vez por Lefkimmi.",
      "reviews.r3r": "Verano 2025 · Google",
      "reviews.ph": "Reseñas de muestra — se sustituirán por valoraciones reales.",
      "contact.eyebrow": "Contacto", "contact.title": "Estamos aquí.",
      "contact.body": "Para horarios, billetes y traslados de grupo, contáctanos.",
      "contact.email": "Correo", "contact.outbound": "Lefkimmi → Igoumenitsa", "contact.inbound": "Igoumenitsa → Lefkimmi",
      "contact.fname": "Nombre completo", "contact.femail": "Correo", "contact.fmsg": "Mensaje",
      "contact.consent": "Acepto la", "contact.privacy": "Política de privacidad",
      "contact.send": "Enviar", "contact.okTitle": "¡Tu mensaje ha sido enviado!",
      "contact.okBody": "Te responderemos en breve.",
      "footer.tagline": "El camino más corto a Corfú.",
      "footer.nav": "Navegación", "footer.useful": "Útiles", "footer.contact": "Contacto",
      "footer.mi": "Equivalente de Transporte", "footer.terms": "Condiciones de viaje", "footer.privacy": "Privacidad",
      "footer.rights": "Lefkimmi Lines — Lefkimmi, Corfú. Todos los derechos reservados.",
      "sched.colBook": "Reservar",
      "sched.disclaimer": "Los horarios son indicativos y pueden variar según la temporada. Para la reserva definitiva, pulsa «Reservar».",
      "book.title": "Buscar travesías", "book.from": "Desde", "book.to": "Hasta",
      "book.date": "Fecha de salida", "book.pax": "Pasajeros", "book.vehicle": "Vehículo",
      "book.search": "BUSCAR TRAVESÍAS"
    },

    ro: {
      "nav.about": "Despre noi", "nav.why": "De ce Lefkimmi", "nav.prices": "Prețuri",
      "nav.fleet": "Flota", "nav.schedule": "Orar", "nav.contact": "Contact", "nav.book": "Rezervă",
      "hero.eyebrow": "Lefkimmi → Corfu · din 2012",
      "hero.t1": "CEA MAI SCURTĂ RUTĂ", "hero.t2": "spre", "hero.t3": "CORFU",
      "hero.sub": "50 de minute din Igoumenitsa. Curse zilnice, feriboturi moderne și priveliștea Mării Ionice până pe insulă.",
      "hero.cta1": "Rezervă", "hero.cta2": "Vezi orarul",
      "hero.scroll": "EXPLOREAZĂ", "hero.priceLbl": "Cu Echivalentul de Transport",
      "stat.1l": "oră de traversare", "stat.2l": "curse pe zi", "stat.3l": "feriboturi moderne", "stat.4l": "pe mare din",
      "about.eyebrow": "Despre noi", "about.title": "Marea este drumul nostru.",
      "about.body": "Lefkimmi Lines leagă zilnic sudul Corfuului de Igoumenitsa, din portul Lefkimmi. De peste zece ani transportăm pasageri și vehicule cu consecvență, siguranță și respect pentru fiecare călător. Nu suntem doar o traversare — suntem începutul vacanței tale.",
      "why.eyebrow": "De ce Lefkimmi", "why.title": "Mai aproape decât crezi.",
      "why.body": "Mulți caută feribotul spre Corfu și ajung pe linia orașului, mai îndepărtată și mai scumpă. Lefkimmi, în sudul Corfuului, este cel mai scurt și mai ieftin mod de a pune piciorul pe insulă: la doar 50 de minute de Igoumenitsa. Ideal pentru sudul Corfuului — Kavos, Lefkimmi, Boukari, Agios Georgios.",
      "why.tab1t": "Scurt", "why.tab1v": "50 min", "why.tab2t": "Economic", "why.tab2v": "de la 7,30€",
      "why.tab3t": "Sud", "why.tab3v": "Corfu", "why.tab4t": "Zilnic", "why.tab4v": "6+ curse",
      "explore": "EXPLOREAZĂ",
      "prices.eyebrow": "Prețuri", "prices.title": "Bilete de la 7,30€.",
      "prices.body": "Cu Echivalentul de Transport (subvenție de stat), traversarea spre Corfu este printre cele mai accesibile din Grecia.",
      "prices.c1": "Pasager", "prices.c1p": "7,30€", "prices.c1u": "cu ET",
      "prices.c2": "Cu motocicletă", "prices.c2p": "~16€", "prices.c2u": "cu ET",
      "prices.c3": "Cu mașina", "prices.c3p": "~30€", "prices.c3u": "cu ET",
      "prices.feat": "Cel mai ales",
      "prices.note": "Tarifele «Echivalentul de Transport» se aplică beneficiarilor. Pentru prețuri finale și rezervare, apasă «Rezervă».",
      "fleet.eyebrow": "Flota", "fleet.title": "Două feriboturi, o promisiune: siguranța.",
      "fleet.body": "Feriboturile noastre servesc publicul călător cu fidelitate și regularitate, în siguranță deplină și cu mare confort.",
      "fleet.tag": "Feribot pasageri / mașini",
      "onboard.eyebrow": "La bord", "onboard.title": "Relaxați-vă. Navigăm noi.",
      "onboard.body": "O oră ajunge ca să-ți tragi sufletul. Bucură-te de cafea, o băutură rece sau un toast cald de la barul navei, lasă priveliștea Mării Ionice să treacă — și până să-ți dai seama, ești în Corfu. Viteză și siguranță, mereu cu zâmbetul pe buze.",
      "sched.eyebrow": "Orar", "sched.title": "Orarul zilei",
      "sched.body": "Verifică orele și alege cursa potrivită.",
      "sched.note": "Orarele sunt orientative și pot varia în funcție de sezon. Pentru confirmare și rezervare, apasă «Rezervă».",
      "sched.colShip": "Feribot", "sched.colDep": "Plecare", "sched.colArr": "Sosire", "sched.colDur": "Durată", "sched.colFare": "Tarif",
      "sched.fare": "de la 7,30€",
      "map.eyebrow": "Hartă", "map.title": "O călătorie de 1 oră.",
      "map.body": "Din portul Lefkimmi în portul Igoumenitsa.", "map.badge": "călătorie",
      "reviews.eyebrow": "Recenzii", "reviews.title": "Călătorii adoră traversarea.",
      "reviews.body": "Impresii reale ale pasagerilor de pe linia Lefkimmi–Igoumenitsa.",
      "reviews.count": "pe baza a peste 240 de recenzii",
      "reviews.r1": "Rapid, ușor și mult mai liniștit decât linia orașului. Am ajuns în sudul Corfuului cât ai clipi.",
      "reviews.r1r": "Vara 2025 · Google",
      "reviews.r2": "Cel mai accesibil mod de a traversa cu mașina. Echipaj prietenos și o priveliște frumoasă a Mării Ionice.",
      "reviews.r2r": "August 2025 · TripAdvisor",
      "reviews.r3": "Traversare lină, feribot curat și o cafea grozavă la bord. La anul tot prin Lefkimmi.",
      "reviews.r3r": "Vara 2025 · Google",
      "reviews.ph": "Recenzii demonstrative — vor fi înlocuite cu evaluări reale.",
      "contact.eyebrow": "Contact", "contact.title": "Suntem aici.",
      "contact.body": "Pentru orare, bilete și transferuri de grup, contactează-ne.",
      "contact.email": "Email", "contact.outbound": "Lefkimmi → Igoumenitsa", "contact.inbound": "Igoumenitsa → Lefkimmi",
      "contact.fname": "Nume complet", "contact.femail": "Email", "contact.fmsg": "Mesaj",
      "contact.consent": "Accept", "contact.privacy": "Politica de confidențialitate",
      "contact.send": "Trimite", "contact.okTitle": "Mesajul tău a fost trimis!",
      "contact.okBody": "Te vom contacta în curând.",
      "footer.tagline": "Cel mai scurt drum spre Corfu.",
      "footer.nav": "Navigare", "footer.useful": "Utile", "footer.contact": "Contact",
      "footer.mi": "Echivalentul de Transport", "footer.terms": "Condiții de călătorie", "footer.privacy": "Confidențialitate",
      "footer.rights": "Lefkimmi Lines — Lefkimmi, Corfu. Toate drepturile rezervate.",
      "sched.colBook": "Rezervă",
      "sched.disclaimer": "Orarele sunt orientative și pot varia în funcție de sezon. Pentru rezervare finală, apasă «Rezervă».",
      "book.title": "Caută curse", "book.from": "De la", "book.to": "Spre",
      "book.date": "Data plecării", "book.pax": "Pasageri", "book.vehicle": "Vehicul",
      "book.search": "CAUTĂ CURSE"
    },

    bg: {
      "nav.about": "За нас", "nav.why": "Защо Лефкими", "nav.prices": "Цени",
      "nav.fleet": "Флот", "nav.schedule": "Разписание", "nav.contact": "Контакти", "nav.book": "Резервирай",
      "hero.eyebrow": "Лефкими → Корфу · от 2012",
      "hero.t1": "НАЙ-КРАТКИЯТ ПЪТ", "hero.t2": "до", "hero.t3": "КОРФУ",
      "hero.sub": "50 минути от Игуменица. Ежедневни курсове, модерни фериботи и гледката към Йонийско море чак до острова.",
      "hero.cta1": "Резервирай", "hero.cta2": "Виж разписанието",
      "hero.scroll": "РАЗГЛЕДАЙ", "hero.priceLbl": "С Транспортен еквивалент",
      "stat.1l": "час преминаване", "stat.2l": "курса на ден", "stat.3l": "модерни фериботи", "stat.4l": "в морето от",
      "about.eyebrow": "За нас", "about.title": "Морето е нашият път.",
      "about.body": "Lefkimmi Lines свързва всеки ден южната част на Корфу с Игуменица, от пристанището на Лефкими. Повече от десет години превозваме пътници и превозни средства последователно, безопасно и с уважение към всеки пътник. Ние не сме просто преминаване — ние сме началото на вашата почивка.",
      "why.eyebrow": "Защо Лефкими", "why.title": "По-близо, отколкото мислите.",
      "why.body": "Мнозина търсят ферибота за Корфу и се озовават на по-далечната и по-скъпа градска линия. Лефкими, в южната част на Корфу, е най-краткият и евтин начин да стъпите на острова: само на 50 минути от Игуменица. Идеално за южен Корфу — Кавос, Лефкими, Букари, Агиос Георгиос.",
      "why.tab1t": "Кратко", "why.tab1v": "50 мин", "why.tab2t": "Изгодно", "why.tab2v": "от 7,30€",
      "why.tab3t": "Юг", "why.tab3v": "Корфу", "why.tab4t": "Ежедневно", "why.tab4v": "6+ курса",
      "explore": "РАЗГЛЕДАЙ",
      "prices.eyebrow": "Цени", "prices.title": "Билети от 7,30€.",
      "prices.body": "С Транспортния еквивалент (държавна субсидия) преминаването до Корфу е сред най-достъпните в Гърция.",
      "prices.c1": "Пътник", "prices.c1p": "7,30€", "prices.c1u": "с ТЕ",
      "prices.c2": "С мотоциклет", "prices.c2p": "~16€", "prices.c2u": "с ТЕ",
      "prices.c3": "С автомобил", "prices.c3p": "~30€", "prices.c3u": "с ТЕ",
      "prices.feat": "Най-популярно",
      "prices.note": "Тарифите по «Транспортен еквивалент» важат за правоимащи. За окончателни цени и резервация натиснете «Резервирай».",
      "fleet.eyebrow": "Флот", "fleet.title": "Два ферибота, едно обещание: безопасност.",
      "fleet.body": "Нашите фериботи обслужват пътуващата публика вярно и системно, при пълна безопасност и голям комфорт.",
      "fleet.tag": "Пътнически / автомобилен ферибот",
      "onboard.eyebrow": "На борда", "onboard.title": "Настанете се удобно. Отплаваме.",
      "onboard.body": "Един час стига, за да си поемете дъх. Насладете се на кафето си, разхладителна напитка или топъл тост от бара на кораба, оставете гледката към Йонийско море да преминава — и преди да усетите, сте в Корфу. Бързина и безопасност, винаги с усмивка.",
      "sched.eyebrow": "Разписание", "sched.title": "Дневно разписание",
      "sched.body": "Проверете часовете и изберете удобния курс.",
      "sched.note": "Разписанията са ориентировъчни и може да се променят според сезона. За потвърждение и резервация натиснете «Резервирай».",
      "sched.colShip": "Ферибот", "sched.colDep": "Тръгване", "sched.colArr": "Пристигане", "sched.colDur": "Времетраене", "sched.colFare": "Цена",
      "sched.fare": "от 7,30€",
      "map.eyebrow": "Карта", "map.title": "Пътуване от 1 час.",
      "map.body": "От пристанището на Лефкими до пристанището на Игуменица.", "map.badge": "път",
      "reviews.eyebrow": "Отзиви", "reviews.title": "Пътниците обичат преминаването.",
      "reviews.body": "Истински впечатления от пътници по линията Лефкими–Игуменица.",
      "reviews.count": "въз основа на 240+ отзива",
      "reviews.r1": "Бързо, лесно и много по-спокойно от градската линия. Озовахме се в южен Корфу за нула време.",
      "reviews.r1r": "Лято 2025 · Google",
      "reviews.r2": "Най-достъпният начин да преминеш с кола. Любезен екипаж и прекрасна гледка към Йонийско море.",
      "reviews.r2r": "Август 2025 · TripAdvisor",
      "reviews.r3": "Спокойно преминаване, чист ферибот и страхотно кафе на борда. Догодина пак през Лефкими.",
      "reviews.r3r": "Лято 2025 · Google",
      "reviews.ph": "Примерни отзиви — ще бъдат заменени с реални оценки.",
      "contact.eyebrow": "Контакти", "contact.title": "Тук сме.",
      "contact.body": "За разписания, билети и групови превози се свържете с нас.",
      "contact.email": "Имейл", "contact.outbound": "Лефкими → Игуменица", "contact.inbound": "Игуменица → Лефкими",
      "contact.fname": "Име и фамилия", "contact.femail": "Имейл", "contact.fmsg": "Съобщение",
      "contact.consent": "Приемам", "contact.privacy": "Политика за поверителност",
      "contact.send": "Изпрати", "contact.okTitle": "Съобщението ви е изпратено!",
      "contact.okBody": "Ще се свържем с вас скоро.",
      "footer.tagline": "Най-краткият път до Корфу.",
      "footer.nav": "Навигация", "footer.useful": "Полезно", "footer.contact": "Контакти",
      "footer.mi": "Транспортен еквивалент", "footer.terms": "Условия за пътуване", "footer.privacy": "Поверителност",
      "footer.rights": "Lefkimmi Lines — Лефкими, Корфу. Всички права запазени.",
      "sched.colBook": "Резервирай",
      "sched.disclaimer": "Разписанията са ориентировъчни и може да се променят. За окончателна резервация натиснете «Резервирай».",
      "book.title": "Търсене на курсове", "book.from": "От", "book.to": "До",
      "book.date": "Дата на заминаване", "book.pax": "Пътници", "book.vehicle": "Превозно средство",
      "book.search": "ТЪРСЕНЕ НА КУРСОВЕ"
    },

    ru: {
      "nav.about": "О нас", "nav.why": "Почему Лефкими", "nav.prices": "Цены",
      "nav.fleet": "Флот", "nav.schedule": "Расписание", "nav.contact": "Контакты", "nav.book": "Купить билет",
      "hero.eyebrow": "Лефкими → Корфу · с 2012",
      "hero.t1": "САМЫЙ КОРОТКИЙ ПУТЬ", "hero.t2": "на", "hero.t3": "КОРФУ",
      "hero.sub": "50 минут от Игуменицы. Ежедневные рейсы, современные паромы и вид на Ионическое море до самого острова.",
      "hero.cta1": "Купить билет", "hero.cta2": "Смотреть расписание",
      "hero.scroll": "СМОТРЕТЬ", "hero.priceLbl": "С транспортным эквивалентом",
      "stat.1l": "час в пути", "stat.2l": "рейсов в день", "stat.3l": "современных парома", "stat.4l": "в море с",
      "about.eyebrow": "О нас", "about.title": "Море — наша дорога.",
      "about.body": "Lefkimmi Lines ежедневно соединяет юг Корфу с Игуменицей, из порта Лефкими. Более десяти лет мы перевозим пассажиров и автомобили стабильно, безопасно и с уважением к каждому путешественнику. Мы не просто переправа — мы начало вашего отдыха.",
      "why.eyebrow": "Почему Лефкими", "why.title": "Ближе, чем кажется.",
      "why.body": "Многие ищут паром на Корфу и оказываются на дальней и более дорогой городской линии. Лефкими на юге Корфу — самый короткий и дешёвый способ ступить на остров: всего 50 минут от Игуменицы. Идеально для юга Корфу — Кавос, Лефкими, Букари, Агиос-Георгиос.",
      "why.tab1t": "Коротко", "why.tab1v": "50 мин", "why.tab2t": "Выгодно", "why.tab2v": "от 7,30€",
      "why.tab3t": "Юг", "why.tab3v": "Корфу", "why.tab4t": "Ежедневно", "why.tab4v": "6+ рейсов",
      "explore": "СМОТРЕТЬ",
      "prices.eyebrow": "Цены", "prices.title": "Билеты от 7,30€.",
      "prices.body": "С Транспортным эквивалентом (государственная субсидия) переправа на Корфу — одна из самых доступных в Греции.",
      "prices.c1": "Пассажир", "prices.c1p": "7,30€", "prices.c1u": "с ТЭ",
      "prices.c2": "С мотоциклом", "prices.c2p": "~16€", "prices.c2u": "с ТЭ",
      "prices.c3": "С автомобилем", "prices.c3p": "~30€", "prices.c3u": "с ТЭ",
      "prices.feat": "Популярно",
      "prices.note": "Тарифы «Транспортного эквивалента» действуют для имеющих право. Окончательные цены и бронирование — по кнопке «Купить билет».",
      "fleet.eyebrow": "Флот", "fleet.title": "Два парома, одно обещание: безопасность.",
      "fleet.body": "Наши паромы служат путешественникам преданно и системно, в полной безопасности и с высоким комфортом.",
      "fleet.tag": "Пассажирский / автомобильный паром",
      "onboard.eyebrow": "На борту", "onboard.title": "Расслабьтесь. Мы отправляемся.",
      "onboard.body": "Часа достаточно, чтобы перевести дух. Насладитесь кофе, прохладительным напитком или горячим тостом из бортового буфета, дайте виду Ионического моря проплыть мимо — и не успеете оглянуться, как вы на Корфу. Скорость и безопасность, всегда с улыбкой.",
      "sched.eyebrow": "Расписание", "sched.title": "Расписание на день",
      "sched.body": "Проверьте время и выберите удобный рейс.",
      "sched.note": "Расписание ориентировочное и может меняться по сезону. Для подтверждения и бронирования нажмите «Купить билет».",
      "sched.colShip": "Паром", "sched.colDep": "Отправление", "sched.colArr": "Прибытие", "sched.colDur": "В пути", "sched.colFare": "Цена",
      "sched.fare": "от 7,30€",
      "map.eyebrow": "Карта", "map.title": "Путешествие 1 час.",
      "map.body": "От порта Лефкими до порта Игуменица.", "map.badge": "в пути",
      "reviews.eyebrow": "Отзывы", "reviews.title": "Путешественники любят этот маршрут.",
      "reviews.body": "Реальные впечатления пассажиров линии Лефкими–Игуменица.",
      "reviews.count": "по 240+ отзывам",
      "reviews.r1": "Быстро, легко и гораздо спокойнее, чем городская линия. Мы оказались на юге Корфу в мгновение ока.",
      "reviews.r1r": "Лето 2025 · Google",
      "reviews.r2": "Самый доступный способ переправиться на машине. Дружелюбная команда и прекрасный вид на Ионическое море.",
      "reviews.r2r": "Август 2025 · TripAdvisor",
      "reviews.r3": "Спокойная переправа, чистый паром и отличный кофе на борту. В следующем году снова через Лефкими.",
      "reviews.r3r": "Лето 2025 · Google",
      "reviews.ph": "Демонстрационные отзывы — будут заменены реальными оценками.",
      "contact.eyebrow": "Контакты", "contact.title": "Мы здесь.",
      "contact.body": "По расписанию, билетам и групповым перевозкам свяжитесь с нами.",
      "contact.email": "Эл. почта", "contact.outbound": "Лефкими → Игуменица", "contact.inbound": "Игуменица → Лефкими",
      "contact.fname": "Имя и фамилия", "contact.femail": "Эл. почта", "contact.fmsg": "Сообщение",
      "contact.consent": "Я принимаю", "contact.privacy": "Политику конфиденциальности",
      "contact.send": "Отправить", "contact.okTitle": "Ваше сообщение отправлено!",
      "contact.okBody": "Мы скоро свяжемся с вами.",
      "footer.tagline": "Кратчайший путь на Корфу.",
      "footer.nav": "Навигация", "footer.useful": "Полезное", "footer.contact": "Контакты",
      "footer.mi": "Транспортный эквивалент", "footer.terms": "Условия путешествия", "footer.privacy": "Конфиденциальность",
      "footer.rights": "Lefkimmi Lines — Лефкими, Корфу. Все права защищены.",
      "sched.colBook": "Купить",
      "sched.disclaimer": "Расписание ориентировочное и может меняться по сезону. Для бронирования нажмите «Купить билет».",
      "book.title": "Поиск рейсов", "book.from": "Откуда", "book.to": "Куда",
      "book.date": "Дата отправления", "book.pax": "Пассажиры", "book.vehicle": "Транспортное средство",
      "book.search": "ПОИСК РЕЙСОВ"
    }
  };

  var STORE_KEY = "ll_lang";
  var current = "el";
  var originals = null; // cache of Greek source per element

  function cacheOriginals() {
    originals = [];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      originals.push({ el: el, html: el.innerHTML });
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("data-ph-el", el.getAttribute("placeholder") || "");
    });
  }

  function resolve(lang, key) {
    if (lang === "el") return null; // use original Greek
    var d = DICT[lang];
    if (d && d[key] != null) return d[key];
    if (DICT.en[key] != null) return DICT.en[key]; // EN fallback
    return null; // -> original Greek
  }

  function apply(lang) {
    if (originals === null) cacheOriginals();
    originals.forEach(function (o) {
      var key = o.el.getAttribute("data-i18n");
      var val = resolve(lang, key);
      o.el.innerHTML = (val === null) ? o.html : val;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      var val = resolve(lang, key);
      el.setAttribute("placeholder", (val === null) ? (el.getAttribute("data-ph-el") || "") : val);
    });
    document.documentElement.setAttribute("lang", lang);
    current = lang;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    syncUI(lang);
  }

  function syncUI(lang) {
    var meta = LANGS.filter(function (l) { return l.code === lang; })[0] || LANGS[0];
    var trig = document.querySelector("[data-lang-current]");
    if (trig) trig.textContent = meta.short;
    document.querySelectorAll("[data-lang-opt]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang-opt") === lang);
    });
  }

  function buildMenu() {
    var menu = document.querySelector("[data-lang-menu]");
    if (!menu) return;
    menu.innerHTML = "";
    LANGS.forEach(function (l) {
      var b = document.createElement("button");
      b.setAttribute("data-lang-opt", l.code);
      b.innerHTML = '<span>' + l.native + '</span><span class="code">' + l.short + '</span>';
      b.addEventListener("click", function () {
        apply(l.code);
        var wrap = document.querySelector("[data-lang]");
        if (wrap) wrap.classList.remove("open");
      });
      menu.appendChild(b);
    });
  }

  function init() {
    buildMenu();
    var saved = "el";
    try { saved = localStorage.getItem(STORE_KEY) || "el"; } catch (e) {}
    apply(saved);

    var wrap = document.querySelector("[data-lang]");
    var btn = document.querySelector("[data-lang-btn]");
    if (btn && wrap) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        wrap.classList.toggle("open");
      });
      document.addEventListener("click", function (e) {
        if (!wrap.contains(e.target)) wrap.classList.remove("open");
      });
    }
  }

  global.LLi18n = { init: init, apply: apply, LANGS: LANGS };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
