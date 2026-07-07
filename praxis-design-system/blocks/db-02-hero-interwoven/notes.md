# DB-02 · Hero Interwoven

**Storytelling slot:** an alternate opener where headline and image share
one space instead of sitting side by side — the type visually interweaves
with the photograph. Use in place of DB-01 when the brief wants a more
tactile, less "banner" first impression, or as a second hero further down
a long page.

**Rhythm beat:** full-bleed, `xl`.

**Scale courage:** the title uses the fluid `--px-type-500` token
(clamp 44px at 360px up to 110px at 1440px+ — see `tokens/core.css`) and
is allowed to run to `max-width: 90vw` — on narrow viewports or long
headline words it will visually crowd the edge. That's intentional;
don't "fix" it by capping the font size lower without
checking with the brief first.

## Default FX

`data-fx="fx-01 fx-02"` — FX-01 `reveal-mask` wipes the title in on
load (`[data-fx-target="reveal"]`); FX-02 `parallax-depth` drifts the
media panel while scrolling (`[data-fx-target="parallax"]`, amplitude
halved on mobile per the FX-02 rule). Different elements, no shared
transform channel.

## Content notes

The `<span>` inside the title marks the portion meant to overlap the
media panel — it gets the light title-ink colour plus a thin stroke in
`--px-interwoven-ink` so it stays legible over whatever photo replaces
the placeholder gradient. Keep the split roughly where the φ-grid divide
falls (61.8/38.2, via `--px-split-minor` in the media's `inset`).

## Component tokens

`--px-interwoven-bg`, `--px-interwoven-media-from/-to`,
`--px-interwoven-ink`, `--px-interwoven-title-ink`,
`--px-interwoven-accent`, `--px-interwoven-pad`.
