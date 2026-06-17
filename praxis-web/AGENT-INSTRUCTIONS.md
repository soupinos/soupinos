# Praxis Web — Agent Instructions
> These instructions are for the **agent** that finishes the assembly. They assume the skeleton (13 files) has already been committed by the architect.

---

## 0. Read this first

The skeleton architect has already written all non-obvious architecture:
- `functions.php` — enqueue order, SCF init, px_gr_upper(), px_web_field()
- `inc/scf-fields.php` — all SCF local field groups
- `assets/css/tokens-champagne.css` — the entire champagne skin (overrides all px-blocks tokens)
- `assets/css/skin.css`, `layout.css`, `motion.css`, `grain.css`
- `assets/js/motion.js` — GSAP + Lenis + ScrollTrigger wiring
- `header.php`, `footer.php`, `index.php`, `front-page.php` — complete WP templates

**Do NOT rewrite or restructure any of these files.** Your job is additive only.

---

## 1. Copy px-blocks into the theme

The theme enqueues block assets from `{theme}/blocks/`. The source library lives at `../../praxis-blocks/blocks/` relative to the theme root.

```bash
# From /home/user/soupinos/praxis-web/
mkdir -p blocks

# Copy only the blocks used by this theme
for b in 01-header-dropdown 02-hero-video 04-footer 11-counters 25-services-cards 26-statement-list 30-px-cta-multi 32-px-key-facts 34-px-nav-mobile; do
  cp -r ../praxis-blocks/blocks/$b blocks/
done

# Block #35 is self-contained — it lives at the theme root level, NOT in blocks/
cp -r ../praxis-blocks/blocks/35-px-contact-modal .
```

