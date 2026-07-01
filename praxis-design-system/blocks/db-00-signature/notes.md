# DB-00 · Signature Slot

This folder is intentionally empty. No `index.html`, no `style.css` — on
purpose.

## What this is

Every site built from Praxis-Ionian must include **one bespoke moment**
that does not come from this library. That moment lives here, in a
project's copy of `db-00-signature/`, built from scratch for that client:
a custom interaction, a one-off illustration treatment, a piece of copy
staged in a way none of DB-01…DB-12 do. It can borrow `tokens/` and
`fx/fx-core.js` (the registry), but it should not just be a remix of an
existing DB block with new copy — that's what DB-01…12 are for.

## Why

A page assembled entirely from numbered blocks is recognisable as "a
Praxis-Ionian site." That's fine for speed and consistency everywhere
else on the page, but a whole site with no bespoke moment reads as a
template, not a piece of design. The signature slot is the one place per
project where the system explicitly steps aside.

## Where it goes

Placement is a creative call per brief, not fixed — but it should sit
where the rhythm (`principles.md`) wants a beat the library doesn't have:
often between a dense block and a near-empty one (e.g. after DB-04
Manifesto, before DB-07 Proof Strip), or replacing a second hero further
down a long page instead of reusing DB-02.

## Building one

1. Copy this folder into the project as `db-00-signature/` (or rename to
   something project-specific once it's committed to that site).
2. Build `index.html` + `style.css` following the same conventions as any
   other block: semantic HTML, component-layer tokens
   (`--px-signature-*`, resolving the project's skin), `data-spacing`,
   Greek content rule if applicable.
3. If it needs motion, register a new named FX in a project-local file
   and mount it through `PraxisFX.register` / `data-fx` — don't repurpose
   an existing FX-01…12 handler for a fundamentally different effect;
   that would make the shared catalog harder to reason about for every
   other project using it.
4. Do not upstream this block back into `blocks/` unless it's been
   generalised into something reusable across clients — a signature
   moment that gets reused stops being one.
