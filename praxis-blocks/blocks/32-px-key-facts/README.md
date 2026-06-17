# Block #32 — px-key-facts

A compact grid of **key facts / figures** (figure + label + optional note).
Quiet and editorial — not a flashy stats counter. `px-kf` prefix, paired with
`block.js` (optional count-up on scroll).

## Usage
```html
<div class="px-kf" data-cols="3" data-variant="light" data-count="off">
  <div class="px-kf__grid">

    <div class="px-kf__item">
      <span class="px-kf__fig">12+</span>
      <span class="px-kf__label">Χρόνια εμπειρίας</span>
    </div>

    <div class="px-kf__item">
      <span class="px-kf__fig">50′</span>
      <span class="px-kf__label">Διάρκεια συνεδρίας</span>
      <span class="px-kf__note">δια ζώσης ή online</span>
    </div>

    <div class="px-kf__item">
      <span class="px-kf__fig">100%</span>
      <span class="px-kf__label">Εμπιστευτικότητα</span>
    </div>

  </div>
</div>
```

## Count-up (optional)
Set `data-count="on"` on the root and put the numeric target in `data-count-to`
on each figure. Any prefix/suffix text is preserved; only the number animates.
```html
<div class="px-kf" data-cols="3" data-count="on">
  <div class="px-kf__grid">
    <div class="px-kf__item">
      <span class="px-kf__fig" data-count-to="12">12</span>
      <span class="px-kf__label">Χρόνια εμπειρίας</span>
    </div>
  </div>
</div>
<script src="block.js"></script>
```
The figure's **final value lives in the markup**, so without JS, without
`IntersectionObserver`, or under `prefers-reduced-motion` the number is shown
immediately — the count-up is pure enhancement. Decimals use a comma
(`3,5`); the target may too (`data-count-to="3,5"`).

## Config
| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-cols` | `2` \| `3` \| `4` | `3` | auto-stacks: → 2-up < 760px, → 1-up < 440px |
| `data-variant` | `light` \| `dark` | `light` | dark variant for navy/dark surfaces |
| `data-count` | `off` \| `on` | `off` | `on` enables count-up on scroll (needs `block.js`) |

## Files
- `block.css` — styles (caldera tokens with fallbacks)
- `block.js` — optional count-up (vanilla, IIFE, IntersectionObserver)

## Enqueue (WP)
```php
wp_enqueue_style('pt-block32', $tu . '/assets/block32.css', ['pt-main'], $v);
wp_enqueue_script('pt-block32', $tu . '/assets/block32.js', [], $v, true); // only if data-count="on"
```
