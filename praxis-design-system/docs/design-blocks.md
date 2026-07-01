# Design Blocks

12 numbered blocks (DB-01…DB-12) plus one empty signature slot
(DB-00). Each lives in `blocks/db-XX-{slug}/` as `index.html` (standalone
demo), `style.css` (component-layer tokens + layout), `notes.md`
(storytelling slot, spacing variants, FX rationale).

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

**Storytelling slot:** the opener. First thing the visitor sees — sets
tone and pace for the whole page. Full-bleed media, φ-split headline
block at the 61.8 mark, one line of eyebrow copy, one CTA.

**Rhythm beat:** full-bleed / `xl`.

## DB-02 · Hero Interwoven

**Storytelling slot:** an alternate opener (or second hero further down a
long page) where the headline and the image occupy the *same* space —
type bleeds over/behind a photograph rather than sitting beside it.
Ships a scale-courage variant where the display line clips at the
viewport edge.

**Rhythm beat:** full-bleed / `xl`.

## DB-03 · Tension Statement

**Storytelling slot:** the near-empty beat. One sentence, oversized,
pinned mid-scroll. Exists to make the reader stop. Never follows another
near-empty block — always sits between a dense and a full-bleed section.

**Rhythm beat:** near-empty / `xl`.

## DB-04 · Manifesto Asymmetric

**Storytelling slot:** the founder/brand statement. Dense, text-forward,
61.8/38.2 split (long-form copy in the major column, a pull-quote or
portrait in the minor column). This is where the brand explains *why*,
in its own voice.

**Rhythm beat:** dense / `s`.

## DB-05 · Editorial Split

**Storytelling slot:** proof-of-craft. Alternating image/text halves on
the φ-split, used to walk through a process, a product, or a place in
2–4 repeated instances down the page.

**Rhythm beat:** default / `m`.

## DB-06 · Feature Rhythm

**Storytelling slot:** the feature/benefit list — what the offer actually
includes. Repeating rows, alternating image-left / image-right, meant to
be scanned quickly. This is the "give the reader facts" block, in
contrast to DB-04's "give the reader belief."

**Rhythm beat:** dense / `s`.

## DB-07 · Proof Strip

**Storytelling slot:** social proof — stats, logos, or a short quote
band. Compact, sits right before a CTA to convert credibility into
action.

**Rhythm beat:** dense / `s`, always short.

## DB-08 · Gallery Immersive

**Storytelling slot:** the sensory/immersive beat — a place, a product
range, a portfolio. Full-bleed horizontal-scrubbed frames pinned to
vertical scroll. The one block in the library allowed to run motion for
an extended scroll distance.

**Rhythm beat:** full-bleed / `xl`.

## DB-09 · FAQ Quiet

**Storytelling slot:** objection-handling, deliberately calm. Accordion,
one FX only (see `fx-catalog.md`), generous whitespace. Placed late in
the page, after the reader already has the story — this block answers,
it doesn't sell.

**Rhythm beat:** near-empty / `xl`.

## DB-10 · Map & Presence

**Storytelling slot:** "we are real, we are here" — location, hours,
contact. Map or stylised location graphic with a cursor-reactive glow
accent near the pin.

**Rhythm beat:** default / `m`.

## DB-11 · CTA Modal Trigger

**Storytelling slot:** the ask. A magnetic trigger button opens a
full-screen modal with the actual conversion action (booking, contact
form, waitlist). Keeps the ask visually light on the page while the
modal itself can hold a denser form.

**Rhythm beat:** near-empty / `xl`, the button is the only element.

## DB-12 · Footer Editorial

**Storytelling slot:** the close. Multi-column footer (nav, contact,
legal) styled as an editorial colophon rather than a utility footer —
last impression, calm, minimal motion.

**Rhythm beat:** dense / `s`, but visually quiet — see FX mapping.
