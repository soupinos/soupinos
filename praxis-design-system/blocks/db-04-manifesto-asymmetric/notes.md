# DB-04 · Manifesto Asymmetric

**Storytelling slot:** the founder/brand statement — the "why," in the
brand's own voice. Dense, text-forward, 61.8/38.2 split: long-form copy
in the major column, a sticky pull-quote in the minor column.

**Rhythm beat:** dense, `s` (default). This block is meant to feel
text-heavy on purpose — don't loosen its spacing to match a full-bleed
neighbour; the contrast is the point.

## Default FX

`data-fx="fx-01 fx-04"` — FX-01 `reveal-mask` wipes in the body column
(`[data-fx-target="reveal"]`) on scroll enter; FX-04 `split-char-in`
splits the pull-quote (`[data-fx-target="split"]`) into words
(`data-fx-mode="word"` not set here — defaults to per-character, fine at
this size) and staggers it in. Two FX, two elements.

## Layout

`.db-manifesto__quote` is `position: sticky` inside the grid so it stays
in view while the (usually longer) body column scrolls past — collapses
to static stacking under 900px.

## Component tokens

`--px-manifesto-bg`, `--px-manifesto-ink`, `--px-manifesto-muted`,
`--px-manifesto-accent`, `--px-manifesto-pad`, `--px-manifesto-rule`.
