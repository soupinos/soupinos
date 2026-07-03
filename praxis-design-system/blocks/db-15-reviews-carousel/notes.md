# DB-15 · ReviewsCarousel

`@dsCard group="Proof"`

**Storytelling slot:** social proof, editorial-weight version of DB-07
Proof Strip — a full-bleed photo with a dark quote card layered over it,
prev/next-navigable, auto-advancing. Use where the brief wants proof to
carry visual weight rather than sit in a compact band. Ported from Villa
Elysion's reviews section.

**Rhythm beat:** default, `m`.

## Default FX

Two independent `data-fx` triggers in this block:
- `data-fx="fx-02" data-fx-amount="10"` on the section drifts the photo
  layer (`[data-fx-target="parallax"]`) on scroll — FX-02
  `parallax-depth`.
- `data-fx="fx-15"` on `.db-reviews-carousel__inner` runs the carousel
  itself (new in this merge, see `docs/fx-catalog.md`): prev/next
  buttons (`[data-fx-prev]` / `[data-fx-next]`) and a 6.5s auto-advance
  timer that restarts on manual navigation, cross-fading
  `[data-fx-target="quote/name/loc"]` between slides.

Two FX, two different elements (media layer vs. content group) — no
shared transform channel.

## Data contract

Slide data lives in a sibling `<script type="application/json"
data-fx-target="reviews-data">` inside `.db-reviews-carousel__inner`:
`[{ quote, name, loc }, …]`. **The markup's initial quote/name/loc/stars
must match slide 0 of that JSON exactly.** This isn't cosmetic — it's
how the block stays fully readable with zero JS: a no-JS visitor, or a
`prefers-reduced-motion` visitor (FX-15 never mounts under reduced
motion, per the system-wide rule in `fx-core.js`), sees a complete, real
first review and working — if inert — arrow buttons, not an empty
shell waiting for JavaScript to populate it.

## What changed from the source

- Source auto-built dot indicators (`_buildRevDots`) in JS, but the
  actual markup never rendered a `[data-rev-dots]` host for them — dead
  code in the original. This port only implements what the rendered
  markup actually showed: prev/next arrows, no dots.
- Star rating is a fixed 5-star display (matches source, which never
  varied it per review) rather than a per-review numeric rating.

## Component tokens

`--px-revcar-bg`, `--px-revcar-media-from/-to`, `--px-revcar-ink`,
`--px-revcar-accent`, `--px-revcar-card-bg`, `--px-revcar-card-rule`,
`--px-revcar-pad`.
