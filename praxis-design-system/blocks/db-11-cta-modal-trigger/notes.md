# DB-11 · CTA Modal Trigger

**Storytelling slot:** the ask. Keeps the on-page footprint light — a
single magnetic button — while the actual conversion form lives in a
full-screen modal. Use as the final beat of a page, often right after
DB-07 Proof Strip.

**Rhythm beat:** near-empty, `xl`; the button is the only element in the
section.

## Default FX

`data-fx="fx-05 fx-12"` on the trigger `<button>` — FX-05 `magnetic-cta`
owns the button's own `x`/`y` transform (desktop/fine-pointer only); FX-12
`modal-fade-scale` opens the modal referenced by `data-fx-modal`
(`#db-cta-modal`) and owns the modal's `[data-fx-target="backdrop"]`
opacity and `[data-fx-target="panel"]` scale/opacity. Same trigger
element, two FX — but they own *different* channels on *different*
elements (the button's transform vs. the modal's opacity/scale), so the
one-transform-channel rule still holds.

## Markup contract

The modal is a sibling of the section, not nested inside it — `id`
referenced by the trigger's `data-fx-modal`. It needs exactly:
`[data-fx-target="backdrop"]`, `[data-fx-target="panel"]`, and any close
control tagged `data-fx-close`. Esc key and backdrop click both close it
(see FX-12 in `fx-catalog.js`).

## Accessibility

FX-12 traps focus inside `[data-fx-target="panel"]` while the modal is
open: opening moves focus to the panel's first focusable element, Tab
and Shift+Tab cycle only within the panel's focusable elements (they
never escape to the page behind it), and closing — by Esc, backdrop
click, or `[data-fx-close]` — returns focus to the trigger button. Any
project that adds fields to the form must keep them inside
`[data-fx-target="panel"]` for the trap to see them.

## Component tokens

`--px-cta-bg`, `--px-cta-ink`, `--px-cta-accent`, `--px-cta-pad`.
