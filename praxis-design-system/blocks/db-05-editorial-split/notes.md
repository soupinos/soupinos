# DB-05 · Editorial Split

**Storytelling slot:** proof-of-craft, walked through in 2–4 repeated
image/text rows. Each row is a φ-split (61.8/38.2), alternating which
side carries the image via `.db-editorial-split__row--reverse`.

**Rhythm beat:** default, `m`. Use `s` between two dense neighbours or
`xl` when this needs to carry more visual weight (e.g. only 2 rows,
wants to breathe like a near-empty beat).

## Default FX

Each `.db-editorial-split__row` wires its own `data-fx="fx-02 fx-01"` —
FX-02 `parallax-depth` drifts the media layer
(`[data-fx-target="parallax"]`), FX-01 `reveal-mask` wipes the text
column in (`[data-fx-target="reveal"]`). Because the FX attributes live
on each row rather than the section, every row gets independent
ScrollTrigger instances — required for the stagger-by-scroll-position
effect to read correctly with more than one row.

## Repeating rows

Copy a `.db-editorial-split__row` block, toggle
`--row--reverse` to alternate sides, increment the eyebrow number. Don't
exceed 4 rows in one instance — beyond that, split into two DB-05
sections with a rhythm break between them (see `principles.md`).

## Component tokens

`--px-split-bg`, `--px-split-ink`, `--px-split-muted`,
`--px-split-media-from/-to`, `--px-split-pad`.