**After copying**, verify these paths exist (functions.php will silently skip missing files, but you'll get no CSS/JS):
- `blocks/01-header-dropdown/block.css`
- `blocks/01-header-dropdown/block.js`
- `blocks/02-hero-video/block.css`
- `blocks/02-hero-video/block.js`
- `blocks/25-services-cards/block.css`
- `blocks/26-statement-list/block.css`
- `blocks/30-px-cta-multi/block.css`
- `blocks/32-px-key-facts/block.css`
- `blocks/32-px-key-facts/block.js`
- `blocks/34-px-nav-mobile/block.css`
- `blocks/34-px-nav-mobile/block.js`
- `35-px-contact-modal/block.php`
- `35-px-contact-modal/block.css`
- `35-px-contact-modal/block.js`

---

## 2. WordPress setup checklist

Complete these in the WP admin before testing the theme:

### 2a. Install plugins
1. **Secure Custom Fields** (SCF — the free fork of ACF). Install from wp-admin → Plugins → Add New. Search "Secure Custom Fields". This is NOT ACF Pro. Do NOT install ACF Pro.
2. Nothing else is required. No page builders, no Elementor.

### 2b. Activate the theme
wp-admin → Appearance → Themes → activate "Praxis Web".

### 2c. Set front page
wp-admin → Settings → Reading → set "Your homepage displays" to "A static page" → Homepage: create a blank page called "ΑΡΧΙΚΗ" (or "Home") → assign it. The theme uses `front-page.php` which WP loads for the static front page.

### 2d. Enable SCF options page
SCF registers `pw-options` automatically (via `acf_add_options_page` in `inc/scf-fields.php`). Verify it appears as "Praxis Web Settings" under the SCF menu. If it doesn't appear, confirm SCF is active and check `inc/scf-fields.php` line ~7 for the options page registration.

### 2e. Verify field groups appear
SCF → Field Groups. You should see:
- `PW – Header` (Options page: Praxis Web Settings)
- `PW – Hero` (Front page)
- `PW – Cards` (Front page)
- `PW – Manifesto` (Front page)
- `PW – Stats` (Front page)
- `PW – CTA strip` (Front page)
- `PW – SEO` (All pages, sidebar)
- `PW – Contact Modal` (Options page: Site Options) ← registered by block #35's own block.php

---

## 3. SCF field seeding (default content)

After the theme is active and field groups are visible, seed the following content via SCF admin. All content is in Greek; do not translate or simplify.

### Header (SCF → Praxis Web Settings)
| Field | Value |
|---|---|
| `pw_logo_text` | `PRAXIS` |
| `pw_header_cta_text` | `ΕΠΙΚΟΙΝΩΝΙΑ` |

**Nav items** (pw_nav_items repeater — add 4 rows):
| label | url |
|---|---|
| `ΥΠΗΡΕΣΙΕΣ` | `#services` |
| `MANIFESTO` | `#manifesto` |
| `ΑΠΟΤΕΛΕΣΜΑΤΑ` | `#stats` |
| `ΕΠΙΚΟΙΝΩΝΙΑ` | `#contact` |

### Hero (SCF → front page → edit)
| Field | Value |
|---|---|
| `pw_hero_headline` | `Χτίζουμε digital παρουσίες που αποδίδουν.` |
| `pw_hero_subline` | `Strategy · Design · Development — με μέτρο αποτελέσματος, όχι αισθητικής.` |
| `pw_hero_cta1_txt` | `Μάθε πώς δουλεύουμε` |
| `pw_hero_cta1_url` | `#services` |
| `pw_hero_cta2_txt` | `Επικοινωνία` |
| `pw_hero_cta2_url` | `#` (leave as # — triggers modal via data-open-modal in front-page.php) |
| `pw_hero_video` | Upload a landscape MP4 background video (loop, muted, <5MB). If none available, leave empty — front-page.php has a poster fallback. |
| `pw_hero_poster` | Upload a JPG/WebP fallback image (1920×1080) |

### Services Cards (pw_cards repeater — add 6 rows)
| # | tag | num | title | desc | link |
|---|---|---|---|---|---|
| 1 | `ΣΤΡΑΤΗΓΙΚΗ` | `01` | `Ψηφιακή Στρατηγική` | `Αναλύουμε, σχεδιάζουμε και θέτουμε μετρήσιμους στόχους.` | `#` |
| 2 | `ΣΧΕΔΙΑΣΜΟΣ` | `02` | `UX & UI Design` | `Interfaces που σέβονται τον χρήστη και ενισχύουν το brand.` | `#` |
| 3 | `ΑΝΑΠΤΥΞΗ` | `03` | `Web Development` | `WordPress, custom PHP, performance-first code.` | `#` |
| 4 | `ΠΕΡΙΕΧΟΜΕΝΟ` | `04` | `Content & SEO` | `Κείμενο που πείθει και Google που βρίσκει.` | `#` |
| 5 | `ΔΙΑΦΗΜΙΣΗ` | `05` | `Paid Media` | `Google Ads, Meta, LinkedIn — ROI πάνω από εντυπώσεις.` | `#` |
| 6 | `ΣΥΝΤΗΡΗΣΗ` | `06` | `Ongoing Support` | `Hosting, updates, monitoring, 48h response SLA.` | `#` |

### Manifesto (pw_manifesto_items repeater — add 3 rows)
| # | text (WYSIWYG) |
|---|---|
| 1 | `Πιστεύουμε ότι το <strong>καλό design</strong> είναι αόρατο — φαίνεται μόνο στα αποτελέσματα.` |
| 2 | `Δεν φτιάχνουμε websites. Φτιάχνουμε <strong>ψηφιακά εργαλεία</strong> που δουλεύουν για τον πελάτη μας.` |
| 3 | `Ο μόνος metric που μας ενδιαφέρει: <strong>μεγαλώνει η επιχείρησή σου</strong>;` |

`pw_manifesto_eyebrow`: `ΤΙ ΠΙΣΤΕΥΟΥΜΕ`

### Stats (pw_stats repeater — add 4 rows)
| num | suffix | label |
|---|---|---|
| `127` | `+` | `Έργα που παραδόθηκαν` |
| `94` | `%` | `Ικανοποίηση πελατών` |
| `8` | `χρόνια` | `Εμπειρίας στο web` |
| `3×` | `` | `Avg. ROI για τους πελάτες μας` |

`pw_stats_heading`: `Αριθμοί που μιλούν`

### CTA Strip
| Field | Value |
|---|---|
| `pw_cta_heading` | `Έτοιμος να αναβαθμίσεις την digital παρουσία σου;` |
| `pw_cta_text` | `Μιλήσαμε με δεκάδες επιχειρήσεις που ήξεραν ότι κάτι δεν πήγαινε καλά. Μαζί το φτιάξαμε.` |
| `pw_cta_btn_txt` | `Μιλήσε μαζί μας` |
| `pw_cta_phone` | `+30 210 000 0000` |

### Contact Modal (SCF → Site Options — registered by block #35)
Block #35 registers its own fields on `acf-options`. Verify these fields appear under "Site Options":
- `modal_heading`: `Ας μιλήσουμε`
- `modal_sub`: `Πες μας για το project σου και θα επικοινωνήσουμε εντός 24 ωρών.`
- `modal_cta`: `Στείλε το μήνυμά σου`
- `modal_success`: `Το μήνυμά σου έφτασε. Θα επικοινωνήσουμε σύντομα!`
- Recipient email: your client's email

---

## 4. Token overrides — DO NOT TOUCH

`assets/css/tokens-champagne.css` overrides all px-blocks CSS custom properties. **Do not edit this file** unless the client changes the brand palette. The champagne skin cascades automatically to all 35 blocks. If a block color looks wrong, first check whether its CSS uses the correct token variable (should be `var(--gold)`, `var(--red)`, `var(--bg)` etc.).

---

## 5. Motion — what's wired, what's not

All motion is in `assets/js/motion.js`. Do not add jQuery animation, do not add CSS `animation:` rules for entrance effects (`.reveal` is motion.js's domain).

The GSAP transform channel ownership contract (must not be broken):
- `.px-mnav__inner` — `xPercent` owned by block #34's JS only
- `.px-modal__dialog` — `yPercent`/`scale` owned by block #35's JS only
- `.px-nav-logo::after` — CSS `scaleX` transition only, never GSAP
- `.px-hero-video-media` — `yPercent` owned by motion.js only
- `.reveal` elements — `y` + `opacity` owned by motion.js only

If you add new animated elements, use new CSS classes not on this list.

---

## 6. Typography rules

- Font: **Inter** only (loaded from Google Fonts in functions.php)
- Weights used: 200, 300, 400, 600
- Greek uppercase text: always use `<?= px_gr_upper('κείμενο') ?>` in PHP templates. Never use raw CSS `text-transform:uppercase` on Greek text (breaks tonos handling)
- Statement section (block #26) uses weight 300, `clamp(22px,2.8vw,32px)`
- Stats figures use weight 200, `clamp(40px,6vw,60px)`

---

## 7. Adding new pages (beyond the homepage)

For inner pages, create `page.php`:

```php
<?php get_header(); ?>
<main class="pw-wrap" style="padding-top:120px;min-height:60vh">
  <?php while(have_posts()): the_post(); the_content(); endwhile; ?>
</main>
<?php get_footer(); ?>
```

Block #35 modal is auto-injected on every page via `wp_footer` (registered in `functions.php` via `require_once`).

---

## 8. Performance checklist before launch

- [ ] Video file < 5 MB, H.264, no audio track, 1280×720 minimum
- [ ] Hero poster image as WebP, < 200 KB
- [ ] All card images uploaded via SCF image fields at 800×600 max
- [ ] Run Lighthouse — target 90+ Performance on mobile
- [ ] Verify `prefers-reduced-motion` path: all entrance animations should be instant
- [ ] Test contact form: honeypot field hidden, nonce present in DOM, AJAX endpoint returns JSON
- [ ] Confirm SCF `pw_nav_items` drives the mobile menu (block #34 panel) correctly

---

## 9. What NOT to do

- Do NOT install Elementor, Divi, WPBakery, or any page builder
- Do NOT install ACF Pro — SCF (free) is the correct plugin
- Do NOT add jQuery — everything is vanilla JS
- Do NOT add `!important` rules in skin.css beyond what's already there (header overrides)
- Do NOT edit files in `praxis-blocks/` source directory — only the copies inside `praxis-web/blocks/`
- Do NOT add CSS `animation:` or `transition:` for reveal effects — motion.js handles that
- Do NOT hardcode Greek text in PHP templates — every visible string must come from an SCF field
- Do NOT use `the_field()` — always use `px_web_field()` or `get_field()` with an explicit fallback
