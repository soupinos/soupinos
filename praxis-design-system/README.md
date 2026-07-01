# Praxis-Ionian Design System

A design system package for **Claude Design**: tokens, 12 reusable Design
Blocks (DB), and 12 named GSAP effects (FX), skinned in the first palette
— **Ionian Earth** (olive-gold).

This is a static HTML/CSS/JS component library. It is **not** a WordPress
theme, and it is a separate initiative from `praxis-blocks/` (the vanilla
scroll-reveal library used for client WordPress sites). Praxis-Ionian is
cinematic-first: golden-ratio type and spacing, GSAP/ScrollTrigger/Lenis
motion, editorial rhythm, and intentional scale courage.

## How briefs reference this system

A creative brief for a new site should reference blocks and effects by ID,
not by re-describing them:

```
Use DB-01 (Hero Cinematic) as the opener, DB-04 (Manifesto Asymmetric) for
the founder statement, DB-07 (Proof Strip) before the CTA, and DB-11 (CTA
Modal Trigger) as the close. Skin: ionian. Add one signature moment
(db-00-signature) between DB-03 and DB-05, built for this client only.
```

Claude Design (or a human) then:
1. Imports `tokens/core.css` + `tokens/skin-ionian.css` once, globally.
2. Copies the named `blocks/db-XX-*/` folders into the project.
3. Wires `fx/fx-core.js` + `fx/fx-catalog.js` once, at the end of `<body>`.
4. Builds the one bespoke moment for `db-00-signature/` per `notes.md`.

## Structure

```
praxis-design-system/
├── tokens/
│   ├── core.css          structural tokens: type scale, spacing, easing
│   └── skin-ionian.css   Ionian Earth palette + fonts (skin layer)
├── blocks/
│   ├── db-00-signature/  empty — one bespoke moment per client, see notes.md
│   └── db-01 … db-12/    index.html (standalone demo) + style.css + notes.md
├── fx/
│   ├── fx-core.js        GSAP + ScrollTrigger + Lenis bootstrap, FX registry
│   └── fx-catalog.js     FX-01 … FX-12, named functions registered on load
└── docs/
    ├── principles.md     DNA, composition rules, cinematic rhythm
    ├── design-blocks.md  DB-01…12 definitions + storytelling slots
    └── fx-catalog.md     FX-01…12 definitions + DB → FX default mapping
```

## Quick start (any block)

Every block's `index.html` is standalone-openable in a browser — no build
step. It loads GSAP/ScrollTrigger/Lenis from CDN, the two token files, its
own `style.css`, and the two `fx/` scripts, in this order:

```html
<link rel="stylesheet" href="../../tokens/core.css">
<link rel="stylesheet" href="../../tokens/skin-ionian.css">
<link rel="stylesheet" href="./style.css">

<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="../../fx/fx-core.js"></script>
<script src="../../fx/fx-catalog.js"></script>
```

No other dependencies are permitted (see Quality Bar below).

## Token model — two tiers, no leakage

- **Skin layer** (`tokens/skin-ionian.css`): bare tokens only —
  `--olive-900`, `--sand-100`, `--gold-500`, `--px-font-display`, etc. A
  skin file may **never** set a `--px-{block}-*` token.
- **Component layer** (each block's `style.css`): declares its own
  `--px-{block}-{prop}` tokens at the block root, each resolving a bare
  skin token with a hard fallback so the block still renders if no skin is
  loaded:

  ```css
  .db-hero-cinematic {
    --px-hero-bg: var(--olive-900, #262a1c);
    --px-hero-ink: var(--sand-100, #f4ecdd);
    background: var(--px-hero-bg);
    color: var(--px-hero-ink);
  }
  ```

  Everything inside the block reads only `--px-hero-*`, never `--olive-*`
  directly. This keeps blocks portable across future skins (`skin-*.css`)
  without editing block CSS.

## Quality bar

- Every block opens standalone in a browser with no build step.
- Semantic HTML, `alt` text on every image, AA contrast.
- No external dependencies beyond GSAP / ScrollTrigger / Lenis (CDN).
- Every FX: no console errors, clean `prefers-reduced-motion` fallback, no
  two tweens driving the same transform channel on the same element.

## Importing into Claude Design

Import this folder as design system **"Praxis-Ionian"**. `docs/` is the
system documentation Claude Design should read first; `tokens/` and
`blocks/` are the buildable assets; `fx/` is shared runtime, loaded once
per page, not per block.
