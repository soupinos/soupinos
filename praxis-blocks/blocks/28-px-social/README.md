# Block #28 — px-social

Social **follow** links + a **share** row in one block. `px-soc-` prefix,
paired with `block.js`.

The share buttons are **SEO-aware**: at click time `block.js` reads the page's
`<link rel="canonical">` (falling back to `og:url`, then the live URL) and
`og:title` / `document.title`, so the shared snippet always matches the
indexed page — nothing is hardcoded.

## Usage
```html
<div class="px-soc-root" data-mode="both" data-variant="light">

  <!-- Follow: real profile links (plain anchors, no JS) -->
  <div class="px-soc-group">
    <p class="px-soc-label">ΑΚΟΛΟΥΘΗΣΕ</p>
    <ul class="px-soc-list" role="list">
      <li><a class="px-soc-link" href="https://instagram.com/brand" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <svg class="px-soc-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4" fill="none" stroke="#fff" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1"/></svg>
      </a></li>
      <!-- …more follow links… -->
    </ul>
  </div>

  <!-- Share: wired by block.js -->
  <div class="px-soc-group">
    <p class="px-soc-label">ΜΟΙΡΑΣΟΥ</p>
    <ul class="px-soc-list" role="list">
      <li><button class="px-soc-share" type="button" data-net="native"   aria-label="Μοιράσου">…</button></li>
      <li><button class="px-soc-share" type="button" data-net="facebook" aria-label="Facebook">…</button></li>
      <li><button class="px-soc-share" type="button" data-net="x"        aria-label="X">…</button></li>
      <li><button class="px-soc-share" type="button" data-net="linkedin" aria-label="LinkedIn">…</button></li>
      <li><button class="px-soc-share" type="button" data-net="link"     aria-label="Αντιγραφή συνδέσμου">…</button></li>
    </ul>
  </div>

</div>
<script src="block.js"></script>
```

## Config
| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-mode` | `follow` \| `share` \| `both` | `both` | documentary only — show/hide the groups you author |
| `data-variant` | `light` \| `dark` | `light` | dark variant for navy/dark surfaces |
| `data-net` (on `.px-soc-share`) | `native` \| `facebook` \| `x` \| `linkedin` \| `whatsapp` \| `link` | — | one per button |

### `data-net` behaviour
- **`native`** — uses the Web Share API. If unavailable, the button is **removed** at init (no dead button).
- **`facebook` / `x` / `linkedin` / `whatsapp`** — opens the network share dialog in a popup.
- **`link`** — copies the canonical URL to the clipboard and flips the button to a confirmed state for ~1.8 s.

## Greek caps
The `.px-soc-label` text is **pre-uppercased in the markup** (`ΑΚΟΛΟΥΘΗΣΕ`) — no
`text-transform`, so Greek accents are dropped correctly. For server-rendered
labels use `px_gr_upper()`.

## Files
- `block.css` — styles (caldera tokens with fallbacks)
- `block.js` — share wiring (vanilla, IIFE, zero deps)

## Enqueue (WP)
```php
wp_enqueue_style('pt-block28', $tu . '/assets/block28.css', ['pt-main'], $v);
wp_enqueue_script('pt-block28', $tu . '/assets/block28.js', [], $v, true);
```
