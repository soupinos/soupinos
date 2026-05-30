/**
 * px-gallery — Grid gallery with lightbox.
 *
 * Reads on .px-gallery:
 *   data-cols="3"              Columns on desktop (sets --px-gcols)
 *   data-layout="grid|masonry"
 *
 * Reads on each .px-gallery-item button:
 *   data-src="full-res.jpg"
 *   data-alt="..."
 *   data-caption="..."
 *
 * Keyboard: ←/→ navigate, Escape closes.
 * Touch: swipe left/right navigates.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const gallery   = document.querySelector('.px-gallery');
  const lightbox  = document.querySelector('.px-lightbox');
  if (!gallery || !lightbox) return;

  // Apply col count
  if (gallery.dataset.cols) {
    gallery.style.setProperty('--px-gcols', gallery.dataset.cols);
  }

  const items      = Array.from(gallery.querySelectorAll('.px-gallery-item'));
  const lbImg      = lightbox.querySelector('.px-lightbox-img');
  const lbCaption  = lightbox.querySelector('.px-lightbox-caption');
  const lbCounter  = lightbox.querySelector('.px-lightbox-counter');
  const lbClose    = lightbox.querySelector('.px-lightbox-close');
  const lbPrev     = lightbox.querySelector('.px-lightbox-prev');
  const lbNext     = lightbox.querySelector('.px-lightbox-next');
  const lbBackdrop = lightbox.querySelector('.px-lightbox-backdrop');

  let current       = 0;
  let triggerEl     = null;
  let pointerStartX = null;

  // ── Open / close ──────────────────────────────────────────────────
  function open(index) {
    current = (index + items.length) % items.length;
    lightbox.hidden = false;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    loadImage(current);
    lightbox.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (triggerEl) triggerEl.focus();
  }

  // ── Load image ────────────────────────────────────────────────────
  function loadImage(index) {
    const item = items[index];
    const src  = item.dataset.src || item.querySelector('img').src;
    const alt  = item.dataset.alt  || item.querySelector('img').alt || '';
    const cap  = item.dataset.caption || '';

    lbImg.classList.add('is-loading');
    lbImg.onload = () => lbImg.classList.remove('is-loading');
    lbImg.src = src;
    lbImg.alt = alt;
    lbCaption.textContent = cap;
    lbCounter.textContent = `${index + 1} / ${items.length}`;
    lightbox.setAttribute('aria-label', `Image ${index + 1} of ${items.length}: ${alt}`);
  }

  function goTo(index) {
    current = (index + items.length) % items.length;
    loadImage(current);
  }

  // ── Thumbnail clicks ──────────────────────────────────────────────
  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      triggerEl = item;
      open(i);
    });
  });

  // ── Controls ──────────────────────────────────────────────────────
  if (lbClose)    lbClose.addEventListener('click', close);
  if (lbBackdrop) lbBackdrop.addEventListener('click', close);
  if (lbPrev)     lbPrev.addEventListener('click', () => goTo(current - 1));
  if (lbNext)     lbNext.addEventListener('click', () => goTo(current + 1));

  // ── Keyboard ──────────────────────────────────────────────────────
  lightbox.setAttribute('tabindex', '-1');
  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    if (e.key === 'Escape')     { e.preventDefault(); close(); }
  });

  // ── Touch / swipe ─────────────────────────────────────────────────
  lightbox.addEventListener('pointerdown', e => { pointerStartX = e.clientX; }, { passive: true });
  lightbox.addEventListener('pointerup',   e => {
    if (pointerStartX === null) return;
    const delta = pointerStartX - e.clientX;
    if (Math.abs(delta) > 50) delta > 0 ? goTo(current + 1) : goTo(current - 1);
    pointerStartX = null;
  }, { passive: true });
})();
