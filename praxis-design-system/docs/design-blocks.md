# Design Blocks

16 numbered blocks (DB-01…DB-16) plus one empty signature slot
(DB-00). Each lives in `blocks/db-XX-{slug}/` as `index.html` (standalone
demo), `style.css` (component-layer tokens + layout), `notes.md`
(storytelling slot, spacing variants, FX rationale).

DB-13 through DB-16 were merged in from a Villa Elysion source page. The
`<!-- @dsCard group="…" -->` first-line convention started with that
merge and has since been backfilled onto DB-01…DB-12 as well, so every
numbered block (DB-01…DB-16) now opens with one, tagging it for Claude
Design's own grouping UI: `Hero` (DB-01, DB-02), `Statement` (DB-03,
DB-04), `Editorial` (DB-05, DB-06, DB-08), `Proof` (DB-07, DB-15),
`Epilogue` (DB-09, DB-12, DB-14), `Trust` (DB-10, DB-16), `Conversion`
(DB-11), `Navigation` (DB-13). DB-00 has no `index.html` to tag — it's
an intentionally empty slot, see below.

Every block:
- Uses semantic HTML (`<section>`, `<h1>/<h2>`, `<figure>`, `<blockquote>`
  as appropriate) and only component-layer tokens (`--px-{block}-*`) —
  see `principles.md` "Two-tier tokens".
- Exposes `data-spacing="s|m|xl"` to play a dense / default / near-empty
  beat — see `principles.md` "Rhythm".
- Wires its default FX via `data-fx` — see `fx-catalog.md`.
- Ships Greek placeholder copy per the Greek content rule in
  `principles.md`.

## DB-00 · Signature (empty slot)

Not a block — a placeholder folder. See `blocks/db-00-signature/notes.md`.

## DB-01 · Hero Cinematic

`@dsCard group="Hero"`

**Storytelling slot:** the opener. First thing the visitor sees — sets
tone and pace for the whole page. Full-bleed media, φ-split headline
block at the 61.8 mark, one line of eyebrow copy, one CTA.

**Rhythm beat:** full-bleed / `xl`.

## DB-02 · Hero Interwoven

`@dsCard group="Hero"`

**Storytelling slot:** an alternate opener (or second hero further down a
long page) where the headline and the image occupy the *same* space —
type bleeds over/behind a photograph rather than sitting beside it.
Ships a scale-courage variant where the display line clips at the
viewport edge.

**Rhythm beat:** full-bleed / `xl`.

## DB-03 · Tension Statement

`@dsCard group="Statement"`

**Storytelling slot:** the near-empty beat. One sentence, oversized,
pinned mid-scroll. Exists to make the reader stop. Never follows another
near-empty block — always sits between a dense and a full-bleed section.

**Rhythm beat:** near-empty / `xl`.

## DB-04 · Manifesto Asymmetric

`@dsCard group="Statement"`

**Storytelling slot:** the founder/brand statement. Dense, text-forward,
61.8/38.2 split (long-form copy in the major column, a pull-quote or
portrait in the minor column). This is where the brand explains *why*,
in its own voice.

**Rhythm beat:** dense / `s`.

## DB-05 · Editorial Split

`@dsCard group="Editorial"`

**Storytelling slot:** proof-of-craft. Alternating image/text halves on
the φ-split, used to walk through a process, a product, or a place in
2–4 repeated instances down the page.

**Rhythm beat:** default / `m`.

## DB-06 · Feature Rhythm

`@dsCard group="Editorial"`

**Storytelling slot:** the feature/benefit list — what the offer actually
includes. Repeating rows, alternating image-left / image-right, meant to
be scanned quickly. This is the "give the reader facts" block, in
contrast to DB-04's "give the reader belief."

**Rhythm beat:** dense / `s`.

## DB-07 · Proof Strip

`@dsCard group="Proof"`

**Storytelling slot:** social proof — stats, logos, or a short quote
band. Compact, sits right before a CTA to convert credibility into
action.

**Rhythm beat:** dense / `s`, always short.

## DB-08 · Gallery Immersive

`@dsCard group="Editorial"`

**Storytelling slot:** the sensory/immersive beat — a place, a product
range, a portfolio. Full-bleed horizontal-scrubbed frames pinned to
vertical scroll. The one block in the library allowed to run motion for
an extended scroll distance.

**Rhythm beat:** full-bleed / `xl`.

## DB-09 · FAQ Quiet

`@dsCard group="Epilogue"`

**Storytelling slot:** objection-handling, deliberately calm. Accordion,
one FX only (see `fx-catalog.md`), generous whitespace. Placed late in
the page, after the reader already has the story — this block answers,
it doesn't sell.

**Rhythm beat:** near-empty / `xl`.

## DB-10 · Map & Presence

`@dsCard group="Trust"`

**Storytelling slot:** "we are real, we are here" — location, hours,
contact. Map or stylised location graphic with a cursor-reactive glow
accent near the pin.

**Rhythm beat:** default / `m`.

## DB-11 · CTA Modal Trigger

`@dsCard group="Conversion"`

**Storytelling slot:** the ask. A magnetic trigger button opens a
full-screen modal with the actual conversion action (booking, contact
form, waitlist). Keeps the ask visually light on the page while the
modal itself can hold a denser form.

**Rhythm beat:** near-empty / `xl`, the button is the only element.

## DB-12 · Footer Editorial

`@dsCard group="Epilogue"`

**Storytelling slot:** the close. Multi-column footer (nav, contact,
legal) styled as an editorial colophon rather than a utility footer —
last impression, calm, minimal motion.

**Rhythm beat:** dense / `s`, but visually quiet — see FX mapping.

## DB-13 · NavEditorial

`@dsCard group="Navigation"`

**Storytelling slot:** persistent chrome, not a rhythm beat — a fixed
header (menu trigger, centered wordmark flanked by hairlines, language
switcher, contact link) and the fullscreen numbered menu overlay it
opens. Sits above every other block on the page.

**Rhythm beat:** n/a — always on, always fixed.

## DB-14 · FaqCards

`@dsCard group="Epilogue"`

**Storytelling slot:** the same objection-handling slot as DB-09 FAQ
Quiet, but tactile instead of minimal: rounded cards, a gold plus-icon
that rotates to a cross, the open question highlighted gold. **Use
DB-09 when the brief wants restraint; use DB-14 when it wants the FAQ to
feel like part of the design, not an afterthought appended to the
bottom of the page.** Both are valid, permanent alternatives — DB-14
doesn't replace DB-09.

**Rhythm beat:** default / `m`.

## DB-15 · ReviewsCarousel

`@dsCard group="Proof"`

**Storytelling slot:** social proof with visual weight — a full-bleed
photo with a dark quote card layered over it, prev/next-navigable,
auto-advancing. The editorial counterpart to DB-07 Proof Strip's compact
band; use this one when proof deserves its own full section rather than
a strip before the CTA.

**Rhythm beat:** default / `m`.

## DB-16 · AmenitiesQuiet

`@dsCard group="Trust"`

**Storytelling slot:** "here's exactly what's included" — a calm,
scannable icon + label grid, hairline-separated. No persuasion, just
facts, placed wherever the brief needs to answer "what do I actually
get" without slowing the page down. This is the one block in the
library that uses decorative icons — see `docs/principles.md` "Icon
restraint" for why, and the constraints that come with the exception.

**Rhythm beat:** default / `m`.
