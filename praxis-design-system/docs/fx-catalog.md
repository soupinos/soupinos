# FX Catalog

15 named GSAP effects, implemented in `fx/fx-catalog.js` on top of the
registry in `fx/fx-core.js`. Wire an FX by adding `data-fx="fx-XX"` (space
-separated for a second FX) to a block's root element, plus any
`data-fx-target="…"` markers the effect expects and `data-fx-*` option
attributes. FX-13…FX-15 were added alongside DB-13…DB-16 (the Villa
Elysion merge) — the original catalog was FX-01…FX-12; nothing about
those twelve changed.

## Hard rules

1. **One transform channel per element.** A single FX may own multiple
   transform properties on one element via a single tween — that's one
   owner. Two different FX must never both drive `transform` on the same
   element; target different `data-fx-target` children instead.
2. **Registry teardown for every ScrollTrigger.** Every `initFn` returns a
   handle with `.kill()`; `fx-core.js` tracks it so `PraxisFX.teardown()` /
   `teardownAll()` always has something to call. No orphaned triggers.
3. **`prefers-reduced-motion: reduce` → static fallback.** `fx-core.js`
   never calls an FX's `initFn` when reduced motion is on; the element
   gets `.px-fx-static` and `[data-fx-target]` children are cleared to
   their resting CSS state. Blocks must look complete with zero motion.
4. **Parallax-class effects reduce or disable on mobile.** FX-02, FX-06,
   FX-09 read `ctx.isMobile` and cut amplitude (or distance) accordingly.
5. **Max 2 FX per section.** `fx-core.js` warns in the console if a
   `data-fx` list exceeds two names — treat that warning as a build error.

## Catalog

| ID | Name | Trigger | Targets | Channel(s) | Notes |
|----|------|---------|---------|------------|-------|
| FX-01 | `reveal-mask` | scroll enter, once | `[data-fx-target="reveal"]` | `clip-path` | Wipe reveal, staggered if multiple targets |
| FX-02 | `parallax-depth` | scroll scrub | `[data-fx-target="parallax"]` | `yPercent` | Amplitude halved on mobile |
| FX-03 | `pin-scrub-text` | scroll scrub, pinned | `[data-fx-target="statement"]` | `scale` (+opacity, same tween) | Pins the section for `data-fx-distance`% of scroll |
| FX-04 | `split-char-in` | scroll enter, once | `[data-fx-target="split"]` | `yPercent` (+opacity, same tween) | Splits text into `.px-split-unit` spans at runtime |
| FX-05 | `magnetic-cta` | pointer move | the element itself | `x`, `y` (`quickTo`) | Desktop / fine-pointer only |
| FX-06 | `image-kenburns` | scroll enter/leave (play/pause) | `[data-fx-target="kenburns"]` | `scale` | Slow drift while section is in view; reduced target scale on mobile |
| FX-07 | `stagger-grid` | scroll enter, once | `[data-fx-target="item"]` | `y` (+opacity, same tween) | Grid/list children, staggered |
| FX-08 | `counter-count-up` | scroll enter, once | `[data-fx-target="counter"]` | none (text content only) | Reads target value from `data-fx-to` |
| FX-09 | `horizontal-scrub` | scroll scrub, pinned | `[data-fx-target="track"]` | `xPercent` | Distance reduced on mobile |
| FX-10 | `sticky-stack` | scroll scrub, pinned per card | `[data-fx-target="card"]` | `scale` (+`y`, same tween) | Each card but the last stays pinned while the next arrives |
| FX-11 | `cursor-glow-trail` | pointer move | `[data-fx-target="glow"]` | `x`, `y` (`quickTo`) | Desktop / fine-pointer only |
| FX-12 | `modal-fade-scale` | click (not scroll) | `[data-fx-target="backdrop"]`, `[data-fx-target="panel"]` | `opacity`; `opacity`+`scale` | Opens `data-fx-modal` selector target; Esc + backdrop click close; traps Tab/Shift+Tab inside the panel while open; focus returns to the trigger on close |
| FX-13 | `nav-overlay` | click (not scroll) | `[data-fx-target="navitem"]` (panel via `data-fx-modal`) | `opacity` (panel); `y`+`opacity` (items, same tween) | Fullscreen nav panel — same focus-trap/Esc/focus-return contract as FX-12; closes on any `[data-fx-navlink]` click too; locks body scroll while open |
| FX-14 | `accordion-cards` | click (not scroll) | `[data-fx-target="card"]` groups, each with `[data-fx-q]`/`[data-fx-a]` | `height` on `[data-fx-a]` only | Only one card open at a time across the group; icon rotation + open-question colour are CSS reading the card's `[data-open]` attribute, not a second JS channel |
| FX-15 | `reviews-carousel` | click (prev/next) + auto-advance timer | `[data-fx-target="quote/name/loc"]` | `opacity` (one tween per transition across all three) | Reads slides from a sibling `<script type="application/json" data-fx-target="reviews-data">`; 6.5s auto-advance restarts on manual nav |

## DB → FX default mapping

Every block ships with these defaults wired via `data-fx` in its
`index.html`. A brief can override the mapping per project — these are
starting points, not requirements.

| Block | Default FX | Why |
|-------|-----------|-----|
| DB-01 Hero Cinematic | FX-06 `image-kenburns` + FX-04 `split-char-in` | Full-bleed opener: slow background drift under a staggered headline reveal |
| DB-02 Hero Interwoven | FX-01 `reveal-mask` + FX-02 `parallax-depth` | Image bleeds through type; mask-reveal on entry, parallax while scrolling |
| DB-03 Tension Statement | FX-03 `pin-scrub-text` | Single line, pinned, scaling in as the reader scrolls past — the near-empty beat |
| DB-04 Manifesto Asymmetric | FX-04 `split-char-in` + FX-01 `reveal-mask` | Pull-quote splits in; supporting column mask-reveals a beat later |
| DB-05 Editorial Split | FX-02 `parallax-depth` + FX-01 `reveal-mask` | Image column drifts, text column reveals |
| DB-06 Feature Rhythm | FX-07 `stagger-grid` | Fast, scannable list — one FX keeps it quick to read, no competing motion |
| DB-07 Proof Strip | FX-08 `counter-count-up` + FX-07 `stagger-grid` | Stats count up; logos/quotes stagger in beneath |
| DB-08 Gallery Immersive | FX-09 `horizontal-scrub` + FX-06 `image-kenburns` | Pinned horizontal scrub through frames, each frame drifting |
| DB-09 FAQ Quiet | FX-01 `reveal-mask` | Deliberately the quietest block in the library — one FX only |
| DB-10 Map & Presence | FX-02 `parallax-depth` + FX-11 `cursor-glow-trail` | Map layer drifts; accent glow follows the cursor near the pin |
| DB-11 CTA Modal Trigger | FX-12 `modal-fade-scale` + FX-05 `magnetic-cta` | Trigger button is magnetic; click opens the fade/scale modal |
| DB-12 Footer Editorial | FX-01 `reveal-mask` | Closing beat — restrained, one subtle reveal only |
| DB-13 NavEditorial | FX-13 `nav-overlay` | Trigger opens the fullscreen numbered menu, focus-trapped |
| DB-14 FaqCards | FX-14 `accordion-cards` | Card accordion, one FX owns the whole open/close/height/icon/colour behavior |
| DB-15 ReviewsCarousel | FX-02 `parallax-depth` + FX-15 `reviews-carousel` | Photo drifts; quote card cycles independently |
| DB-16 AmenitiesQuiet | FX-07 `stagger-grid` | Fast facts grid — one FX, same reasoning as DB-06 |
