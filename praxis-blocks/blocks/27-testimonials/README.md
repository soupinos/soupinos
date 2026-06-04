# Block #27 — testimonials

Grid of quote cards (author + meta), light or dark. Paired with a small
**render guard** (`block.js`): the block renders **only** when it contains
real, consented cards. `px-ts-` prefix.

> **Ethics rule:** never ship demo/fake testimonials. With `data-render="auto"`
> (default) an empty block is removed automatically; `data-render="off"` is an
> explicit kill switch. Use `data-hide-target` to also remove the wrapping
> section, so no empty heading is left behind.

## Usage (real, consented content)
```html
<section class="section navy" id="reviews">
  <div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow on-dark"><span class="ln"></span><span>Μαρτυρίες</span></span>
    </div>
    <div class="px-ts-root" data-variant="dark" data-render="auto" data-hide-target="#reviews">
      <div class="px-ts-grid">
        <article class="px-ts-card reveal">
          <div class="px-ts-quote" aria-hidden="true">&ldquo;</div>
          <p class="px-ts-text">…πραγματική, συναινετική μαρτυρία…</p>
          <div class="px-ts-author">
            <span class="px-ts-avatar" aria-hidden="true">Μ</span>
            <div><div class="px-ts-name">Μ. Κ.</div><div class="px-ts-meta">2026</div></div>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>
```

## Empty / disabled
```html
<!-- auto: no cards → whole #reviews section removed at runtime -->
<div class="px-ts-root" data-render="auto" data-hide-target="#reviews"></div>

<!-- explicit off -->
<div class="px-ts-root" data-render="off" data-hide-target="#reviews"></div>
```

## Config
| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-render` | `auto` \| `off` | `auto` | auto removes when no cards |
| `data-variant` | `light` \| `dark` | `light` | |
| `data-hide-target` | CSS selector | — | also removes this wrapper when empty/off |

## Files
- `block.css` — styles (caldera tokens)
- `block.js` — render guard (vanilla, IIFE)
- Copy both to theme `assets/block27.css` + `assets/block27.js`

## Enqueue (WP)
```php
wp_enqueue_style('pt-block27', $tu . '/assets/block27.css', ['pt-main'], $v);
wp_enqueue_script('pt-block27', $tu . '/assets/block27.js', [], $v, true);
```
