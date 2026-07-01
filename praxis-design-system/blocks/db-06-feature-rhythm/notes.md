# DB-06 · Feature Rhythm

**Storytelling slot:** the feature/benefit list — what the offer actually
includes, in contrast to DB-04's "give the reader belief." Compact,
numbered rows meant to be scanned quickly, not lingered on.

**Rhythm beat:** dense, `s` (default).

## Default FX

`data-fx="fx-07"` on the section — FX-07 `stagger-grid` staggers every
`.db-feature-rhythm__item` (`[data-fx-target="item"]`) in as the list
enters the viewport. Deliberately one FX: this block's job is speed, and
a second effect (e.g. parallax on the swatches) would slow the read
without adding story value — see `docs/fx-catalog.md` for the reasoning.

## Content

3–6 items reads well; beyond that, split into two DB-06 instances with a
rhythm break between them, same as DB-05.

## Component tokens

`--px-feature-bg`, `--px-feature-ink`, `--px-feature-muted`,
`--px-feature-accent`, `--px-feature-rule`, `--px-feature-pad`.
