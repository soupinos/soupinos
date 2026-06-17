# Block #33 — px-pros-cons

A balanced **pros / cons** (υπέρ / κατά) two-column comparison. Honest by
design: both columns are first-class, no dark-patterns that bury the cons.
`px-pc` prefix. **CSS-only.**

## Usage
```html
<div class="px-pc" data-variant="light">

  <div class="px-pc__col" data-kind="pro">
    <div class="px-pc__head">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
      <h3 class="px-pc__title">Πότε βοηθάει η online συνεδρία</h3>
    </div>
    <ul class="px-pc__list">
      <li class="px-pc__item">Δεν χρειάζεται μετακίνηση — γλιτώνεις χρόνο.</li>
      <li class="px-pc__item">Ίδια ποιότητα επικοινωνίας με σταθερή σύνδεση.</li>
      <li class="px-pc__item">Ευελιξία ωραρίου, ακόμη κι από άλλη πόλη.</li>
    </ul>
  </div>

  <div class="px-pc__col" data-kind="con">
    <div class="px-pc__head">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/></svg>
      <h3 class="px-pc__title">Πότε προτιμώ τη δια ζώσης</h3>
    </div>
    <ul class="px-pc__list">
      <li class="px-pc__item">Στις πρώτες συνεδρίες, για πιο άμεση επαφή.</li>
      <li class="px-pc__item">Όταν το θέμα είναι έντονο συναισθηματικά.</li>
      <li class="px-pc__item">Αν η σύνδεσή σου δεν είναι σταθερή.</li>
    </ul>
  </div>

</div>
```

## Config
| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-variant` | `light` \| `dark` | `light` | dark variant for navy/dark surfaces |
| `data-kind` (on `.px-pc__col`) | `pro` \| `con` | — | sets the accent + the auto ✓ / — glyph |

## Accessibility
The pro/con meaning is carried by the **column title text**, not colour alone.
The ✓ / — markers are decorative CSS `::before` content (not announced). Use a
real heading (`<h3>`) per column. Columns stack to a single column < 640px.

## Greek caps
Titles are sentence case by default. If you want uppercase column titles, write
them **pre-uppercased** in the markup (or `px_gr_upper()` server-side) — never
`text-transform` on Greek.

## Files
- `block.css` — styles (caldera tokens with fallbacks). CSS-only.

## Enqueue (WP)
```php
wp_enqueue_style('pt-block33', $tu . '/assets/block33.css', ['pt-main'], $v);
```
