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

Slide data lives in a `<script type="application/json"
data-fx-target="reviews-data">` — a direct child of the section
(`.db-reviews-carousel`), same level as `.inner` and `.cardwrap`, not
nested inside either: `[{ quote, name, loc }, …]`. FX-15 and FX-02 are
both wired via `data-fx="fx-02 fx-15"` on the **section**, not `.inner`
— because `.cardwrap` (which the φ-split desktop layout positions with
`left: 61.8%` of the section) also had to move to be a section-level
sibling of `.inner` rather than nested inside it (`.inner` has its own
centered `max-width`, so a percentage `left` set on a descendant of it
resolves against that narrower box, not the true section width — this
was caught by the ±0.5% verification check, not assumed). **The markup's initial quote/name/loc/stars
must match slide 0 of that JSON exactly.** This isn't cosmetic — it's
how the block stays fully readable with zero JS: a no-JS visitor, or a
`prefers-reduced-motion` visitor (FX-15 never mounts under reduced
motion, per the system-wide rule in `fx-core.js`), sees a complete, real
first review and working — if inert — arrow buttons, not an empty
shell waiting for JavaScript to populate it.

## Responsive behavior

Three breakpoints, each a genuinely different layout rather than a
scaled-down version of the same one:
- **≤480px** — stacked, zero overlap: eyebrow → heading → full-width
  card → prev/next below, laid out with CSS Grid template areas
  (`"card card" "prev next"`) so the two arrows sit side by side under
  the card regardless of their DOM order. Nothing is `position:absolute`
  here — no card-over-photo overlap at this width.
- **480–1024px** (default/tablet) — the original absolute-overlay
  layout: card + flanking arrows centered near the bottom of the photo.
- **≥1024px** — φ asymmetry: `.db-reviews-carousel__head` caps to
  `max-width: 38.2%` (the minor side); `.db-reviews-carousel__card`'s
  own left edge sits at exactly `left: 61.8%` of the section width. The
  prev/next arrows switch to `position: absolute`, overlapping the
  card's left/right edges by `1.5rem` rather than flanking it in flex
  flow — that's deliberate: if the arrows were still flex-siblings
  before/after the card, the *wrapper's* left edge would be at 61.8%,
  not the *card's own* left edge, which is what the brief measures.

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
