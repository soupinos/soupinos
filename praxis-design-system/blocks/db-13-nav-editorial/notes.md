# DB-13 · NavEditorial

`@dsCard group="Navigation"`

**Storytelling slot:** the site's persistent navigation — always visible,
never the story itself. Ported from Villa Elysion's header: a menu
trigger, a centered two-line wordmark flanked by hairlines, a language
switcher, and a contact link, with a fullscreen numbered menu overlay
behind the trigger.

**Rhythm beat:** n/a — this is chrome, not a rhythm beat. It sits fixed
above every other block.

## Default FX

`data-fx="fx-13"` on the trigger button, `data-fx-modal="#db-nav-menu"`
pointing at the overlay. FX-13 `nav-overlay` (new in this merge, see
`docs/fx-catalog.md`) opens the panel, staggers every
`[data-fx-target="navitem"]` in, traps Tab/Shift+Tab inside the panel,
closes on Esc/close-button/any nav-link click, and returns focus to the
trigger — same contract as FX-12's modal, extended for a fullscreen nav
panel with a numbered list instead of a centered dialog.

## What changed from the source

- **Header scroll state simplified.** Elysion's header is transparent
  over the hero and turns solid + ink-color-swaps on scroll (a JS scroll
  listener toggling background/padding/ink color). That scroll-linked
  swap was not ported — it wasn't in the brief's explicit ask (trigger +
  wordmark + switcher + overlay), and adding a second scroll-driven
  behavior next to FX-13's click-driven one would mean two independent
  motion systems on one block. `db-nav-editorial` instead ships as a
  permanent semi-transparent dark glass bar (`backdrop-filter: blur`)
  that reads correctly over both dark and light sections without a
  scroll listener. If a project wants the scroll swap, it's a
  project-local addition, not a library default.
- **Wordmark and menu labels are generic**, not Villa Elysion's brand
  copy — "ΠΡΑΞΙΣ / Ionian" replaces "VILLA / ELYSION", since this is a
  shared library block, not a client site. The five menu items
  (Οι Χώροι, Παροχές, Κριτικές, Ερωτήσεις, Τοποθεσία) are generic enough
  hospitality-site section names to keep as realistic placeholder
  copy — swap them per project.
- **Body-scroll lock while open** was added (`document.body.style.
  overflow = 'hidden'`) — the source relied on `lenis.stop()`, which
  only exists once Lenis is initialized on the page; the plain CSS
  overflow lock works with or without Lenis present.

## Component tokens

Two token blocks, because the header and the overlay are sibling
elements (custom properties don't cross sibling boundaries):
- Header (`.db-nav-editorial`): `--px-nav-bar-bg`, `--px-nav-bar-blur`,
  `--px-nav-ink`, `--px-nav-accent`, `--px-nav-hairline`.
- Overlay (`.db-nav-editorial__overlay`): `--px-nav-overlay-bg`,
  `--px-nav-overlay-media-from/-to`, `--px-nav-overlay-ink`,
  `--px-nav-overlay-muted`, `--px-nav-overlay-accent`,
  `--px-nav-overlay-rule`. The overlay always resolves to a dark olive
  surface by default (same logic as DB-11's modal backdrop always
  reading dark) — but it's still a resolved `--px-nav-overlay-bg` token,
  not a bare `--olive-900` reference, so a future skin can override it.
