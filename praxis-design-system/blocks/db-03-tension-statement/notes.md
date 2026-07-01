# DB-03 · Tension Statement

**Storytelling slot:** the near-empty beat. One sentence, oversized,
pinned mid-scroll to make the reader stop before the page moves on.
Never place two Tension Statements back to back, and never follow one
with another near-empty block (`principles.md` "Rhythm") — it needs a
dense or full-bleed section on either side to read as a deliberate pause
rather than a slow page.

**Rhythm beat:** near-empty, `xl` only — this block does not have a
meaningful `s`/`m` variant; if a brief wants a smaller pause, use DB-09's
restraint instead.

## Default FX

`data-fx="fx-03"` — FX-03 `pin-scrub-text` pins the section for
`data-fx-distance="100"` (100% of the viewport height of extra scroll)
and scrubs the statement (`[data-fx-target="statement"]`) from
`scale: 0.82, opacity: 0.35` up to full size/opacity as the user scrolls
through the pin. One FX, one element — this block should never carry a
second effect.

## Params

- `data-fx-distance`: percentage of viewport height the section stays
  pinned for (default `100`). Longer statements can use `120–150` to
  give the scrub more room.

## Component tokens

`--px-tension-bg`, `--px-tension-ink`, `--px-tension-accent`,
`--px-tension-pad`.
