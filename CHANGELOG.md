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
