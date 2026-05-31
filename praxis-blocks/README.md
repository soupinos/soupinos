# Praxis Block Library

Reusable UI blocks — vanilla HTML/CSS/JS, zero dependencies, zero build step.
Drop any block into a WordPress theme or a standalone HTML page in minutes.

---

## How to plug in a block (3 steps)

**1. Copy the block folder**
```
cp -r praxis-blocks/blocks/01-header-dropdown/ your-project/blocks/
```

**2. Import tokens + block styles in your `<head>`**
```html
<link rel="stylesheet" href="/praxis-blocks/tokens.css">
<link rel="stylesheet" href="/blocks/01-header-dropdown/block.css">
```

**3. Paste the markup and pass your params via `data-*` attributes**
```html
<!-- example: header with a logo text override -->
<header class="px-nav" data-logo="My Brand">…</header>
<script src="/blocks/01-header-dropdown/block.js"></script>
```

That's it. The block reads tokens from `:root`, self-initialises, and never pollutes the global namespace.

---

## Block reference

| # | Block | Key `data-*` / params | When to use |
|---|-------|----------------------|-------------|
| 01 | `header-dropdown` | `data-logo`, `data-transparent` | Every site — sticky nav with dropdown menus & mobile hamburger |
| 02 | `hero-video` | `data-src`, `data-poster`, `data-headline`, `data-cta-text`, `data-cta-href` | Landing pages needing a cinematic fullscreen intro |
| 03 | `hero-carousel` | `data-interval`, `data-effect` (`fade`/`slide`) | Sites with multiple hero images; Ken Burns zoom |
| 04 | `footer` | `data-company`, `data-vat`, `data-gemi` | Every site — multi-column footer with social + legal |
| 05 | `grid-filters` | `data-categories`, `data-price-max`, JSON cards in `.px-grid-data` | Portfolios, product listings, directories |
| 06 | `map-pins` | `data-apikey`, `data-center`, JSON pins inline | Store locators, office maps |
| 07 | `gallery-lightbox` | `data-cols`, `data-layout` (`masonry`/`grid`) | Photo galleries with keyboard + swipe lightbox |
| 08 | `contact-form` | `data-whatsapp`, `data-email`, `data-action` | Contact pages — ready for CF7/Gravity or mailto |
| 09 | `video-section` | `data-video-src`, `data-poster`, `data-autoplay` | Feature sections with side-by-side video + text |
| 10 | `scroll-reveal` | `data-reveal`, `data-delay` (ms) | Any element that should animate in on scroll |
| 11 | `counters` | `data-target`, `data-suffix`, `data-duration` (ms) | Stats sections — numbers animate on first viewport entry |
| 12 | `particle-bg` | `data-count`, `data-color`, `data-speed` | Hero/section backgrounds needing motion |
| 13 | `theme-switcher` | `data-themes` (JSON), `data-persist` | Multi-skin demos or client white-labelling (incl. `lefkimmi` skin) |
| 14 | `schedule-table` | `data-from`, `data-to`, `data-columns`, `data-source` (Phase 2) | Ferry/bus/excursion timetables, store hours — direction toggle, mobile cards |
| 15 | `lang-switcher` | `data-default`, `data-persist`, `data-i18n="key"` on elements | Static / mini multilingual sites (no WordPress) — swaps text without reload |
| 16 | `seo-head` | JSON config `.px-seo-cfg` — `canonical`, `og`, `langs{title,description}` | Per-language title/description/OG meta; updates on lang-switch via MutationObserver |
| 17 | `schema-injector` | JSON config `.px-schema-cfg` — array of typed schema objects | JSON-LD structured data: LocalBusiness, FerryTrip, AggregateRating, BreadcrumbList, FAQPage |
| 18 | `hreflang` | JSON config `.px-hreflang-cfg` — `langs[{code,url}]`, `xDefault` | `<link rel="alternate" hreflang>` for multilingual; see note on single-URL limitation |

### Utility classes — `effects.css`

Optional. Import after `tokens.css`. Drop a class on any text element:

| Class | Effect |
|-------|--------|
| `.px-text-glow` | Soft accent glow (multi-layer text-shadow) |
| `.px-text-gradient` | Accent→white gradient fill, solid fallback |
| `.px-text-stroke` | Outline text, solid fallback |
| `.px-text-shadow-3d` | Layered depth shadow |
| `.px-text-reveal` | Animated gradient sweep (off under reduced-motion) |

> **Typography note:** all fonts are Greek-verified (Manrope + Inter). `Exo 2` and `DM Sans` were dropped because they have no Greek subset on Google Fonts. `Marcellus` and `Sora` are **not** Greek-safe either — avoid them despite older notes.

---

## SEO modules — τι κάνουν, τι ΔΕΝ κάνουν, πώς μπαίνουν

### Τι κάνουν (on-page / technical SEO)
| Module | Αρχείο | Δουλειά |
|--------|--------|---------|
| 16 `seo-head` | `block.js` | `<title>`, `<meta description>`, Open Graph, Twitter Card ανά γλώσσα. Ενημερώνεται αυτόματα με τον lang-switcher μέσω MutationObserver. |
| 17 `schema-injector` | `block.js` | Εγχέει `<script type="application/ld+json">` στο `<head>`. Types: LocalBusiness, FerryTrip, AggregateRating, BreadcrumbList, FAQPage. |
| 18 `hreflang` | `block.js` | Εγχέει `<link rel="alternate" hreflang="…">` για κάθε γλώσσα + `x-default`. |
| sitemap.xml | template | Λίστα σελίδων + lastmod + hreflang alternates. |
| robots.txt | template | `User-agent: * Allow: /` + Sitemap reference. |

