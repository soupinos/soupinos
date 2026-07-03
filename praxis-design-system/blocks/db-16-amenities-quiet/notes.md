# DB-16 · AmenitiesQuiet

`@dsCard group="Trust"`

**Storytelling slot:** the "here's what's actually included" trust
block — a calm, scannable grid, no persuasion, just facts. Ported from
Villa Elysion's amenities section.

**Rhythm beat:** default, `m`.

## Default FX

`data-fx="fx-07"` on the grid — FX-07 `stagger-grid` fades/rises each
`[data-fx-target="item"]` in on scroll enter. One FX, matching this
block's quiet register (same reasoning as DB-06 Feature Rhythm and
DB-09 FAQ Quiet: a scanning grid doesn't need a second effect).

## Icons — the approved exception

This is the one block in the library that uses decorative icons. See
`docs/principles.md` "Icon restraint": the library defaults to zero
icon sets — hierarchy comes from type, spacing and the accent color —
and DB-16 is the documented exception, because a 6-item amenities grid
is genuinely faster to scan with a recognisable glyph per row than with
text alone. The rule for using this exception elsewhere: inline SVG
only (no icon font, no external sprite sheet), `stroke-width: 1.5`,
`fill: none`, single accent-family stroke colour
(`--px-amenq-accent`) — never a second colour per icon, and never
filled shapes. Six icons ship with this block (pool, bedrooms, kitchen,
climate, privacy, families) — swap the `<path>` data per project, keep
the stroke treatment.

## Component tokens

`--px-amenq-bg`, `--px-amenq-ink`, `--px-amenq-muted`,
`--px-amenq-accent`, `--px-amenq-rule`, `--px-amenq-pad`.
