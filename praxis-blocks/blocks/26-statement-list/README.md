# Block #26 — statement-list

A short manifesto: a few strong serif lines, one per row, each gently
revealed with a stagger. Pure CSS, `px-sl-` prefix.

## Usage
```html
<section class="section paper">
  <div class="wrap">
    <div class="px-sl-root" data-variant="light">
      <p class="px-sl-item reveal">
        <span class="px-sl-mark" aria-hidden="true">✦</span>
        <span class="px-sl-text">Δεν θα σε πω «πελάτη» — είσαι άνθρωπος.</span>
      </p>
      <p class="px-sl-item reveal d1">
        <span class="px-sl-mark" aria-hidden="true">✦</span>
        <span class="px-sl-text">Δεν θα στείλεις ραντεβού σε γραμματεία — απαντάω εγώ.</span>
      </p>
      <p class="px-sl-item reveal d2">…</p>
      <p class="px-sl-item reveal d3">…</p>
    </div>
  </div>
</section>
```

## Config
| Attribute | Values | Default | Use on |
|---|---|---|---|
| `data-variant` | `light` \| `dark` | `light` | light surfaces / `.section.navy` |

`.px-sl-mark` is optional. Use `reveal` + `d1/d2/d3` for the soft staggered
fade-up; lines are fully visible without JS.

## Files
- `block.css` — styles only (no JS)
- Copy to theme `assets/block26.css`

## Enqueue (WP)
```php
wp_enqueue_style('pt-block26', $tu . '/assets/block26.css', ['pt-main'], $v);
```
