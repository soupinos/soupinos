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

- `data-fx="fx-13"` on the trigger button, `data-fx-modal="#db-nav-menu"`
  pointing at the overlay. FX-13 `nav-overlay` opens the panel, staggers
  every `[data-fx-target="navitem"]` in, traps Tab/Shift+Tab inside the
  panel, closes on Esc/close-button/any nav-link click, and returns
  focus to the trigger — same contract as FX-12's modal, extended for a
  fullscreen nav panel with a numbered list instead of a centered
  dialog.
- `data-fx="fx-16"` on `.db-nav-editorial__lang` (the header language
  switcher). FX-16 `lang-dropdown` opens/closes the dropdown, closes on
  outside click or Esc, and has no transform/motion channel at all —
  it's the quietest interaction in the library on purpose (see
  `docs/fx-catalog.md`).

## Header surface

The header bar is a **solid** `--px-nav-bar-bg` (resolves `--olive-900`),
not translucent. It used to be a semi-transparent dark glass panel
(`backdrop-filter: blur`) so it could float over the hero — but a
translucent bar's effective contrast depends on whatever section is
behind it, which isn't guaranteed ≥4.5:1 over every possible section a
project puts under it. A solid dark bar keeps the wordmark and nav ink
(`--px-nav-ink` / `--px-nav-accent` on `--px-nav-bar-bg`) at a fixed,
verified contrast regardless of what scrolls underneath.

## Mobile header (≤600px)

- Padding tightens to `--px-space-2`/`--px-space-3` (from
  `--px-space-3`/`--px-space-5`).
- The flanking hairlines (`.db-nav-editorial__hairline`) are hidden.
  Their width is `calc(50% - 8.25rem)`, which goes negative below
  ~360px of available half-width — a negative `width` doesn't error,
  but some browsers render the resulting zero/negative-clamped line as
  a stray underscore-like glyph. Simplest fix: don't show them below
  600px, where there's no room for a "flanking" line to read as
  intentional anyway.
- The wordmark lockup compacts (smaller size, tighter letter-spacing
  and line gap) so the whole header row stays well inside a 360px
  viewport with the trigger and language switcher still visible.

## Menu overlay: φ-scaled list

- List items use a **local** fluid clamp, `--px-nav-item-size:
  clamp(2rem, 1.25rem + 3.33vw, 3.3125rem)` (32px at 360px → 53px at
  1440px) — not one of `tokens/core.css`'s shared `--px-type-*` steps,
  because this curve is tuned specifically for a 5-item numbered list,
  not the general display ladder.
- Index numerals (`.db-nav-editorial__num`) are one φ step down from
  that: `--px-type-250` (the shared system token), coloured with the
  overlay accent.
- Item rhythm (`gap` on `.db-nav-editorial__list`) is `--px-space-5` on
  desktop, `--px-space-4` on mobile (≤600px) — slightly tighter list
  spacing on small screens.
- The list starts at `padding-top: 38.2vh` (the φ-minor point down the
  panel) instead of being vertically centered — an intentional
  off-center anchor, consistent with this system's φ-grid rule of
  avoiding dead-center placement by default.

## Gold underline + `aria-current`

Each item's label (`.db-nav-editorial__label`, wrapping just the text,
not the index numeral) grows a 2px gold underline from the left on
hover/focus, via a single `transform: scaleX()` on the label's `::after`
— never a second transform on the item itself, which still separately
transitions `color`/`padding-left` on hover (two different boxes, two
different properties, no channel conflict).

**The same underline shows permanently when an item has
`aria-current="true"`.** This block does **not** set that attribute
itself — it's driven by a page-level scrollspy (whatever JS on the host
page tracks which section is currently in view and toggles
`aria-current="true"`/removes it on the matching `.db-nav-editorial__item`).
DB-13 only supplies the CSS hook and the reduced-motion fallback
(`prefers-reduced-motion: reduce` renders the underline permanently
visible with no transition, so the current-page indicator is still
readable without motion). A project wiring this needs, at minimum:
`IntersectionObserver` on each page section → toggle `aria-current` on
the nav item whose `href` matches the section's `id`.

## Language switcher

Two places, both scale to as many language codes as a project needs
(tested with 9 in this demo):
- **Header**: a compact trigger showing only the current code
  (`[data-fx-lang-current]`) + a dropdown listing every code
  (`[data-fx-lang-dropdown]`). Never grows the header row regardless of
  code count.
- **Overlay**: the full code row (`.db-nav-editorial__overlay-langs`)
  sits above the contact line, `flex-wrap: wrap` so any number of codes
  wraps instead of overflowing at any viewport width.

**Dropdown closed state is enforced by FX-16 on mount, not just the
markup's `hidden` attribute.** Some render/preview environments strip
bare boolean attributes (`hidden` with no value) when parsing or
re-serializing markup, which would leave the dropdown visibly open by
default with no JS. The demo markup also carries a defensive inline
`style="display:none"` as a second static fallback, and FX-16's
`open()`/`close()` explicitly manage `element.style.display` (not just
`.hidden`) so the two mechanisms never fight each other. If you copy
this pattern, keep both: the inline style is the fallback for when JS
never runs at all (reduced motion, FX-16 failing to mount); the JS call
on init is what actually guarantees the closed state everywhere else.

## What changed from the source

- **Header scroll state simplified.** Elysion's header is transparent
  over the hero and turns solid + ink-color-swaps on scroll (a JS scroll
  listener toggling background/padding/ink color). That scroll-linked
  swap was not ported — DB-13 now ships permanently solid (see "Header
  surface" above), which supersedes the original translucent-glass
  simplification from the first merge. If a project wants the
  transparent-over-hero look back, that's a project-local addition.
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
- Header (`.db-nav-editorial`): `--px-nav-bar-bg`, `--px-nav-ink`,
  `--px-nav-accent`, `--px-nav-hairline`.
- Overlay (`.db-nav-editorial__overlay`): `--px-nav-overlay-bg`,
  `--px-nav-overlay-media-from/-to`, `--px-nav-overlay-ink`,
  `--px-nav-overlay-muted`, `--px-nav-overlay-accent`,
  `--px-nav-overlay-rule`, `--px-nav-item-size`. The overlay always
  resolves to a dark olive surface by default (same logic as DB-11's
  modal backdrop always reading dark) — but it's still a resolved
  `--px-nav-overlay-bg` token, not a bare `--olive-900` reference, so a
  future skin can override it.
