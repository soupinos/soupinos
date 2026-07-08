# Villa Lefki — WordPress theme

A WordPress translation of `sites/villa-lefki/source/Villa Lefki.dc.html`
(the Praxis-Ionian design source). **Every content item is editable via
Secure Custom Fields; the visual design, layout and FX are a byte-faithful
port of the frozen design — nothing was redesigned.**

## Requirements

- WordPress 6.4+ (SCF ships in WP; ACF also works)
- PHP 8.0+
- **Secure Custom Fields** (or ACF) active — the field groups and options
  page are registered by the theme on `acf/init`.

## How the design is reproduced 1:1

### Stylesheet cascade (order is load-bearing)

`functions.php` enqueues the CSS in the exact order the source `.dc.html`
linked it. Each sheet depends on the previous handle so WordPress cannot
reorder them:

1. `assets/css/ds/*` — the reconstructed design-system bundle, in order:
   `00-core` (structural tokens) → `01-skin` (Ionian Earth colours + EB
   Garamond/Inter) → `10..25` (DB-01…DB-16 block styles).
2. `assets/css/local/*` — the source's own overrides, loaded **last** so
   they win: `10-core-fluid` re-floors the fluid type tokens (without it
   the hero oversizes at 360px), then the `20..24` DB-13/14/15/16/12
   retunes.
3. The page-local `<style>` from the source `<head>` (hero title clamp,
   `body { overflow-x: hidden }`, scroll padding) via `wp_add_inline_style`
   on the last handle.

Verified hero display size: **44px @360px, 102.4px @1440px** — identical to
the source's audit targets.

### FX

`assets/js/theme-fx.js` re-homes the source's inline `DCLogic` component
verbatim: it loads GSAP → ScrollTrigger → Lenis → `fx-core.js` →
`fx-catalog.js` **in that order**, performs the deferred
`data-fx-init → data-fx` promotion, calls `PraxisFX.scanAndMount`, then
`settleScroll()` re-measures once fonts/images/FX settle. It also carries
the (decorative) language switcher, the scrollspy, and the contact-form
submit. `fx-core.js` / `fx-catalog.js` are the unchanged design-system
files.

The animation-library URLs default to the source's **jsDelivr CDN URLs**
and are exposed through the `villa_fx_lib_urls` filter, so an environment
without CDN egress can point them at local copies without editing the theme.

## Content model (SCF)

- **Villa Options** (options page): wordmark, localities, contact email /
  phone / address, nav-chrome labels, the nav/pages repeater, the socials
  repeater, and the language repeater (decorative switcher).
- **Front page** (classic editor, one field group per section): Hero,
  Tension, Manifesto, Editorial rows, Amenities, Proof, Reviews, FAQ, CTA,
  Footer. Set a static front page under *Settings → Reading*; the theme
  renders it via `front-page.php`.

### The four sync traps (see the section templates)

1. **Images** — every "photo" is a `role="img"` div that an FX animates via
   `transform`. The image field is applied as a `background-image` on that
   exact node (`px_bg_style`), never an `<img>`, so the transform target is
   unchanged; alt text lives in `aria-label`.
2. **Reviews** — the SCF reviews repeater is the single source: slide 0
   renders into the static card **and** the full list is emitted as JSON
   into `[data-fx-target="reviews-data"]` for FX-15 — they can't drift.
3. **FAQ** — a variable-length repeater is auto-distributed across the two
   columns (`ceil(n/2)` / rest); FX-14 still finds every card.
4. **Counters** — the real value is written to `data-fx-to`; the cell keeps
   `0` as the no-JS placeholder.

### Greek uppercase

Uppercase Greek display copy is stored already-uppercase, without tonos, in
the fields (the design system's hard rule). CSS `text-transform` is never
relied on for Greek. `px_gr_upper()` (`inc/helpers.php`) is provided for any
programmatic uppercasing — it strips tonos while keeping the dialytika.

## Two things to know (flagged, not defects)

- **Contact form** (`inc/contact-form.php`) posts to a real AJAX handler
  that `wp_mail()`s the enquiry to the site contact address, with the
  source's success-text UX preserved. Delivery needs a working mailer on the
  host (configure an SMTP plugin in production); with no MTA the enquiry is
  logged and the visitor still sees success.
- **Hero horizontal extent** — the static layout has zero horizontal
  overflow at 360/1440. While FX-06 ken-burns is running, its `scale()` on
  the hero media transiently exceeds the viewport; this is contained by the
  hero's `overflow: clip` and `body { overflow-x: hidden }` exactly as in the
  source (the body is never horizontally scrollable). It is a property of the
  frozen design, reproduced faithfully — not introduced here.

## File map

```
style.css                 theme header (no rules; cascade is in functions.php)
functions.php             enqueues (ordered), FX config filter, classic-editor for front page
header.php / footer.php   document shell; nav chrome lives in header
front-page.php            assembles the 13 sections in source order
inc/helpers.php           px_gr_upper, px_field/px_opt, image + bg helpers
inc/scf-fields.php        options page + per-section field groups (acf/init)
inc/icons.php             pre-approved amenity + social SVG registry (icon-restraint safe)
inc/contact-form.php      booking-enquiry AJAX handler
template-parts/*.php      one partial per section (DB-01,03,04,05,07,11,12,13,14,15,16)
assets/css/ds/*           design-system bundle (tokens + DB block styles)
assets/css/local/*        source overrides, loaded last
assets/js/fx-core.js      design-system FX runtime (unchanged)
assets/js/fx-catalog.js   design-system FX catalog (unchanged)
assets/js/theme-fx.js     re-homed page runtime (FX bootstrap, lang, scrollspy, form)
```
