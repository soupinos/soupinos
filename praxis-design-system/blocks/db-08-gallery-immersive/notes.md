# DB-08 · Gallery Immersive

**Storytelling slot:** the sensory/immersive beat — a place, a product
range, a portfolio. Full-bleed, pinned, horizontally-scrubbed frames.
The one block in the library allowed to hold the scroll for an extended
distance; every other block should resolve in well under one viewport of
scroll.

**Rhythm beat:** full-bleed, `xl`.

## Default FX

`data-fx="fx-09" data-fx-distance="60"` on the section — FX-09
`horizontal-scrub` pins the section and scrubs `.db-gallery-immersive__track`
(`[data-fx-target="track"]`) left as the user scrolls through
`data-fx-distance` × 3 % of extra scroll (see FX-09 in `fx-catalog.js`;
distance is halved on mobile automatically). Each `<figure>` additionally
carries its own `data-fx="fx-06"` (`image-kenburns`) on its media layer —
four independent FX-06 instances, one per frame, each targeting only its
own `[data-fx-target="kenburns"]`. No element carries more than one FX,
so the one-transform-channel rule holds frame-by-frame even though the
section as a whole is running two named effects.

## Params

- `data-fx-distance` on the section: base scroll distance multiplier for
  the horizontal scrub (default `100` in FX-09; this block ships `60` so
  four frames don't demand an excessive scroll commitment).
- Frame count: 3–5 reads well pinned; more than that, split into two
  Gallery Immersive sections.

## Component tokens

`--px-gallery-bg`, `--px-gallery-ink`, `--px-gallery-media-from/-to`.
