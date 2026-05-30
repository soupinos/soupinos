/**
 * px-reveal — IntersectionObserver scroll-reveal.
 *
 * Observes ALL [data-reveal] elements on the page.
 * Adds class .px-revealed when element enters viewport.
 * Respects data-delay="ms" for stagger.
 * Respects prefers-reduced-motion (skips animation, shows immediately).
 * Safe to include multiple times (guard via window flag).
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  if (window.__pxRevealInit) return;
  window.__pxRevealInit = true;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (reduced) {
    targets.forEach(el => el.classList.add('px-revealed'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay, 10) || 0;
      setTimeout(() => el.classList.add('px-revealed'), delay);
      observer.unobserve(el);
    });
  }, {
    threshold:  0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  targets.forEach(el => observer.observe(el));
})();
