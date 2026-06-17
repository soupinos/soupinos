/* =============================================================
   motion.js — praxis-web ΑΡΧΙΚΗ (champagne skin)
   GSAP 3 + ScrollTrigger + Lenis smooth scroll.

   TRANSFORM CHANNEL CONTRACT (no GSAP conflict):
     .px-mnav__inner  → owned by block #34 JS (xPercent)
     .px-modal__dialog → owned by block #35 JS (yPercent / scale)
     .px-nav-logo::after → owned by CSS (scaleX transition only)
     .px-hero-video-media → owned HERE (yPercent parallax)
     .reveal elements     → owned HERE (y + opacity)

   Depends on: window.gsap, window.ScrollTrigger, window.Lenis
   All three must load before this file (declared in wp_enqueue deps).
   ============================================================= */
(function () {
  'use strict';

  /* ── Guard: if any dep is missing, degrade gracefully ──────── */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.style.opacity  = '1';
      el.style.transform = 'none';
    });
    return;
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ═══════════════════════════════════════════════════════════
   * 1. GSAP plugin registration
   * ══════════════════════════════════════════════════════════ */
  gsap.registerPlugin(ScrollTrigger);

  /* ═══════════════════════════════════════════════════════════
   * 2. Lenis smooth scroll — wired into GSAP RAF
   * ══════════════════════════════════════════════════════════ */
  var lenis = new Lenis({
    lerp:              0.08,
    duration:          1.2,
    smoothWheel:       !reduce,
    touchMultiplier:   1.5,
    infinite:          false,
  });

  /* Lenis drives GSAP ticker — no separate requestAnimationFrame needed */
  gsap.ticker.add(function (time) {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* Keep ScrollTrigger in sync with Lenis scroll position */
  lenis.on('scroll', function () {
    ScrollTrigger.update();
  });

  /* Expose lenis globally so other scripts can call lenis.scrollTo() */
  window.pxLenis = lenis;

  /* Anchor links: use Lenis smooth scroll instead of instant jump */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 }); /* -80 = header height */
    });
  });

  /* ═══════════════════════════════════════════════════════════
   * 3. Scroll reveals (.reveal)
   * Stagger classes d1/d2/d3 are additive delays from the brief.
   * ══════════════════════════════════════════════════════════ */
  if (!reduce) {
    /* Set initial states (mirrors motion.css but ensures GSAP ownership) */
    gsap.set('.reveal', { opacity: 0, y: 28 });

    ScrollTrigger.batch('.reveal', {
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: function (index, target) {
            /* d1/d2/d3 classes: allow grouped stagger within a batch */
            if (target.classList.contains('d3')) return 0.45;
            if (target.classList.contains('d2')) return 0.3;
            if (target.classList.contains('d1')) return 0.15;
            return 0;
          },
        });
      },
      once:  true,
      start: 'top 88%',
    });
  } else {
    gsap.set('.reveal', { opacity: 1, y: 0 });
  }

  /* ═══════════════════════════════════════════════════════════
   * 4. Hero entrance timeline
   * Runs on page load (delay 0.15s after DOMContentLoaded).
   * Elements are built by block #02's block.js — wait for them.
   * ══════════════════════════════════════════════════════════ */
  function initHero() {
    var eyebrow  = document.querySelector('.px-hero-video-eyebrow');
    var headline = document.querySelector('.px-hero-video-headline');
    var sub      = document.querySelector('.px-hero-video-sub');
    var actions  = document.querySelector('.px-hero-video-actions');

    if (!headline) return; /* hero not present on this page */

    if (reduce) {
      /* just show content immediately */
      [eyebrow, headline, sub, actions].forEach(function (el) {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      return;
    }

    var tl = gsap.timeline({ delay: 0.15 });

    if (eyebrow) {
      tl.fromTo(eyebrow,  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    }
    tl.fromTo(headline, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, eyebrow ? '-=0.4' : 0);
    if (sub) {
      tl.fromTo(sub,      { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.65');
    }
    if (actions) {
      tl.fromTo(actions,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7,  ease: 'power3.out' }, '-=0.55');
    }
  }

  /* Block #02 builds the hero DOM on DOMContentLoaded; we need to run AFTER */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(initHero, 50); /* one tick after block.js */
    });
  } else {
    setTimeout(initHero, 50);
  }

  /* ═══════════════════════════════════════════════════════════
   * 5. Hero parallax (media layer)
   * Uses yPercent — GSAP owns this transform channel on .px-hero-video-media.
   * ══════════════════════════════════════════════════════════ */
  if (!reduce) {
    ScrollTrigger.create({
      trigger: '.px-hero-video',
      start:   'top top',
      end:     'bottom top',
      scrub:   1.4,
      onUpdate: function (self) {
        var media = document.querySelector('.px-hero-video-media');
        if (media) {
          gsap.set(media, { yPercent: self.progress * 28 });
        }
      },
    });
  }

  /* ═══════════════════════════════════════════════════════════
   * 6. Services cards: stagger entrance (GSAP on top of .reveal)
   * ══════════════════════════════════════════════════════════ */
  if (!reduce) {
    /* Cancel the generic .reveal batch for these cards;
       replace with a tighter stagger. */
    var grid = document.querySelector('.px-sc-grid');
    if (grid) {
      var cards = grid.querySelectorAll('.px-sc-card');
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: grid,
          start: 'top 80%',
          once:  true,
          onEnter: function () {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              stagger: 0.13,
            });
          },
        });
      }
    }
  }

  /* ═══════════════════════════════════════════════════════════
   * 7. Manifesto word-by-word reveal
   * Splits .px-sl-text into .px-sl-word spans, then staggers.
   * Works WITH wp_kses_post output (no <script> in text).
   * ══════════════════════════════════════════════════════════ */
  if (!reduce) {
    document.querySelectorAll('.px-sl-text').forEach(function (el) {
      /* Split text nodes only; keep <strong>/<em> as single units */
      var html  = el.innerHTML;
      /* Wrap words (non-whitespace sequences) in spans, leave tags intact */
      var split = html.replace(/(<[^>]+>|[^<\s]+)/g, function (match) {
        if (match.charAt(0) === '<') return match; /* HTML tag → pass through */
        return '<span class="px-sl-word">' + match + '</span>';
      });
      el.innerHTML = split;

      var words = el.querySelectorAll('.px-sl-word');
      gsap.set(words, { opacity: 0, y: 10 });

      var item = el.closest('.px-sl-item');
      ScrollTrigger.create({
        trigger: item || el,
        start:   'top 82%',
        once:    true,
        onEnter: function () {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.042,
          });
        },
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
   * 8. Stats / Key facts entrance
   * Block #32 self-animates numbers via IntersectionObserver.
   * We add the opacity/y entrance via GSAP.
   * ══════════════════════════════════════════════════════════ */
  if (!reduce) {
    var kfItems = document.querySelectorAll('.px-kf__item');
    if (kfItems.length) {
      gsap.set(kfItems, { opacity: 0 });
      ScrollTrigger.create({
        trigger: '.px-kf',
        start:   'top 82%',
        once:    true,
        onEnter: function () {
          gsap.to(kfItems, {
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
          });
        },
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
   * 9. Refresh ScrollTrigger after all content is rendered
   * ══════════════════════════════════════════════════════════ */
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });

})();
