# Changelog

One line per block. Add a new line every time a block is created or significantly updated.
This file is the first thing the next agent reads — it prevents duplicate work.

---

| Date | Block | Description |
|------|-------|-------------|
| 2026-05-29 | `tokens.css` | Design tokens — colours, typography, spacing, motion variables |
| 2026-05-29 | `01-header-dropdown` | Sticky nav with mega/dropdown menus, scroll transparency transition, mobile hamburger |
| 2026-05-29 | `03-hero-carousel` | Fullscreen photo slideshow — fade/slide effect, Ken Burns zoom, auto-advance + dots |
| 2026-05-29 | `04-footer` | Multi-column footer — contact info, social links, ΓΕΜΗ/ΑΦΜ legal placeholders |
| 2026-05-29 | `05-grid-filters` | Responsive card grid with client-side category/price/area filtering, no reload |
| 2026-05-29 | `02-hero-video` | Fullscreen hero with video background, overlay gradient, mute toggle, animated headline + CTAs |
| 2026-05-29 | `06-map-pins` | Google Maps with custom red pins, dark style, info windows, lazy-loaded SDK via IntersectionObserver |
| 2026-05-29 | `07-gallery-lightbox` | Grid/masonry gallery — click-to-lightbox, keyboard ←/→, pointer swipe, caption + counter |
| 2026-05-29 | `08-contact-form` | Contact form with client-side validation, WhatsApp + email CTAs, success state, mailto fallback |
| 2026-05-29 | `09-video-section` | Side-by-side video + text, supports mp4 and YouTube/Vimeo embed, lazy iframe, play overlay |
| 2026-05-29 | `10-scroll-reveal` | IntersectionObserver fade-up — data-delay stagger, data-reveal-dir (up/left/right/fade) |
| 2026-05-29 | `11-counters` | Animated number counters on scroll entry — easeOutQuart, data-target/suffix/prefix/decimals |
| 2026-05-29 | `12-particle-bg` | Canvas particle network — configurable count/color/speed/connect, pauses on hidden tab |
| 2026-05-29 | `13-theme-switcher` | Multi-skin switcher — overrides :root CSS vars, localStorage persistence, arrow-key nav |
| 2026-05-29 | `demo/full-site.html` | Full assembled site: header + carousel + video-section + grid + counters + gallery + contact + footer |
| 2026-05-29 | `preview/index.html` | All 13 blocks on one page with labels, isolated links, and dot TOC navigation |
| 2026-05-30 | `01-header-dropdown` | Fix: logo drop-cap no longer doubles first letter ("PPRAXIS" → "PRAXIS") |
| 2026-05-30 | `04-footer` | Fix: logo drop-cap no longer doubles first letter ("PPRAXIS" → "PRAXIS") |
| 2026-05-30 | `tokens.css` | Greek typography: switched base fonts to Greek-verified Manrope + Inter (Exo 2 / DM Sans lack a Greek subset); added `--red-rgb` token |
| 2026-05-30 | `effects.css` | New: px- font effect utilities — text-glow, text-gradient, text-stroke, text-shadow-3d, text-reveal (readable fallbacks, reduced-motion safe) |
| 2026-05-30 | `14-schedule-table` | New: responsive timetable (ship/departure/arrival/duration/price), direction toggle, mobile stacked cards, table a11y, dormant Phase-2 auto-feed hook |
| 2026-05-30 | `15-lang-switcher` | New: client-side i18n for static sites — data-i18n bindings (+attributes), dropdown switcher, navigator auto-detect (el→gr), localStorage, updates html lang |
| 2026-05-30 | `13-theme-switcher` | Added "lefkimmi" skin (cinematic dark + #E30613 red + Manrope/Inter); existing skins untouched |
| 2026-05-30 | `02-hero-video` | Additive: parametric `data-eyebrow` (was hardcoded "Web Agency") + `data-i18n-*` passthrough so lang-switcher can translate block-built hero content |
| 2026-05-30 | `sites/lefkimmi-lines` | First real site assembled from the library — lefkimmi skin, GR+EN i18n, 10 sections, booking CTAs → lefkimmilines.gr (no booking on-site) |
| 2026-05-30 | `sites/lefkimmi-lines` | i18n expanded to 9 languages: +FR, IT, DE, ES, RO, BG, RU. JSON curly-quote bug fixed (structural quotes now ASCII). BG/RU Cyrillic via system-ui font fallback. Native review recommended before live. |
| 2026-05-31 | Multilingual uppercase rule | GR χωρίς τόνο στα κεφαλαία (όχι text-transform σε ελληνικό), άλλες γλώσσες κρατούν διακριτικά. Τεκμηρίωση στο README. |
| 2026-05-31 | `14-schedule-table/block.css` | Αφαίρεση text-transform:uppercase από thead th + mobile td::before — τα labels pre-uppercased στο markup. |
| 2026-05-31 | `sites/lefkimmi-lines/site.css` | :lang(el) overrides για μηδενισμό text-transform σε eyebrows, footer headers, contact labels. |
| 2026-05-31 | `16-seo-head` | New: per-language title/description + OG/Twitter Card meta manager; MutationObserver για lang-switcher sync |
| 2026-05-31 | `17-schema-injector` | New: JSON-LD injector — LocalBusiness, FerryTrip, AggregateRating, BreadcrumbList, FAQPage |
| 2026-05-31 | `18-hreflang` | New: hreflang link injector (single-URL note in block.js; πλήρης αποδοτικότητα μόνο με ξεχωριστά URLs) |
| 2026-05-31 | `sites/lefkimmi-lines` | SEO applied: seo-head (9 langs, keyword titles/descs), schema (LocalBusiness+FerryTrip), hreflang, sitemap.xml, robots.txt, <main> wrapper, sch_title i18n |
| 2026-05-31 | `README.md` | SEO modules section: τι κάνουν, τι ΔΕΝ κάνουν, πώς μπαίνουν; blocks 16-18 στο block reference |
| 2026-05-31 | `19-booking-cta` | New: external booking bridge — link/embed/inline-widget modes, iframe fallback logic, brand-styled CTA + trust line, i18n passthrough |
| 2026-05-31 | `sites/lefkimmi-lines` | booking-cta applied (mode=link, booktickets.gr); booking_trust i18n key × 9 langs; standalone ll-btn CTAs replaced with px-booking |
| 2026-05-31 | `README.md` | External booking section: πότε link/embed/widget, providers ανά κλάδο, iframe check method |
| 2026-06-02 | `21-schedule-calendar` | New: 4-tab ferry timetable (LL/HL/LP/PL) + mini date picker + per-row booking CTA; mobile stacked cards; full i18n; data-driven via embedded JSON |
| 2026-06-02 | `22-schedule-cms` | New: WordPress plugin — admin UI 4 tabs, nonce-secured save, JSON import/export, REST endpoint `/wp-json/ll/v1/schedule` |
| 2026-06-02 | `23-booking-form` | New: demo-mode booking search form (from/to/date/pax/vehicle), submits to provider URL in _blank |
| 2026-06-02 | `sites/lefkimmi-lines` | Full rebuild on Caldera design (gold+navy, Marcellus/Inter); ZIP as base; blocks #21+#23 integrated; skin picker 5 skins; i18n.js +13 new keys (sched.tab*/colBook/disclaimer + book.*) × 8 langs |
| 2026-06-02 | `sites/lefkimmi-lines` | Added: Reviews section, USP tabs, hero price badge, OpenStreetMap, real ship images, skin-picker corner widget |
