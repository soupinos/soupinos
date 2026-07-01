# DB-07 · Proof Strip

**Storytelling slot:** social proof — stats and a short quote — placed
right before a CTA block (DB-11) to convert credibility into action.
Compact by design; never lingers.

**Rhythm beat:** dense, `s`, always short.

## Default FX

Two independent triggers in this block: `data-fx="fx-08"` on the stats
row counts up each `[data-fx-target="counter"]` from 0 to its
`data-fx-to` value on scroll enter (FX-08 `counter-count-up`, no
transform channel — text content only). `data-fx="fx-07"` on the
blockquote fades/rises it in (FX-07 `stagger-grid`, falls back to
animating the element itself when no `[data-fx-target="item"]` children
exist — see `fx/fx-catalog.js` `targets()`). Two separate elements each
carry one FX, so the max-2-per-section rule is read per element here, not
pooled across the whole strip.

## Params

- `data-fx-to` on each counter: the number to count up to. Decimal
  values (e.g. `9.7`) are preserved — FX-08 reads decimal places from the
  target value.

## Component tokens

`--px-proof-bg`, `--px-proof-ink`, `--px-proof-muted`,
`--px-proof-accent`, `--px-proof-rule`, `--px-proof-pad`.
