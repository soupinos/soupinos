# Block #31 — px-quick-answer

A **featured-snippet-friendly** short answer: one clear question, a tight
40–55 word answer, optional supporting detail. Built to win Google's answer
box. `px-qa` prefix, paired with `block.js` (optional `Question` JSON-LD).

## Usage
```html
<div class="px-qa" data-variant="light" data-schema="on">
  <h2 class="px-qa__q">Πόσο κοστίζει μια συνεδρία ψυχοθεραπείας;</h2>
  <p class="px-qa__a">
    Μια ατομική συνεδρία 50 λεπτών κοστίζει <strong>[ΤΙΜΗ]€</strong>, δια ζώσης ή
    online. Η πρώτη γνωριμία των 15 λεπτών είναι δωρεάν και χωρίς δέσμευση.
  </p>
  <div class="px-qa__more">
    <p>Διαθέσιμες εκπτώσεις για φοιτητές και πακέτα συνεδριών. Η πληρωμή γίνεται
    με μετρητά, κάρτα ή τραπεζική κατάθεση.</p>
  </div>
</div>
<script src="block.js"></script>
```

## Writing the snippet (the whole point)
- **Lead with the direct answer** in the first sentence of `.px-qa__a`.
- Keep `.px-qa__a` to **~40–55 words** — Google truncates longer answers.
- Use a **real heading** (`<h2>`/`<h3>`) for `.px-qa__q`, phrased as the
  question people actually type.
- Put nuance/qualifiers in `.px-qa__more`, not in the snippet sentence.

## Config
| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-variant` | `light` \| `dark` | `light` | dark variant for navy/dark surfaces |
| `data-schema` | `on` \| `off` | `on` | `off` skips `Question` JSON-LD for this block |

`block.js` reads the **rendered** question/answer into the schema, so the
structured data never drifts from the visible text. Multiple `.px-qa` blocks on
one page are emitted together as a single `QAPage`. The script is optional —
omit it if you don't want structured data; the block still renders fine.

## Files
- `block.css` — styles (caldera tokens with fallbacks)
- `block.js` — optional `Question`/`QAPage` JSON-LD (vanilla, IIFE, zero deps)

## Enqueue (WP)
```php
wp_enqueue_style('pt-block31', $tu . '/assets/block31.css', ['pt-main'], $v);
wp_enqueue_script('pt-block31', $tu . '/assets/block31.js', [], $v, true);
```
