# Block #30 — px-cta-multi

Several **CTA variants in one block** — choose per button with `data-variant`.
Use it for a row of mixed actions (primary + secondary + "learn more") or a
single full-width banner CTA. `px-cta` prefix. **CSS-only** — no JS of its own.

## Variants (`data-variant` on `.px-cta`)
| Variant | Role | Look |
|---|---|---|
| `solid` | primary action | filled gold |
| `outline` | secondary action | bordered, transparent |
| `ghost` | tertiary / "learn more" | text with underline-on-hover |
| `banner` | hero bar CTA | large full-width bar |

## Usage
```html
<div class="px-cta-multi" data-align="start" data-surface="light">
  <div class="px-cta-multi__row">

    <a class="px-cta" data-variant="solid" href="#book">
      <span class="px-cta__label">Κλείσε ραντεβού</span>
      <svg class="px-cta__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a>

    <a class="px-cta" data-variant="outline" href="#services">
      <span class="px-cta__label">Δες τις υπηρεσίες</span>
    </a>

    <a class="px-cta" data-variant="ghost" href="#about">
      <span class="px-cta__label">Μάθε περισσότερα</span>
    </a>

  </div>
</div>
```

### Banner variant
```html
<div class="px-cta-multi" data-surface="light">
  <div class="px-cta-multi__row">
    <button class="px-cta" data-variant="banner" type="button" data-open-modal>
      <span class="px-cta__label">Η πρώτη γνωριμία — 15 λεπτά, δωρεάν</span>
      <svg class="px-cta__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </button>
  </div>
</div>
```

## Modal hook (decoupled)
Add `data-open-modal` to any `.px-cta` to open the contact modal. The button
fires nothing on its own — **block #35 (`px-contact-modal`) listens** and opens.
This keeps the CTA and the modal fully decoupled via the `px:open-modal`
contract; you can ship this block without the modal and the button is just an
inert hook.

## Config
| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-align` | `start` \| `center` \| `end` | `start` | row alignment |
| `data-surface` | `light` \| `dark` | `light` | recolours outline/ghost/banner for dark surfaces |
| `data-variant` (on `.px-cta`) | `solid` \| `outline` \| `ghost` \| `banner` | `solid` | per-button |

## Greek caps
CTA labels keep sentence case by design. If you need an uppercase label, write
it **pre-uppercased** in the markup (or `px_gr_upper()` server-side) — never
`text-transform` on Greek.

## Files
- `block.css` — styles (caldera tokens with fallbacks). CSS-only.

## Enqueue (WP)
```php
wp_enqueue_style('pt-block30', $tu . '/assets/block30.css', ['pt-main'], $v);
```
