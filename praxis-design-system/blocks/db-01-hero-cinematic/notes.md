# DB-01 · Hero Cinematic

**Storytelling slot:** the opener. First screen a visitor sees; sets tone
and pace. Full-bleed media behind a φ-split (61.8%) content column
anchored bottom-left.

**Rhythm beat:** full-bleed, `data-spacing="xl"` (default). `s`/`m`
variants shrink `min-height` for use as a secondary hero further down a
page — still full-bleed media, less vertical weight.

**Cover guidance (default):** `docs/cover-principles.md` governs this
block's composition and copy when it's the page's cover — read it
before changing how many elements the hero carries or how loud the
copy gets. Note that DB-01's default markup (eyebrow + h1 + lede + CTA)
is four content elements, more than that doc's "Big Book Look"
principle calls for strictly ("ONE dominant element, everything else
subordinate") — treat the lede/CTA as optional-to-cut on a real cover
brief, not as required scaffolding.

## Default FX

`data-fx="fx-06 fx-04"` — FX-06 `image-kenburns` drifts the media layer
(`[data-fx-target="kenburns"]`) while the section is in view; FX-04
`split-char-in` staggers the headline (`[data-fx-target="split"]`) in on
load. Two FX, two different target elements — satisfies the
one-transform-channel rule.

## Params

- `data-spacing`: `s | m | xl` (default `xl`)
- Replace `.db-hero-cinematic__media`'s `role="img" aria-label`
  with the real image description once a photograph replaces the
  gradient placeholder; swap the gradient for a `background-image` or an
  `<img>` sized to `object-fit: cover` inside the same absolutely
  positioned wrapper — keep `data-fx-target="kenburns"` on whichever
  element actually scales.

## Component tokens

`--px-hero-bg`, `--px-hero-media-from/-to`, `--px-hero-ink`,
`--px-hero-muted`, `--px-hero-accent`, `--px-hero-pad-block/-inline` — see
`style.css`. All resolve Ionian Earth bare tokens by default.
