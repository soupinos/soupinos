# Cover Principles

Six rules for the **one "cover" moment** a page needs — the opening
hero, and any secondary full-bleed moment that carries the same weight
(a second hero deep in a long page, a section-divider statement). These
are stricter and more opinionated than the general DNA in
`principles.md`; they exist because a cover is the one place a visitor
forms their whole impression of the brand in under two seconds, and
that moment tolerates none of the usual editorial hedging.

## 1. Big Book Look

A cover reads like the jacket of a well-made book, not a website banner.
That means: one dominant typographic gesture, not a headline-plus-three-
supporting-elements composition; generous negative space around it, not
content packed to the edges; and gravitas over cleverness. If a cover
composition would look at home shrunk down to the size of a book spine
and still say something, it's working. `--px-breath-xl` and `.px-bleed`
exist for exactly this.

## 2. Type as Image

Display type on a cover is not read first, it's *seen* first — treat it
as a graphic element with the same weight as a photograph, not as a
sentence that happens to be large. Cropping a word at the viewport edge,
letting a line break mid-phrase for shape rather than grammar, or
sizing one word dramatically larger than its neighbors are all
legitimate moves here (see `principles.md` "Scale courage") in a way
they would not be in body copy or even an h2.

## 3. Mood, όχι κατάλογος

*Mood, not a catalog.* A cover sets an emotional register — it does not
enumerate features, list amenities, or make the sales case. That's what
DB-06 Feature Rhythm, DB-07 Proof Strip and DB-16 AmenitiesQuiet are
for, further down the page. If a cover draft contains a bullet list, a
stat, or more than one supporting sentence, it has drifted from cover
into brochure and needs to be cut back.

## 4. Μοτίβο-σφραγίδα

*Motif-as-seal.* Every cover carries one small, quiet, recurring mark —
a single motif (a rule, a numeral, a glyph, a fragment of the wordmark)
placed like a wax seal rather than a logo lockup. It should be small
enough that a visitor notices it on the second look, not the first, and
consistent enough across a project's covers that it reads as a
signature. This is a natural home for the `blocks/db-00-signature/`
bespoke moment on projects that have one.

## 5. Συγκράτηση = νόημα

*Restraint equals meaning.* This is `principles.md`'s "restraint is the
brand" DNA rule, sharpened for covers specifically: everything a cover
leaves out is doing work. A cover with one line of copy says more than
one with three. A cover with one accent flash of gold says more than
one with gold on every element. When in doubt, remove the second thing
before adding a third.

## 6. Tension + κλίμακα

*Tension through scale.* A cover's visual energy comes from a deliberate
size contrast — one very large element against one very small one, not
a smooth gradient of medium-sized elements. Pair the largest type the
system allows (`--px-type-500`, at its full 110px ceiling on desktop)
against the smallest supporting mark (an eyebrow at `--px-type-100`, a
single hairline rule) with nothing in between doing further work. The
gap in scale is the point — it's what makes the large element feel
large.

## Usage rule

These six apply together, as a set, to **the cover only** — not to
every hero-shaped block, and not partially. A block either is the
page's cover (usually DB-01 or DB-02, occasionally a bespoke
`db-00-signature/` moment) and follows all six, or it isn't the cover
and follows the general rules in `principles.md` instead. Do not import
individual cover principles (e.g. "type as image") into a mid-page
block just because it has a headline — that dilutes what makes the
actual cover land. A page has exactly one cover; if a brief asks for
these principles applied twice on the same page, that's a signal the
second instance should be built as a different kind of moment instead
(a Tension Statement, a Manifesto, a signature slot), not a second
cover.
