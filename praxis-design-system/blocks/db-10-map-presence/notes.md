# DB-10 · Map & Presence

**Storytelling slot:** "we are real, we are here" — location, hours,
contact, right before or after the CTA.

**Rhythm beat:** default, `m`.

## Default FX

`data-fx="fx-02 fx-11"` on the map canvas — FX-02 `parallax-depth`
drifts the accent glow field (`[data-fx-target="parallax"]`) on scroll;
FX-11 `cursor-glow-trail` moves the pointer-following glow
(`[data-fx-target="glow"]`) on mousemove, desktop/fine-pointer only. Two
FX, two different child elements of the same canvas — no shared
transform channel. On touch devices FX-11 mounts as a no-op (see
`fx-catalog.js`), so the glow simply stays put; that's an acceptable
static state, not a broken one.

## Content

Swap the CSS-grid "map" placeholder for a real embed or static map image
by replacing `.db-map-presence__canvas`'s background — keep the pin and
the two `[data-fx-target]` children in place so the FX wiring doesn't
need to change.

## Component tokens

`--px-map-bg`, `--px-map-line`, `--px-map-ink`, `--px-map-muted`,
`--px-map-accent`, `--px-map-pad`.
