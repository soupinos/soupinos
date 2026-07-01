# DB-09 · FAQ Quiet

**Storytelling slot:** objection-handling, placed late in the page after
the reader already has the story. This block answers, it doesn't sell —
deliberately the calmest block in the library.

**Rhythm beat:** near-empty, `xl` (default). `s`/`m` variants exist for
shorter pages, but keep the accordion itself uncrowded regardless.

## Default FX

`data-fx="fx-01"` on the section, reveal-masking the heading only
(`[data-fx-target="reveal"]`). **One FX, no exceptions** — this is the
one block in the catalog explicitly called out as single-FX in
`docs/fx-catalog.md`; don't add a stagger-in on the accordion items even
though FX-07 would technically fit. The accordion interaction itself
(`<details>/<summary>`) is native HTML, no JS required, so reduced-motion
and no-JS visitors get a fully working FAQ either way.

## Accessibility

Native `<details>`/`<summary>` gives keyboard operation and screen-reader
semantics for free — don't replace it with a `<div>` + JS toggle.

## Component tokens

`--px-faq-bg`, `--px-faq-ink`, `--px-faq-muted`, `--px-faq-rule`,
`--px-faq-pad`.
