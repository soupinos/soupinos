# Block #29 — px-faq

Accessible **accordion** (one-open-at-a-time) that also emits **FAQPage
JSON-LD** so the Q&As are eligible for Google's FAQ rich result. `px-faq__`
prefix, paired with `block.js`. Generalised from the proven
`sites/therapist` FAQ.

`block.js` builds the triggers and panels, animates open/close (GSAP height
if `window.gsap` is present, otherwise instant), and injects **one** schema
`<script>` whose answer text is read from the **rendered DOM** — so the schema
can never drift from what the visitor sees.

## Usage
```html
<div class="px-faq" data-block="px-faq" data-variant="light" data-schema="on">

  <div class="px-faq__item" data-question="Πόσο διαρκεί μια συνεδρία;">
    <p>Κάθε συνεδρία διαρκεί <strong>50 λεπτά</strong>, δια ζώσης ή online.</p>
  </div>

  <div class="px-faq__item" data-question="Χρειάζεται να ξέρω τι ψάχνω;">
    <p>Όχι. Αρκεί να νιώθεις ότι κάτι δεν κυλάει όπως θα ήθελες.</p>
  </div>

</div>
<script src="block.js"></script>
```

**Authoring rule:** put the question in `data-question` on the `.px-faq__item`,
and the answer as normal HTML *inside* the item. `block.js` moves the answer
into an animated panel and prepends the trigger button — you write plain
content, the block does the wiring.

## Config
| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-block` | `px-faq` | — | **required**; block.js only enhances matching roots |
| `data-variant` | `light` \| `dark` | `light` | dark variant for navy/dark surfaces |
| `data-schema` | `on` \| `off` | `on` | `off` skips JSON-LD for this block (e.g. when the page already has an FAQPage) |

## Accessibility
- Real `<button>` triggers with `aria-expanded` / `aria-controls`.
- Panels are `role="region"` + `aria-labelledby`.
- Keyboard: ↑/↓ move between questions, Home/End jump to first/last.
- Respects `prefers-reduced-motion` (no chevron spin, instant panels).

## SEO note
Only emit FAQPage schema where the questions are **genuinely answered on the
page** — that is Google's policy. Set `data-schema="off"` on decorative or
duplicated accordions to avoid multiple FAQPage blocks per URL.

## Files
- `block.css` — styles (caldera tokens with fallbacks)
- `block.js` — accordion + JSON-LD (vanilla, IIFE; GSAP optional)

## Enqueue (WP)
```php
wp_enqueue_style('pt-block29', $tu . '/assets/block29.css', ['pt-main'], $v);
wp_enqueue_script('pt-block29', $tu . '/assets/block29.js', ['gsap'], $v, true); // gsap optional
```
