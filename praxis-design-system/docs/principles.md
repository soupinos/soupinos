# Principles — DNA, Composition, Cinematic Rules

These rules govern every block in `blocks/`. A block that violates one of
these is a bug, not a style choice.

## DNA

- **Editorial, not decorative.** Motion and scale serve the story being
  told on the page. If an effect doesn't earn its place in the
  storytelling slot (see `design-blocks.md`), cut it.
- **Restraint is the brand.** One accent, used sparingly (≤10% of any
  surface — see `tokens/skin-ionian.css`). Silence between statements
  matters as much as the statements.
- **Two-tier tokens, no leakage.** Blocks never hardcode colour or
  reference a skin's bare token directly; they consume their own
  `--px-{block}-*` tokens. See README.md "Token model". This is what
  lets a second skin (`skin-*.css`) reskin the whole library with zero
  block edits.
- **Icon restraint.** The library defaults to zero decorative icon
  sets — hierarchy comes from type, spacing, and the accent colour, not
  from glyphs. **DB-16 AmenitiesQuiet is the one approved exception**:
  a short scannable facts grid is genuinely faster to read with one
  recognisable glyph per row. If a brief seems to want icons elsewhere,
  that's a signal to re-check whether type/spacing/color can carry the
  same hierarchy first — icons are the exception, not a toolbox to reach
  for by default. Where they are used: inline SVG only (no icon font, no
  sprite sheet), `stroke-width: 1.5`, `fill: none`, one accent-family
  stroke colour, never a second colour per icon and never a filled
  shape.

## Fluid type

The φ-type-scale (`--px-type-100`…`--px-type-500` and the √φ half-steps,
all in `tokens/core.css`) is fluid, not fixed px. Every step is a
`clamp(min, preferred, max)` interpolated between a 360px and a 1440px
viewport:

- **max** is the token's classic φ-ladder value (16 / 26 / 42 / 68 /
  110px, plus the half-steps) — unchanged, and still exact at 1440px and
  above. Nothing about the desktop scale moved.
- **min** is a deliberately *flatter* mobile floor, not a scaled-down
  copy of the ladder: body-weight tokens (100/150/200/250) compress
  gently (16px only floors to 15px), while display-weight tokens
  (300/350/400/450/500) compress hard (110px floors to 48px). This is
  why the hero token never exceeds roughly 52px on a 360px phone even
  though it reaches 110px on desktop — the ladder's *ratios* are a
  desktop concept; the *mobile floor* is tuned per role, the way an
  editorial type system would be manually re-set at each breakpoint, not
  linearly scaled.
- The two interpolation bounds (360 / 1440) are fixed system-wide. A
  block must never wrap a `--px-type-*` token in its own local
  `clamp()` "for mobile safety" — that was the workaround for the old
  fixed-px scale, and duplicating it now just fights the token's own
  curve. Reference the token directly; if a specific block genuinely
  needs a different curve, that's a new named token, not a per-block
  patch.

This exists because a fixed-px φ-scale is the "oversized mobile display
type" bug by construction: a 110px hero token has no floor and no
ceiling, so a phone renders literally the same 110px as a 1440px
desktop. Fluid tokens make that impossible without every block having to
remember to defend itself.

## Composition: the φ-grid

Hero and statement layouts split on **61.8 / 38.2** (`--px-split-major` /
`--px-split-minor` in `tokens/core.css`), not 50/50. The focal element —
headline, portrait, CTA — sits at a grid intersection, not dead-center,
unless a block explicitly documents a centered variant as intentional.

## Rhythm: dense → near-empty → full-bleed

A page built from this library must **alternate density**, not run every
section at the same visual weight:

- **Dense** — text-heavy, tight spacing (`--px-breath-s`). Manifesto,
  proof strips, FAQ.
- **Near-empty** — one statement, most of the viewport is negative space
  (`--px-breath-xl`, no full-bleed media). Tension Statement.
- **Full-bleed** — edge-to-edge media, large motion budget
  (`--px-breath-xl` + `.px-bleed`). Hero, Gallery Immersive.

Every block exposes a **spacing variant** (`data-spacing="s|m|xl"`, mapped
to `--px-breath-*`) so the same block can play a dense or a near-empty
beat depending on where it sits in the page's rhythm. Never stack two
full-bleed or two dense blocks back to back without a rhythm change
between them.

## Scale courage

Display type is allowed — encouraged, in the right slot — to overflow or
clip at the viewport edge on purpose. Use the `.px-bleed` utility
(`tokens/core.css`) and `--px-type-500` / `--px-type-450`. This is a
**variant**, not the default: Hero Interwoven (DB-02) and Tension
Statement (DB-03) ship a clipped-overflow variant explicitly; other
blocks should stay contained unless a brief calls for scale courage.

## Motion discipline

See `fx-catalog.md` for the full FX rules. The two load-bearing ones,
repeated here because they're compositional, not just technical:

- **Max 2 FX per section.** A third effect competes with the story
  instead of telling it.
- **One transform channel per element.** If a block needs two kinds of
  motion in one section (e.g. background parallax + headline reveal),
  they target *different* elements (`data-fx-target="parallax"` vs.
  `data-fx-target="split"`), never the same one.

## The signature slot

`blocks/db-00-signature/` is intentionally empty. Every client site must
add **one bespoke moment** there — built for that project, never pulled
from this library. See `blocks/db-00-signature/notes.md` for what that
means and where it goes in the page. A page assembled entirely from
numbered DB blocks with no signature moment is not finished; it's a
template.

## Greek content rule

Uppercase Greek display copy is authored **already uppercase, without
tonos**, directly in the markup (e.g. `ΓΗ ΠΟΥ ΘΥΜΑΤΑΙ`) — never produced
via `text-transform: uppercase` on accented source text, which keeps the
tonos and reads as a typo. Diaeresis stays (`ΑΫΛΟΣ`). Lower-case Greek
body copy keeps its normal accents. Every other language keeps its
diacritics in caps (`text-transform: uppercase` is fine for those). This
mirrors the convention already in production in `praxis-blocks/README.md`
— don't diverge from it.

## Display font: Greek coverage is a hard requirement

`tokens/skin-ionian.css` ships **EB Garamond** as `--px-font-display`.
It was chosen over other Latin revival serifs specifically because it
carries a verified Greek subset on Google Fonts — several visually
similar serif families don't, which would silently fall the display face
back to the browser default on every Greek headline. Any future skin's
display font must be checked for a verified Greek subset on Google Fonts
*before* it's adopted, the same way EB Garamond was checked here.

**GFS Didot** is pre-approved as an alternative display font at the skin
level for Greek-first luxury skins (it's a Greek Font Society revival
with native, high-quality Greek glyphs, not a Latin face with bolted-on
Greek coverage) — a new `skin-*.css` may swap `--px-font-display` to GFS
Didot without further typography review. Any other display face swap
needs the same Greek-subset verification EB Garamond got.
