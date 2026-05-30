/**
 * px-counters — Animated number counters triggered on scroll entry.
 *
 * Reads on each .px-counter-value:
 *   data-target="500"       Target number
 *   data-suffix="+"         Appended string (default: "")
 *   data-prefix="€"         Prepended string (default: "")
 *   data-duration="2000"    Animation ms (default: 2000)
 *   data-decimals="0"       Decimal places (default: 0)
 *
 * Fires once when .px-counters enters the viewport.
 * Respects prefers-reduced-motion (shows final value immediately).
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const container = document.querySelector('.px-counters');
  if (!container) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let triggered = false;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target)   || 0;
    const suffix   = el.dataset.suffix               || '';
    const prefix   = el.dataset.prefix               || '';
    const duration = parseInt(el.dataset.duration, 10) || 2000;
    const decimals = parseInt(el.dataset.decimals, 10)  || 0;

    const card = el.closest('.px-counter');

    if (reduced) {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      if (card) card.classList.add('is-counted');
      return;
    }

    const start     = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);
      const value    = eased * target;

      el.textContent = prefix + value.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
        if (card) card.classList.add('is-counted');
      }
    }

    requestAnimationFrame(step);
  }

  function runAll() {
    if (triggered) return;
    triggered = true;
    container.querySelectorAll('.px-counter-value').forEach(animateCounter);
  }

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      runAll();
      observer.disconnect();
    }
  }, { threshold: 0.25 });

  observer.observe(container);
})();