### Πώς μπαίνουν σε κάθε νέο site
1. Αντίγραψε τα 3 block folders (16, 17, 18) στο project.
2. Γράψε τα 3 JSON config blocks στο `<body>` πριν το `</body>`:
   - `.px-seo-cfg` — titles/descs ανά γλώσσα + og/canonical
   - `.px-schema-cfg` — array τύπων schema (ξεκίνα με LocalBusiness)
   - `.px-hreflang-cfg` — langs array + xDefault
3. Φόρτωσε τα 3 scripts (μετά τον lang-switcher ή πριν — χωρίς διαφορά):
   ```html
   <script src="…/16-seo-head/block.js"></script>
   <script src="…/17-schema-injector/block.js"></script>
   <script src="…/18-hreflang/block.js"></script>
   ```
4. Αντίγραψε `sitemap.xml` + `robots.txt` templates, βάλε το production URL.
5. Validate schema: [Google Rich Results Test](https://search.google.com/test/rich-results)

### Τι ΔΕΝ εγγυώνται μόνα τους
Αυτά τα modules καλύπτουν **technical / on-page SEO**. Δεν αρκούν για #1 ranking. Χρειάζεται επιπλέον:
- **Domain authority** + **backlinks** (off-page — human/agent δουλειά)
- **Google Business Profile** (δωρεάν, κρίσιμο για local SEO)
- **Content quality** (σωστό copywriting, keywords φυσικά ενσωματωμένα)
- **Χρόνος** — η Google χρειάζεται εβδομάδες/μήνες για indexing
- **hreflang πλήρης αποδοτικότητα** μόνο με ξεχωριστά URLs ανά γλώσσα (`/el/`, `/en/` κλπ.) — αυτό θέλει WordPress/routing, είναι εκτός scope του block

---

## Working principles (for the next agent or human)

These are the rules this library is built on. Follow them exactly — they are what makes the library fast and consistent:

- **Think before acting.** What is the *minimum change* that solves the client's problem? Start there.
- **Read CHANGELOG.md first.** If a block already exists, extend/parameterise it — never write a duplicate.
- **Less code > more code.** Elegance is what you *don't* write.
- **Every pattern you see more than once → becomes a block.** The library grows intentionally.
- **Respect brand tokens.** Never hardcode a colour or font — always use a `var(--…)`.
- **Test the block in isolation before shipping.** If you haven't seen it work, it's not done.
- **When something is unclear, ask.** One good question saves hours of wrong work.

── ΚΕΦΑΛΑΙΑ & ΤΟΝΟΙ (multilingual) ──
Ο χειρισμός κεφαλαίων διαφέρει ανά γλώσσα. ΜΗΝ εφαρμόζεις τον ίδιο κανόνα παντού.

• ΕΛΛΗΝΙΚΑ: Τα κεφαλαία ΔΕΝ παίρνουν τόνο (ΠΛΟΙΟ, όχι ΠΛΟΊΟ).
  Το CSS text-transform:uppercase ΔΕΝ αφαιρεί τον ελληνικό τόνο — τον κρατάει (λάθος). Γι' αυτό:
    - Για ελληνικό κείμενο που πρέπει να εμφανιστεί ΚΕΦΑΛΑΙΟ, γράψ' το ΗΔΗ κεφαλαίο-χωρίς-τόνο στο markup/dictionary και ΜΗΝ βάζεις text-transform:uppercase.
    - ΕΞΑΙΡΕΣΗ: το διαλυτικό ΜΕΝΕΙ (ΑΫΛΟΣ, ΕΥΦΥΪΑ→ΕΥΦΥΪΑ). Μόνο ο οξύς τόνος φεύγει.
    - Πεζά ελληνικά παραμένουν κανονικά τονισμένα.

• ΟΛΕΣ ΟΙ ΑΛΛΕΣ ΓΛΩΣΣΕΣ (EN, FR, IT, DE, ES, RO, BG, RU, …):
  ΚΡΑΤΑΝΕ τα διακριτικά τους στα κεφαλαία (É, Á, Ñ, Ă, Î, Ü). Το text-transform:uppercase είναι ΟΚ γι' αυτές. ΜΗΝ αφαιρείς διακριτικά.

ΚΑΝΟΝΑΣ: ο "χωρίς τόνο στα κεφαλαία" ισχύει ΜΟΝΟ στα ελληνικά.
Σε κάθε νέο site, έλεγξε ΟΛΑ τα ελληνικά κεφαλαία (eyebrows, labels, κουμπιά, headers).

---

## Conventions

- All classes prefixed `px-` to prevent collisions with host pages.
- JS: IIFE-wrapped, no globals, guard `if (!el) return;` at the top of every init.
- Accessibility: `aria-*` attributes, full keyboard navigation, `prefers-reduced-motion` respected.
- Performance: heavy assets (maps, video) are lazy-loaded; all scroll listeners use `passive: true`.
- Mobile-first: base styles for mobile, `@media (min-width: …)` for desktop.
