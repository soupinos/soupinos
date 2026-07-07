# DB-12 · Footer Editorial

**Storytelling slot:** the close — redesigned as a "back cover": a large
permanent wordmark, then a true-φ (61.8/38.2) split body (epigraph,
one-paragraph summary and the social row on the major side; pages and
contact stacked on the minor side), a hairline, and the legal line.
Calm on purpose — the last impression on the page.

**Rhythm beat:** dense information (epigraph + summary + nav + contact +
legal), `s` spacing, but visually quiet — one FX and no shadows
anywhere in the block are load-bearing for that, not incidental.

## Default FX

`data-fx="fx-01"` on `.db-footer-editorial__body` (not the wordmark),
reveal-masking the epigraph/summary/social/columns block as one unit on
scroll enter. The wordmark itself is static — it reads as a fixed
masthead, not something that needs an entrance. One FX only, same
reasoning as before: a footer that stagger-animates every link
individually reads as trying too hard for the last thing on the page.

## The φ split — fr units, not percent

```css
.db-footer-editorial__body {
  grid-template-columns: 61.8fr 38.2fr;
}
```

This block does **not** reuse `tokens/core.css`'s `--px-split-major`/
`--px-split-minor` (`61.8%`/`38.2%`) here, on purpose. Percentage
columns sum to 100% of the container *before* `gap` is added, so a grid
using `61.8% 38.2%` plus a `gap` renders slightly narrower than true φ
once you measure the actual content boxes. `fr` units are computed
*after* the gap is subtracted from the available space, so `61.8fr
38.2fr` stays a true 61.8/38.2 split of the two content columns
regardless of gap size — verified by measuring the rendered column
widths, not just trusting the CSS.

## Icons — second approved exception

The social row (Instagram, Facebook, WhatsApp) is the second of two
icon exceptions in the library (the first is DB-16 AmenitiesQuiet) —
see `docs/principles.md` "Icon restraint". These icons aren't
decoration standing in for text that could carry the same hierarchy;
they're each platform's actual visual identity, which text alone can't
substitute for in a compact row. Same constraint as DB-16: inline SVG,
`stroke-width: 1.5`, `fill: none`, single accent-family stroke colour —
no filled shapes, including no filled accent dots (the Instagram "lens
flash" and WhatsApp glyph were both drawn stroke-only to hold that
line, even though a filled dot is the more common way to draw them).

## Component tokens

`--px-footer-bg`, `--px-footer-ink`, `--px-footer-muted`,
`--px-footer-accent`, `--px-footer-rule`, `--px-footer-pad`.
