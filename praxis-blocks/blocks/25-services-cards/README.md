# Block #25 — services-cards

Row of equal, quiet service cards (default 3). A small ✦ accent, optional
index number, title, short text. **Not** a pricing grid — no prices, no
"featured" ribbon, no gold top-bar fill. Pure CSS, `px-sc-` prefix.

## Usage
```html
<section class="section paper-2">
  <div class="wrap">
    <div class="px-sc-grid" data-cols="3">
      <article class="px-sc-card reveal">
        <span class="px-sc-icon" aria-hidden="true">✦</span>
        <h3 class="px-sc-title"><span class="px-sc-num">1 ·</span> Ψυχοθεραπεία</h3>
        <p class="px-sc-text">Χωρίς φάρμακα. Χωρίς συνταγές. Μόνο κουβέντα που σε πάει πιο κάτω.</p>
      </article>
      <article class="px-sc-card reveal d1">…</article>
      <article class="px-sc-card reveal d2">…</article>
    </div>
  </div>
</section>
```

## Config
| Attribute | Values | Default |
|---|---|---|
| `data-cols` | `2` \| `3` \| `4` | `3` |

Responsive: desktop `data-cols` → 2-up (≤900px) → 1-up (≤560px).
`.px-sc-icon`, `.px-sc-num` are optional. Add `reveal`/`d1`/`d2` for staggered
fade-up (content visible without JS).

## Files
- `block.css` — styles only (no JS)
- Copy to theme `assets/block25.css`

## Enqueue (WP)
```php
wp_enqueue_style('pt-block25', $tu . '/assets/block25.css', ['pt-main'], $v);
```
