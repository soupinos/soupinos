# DB-12 · Footer Editorial

**Storytelling slot:** the close. Multi-column footer styled as an
editorial colophon rather than a utility bar — the last impression on
the page, calm on purpose.

**Rhythm beat:** dense information (nav + contact + legal), `s` spacing,
but visually quiet — the single FX and lack of hover motion are load-
bearing for that, not incidental.

## Default FX

`data-fx="fx-01"` on the footer, reveal-masking the entire top block
(`[data-fx-target="reveal"]`, nav columns included) as one unit on scroll
enter. One FX only — a footer that stagger-animates every link
individually reads as trying too hard for the last thing on the page.

## Component tokens

`--px-footer-bg`, `--px-footer-ink`, `--px-footer-muted`,
`--px-footer-accent`, `--px-footer-rule`, `--px-footer-pad`.
