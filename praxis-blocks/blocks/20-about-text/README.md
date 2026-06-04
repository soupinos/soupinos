# Block #20 — about-text

Single-column intro / about / manifesto text. Lots of whitespace, calm
measure. Pure CSS, caldera skin tokens, `px-at-` prefix.

## Usage
```html
<section class="section paper">
  <div class="wrap">
    <div class="px-at-root reveal" data-align="center">
      <span class="px-at-eyebrow">Ποιός είμαι</span>
      <h2 class="px-at-title">Με λένε [ΟΝΟΜΑ]. Και δεν πιστεύω στην εμπορευματοποίηση της ψυχής.</h2>
      <p class="px-at-body">Ξέρω τι σκέφτεσαι: «ακόμα ένας ψυχολόγος»…</p>
      <p class="px-at-credential">Κλινική &amp; Κοινωνική Ψυχολογία</p>
    </div>
  </div>
</section>
```

## Config
| Attribute | Values | Default |
|---|---|---|
| `data-align` | `center` \| `left` | `center` |

- Add multiple `.px-at-body` paragraphs as needed.
- `.px-at-eyebrow` and `.px-at-credential` are optional.
- Add `reveal` (theme/scroll-reveal block) for a soft fade-up; content is
  fully visible without JS.

## Files
- `block.css` — styles only (no JS needed)
- Copy to theme `assets/block20.css`

## Enqueue (WP)
```php
wp_enqueue_style('pt-block20', $tu . '/assets/block20.css', ['pt-main'], $v);
```
