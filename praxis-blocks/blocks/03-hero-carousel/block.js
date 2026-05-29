/**
 * px-carousel — Fullscreen hero photo slideshow.
 *
 * Reads on .px-carousel:
 *   data-interval="5000"      Auto-advance ms (default 5000)
 *   data-effect="fade|slide"  Transition (default "fade")
 *
 * Reads on each .px-carousel-slide:
 *   data-src, data-headline, data-sub, data-cta-text, data-cta-href
 *
 * Supports: keyboard arrows, swipe (touch/pointer), dots, prev/next buttons.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const carousel = document.querySelector('.px-carousel');
  if (!carousel) return;

  const slides    = Array.from(carousel.querySelectorAll('.px-carousel-slide'));
  const dotsWrap  = carousel.querySelector('.px-carousel-dots');
  const btnPrev   = carousel.querySelector('.px-carousel-prev');
  const btnNext   = carousel.querySelector('.px-carousel-next');
  const interval  = parseInt(carousel.dataset.interval, 10) || 5000;
  const effect    = carousel.dataset.effect || 'fade';
  const reduced   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let timer   = null;

  // ── Build slides ─────────────────────────────────────────────────
  slides.forEach((slide, i) => {
    // Background image in a child element (so Ken Burns doesn't clip content)
    const bg = document.createElement('div');
    bg.className = 'px-carousel-slide-bg';
    bg.style.backgroundImage = `url(${slide.dataset.src || ''})`;
    slide.prepend(bg);

    // Content overlay
    const content = document.createElement('div');
    content.className = 'px-carousel-content';

    if (slide.dataset.headline) {
      const h = document.createElement('h2');
      h.className = 'px-carousel-headline';
      h.innerHTML = slide.dataset.headline;
      content.appendChild(h);
    }

    if (slide.dataset.sub) {
      const p = document.createElement('p');
      p.className = 'px-carousel-sub';
      p.textContent = slide.dataset.sub;
      content.appendChild(p);
    }

    if (slide.dataset.ctaText && slide.dataset.ctaHref) {
      const a = document.createElement('a');
      a.className = 'px-carousel-cta';
      a.href = slide.dataset.ctaHref;
      a.textContent = slide.dataset.ctaText;
      content.appendChild(a);
    }

    slide.appendChild(content);
    slide.setAttribute('aria-label', `Slide ${i + 1} of ${slides.length}`);
  });

  // ── Build dots ───────────────────────────────────────────────────
  const dots = slides.map((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'px-carousel-dot';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
    btn.addEventListener('click', () => goTo(i));
    dotsWrap && dotsWrap.appendChild(btn);
    return btn;
  });

  // ── Core navigation ──────────────────────────────────────────────
  function goTo(index) {
    const prev = current;
    current = (index + slides.length) % slides.length;

    slides[prev].classList.remove('is-active');
    if (effect === 'slide') slides[prev].classList.add('is-prev');

    slides[current].classList.add('is-active');
    slides[current].classList.remove('is-prev');

    // Clean up prev class after transition
    const oldSlide = slides[prev];
    setTimeout(() => oldSlide.classList.remove('is-prev'), 800);

    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === current);
      d.setAttribute('aria-selected', String(i === current));
    });

    resetTimer();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // ── Auto-advance ─────────────────────────────────────────────────
  function startTimer() {
    if (reduced) return;
    timer = setInterval(next, interval);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  // ── Arrow buttons ────────────────────────────────────────────────
  if (btnPrev) btnPrev.addEventListener('click', prev);
  if (btnNext) btnNext.addEventListener('click', next);

  // ── Keyboard ─────────────────────────────────────────────────────
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  carousel.setAttribute('tabindex', '0');

  // ── Touch / pointer swipe ────────────────────────────────────────
  let pointerStart = null;

  carousel.addEventListener('pointerdown', e => {
    pointerStart = e.clientX;
  }, { passive: true });

  carousel.addEventListener('pointerup', e => {
    if (pointerStart === null) return;
    const delta = pointerStart - e.clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    pointerStart = null;
  }, { passive: true });

  // ── Pause on hover / focus ───────────────────────────────────────
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', startTimer);
  carousel.addEventListener('focusin',    () => clearInterval(timer));
  carousel.addEventListener('focusout',   startTimer);

  // ── Init ─────────────────────────────────────────────────────────
  goTo(0);
  startTimer();
})();
