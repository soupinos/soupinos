# DB-14 · FaqCards

`@dsCard group="Epilogue"`

**Storytelling slot:** objection-handling, the same slot as DB-09 FAQ
Quiet, but tactile — rounded cards, a gold plus-icon that rotates to a
cross, the open question highlighted. Ported from Villa Elysion's FAQ.
**Use DB-09 when the brief wants restraint; use DB-14 when the FAQ
should feel like a designed part of the page.** Both stay in the
library permanently — see `docs/design-blocks.md`.

**Rhythm beat:** default, `m`.

## Default FX

`data-fx="fx-14"` on `.db-faq-cards__cols` — FX-14 `accordion-cards`
(new in this merge, see `docs/fx-catalog.md`) owns the whole
open/close/height/icon-rotation/colour behavior for every
`[data-fx-target="card"]` inside it. Only one card is open at a time
across the *entire* group (both columns) — opening a card in column 2
closes whatever was open in column 1, matching the source behavior
exactly.

## Component tokens

`--px-faqcards-bg`, `--px-faqcards-card-bg`, `--px-faqcards-ink`,
`--px-faqcards-muted`, `--px-faqcards-body`, `--px-faqcards-accent`,
`--px-faqcards-radius`, `--px-faqcards-pad`. `--px-faqcards-radius`
(14px) is a block-specific radius, not one of `tokens/core.css`'s
`--px-radius-sm/-md` — rounded cards are this block's signature, not a
system-wide radius change.

**Contrast note:** `--px-faqcards-accent` resolves `--gold-800`, not
`--gold-700` — `--gold-700` (the AA-safe gold text variant documented in
`tokens/skin-ionian.css`) was tuned against `--sand-100`, but this
card's background is the darker `--sand-300`, where `--gold-700` only
measures 4.05:1. `--gold-800` was added specifically for text accents on
`--sand-300` (4.91:1) — see the skin file's accent-family comment.
