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
