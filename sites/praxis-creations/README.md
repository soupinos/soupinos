# PraxisWeb Creations — website

Premium, production-ready site για την PraxisWeb Creations (Κέρκυρα).
Χτισμένο ως **νέο** app (όχι WordPress).

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **TailwindCSS v4** (tokens/reset) + co-located CSS Modules για τη σκηνή
- **Framer Motion** (reveal) · **GSAP + ScrollTrigger** (parallax) · **Lenis** (smooth scroll)
- **lucide-react** (icons) · fonts μέσω `next/font` (self-hosted)

## Ξεκίνημα

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Δομή

```
app/
  layout.tsx        fonts (EB Garamond + Manrope, greek subset), SEO, JSON-LD, Lenis provider
  page.tsx          renders <Hero/>
  globals.css       design tokens (@theme) + keyframes + reduced-motion guard
  icon.svg          favicon (χρυσό «C» mark)
components/
  SmoothScroll.tsx  Lenis (client)
  Hero.tsx          σκηνή + reveals (Framer) + parallax (GSAP)
  hero/
    Rail.tsx        κάθετο nav → mobile top bar με hamburger
    Device.tsx      «οθόνη» = το πραγματικό hero (h1 + lede + CTA) + coastal art
    Widgets.tsx     glass widgets: καιρός / εργασίες / animation preview
    Booking.tsx     λειτουργικό ημερολόγιο + φόρμα (mailto)
    MagneticLink.tsx  magnetic CTA
    hero.module.css   όλα τα στυλ της σκηνής
public/
  hero-desk.jpg     placeholder φόντο — ΑΝΤΙΚΑΤΕΣΤΗΣΕ με τη φωτο του γραφείου
```

## Ρυθμίσεις πριν το live

- **Φωτογραφία γραφείου:** ρίξε τη δική σου στο `public/hero-desk.jpg`
  (ιδανικά ~1600–2000px). Κουμπώνει αυτόματα· αν λείπει, δείχνει το ζεστό
  gradient — δεν σπάει.
- **Email παραλαβής ραντεβού:** άλλαξε το `CONTACT_EMAIL` στο
  `components/hero/Booking.tsx`. Η φόρμα ανοίγει prefilled `mailto:`
  (καμία ψεύτικη «αποστολή» — ό,τι δηλώνει, ισχύει).

## Sections

- [x] **1 · Εξώφυλλο** — Vertical Nav + Hero σκηνή (αυτό εδώ)
- [ ] 2 · Υπηρεσίες / Features
- [ ] 3 · Portfolio · 4 · Testimonials/FAQ · 5 · Final CTA + Footer

## Ποιότητα

Build καθαρό (TS strict, 0 hydration/console errors), fully responsive
(desktop → phone), WCAG-friendly (landmarks, focus-visible, aria,
`prefers-reduced-motion` που κόβει όλα τα animations), SEO meta + JSON-LD,
self-hosted fonts με **ελληνικό** subset.
