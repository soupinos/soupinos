# Praxis Production Scorecard

Ο μετρήσιμος ορισμός του «Scorecard <85 = δεν βγαίνει production».
Συμπληρώνεται από Claude Code (τεχνικά) + Elliot (τοπικό τεστ) πριν το
handoff στον Pablo. Το συμπληρωμένο scorecard μπαίνει στο
`docs/projects/<name>/STATUS.md`.

**Σύνολο: 100 πόντοι. Κατώφλι production: ≥ 85.**
Επιπλέον, τα σημεία με 🚫 είναι **blockers**: αν αποτύχουν, το site δεν
βγαίνει ΑΝΕΞΑΡΤΗΤΑ από το σκορ.

## 1. Performance — 20π

| Έλεγχος | Πόντοι | Πώς μετριέται |
|---|---|---|
| Lighthouse Performance ≥ 95 (mobile) | 8 | Lighthouse, mobile preset, μέσος όρος 3 runs |
| CLS < 0.02 | 4 | Lighthouse / field |
| INP < 150ms | 4 | Lighthouse / χειροκίνητη δοκιμή interactions |
| Εικόνες: WebP/AVIF, σωστά sizes, lazy εκτός hero | 4 | Έλεγχος markup + Network tab |

## 2. Accessibility — 15π 🚫 (blocker αν <10)

| Έλεγχος | Πόντοι | Πώς μετριέται |
|---|---|---|
| Lighthouse Accessibility = 100 | 5 | Lighthouse |
| Contrast AA παντού (και πάνω σε εικόνες) | 4 | axe / χειροκίνητα στα overlays |
| Πλήρης λειτουργία με πληκτρολόγιο (nav, modal, FAQ, carousel) | 3 | Χειροκίνητα: Tab/Enter/Esc |
| `prefers-reduced-motion`: static fallback, blocks πλήρη χωρίς κίνηση | 3 | Emulation στο DevTools |

## 3. Responsiveness — 15π

| Έλεγχος | Πόντοι | Πώς μετριέται |
|---|---|---|
| 390px (mobile): καμία υπερχείλιση, αναγνώσιμο, tap targets ≥44px | 6 | DevTools + πραγματική συσκευή αν γίνεται |
| 768px (tablet): layouts προσαρμόζονται, όχι «τεντωμένο mobile» | 4 | DevTools |
| 1440px+ (desktop): φ-κάδρα κρατούν, max-widths σωστά | 3 | DevTools |
| Parallax/βαριά FX μειωμένα σε mobile (FX hard rule 4) | 2 | Έλεγχος `ctx.isMobile` paths |

## 4. Art Direction & Craft — 20π

| Έλεγχος | Πόντοι | Πώς μετριέται |
|---|---|---|
| Cover: ΕΝΑ κυρίαρχο στοιχείο στο hero (Big Book Look) | 5 | Κρίση κατά `praxis-design-system/docs/cover-principles.md` |
| Ρυθμός σελίδας: εναλλαγή dense/default/near-empty beats | 4 | Έλεγχος `data-spacing` ακολουθίας κατά `principles.md` |
| Μοτίβο-σφραγίδα: επανέρχεται σε 2-3 σημεία | 3 | Οπτικός έλεγχος |
| DB-00 Signature Moment: υπάρχει, bespoke, εκτός library | 5 | Code review |
| Τυπογραφία: φ-scale tokens, ελληνικά display caps ΧΩΡΙΣ τόνους (authored) | 3 | Code review |

## 5. Motion — 10π

| Έλεγχος | Πόντοι | Πώς μετριέται |
|---|---|---|
| Max 2 FX/section — κανένα fx-core warning | 3 | Console (warning = build error) |
| Ένα transform channel ανά element, teardown handles παντού | 3 | Code review κατά `fx-catalog.md` hard rules |
| 60fps στα scrub effects, χωρίς jank | 2 | DevTools Performance panel |
| Timing/easing: αίσθηση «ακριβή», όχι φτηνή επίδειξη | 2 | Κρίση σε πλήρες scroll-through |

## 6. Content & SEO — 10π 🚫 (blocker: ψευδείς ισχυρισμοί)

| Έλεγχος | Πόντοι | Πώς μετριέται |
|---|---|---|
| Κανένα lorem ipsum, κανένα ανεπίλυτο `[PLACEHOLDER]` | 3 | grep + οπτικός έλεγχος |
| Truthful copy: μόνο ό,τι πραγματικά ισχύει/προσφέρεται | 3 | Έλεγχος με τον πελάτη/Orchestrator |
| Meta title/description, OG tags, ένα `<h1>`, σωστή ιεραρχία | 2 | Lighthouse SEO = 100 + έλεγχος `<head>` |
| Schema.org markup όπου ταιριάζει (LocalBusiness κ.λπ.) | 2 | Rich Results Test |

## 7. Technical Hygiene — 10π 🚫 (blocker: console errors)

| Έλεγχος | Πόντοι | Πώς μετριέται |
|---|---|---|
| 0 console errors σε πλήρες scroll + όλα τα interactions | 3 | Console σε πλήρη διαδρομή |
| 0 broken links/assets (404) | 2 | Network tab / link checker |
| WP: όλο το copy SCF/ACF-driven, seed defaults παρόντα | 3 | Code review κατά `sites/therapist/inc/` pattern |
| Έγκυρο HTML, ένα h1, semantic sections | 2 | validator.w3.org |

---

## Μορφή αναφοράς (μπαίνει στο STATUS.md)

```
SCORECARD <project> — <ημερομηνία> — από: <Claude Code | Elliot>
1. Performance:      __/20   (LH mobile: __, CLS: __, INP: __)
2. Accessibility:    __/15   🚫
3. Responsiveness:   __/15
4. Art Direction:    __/20
5. Motion:           __/10
6. Content & SEO:    __/10   🚫
7. Tech Hygiene:     __/10   🚫
ΣΥΝΟΛΟ:              __/100  → [PASS ≥85 | FAIL]
Blockers: [κανένα | λίστα]
Ευρήματα/εκκρεμότητες: …
```
