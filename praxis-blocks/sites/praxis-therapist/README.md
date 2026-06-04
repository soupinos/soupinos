# Praxis Therapist — WordPress theme (v0.1.0, Phase 1)

Calm, breathing **one-page theme for psychotherapists**. A clean fork of the
Praxis/Caldera engine: ferry-specific code removed, generic machine kept.

- **Skin:** warm **sand** (brown `#5C3D2E` + gold `#C9A84C`), baked into
  `assets/main.css` — no runtime skin picker.
- **Typography (GR-safe):** headings **EB Garamond**, body **Inter**.
  > The sand skin's original heading font (Playfair Display) has **no Greek
  > subset** on Google Fonts, so it cannot render Greek and is intentionally
  > not used. Designer may re-confirm the heading face in pass 2.
- **i18n:** none — GR monolingual v1.
- **Motion:** softened. Scroll-reveal (16px / 0.9s), one Ken Burns on the hero
  (scale 1→1.05 over 48s). **No counters, no parallax, no video** ("less is more").

## Structure
```
praxis-therapist/
  style.css            theme meta
  functions.php        lean enqueue (EB Garamond+Inter, main.css, app.js, contact, cookie)
  header.php           Praxis logo + 4-item nav (no CTA-heavy, no lang switcher)
  footer.php           Praxis footer (brief copy, [placeholders])
  front-page.php       PHASE 1: hero only. Phase 2 wires the remaining sections.
  index.php  404.php
  inc/ contact-handler.php  sitemap.php
  assets/ main.css  app.js  contact-form.js  cookie-consent.css|js  favicon.svg
          (+ block20|25|26|27 css|js copied here during Phase 2 assembly)
```

## Section → block map (assembled in Phase 2)
| Section | Source | Type |
|---|---|---|
| NAV | `header.php` | reuse+config |
| HERO (static + Ken Burns) | `front-page.php` hero | reuse+config |
| Ποιός είμαι | `px-about` (block 20) | new generic block |
| Τι κάνω (×3) | `px-services` (block 25) | new generic block |
| Γιατί εγώ | `px-statement` (block 26) | new generic block |
| Η πρώτη γνωριμία (CTA) | `.book-banner` pattern | reuse+config |
| Μαρτυρίες | `px-testimonials` (block 27) | new generic — render only if real+consented |
| Footer | `footer.php` | reuse+config |

## Install notes
- Copy `praxis-therapist/` into `wp-content/themes/`, activate.
- Set a static homepage (Settings → Reading → front-page.php is used).
- Visit Settings → Permalinks → Save once (flushes the `/sitemap.xml` rule).
- Contact form sends to the **WP admin email** (`get_option('admin_email')`).

> **Placeholders pending real data:** `[ΟΝΟΜΑ] [ΤΗΛΕΦΩΝΟ] [EMAIL] [ΠΟΛΗ]
> [φωτο hero]` and the credential line "Κλινική & Κοινωνική Ψυχολογία"
> (flagged — confirm before presenting as fact).
