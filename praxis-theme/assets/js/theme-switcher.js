(function () {
  'use strict';

  // ── Language definitions ────────────────────────────────────────────────────
  var LANGS = [
    { code: 'el', flag: '🇬🇷', name: 'Ελληνικά', label: 'GR' },
    { code: 'en', flag: '🇬🇧', name: 'English',  label: 'EN' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch',  label: 'DE' },
    { code: 'fr', flag: '🇫🇷', name: 'Français', label: 'FR' },
    { code: 'ja', flag: '🇯🇵', name: '日本語',   label: 'JP' },
    { code: 'es', flag: '🇪🇸', name: 'Español',  label: 'ES' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano', label: 'IT' },
  ];

  // ── Translations ────────────────────────────────────────────────────────────
  var T = {

    el: {
      html_lang:        'el',
      nav_cta:          'Ξεκίνα →',
      nav_services:     'Υπηρεσίες',
      nav_pricing:      'Τιμές',
      hero_eyebrow:     'Online παρουσία για ελληνικές επιχειρήσεις',
      hero_tw:          'Κάθε μέρα που δεν υπάρχεις online κερδίζει ο άλλος.',
      hero_sub:         'Σε 48 ώρες σε βρίσκουν. Από €20 το μήνα.',
      hero_cta1:        'Ξεκίνα σήμερα →',
      hero_cta2:        'δες πώς θα έμοιαζε το site σου ↓',
      scroll:           'scroll',
      nums:             ['Χρόνος παράδοσης της παρουσίας σου', 'Το μήνα αρκεί για να υπάρχεις online', 'Ελληνικές επιχειρήσεις χρειάζονται online παρουσία'],
      prob_label:       'Το πρόβλημα',
      prob_h2:          'Ο ανταγωνιστής σου είναι online. Εσύ όχι.',
      prob_ps:          ['Κάθε μέρα που δεν υπάρχεις στο διαδίκτυο, χάνεις πελάτες που ψάχνουν ακριβώς αυτό που προσφέρεις. Δεν σε βρίσκουν. Πάνε αλλού.', 'Η online παρουσία δεν είναι πολυτέλεια — είναι η πόρτα της επιχείρησής σου. Και η πόρτα του ανταγωνιστή σου είναι ανοιχτή 24/7.'],
      story_name:       'Ο Νίκος',
      story_sub:        'Ιδιοκτήτης εστιατορίου · Θεσσαλονίκη',
      story_quote:      '"Είχα 3 τραπέζια άδεια κάθε βράδυ. Τώρα έχω λίστα αναμονής κάθε Σαββατοκύριακο."',
      story_stats:      ['κρατήσεις', 'παράδοση', 'το μήνα'],
      svc_label:        'Υπηρεσίες',
      svc_h2:           'Τι κάνουμε.',
      svc: [
        { title: 'Η βιτρίνα που δουλεύει 24/7',                         desc: 'Custom website που αντικατοπτρίζει την επιχείρησή σου. Design, hosting, SEO — τα πάντα έτοιμα.',                                                                       price: '€350 εφάπαξ' },
        { title: 'Οι πελάτες σου είναι στο Instagram. Εσύ πού είσαι;',  desc: 'Δημιουργία και διαχείριση social media. Posts, stories, engagement — εσύ δεν κάνεις τίποτα.',                                                                           price: '€80/μήνα'   },
        { title: 'Υπάρχεις. Από σήμερα.',                                desc: 'Google Business, online presence, βασικό site — όλα στημένα σε 48 ώρες. Το ελάχιστο που χρειάζεσαι για να σε βρίσκουν οι πελάτες σου.',                               price: '€20/μήνα'   },
      ],
      proc_label:       'Πώς δουλεύουμε',
      proc_h2:          'Απλά. Γρήγορα.',
      proc_badge:       '⚡ Παράδοση σε 48 ώρες',
      steps: [
        { h: 'Μιλάμε',     p: '15 λεπτά αρκούν. Καταλαβαίνουμε τι χρειάζεσαι και σου προτείνουμε την καλύτερη λύση.' },
        { h: 'Φτιάχνουμε', p: 'Αναλαμβάνουμε τα πάντα. Design, περιεχόμενο, τεχνικά — εσύ δεν κάνεις τίποτα.'       },
        { h: 'Υπάρχεις.',  p: 'Σε 48 ώρες είσαι online. Οι πελάτες σε βρίσκουν. Εσύ ασχολείσαι με αυτό που ξέρεις.' },
      ],
      price_label:      'Τιμές',
      price_h2:         'Διαλέξτε το πλάνο σας.',
      plans: [
        { name: 'ΠΑΡΟΥΣΙΑ',  features: ['Google Business Profile', 'Βασική ιστοσελίδα 1 σελίδας', 'WhatsApp επικοινωνία', 'Παράδοση σε 48 ώρες', 'Hosting περιλαμβάνεται'] },
        { name: 'ΠΑΡΟΥΣΙΑ+', features: ['Όλα του ΠΑΡΟΥΣΙΑ', 'Διαχείριση Instagram', '4 posts ανά μήνα', 'Stories & engagement', 'Μηνιαία αναφορά', 'Προτεραιότητα υποστήριξης'] },
        { name: 'ΚΥΡΙΑΡΧΙΑ', features: ['Πλήρες custom website', 'SEO βελτιστοποίηση', 'Φόρμα επικοινωνίας', 'Google Analytics', 'Responsive design', '6 μήνες δωρεάν υποστήριξη'] },
      ],
      plan_cta:         'Ξεκίνα →',
      demo_label:       'Live Demo',
      demo_h2:          'Δες πώς θα έμοιαζε το site σου.',
      demo_sub:         'Γράψε το όνομα της επιχείρησής σου και δες μια πρόταση στιγμιαία.',
      demo_placeholder: 'π.χ. Ταβέρνα Μανώλης, Ιατρείο Παπαδόπουλος, CrossFit Athens…',
      demo_btn:         'Δες το →',
      contact_h:        'Μιλάμε <span class="hl">σήμερα.</span>',
      contact_sub:      'Δωρεάν ανάλυση της επιχείρησής σου. Χωρίς δέσμευση.',
      contact_wa:       'WhatsApp →',
      contact_note:     'Απαντάμε εντός 2 ωρών · Δωρεάν ανάλυση · Χωρίς δέσμευση',
      footer_copy:      '© 2026 praxis · Φτιάχνουμε παρουσία.',
      price_month:      '/μήνα',
      price_once:       'εφάπαξ',
      price_popular:    'Δημοφιλές',
    },

    en: {
      html_lang:        'en',
      nav_cta:          'Get started →',
      nav_services:     'Services',
      nav_pricing:      'Pricing',
      hero_eyebrow:     'Online presence for Greek businesses',
      hero_tw:          'Every day you\'re not online, your competitor wins.',
      hero_sub:         'Found online in 48 hours. From €20/month.',
      hero_cta1:        'Start today →',
      hero_cta2:        'see how your site would look ↓',
      scroll:           'scroll',
      nums:             ['Delivery time for your online presence', 'Per month is all you need to exist online', 'Of Greek businesses need an online presence'],
      prob_label:       'The problem',
      prob_h2:          'Your competitor is online. You\'re not.',
      prob_ps:          ['Every day without the internet, you lose customers searching for exactly what you offer. They can\'t find you. They go elsewhere.', 'An online presence isn\'t a luxury — it\'s the front door of your business. And your competitor\'s door is open 24/7.'],
      story_name:       'Nikos',
      story_sub:        'Restaurant owner · Thessaloniki',
      story_quote:      '"I had 3 empty tables every night. Now I have a waiting list every weekend."',
      story_stats:      ['bookings', 'delivery', 'per month'],
      svc_label:        'Services',
      svc_h2:           'What we do.',
      svc: [
        { title: 'The showcase that works 24/7',                    desc: 'A custom website that reflects your business. Design, hosting, SEO — everything ready.',                                    price: '€350 one-time' },
        { title: 'Your customers are on Instagram. Where are you?', desc: 'Social media creation and management. Posts, stories, engagement — you do nothing.',                                        price: '€80/month'    },
        { title: 'You exist. Starting today.',                       desc: 'Google Business, online presence, starter site — all set up in 48 hours. The minimum to get found by your customers.',     price: '€20/month'    },
      ],
      proc_label:       'How we work',
      proc_h2:          'Simple. Fast.',
      proc_badge:       '⚡ Delivered in 48 hours',
      steps: [
        { h: 'We talk',  p: '15 minutes is all it takes. We understand your needs and recommend the best solution.' },
        { h: 'We build', p: 'We handle everything. Design, content, technical — you do nothing.'                   },
        { h: 'You exist.', p: 'In 48 hours you\'re online. Customers find you. You focus on what you do best.'    },
      ],
      price_label:      'Pricing',
      price_h2:         'Choose your plan.',
      plans: [
        { name: 'PRESENCE',  features: ['Google Business Profile', '1-page basic website', 'WhatsApp communication', 'Delivery in 48 hours', 'Hosting included'] },
        { name: 'PRESENCE+', features: ['Everything in PRESENCE', 'Instagram management', '4 posts per month', 'Stories & engagement', 'Monthly report', 'Priority support'] },
        { name: 'DOMINANCE', features: ['Full custom website', 'SEO optimization', 'Contact form', 'Google Analytics', 'Responsive design', '6 months free support'] },
      ],
      plan_cta:         'Start →',
      demo_label:       'Live Demo',
      demo_h2:          'See how your site would look.',
      demo_sub:         'Type your business name and see a proposal instantly.',
      demo_placeholder: 'e.g. Manolis Taverna, Smith Clinic, CrossFit Athens…',
      demo_btn:         'See it →',
      contact_h:        'Let\'s talk <span class="hl">today.</span>',
      contact_sub:      'Free business analysis. No commitment.',
      contact_wa:       'WhatsApp →',
      contact_note:     'We reply within 2 hours · Free analysis · No commitment',
      footer_copy:      '© 2026 praxis · We build presence.',
      price_month:      '/mo',
      price_once:       'one-time',
      price_popular:    'Popular',
    },

    de: {
      html_lang:        'de',
      nav_cta:          'Loslegen →',
      nav_services:     'Leistungen',
      nav_pricing:      'Preise',
      hero_eyebrow:     'Online-Präsenz für griechische Unternehmen',
      hero_tw:          'Jeden Tag ohne Online-Auftritt gewinnt dein Konkurrent.',
      hero_sub:         'In 48 Stunden online gefunden. Ab €20 pro Monat.',
      hero_cta1:        'Heute starten →',
      hero_cta2:        'sieh, wie deine Website aussehen würde ↓',
      scroll:           'scrollen',
      nums:             ['Lieferzeit für deinen Online-Auftritt', 'Pro Monat reicht für deine Online-Existenz', 'Griechischer Unternehmen brauchen Online-Präsenz'],
      prob_label:       'Das Problem',
      prob_h2:          'Dein Konkurrent ist online. Du nicht.',
      prob_ps:          ['Jeden Tag ohne Internet verlierst du Kunden, die genau das suchen, was du anbietest. Sie finden dich nicht. Sie gehen woanders hin.', 'Online-Präsenz ist kein Luxus — es ist die Eingangstür deines Unternehmens. Und die Tür deines Konkurrenten ist 24/7 geöffnet.'],
      story_name:       'Nikos',
      story_sub:        'Restaurantbesitzer · Thessaloniki',
      story_quote:      '"Ich hatte jeden Abend 3 leere Tische. Jetzt habe ich jedes Wochenende eine Warteliste."',
      story_stats:      ['Buchungen', 'Lieferung', 'pro Monat'],
      svc_label:        'Leistungen',
      svc_h2:           'Was wir machen.',
      svc: [
        { title: 'Das Schaufenster, das 24/7 arbeitet', desc: 'Eine individuelle Website, die dein Unternehmen widerspiegelt. Design, Hosting, SEO — alles fertig.',                                      price: '€350 einmalig' },
        { title: 'Deine Kunden sind auf Instagram. Und du?', desc: 'Erstellung und Verwaltung von Social Media. Posts, Stories, Engagement — du machst nichts.',                                          price: '€80/Monat'    },
        { title: 'Du existierst. Ab heute.',                desc: 'Google Business, Online-Präsenz, Basis-Website — alles in 48 Stunden eingerichtet. Das Minimum, damit Kunden dich finden.',           price: '€20/Monat'    },
      ],
      proc_label:       'Wie wir arbeiten',
      proc_h2:          'Einfach. Schnell.',
      proc_badge:       '⚡ Lieferung in 48 Stunden',
      steps: [
        { h: 'Wir reden',   p: '15 Minuten reichen. Wir verstehen deine Bedürfnisse und empfehlen die beste Lösung.'             },
        { h: 'Wir bauen',   p: 'Wir kümmern uns um alles. Design, Inhalte, Technik — du machst nichts.'                         },
        { h: 'Du existierst.', p: 'In 48 Stunden bist du online. Kunden finden dich. Du konzentrierst dich auf dein Handwerk.' },
      ],
      price_label:      'Preise',
      price_h2:         'Wählen Sie Ihren Plan.',
      plans: [
        { name: 'PRÄSENZ',  features: ['Google Business Profile', 'Basis-Website (1 Seite)', 'WhatsApp-Kommunikation', 'Lieferung in 48 Stunden', 'Hosting inklusive'] },
        { name: 'PRÄSENZ+', features: ['Alles aus PRÄSENZ', 'Instagram-Verwaltung', '4 Posts pro Monat', 'Stories & Engagement', 'Monatlicher Bericht', 'Prioritäts-Support'] },
        { name: 'DOMINANZ', features: ['Vollständige individuelle Website', 'SEO-Optimierung', 'Kontaktformular', 'Google Analytics', 'Responsives Design', '6 Monate kostenloser Support'] },
      ],
      plan_cta:         'Starten →',
      demo_label:       'Live Demo',
      demo_h2:          'Sieh, wie deine Website aussehen würde.',
      demo_sub:         'Gib deinen Unternehmensnamen ein und sieh sofort einen Vorschlag.',
      demo_placeholder: 'z.B. Taverne Manolis, Dr. Schmidt Praxis, CrossFit Berlin…',
      demo_btn:         'Ansehen →',
      contact_h:        'Reden wir <span class="hl">heute.</span>',
      contact_sub:      'Kostenlose Unternehmensanalyse. Ohne Verpflichtung.',
      contact_wa:       'WhatsApp →',
      contact_note:     'Wir antworten innerhalb von 2 Stunden · Kostenlose Analyse · Ohne Verpflichtung',
      footer_copy:      '© 2026 praxis · Wir bauen Präsenz.',
      price_month:      '/Monat',
      price_once:       'einmalig',
      price_popular:    'Beliebt',
    },

    fr: {
      html_lang:        'fr',
      nav_cta:          'Commencer →',
      nav_services:     'Services',
      nav_pricing:      'Tarifs',
      hero_eyebrow:     'Présence en ligne pour les entreprises grecques',
      hero_tw:          'Chaque jour sans présence en ligne, votre concurrent gagne.',
      hero_sub:         'Trouvé en ligne en 48 heures. À partir de €20/mois.',
      hero_cta1:        'Commencer aujourd\'hui →',
      hero_cta2:        'voir à quoi ressemblerait votre site ↓',
      scroll:           'défiler',
      nums:             ['Délai de livraison de votre présence en ligne', 'Par mois suffit pour exister en ligne', 'Des entreprises grecques ont besoin d\'une présence en ligne'],
      prob_label:       'Le problème',
      prob_h2:          'Votre concurrent est en ligne. Pas vous.',
      prob_ps:          ['Chaque jour sans internet, vous perdez des clients qui cherchent exactement ce que vous proposez. Ils ne vous trouvent pas. Ils vont ailleurs.', 'Une présence en ligne n\'est pas un luxe — c\'est la porte d\'entrée de votre entreprise. Et la porte de votre concurrent est ouverte 24h/24.'],
      story_name:       'Nikos',
      story_sub:        'Propriétaire de restaurant · Thessalonique',
      story_quote:      '"J\'avais 3 tables vides chaque soir. Maintenant j\'ai une liste d\'attente chaque week-end."',
      story_stats:      ['réservations', 'livraison', 'par mois'],
      svc_label:        'Services',
      svc_h2:           'Ce que nous faisons.',
      svc: [
        { title: 'La vitrine qui travaille 24/7',            desc: 'Un site web personnalisé qui reflète votre entreprise. Design, hébergement, SEO — tout prêt.',                                        price: '€350 forfait unique' },
        { title: 'Vos clients sont sur Instagram. Et vous ?', desc: 'Création et gestion des réseaux sociaux. Posts, stories, engagement — vous ne faites rien.',                                          price: '€80/mois'           },
        { title: 'Vous existez. Dès aujourd\'hui.',           desc: 'Google Business, présence en ligne, site de base — tout configuré en 48h. Le minimum pour être trouvé par vos clients.',              price: '€20/mois'           },
      ],
      proc_label:       'Notre méthode',
      proc_h2:          'Simple. Rapide.',
      proc_badge:       '⚡ Livraison en 48 heures',
      steps: [
        { h: 'On discute', p: '15 minutes suffisent. On comprend vos besoins et propose la meilleure solution.'             },
        { h: 'On crée',    p: 'On gère tout. Design, contenu, technique — vous ne faites rien.'                             },
        { h: 'Vous existez.', p: 'En 48h vous êtes en ligne. Les clients vous trouvent. Vous vous concentrez sur votre métier.' },
      ],
      price_label:      'Tarifs',
      price_h2:         'Choisissez votre formule.',
      plans: [
        { name: 'PRÉSENCE',   features: ['Google Business Profile', 'Site web basique 1 page', 'Communication WhatsApp', 'Livraison en 48 heures', 'Hébergement inclus'] },
        { name: 'PRÉSENCE+',  features: ['Tout de PRÉSENCE', 'Gestion Instagram', '4 publications par mois', 'Stories & engagement', 'Rapport mensuel', 'Support prioritaire'] },
        { name: 'DOMINATION', features: ['Site web sur mesure complet', 'Optimisation SEO', 'Formulaire de contact', 'Google Analytics', 'Design responsive', '6 mois de support gratuit'] },
      ],
      plan_cta:         'Commencer →',
      demo_label:       'Démo en direct',
      demo_h2:          'Voyez à quoi ressemblerait votre site.',
      demo_sub:         'Entrez le nom de votre entreprise et voyez une proposition instantanément.',
      demo_placeholder: 'ex. Taverne Manolis, Cabinet Dr. Martin, CrossFit Paris…',
      demo_btn:         'Voir →',
      contact_h:        'Parlons-nous <span class="hl">aujourd\'hui.</span>',
      contact_sub:      'Analyse gratuite de votre entreprise. Sans engagement.',
      contact_wa:       'WhatsApp →',
      contact_note:     'Réponse sous 2 heures · Analyse gratuite · Sans engagement',
      footer_copy:      '© 2026 praxis · Nous construisons la présence.',
      price_month:      '/mois',
      price_once:       'forfait unique',
      price_popular:    'Populaire',
    },

    ja: {
      html_lang:        'ja',
      nav_cta:          '始める →',
      nav_services:     'サービス',
      nav_pricing:      '料金',
      hero_eyebrow:     'ギリシャのビジネスのためのオンラインプレゼンス',
      hero_tw:          'オンラインにいない毎日、競合があなたに勝っている。',
      hero_sub:         '48時間以内にオンラインで発見される。月€20から。',
      hero_cta1:        '今すぐ始める →',
      hero_cta2:        'サイトのイメージを確認する ↓',
      scroll:           'スクロール',
      nums:             ['オンラインプレゼンス構築の納期', '月額でオンラインに存在できる', 'のギリシャ企業がオンラインプレゼンスを必要としている'],
      prob_label:       '問題点',
      prob_h2:          '競合はオンラインにいる。あなたは？',
      prob_ps:          ['ネットにいない毎日、あなたが提供するものをまさに探している顧客を失っています。見つけてもらえない。他に行ってしまう。', 'オンラインプレゼンスは贅沢品ではなく、ビジネスの玄関口です。競合の玄関は24時間365日開いています。'],
      story_name:       'ニコス',
      story_sub:        'レストランオーナー · テッサロニキ',
      story_quote:      '「毎晩3席が空いていた。今は毎週末、予約待ちリストができている。」',
      story_stats:      ['予約数', '納期', '月額'],
      svc_label:        'サービス',
      svc_h2:           '私たちのサービス。',
      svc: [
        { title: '24時間365日働くショーウィンドウ',      desc: 'あなたのビジネスを反映するカスタムサイト。デザイン、ホスティング、SEO — すべて込み。',              price: '€350 一括'  },
        { title: 'お客様はInstagramにいます。あなたは？', desc: 'SNS作成・管理。投稿、ストーリー、エンゲージメント — あなたは何もしなくていい。',                  price: '€80/月'     },
        { title: '今日から存在する。',                   desc: 'Google Business、オンライン存在、基本サイト — 48時間でセットアップ完了。顧客に見つけてもらう最小限。', price: '€20/月'     },
      ],
      proc_label:       '進め方',
      proc_h2:          'シンプル。スピーディー。',
      proc_badge:       '⚡ 48時間以内に納品',
      steps: [
        { h: '話し合う',  p: '15分あれば十分。ご要望を理解し、最適なソリューションをご提案します。'       },
        { h: '作成する',  p: 'すべてお任せください。デザイン、コンテンツ、技術面 — あなたは何もしない。' },
        { h: '存在する。', p: '48時間以内にオンラインに。顧客があなたを見つける。あなたは本業に集中。'  },
      ],
      price_label:      '料金',
      price_h2:         'プランをお選びください。',
      plans: [
        { name: 'プレゼンス',   features: ['Googleビジネスプロフィール', '基本1ページサイト', 'WhatsApp連絡', '48時間以内に納品', 'ホスティング込み'] },
        { name: 'プレゼンス+',  features: ['プレゼンスのすべて', 'Instagram管理', '月4投稿', 'ストーリー＆エンゲージメント', '月次レポート', '優先サポート'] },
        { name: 'ドミナンス',   features: ['フルカスタムサイト', 'SEO最適化', 'お問い合わせフォーム', 'Google Analytics', 'レスポンシブデザイン', '6ヶ月無料サポート'] },
      ],
      plan_cta:         '始める →',
      demo_label:       'ライブデモ',
      demo_h2:          'あなたのサイトのイメージを確認する。',
      demo_sub:         'ビジネス名を入力して、すぐに提案を見てみましょう。',
      demo_placeholder: '例: タベルナ・マノリス、山田歯科、CrossFit東京…',
      demo_btn:         '確認する →',
      contact_h:        '今日、<span class="hl">話しましょう。</span>',
      contact_sub:      '無料ビジネス分析。コミットメントなし。',
      contact_wa:       'WhatsApp →',
      contact_note:     '2時間以内に返信 · 無料分析 · 拘束なし',
      footer_copy:      '© 2026 praxis · プレゼンスを構築する。',
      price_month:      '/月',
      price_once:       '一括払い',
      price_popular:    '人気',
    },

    es: {
      html_lang:        'es',
      nav_cta:          'Empezar →',
      nav_services:     'Servicios',
      nav_pricing:      'Precios',
      hero_eyebrow:     'Presencia online para negocios griegos',
      hero_tw:          'Cada día que no estás online, tu competidor gana.',
      hero_sub:         'Te encuentran en 48 horas. Desde €20 al mes.',
      hero_cta1:        'Empieza hoy →',
      hero_cta2:        'mira cómo sería tu sitio web ↓',
      scroll:           'deslizar',
      nums:             ['Tiempo de entrega de tu presencia online', 'Al mes es suficiente para existir online', 'De negocios griegos necesitan presencia online'],
      prob_label:       'El problema',
      prob_h2:          'Tu competidor está online. Tú no.',
      prob_ps:          ['Cada día sin internet pierdes clientes que buscan exactamente lo que ofreces. No te encuentran. Van a otro lado.', 'La presencia online no es un lujo — es la puerta de tu negocio. Y la puerta de tu competidor está abierta 24/7.'],
      story_name:       'Nikos',
      story_sub:        'Dueño de restaurante · Tesalónica',
      story_quote:      '"Tenía 3 mesas vacías cada noche. Ahora tengo lista de espera cada fin de semana."',
      story_stats:      ['reservas', 'entrega', 'al mes'],
      svc_label:        'Servicios',
      svc_h2:           'Lo que hacemos.',
      svc: [
        { title: 'El escaparate que trabaja 24/7',        desc: 'Un sitio web personalizado que refleja tu negocio. Diseño, hosting, SEO — todo listo.',                                      price: '€350 pago único' },
        { title: 'Tus clientes están en Instagram. ¿Y tú?', desc: 'Creación y gestión de redes sociales. Posts, stories, engagement — tú no haces nada.',                                      price: '€80/mes'        },
        { title: 'Existes. Desde hoy.',                   desc: 'Google Business, presencia online, sitio básico — todo configurado en 48 horas. Lo mínimo para que tus clientes te encuentren.', price: '€20/mes'      },
      ],
      proc_label:       'Cómo trabajamos',
      proc_h2:          'Simple. Rápido.',
      proc_badge:       '⚡ Entrega en 48 horas',
      steps: [
        { h: 'Hablamos',    p: '15 minutos son suficientes. Entendemos lo que necesitas y te recomendamos la mejor solución.' },
        { h: 'Construimos', p: 'Nos encargamos de todo. Diseño, contenido, técnica — tú no haces nada.'                      },
        { h: 'Existes.',    p: 'En 48 horas estás online. Los clientes te encuentran. Tú te dedicas a lo tuyo.'              },
      ],
      price_label:      'Precios',
      price_h2:         'Elige tu plan.',
      plans: [
        { name: 'PRESENCIA',  features: ['Google Business Profile', 'Sitio web básico 1 página', 'Comunicación por WhatsApp', 'Entrega en 48 horas', 'Hosting incluido'] },
        { name: 'PRESENCIA+', features: ['Todo de PRESENCIA', 'Gestión de Instagram', '4 publicaciones al mes', 'Stories & engagement', 'Informe mensual', 'Soporte prioritario'] },
        { name: 'DOMINIO',    features: ['Sitio web completo personalizado', 'Optimización SEO', 'Formulario de contacto', 'Google Analytics', 'Diseño responsive', '6 meses de soporte gratuito'] },
      ],
      plan_cta:         'Empezar →',
      demo_label:       'Demo en vivo',
      demo_h2:          'Mira cómo sería tu sitio web.',
      demo_sub:         'Escribe el nombre de tu negocio y ve una propuesta al instante.',
      demo_placeholder: 'ej. Taberna Manolis, Clínica Dr. García, CrossFit Madrid…',
      demo_btn:         'Ver →',
      contact_h:        'Hablemos <span class="hl">hoy.</span>',
      contact_sub:      'Análisis gratuito de tu negocio. Sin compromiso.',
      contact_wa:       'WhatsApp →',
      contact_note:     'Respondemos en 2 horas · Análisis gratuito · Sin compromiso',
      footer_copy:      '© 2026 praxis · Construimos presencia.',
      price_month:      '/mes',
      price_once:       'pago único',
      price_popular:    'Popular',
    },

    it: {
      html_lang:        'it',
      nav_cta:          'Inizia →',
      nav_services:     'Servizi',
      nav_pricing:      'Prezzi',
      hero_eyebrow:     'Presenza online per le aziende greche',
      hero_tw:          'Ogni giorno che non sei online, il tuo concorrente vince.',
      hero_sub:         'Trovato online in 48 ore. Da €20 al mese.',
      hero_cta1:        'Inizia oggi →',
      hero_cta2:        'guarda come sarebbe il tuo sito ↓',
      scroll:           'scorri',
      nums:             ['Tempo di consegna della tua presenza online', 'Al mese è sufficiente per esistere online', 'Delle aziende greche ha bisogno di presenza online'],
      prob_label:       'Il problema',
      prob_h2:          'Il tuo concorrente è online. Tu no.',
      prob_ps:          ['Ogni giorno senza internet, perdi clienti che cercano esattamente ciò che offri. Non ti trovano. Vanno altrove.', 'La presenza online non è un lusso — è la porta della tua azienda. E la porta del tuo concorrente è aperta 24/7.'],
      story_name:       'Nikos',
      story_sub:        'Proprietario di ristorante · Salonicco',
      story_quote:      '"Avevo 3 tavoli vuoti ogni sera. Ora ho una lista d\'attesa ogni fine settimana."',
      story_stats:      ['prenotazioni', 'consegna', 'al mese'],
      svc_label:        'Servizi',
      svc_h2:           'Cosa facciamo.',
      svc: [
        { title: 'La vetrina che lavora 24/7',         desc: 'Un sito web personalizzato che rispecchia la tua azienda. Design, hosting, SEO — tutto pronto.',                                           price: '€350 una tantum' },
        { title: 'I tuoi clienti sono su Instagram. E tu?', desc: 'Creazione e gestione dei social media. Post, storie, engagement — tu non fai niente.',                                                price: '€80/mese'       },
        { title: 'Esisti. Da oggi.',                   desc: 'Google Business, presenza online, sito base — tutto configurato in 48 ore. Il minimo per essere trovato dai tuoi clienti.',                price: '€20/mese'       },
      ],
      proc_label:       'Come lavoriamo',
      proc_h2:          'Semplice. Veloce.',
      proc_badge:       '⚡ Consegna in 48 ore',
      steps: [
        { h: 'Parliamo',   p: '15 minuti bastano. Capiamo le tue esigenze e proponiamo la soluzione migliore.'            },
        { h: 'Costruiamo', p: 'Ci occupiamo di tutto. Design, contenuti, tecnica — tu non fai niente.'                    },
        { h: 'Esisti.',    p: 'In 48 ore sei online. I clienti ti trovano. Tu ti occupi di ciò che sai fare meglio.'      },
      ],
      price_label:      'Prezzi',
      price_h2:         'Scegli il tuo piano.',
      plans: [
        { name: 'PRESENZA',  features: ['Google Business Profile', 'Sito base 1 pagina', 'Comunicazione WhatsApp', 'Consegna in 48 ore', 'Hosting incluso'] },
        { name: 'PRESENZA+', features: ['Tutto di PRESENZA', 'Gestione Instagram', '4 post al mese', 'Stories & engagement', 'Report mensile', 'Supporto prioritario'] },
        { name: 'DOMINIO',   features: ['Sito web completo personalizzato', 'Ottimizzazione SEO', 'Modulo di contatto', 'Google Analytics', 'Design responsive', '6 mesi di supporto gratuito'] },
      ],
      plan_cta:         'Inizia →',
      demo_label:       'Demo dal vivo',
      demo_h2:          'Guarda come sarebbe il tuo sito.',
      demo_sub:         'Inserisci il nome della tua azienda e vedi una proposta all\'istante.',
      demo_placeholder: 'es. Trattoria Manolis, Studio Dr. Rossi, CrossFit Roma…',
      demo_btn:         'Guarda →',
      contact_h:        'Parliamo <span class="hl">oggi.</span>',
      contact_sub:      'Analisi gratuita della tua azienda. Senza impegno.',
      contact_wa:       'WhatsApp →',
      contact_note:     'Rispondiamo entro 2 ore · Analisi gratuita · Senza impegno',
      footer_copy:      '© 2026 praxis · Costruiamo presenza.',
      price_month:      '/mese',
      price_once:       'una tantum',
      price_popular:    'Popolare',
    },

  }; // end T

  // ── DOM helpers ─────────────────────────────────────────────────────────────
  function set(sel, text) {
    var el = document.querySelector(sel);
    if (el) el.textContent = text;
  }

  function setAll(sel, arr) {
    var els = document.querySelectorAll(sel);
    arr.forEach(function (text, i) { if (els[i]) els[i].textContent = text; });
  }

  function setHtml(sel, html) {
    var el = document.querySelector(sel);
    if (el) el.innerHTML = html;
  }

  function setAttr(sel, attr, val) {
    var el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  }

  // Match nav links by hash fragment — works with both relative and absolute hrefs
  function setNavLink(hash, text) {
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      if (a.getAttribute('href').indexOf(hash) !== -1) a.textContent = text;
    });
  }

  // ── Apply language ──────────────────────────────────────────────────────────
  function applyLang(code) {
    var L = T[code] || T['el'];

    // Nav
    set('.nav-cta', L.nav_cta);
    setNavLink('#services', L.nav_services);
    setNavLink('#pricing',  L.nav_pricing);

    // Hero — update typewriter text and restart animation
    window.praxisHeroTw = L.hero_tw;
    if (window.praxisRestartTypewriter) window.praxisRestartTypewriter();
    else { var twFallback = document.querySelector('#tw'); if (twFallback) twFallback.textContent = L.hero_tw; }
    set('.hero-eyebrow',             L.hero_eyebrow);
    set('.hero-sub',                 L.hero_sub);
    set('.hero-ctas .btn-primary',   L.hero_cta1);
    set('.hero-ctas .btn-ghost',     L.hero_cta2);
    set('.scroll-indicator span',    L.scroll);

    // Numbers
    setAll('.num-lbl', L.nums);

    // Problem
    set('#problem .section-label',    L.prob_label);
    set('#problem h2',                L.prob_h2);
    setAll('#problem .problem-text p', L.prob_ps);
    set('.story-info strong',         L.story_name);
    set('.story-info span',           L.story_sub);
    set('.story-card blockquote',     L.story_quote);
    setAll('.story-stat-lbl',         L.story_stats);

    // Services
    set('#services .section-label', L.svc_label);
    set('#services h2',             L.svc_h2);
    document.querySelectorAll('.svc-card').forEach(function (card, i) {
      if (!L.svc[i]) return;
      var h3 = card.querySelector('h3');
      var p  = card.querySelector('p');
      var sp = card.querySelector('.svc-price');
      if (h3) h3.textContent = L.svc[i].title;
      if (p)  p.textContent  = L.svc[i].desc;
      if (sp) sp.textContent = L.svc[i].price;
    });

    // Process
    set('#process .section-label', L.proc_label);
    set('#process h2',             L.proc_h2);
    set('.process-badge',          L.proc_badge);
    document.querySelectorAll('.step').forEach(function (step, i) {
      if (!L.steps[i]) return;
      var h3 = step.querySelector('h3');
      var p  = step.querySelector('p');
      if (h3) h3.textContent = L.steps[i].h;
      if (p)  p.textContent  = L.steps[i].p;
    });

    // Pricing
    set('#pricing .section-label', L.price_label);
    set('#pricing h2',             L.price_h2);
    document.querySelectorAll('.p-card').forEach(function (card, i) {
      if (!L.plans[i]) return;
      var name  = card.querySelector('.p-name');
      var feats = card.querySelectorAll('.p-features li');
      var cta   = card.querySelector('.p-cta');
      if (name) name.textContent = L.plans[i].name;
      feats.forEach(function (li, j) {
        if (L.plans[i].features[j] !== undefined) li.textContent = L.plans[i].features[j];
      });
      if (cta) cta.textContent = L.plan_cta;
    });

    // Demo
    set('#demo .section-label', L.demo_label);
    set('#demo h2',             L.demo_h2);
    set('#demo .demo-sub',      L.demo_sub);
    setAttr('#demoInput', 'placeholder', L.demo_placeholder);
    set('#demoRun', L.demo_btn);

    // Contact
    setHtml('.contact-h',  L.contact_h);
    set('.contact-sub',    L.contact_sub);
    set('.btn-wa',         L.contact_wa);
    set('.contact-note',   L.contact_note);

    // Footer
    set('.footer-copy', L.footer_copy);

    // data-i18n elements (badge, pricing period labels)
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (L[key] !== undefined) el.textContent = L[key];
    });

    // HTML lang attribute
    document.documentElement.lang = L.html_lang || code;

    // Update button label
    var lbl = document.getElementById('lang-label');
    var def = LANGS.filter(function (l) { return l.code === code; })[0];
    if (lbl && def) lbl.textContent = def.label;

    // Mark active option
    document.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.dataset.lang === code);
    });

    localStorage.setItem('praxis-lang', code);
  }

  // ── Build & inject switcher ──────────────────────────────────────────────────
  var langOpen = false;

  function buildSwitcher() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    // Wrapper
    var sw  = document.createElement('div');
    sw.id   = 'lang-switcher';

    // Toggle button
    var btn = document.createElement('button');
    btn.id  = 'lang-toggle';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '🌐 <span id="lang-label">GR</span>';

    // Panel
    var panel = document.createElement('div');
    panel.id  = 'lang-panel';
    panel.setAttribute('role', 'listbox');
    panel.innerHTML = LANGS.map(function (l) {
      return (
        '<button class="lang-option" role="option" data-lang="' + l.code + '">' +
          '<span class="lang-flag">' + l.flag + '</span>' +
          '<span class="lang-name">' + l.name + '</span>' +
          '<span class="lang-code">' + l.label + '</span>' +
        '</button>'
      );
    }).join('');

    sw.appendChild(btn);
    sw.appendChild(panel);

    // Insert before #theme-switcher (or before .nav-cta as fallback)
    var anchor = nav.querySelector('#theme-switcher') || nav.querySelector('.nav-cta');
    if (anchor) nav.insertBefore(sw, anchor);
    else nav.appendChild(sw);

    // Toggle
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (langOpen) closeLangPanel(); else openLangPanel();
    });

    // Option clicks
    panel.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        applyLang(this.dataset.lang);
        closeLangPanel();
      });
    });

    // Close on outside click / Escape
    document.addEventListener('click', function (e) {
      if (langOpen && !sw.contains(e.target)) closeLangPanel();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && langOpen) closeLangPanel();
    });
  }

  function openLangPanel() {
    var p = document.getElementById('lang-panel');
    var b = document.getElementById('lang-toggle');
    if (p) p.classList.add('open');
    if (b) b.setAttribute('aria-expanded', 'true');
    langOpen = true;
  }

  function closeLangPanel() {
    var p = document.getElementById('lang-panel');
    var b = document.getElementById('lang-toggle');
    if (p) p.classList.remove('open');
    if (b) b.setAttribute('aria-expanded', 'false');
    langOpen = false;
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    buildSwitcher();
    var saved = localStorage.getItem('praxis-lang') || 'el';
    applyLang(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
