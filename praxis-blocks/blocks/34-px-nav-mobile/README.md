# Block #34 — px-nav-mobile

Off-canvas **mobile navigation**: hamburger → slide-in panel with overlay,
focus trap, staggered links. `px-mnav__` prefix, paired with `block.js`.
Generalised from the proven `sites/therapist` mobile-nav.

**Decoupling contract:** the panel CTA fires a `px:open-modal` custom event and
nothing more — this block has **no reference to any modal**. Block #35
(`px-contact-modal`) listens for that event. Ship 34 without 35 and the CTA is
simply inert; ship both and the nav opens the modal. They share only the
event *name*.

## Usage
```html
<div class="px-mnav" data-side="right">

  <!-- place the burger in your header -->
  <button class="px-mnav__burger" id="px-mnav-burger" type="button"
          aria-label="Άνοιγμα μενού" aria-expanded="false" aria-controls="px-mnav-panel">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
  </button>

  <!-- panel + overlay live near the end of <body> -->
  <div class="px-mnav__panel" id="px-mnav-panel" aria-hidden="true">
    <div class="px-mnav__inner" id="px-mnav-inner" role="dialog" aria-modal="true" aria-label="Μενού">
      <div class="px-mnav__top">
        <button class="px-mnav__close" id="px-mnav-close" type="button" aria-label="Κλείσιμο μενού">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <ul class="px-mnav__list" role="list">
        <li><a href="#about">Σχετικά</a></li>
        <li><a href="#services">Υπηρεσίες</a></li>
        <li><a href="#faq">Συχνές ερωτήσεις</a></li>
        <li><a href="#contact">Επικοινωνία</a></li>
      </ul>
      <!-- CTA: fires px:open-modal (block #35 listens) -->
      <button class="px-mnav__cta" type="button" data-open-modal>Κλείσε ραντεβού</button>
    </div>
  </div>
  <div class="px-mnav__overlay" id="px-mnav-overlay"></div>

</div>
<script src="block.js"></script>
```

## Config
| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-side` | `right` \| `left` | `right` | side the panel slides in from |

## Behaviour
- GSAP slide if `window.gsap` is loaded; otherwise the CSS `[aria-hidden]`
  fallback shows/hides the panel instantly. Works with **no JS deps**.
- Focus trap, `Escape`, overlay-click and close-button all dismiss.
- In-page (`#…`) links smooth-scroll after the panel closes.
- Body scroll is locked via `body.px-no-scroll` while open.
- The burger is hidden ≥ 1025px (desktop keeps its own nav).

## Required ids
`px-mnav-burger`, `px-mnav-panel`, `px-mnav-inner`, `px-mnav-overlay`,
`px-mnav-close` — the script wires by id, so use them verbatim.

## Files
- `block.css` — styles (caldera tokens with fallbacks)
- `block.js` — drawer + `px:open-modal` dispatch (vanilla, IIFE; GSAP optional)

## Enqueue (WP)
```php
wp_enqueue_style('pt-block34', $tu . '/assets/block34.css', ['pt-main'], $v);
wp_enqueue_script('pt-block34', $tu . '/assets/block34.js', ['gsap'], $v, true); // gsap optional
```
