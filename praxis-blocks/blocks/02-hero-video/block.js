/**
 * px-hero-video — Fullscreen hero with video background.
 *
 * Reads on .px-hero-video:
 *   data-src, data-poster, data-headline, data-sub,
 *   data-cta-text, data-cta-href, data-cta2-text, data-cta2-href
 *
 * Builds the full DOM from data-* attributes.
 * Skips video when prefers-reduced-motion is set (shows poster instead).
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const hero = document.querySelector('.px-hero-video');
  if (!hero) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Build media layer ─────────────────────────────────────────────
  const media = document.createElement('div');
  media.className = 'px-hero-video-media';

  if (!reduced && hero.dataset.src) {
    const video = document.createElement('video');
    video.src        = hero.dataset.src;
    video.poster     = hero.dataset.poster || '';
    video.autoplay   = true;
    video.muted      = true;
    video.loop       = true;
    video.playsInline = true;
    video.setAttribute('aria-hidden', 'true');
    video.setAttribute('tabindex', '-1');
    media.appendChild(video);
  } else if (hero.dataset.poster) {
    const img  = document.createElement('img');
    img.src    = hero.dataset.poster;
    img.alt    = '';
    img.setAttribute('aria-hidden', 'true');
    media.appendChild(img);
  }

  hero.appendChild(media);

  // ── Overlay ───────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 'px-hero-video-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  hero.appendChild(overlay);

  // ── Content ───────────────────────────────────────────────────────
  const content = document.createElement('div');
  content.className = 'px-hero-video-content';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'px-hero-video-eyebrow';
  eyebrow.textContent = 'Web Agency';
  content.appendChild(eyebrow);

  if (hero.dataset.headline) {
    const h1 = document.createElement('h1');
    h1.className = 'px-hero-video-headline';
    h1.innerHTML = hero.dataset.headline;
    content.appendChild(h1);
  }

  if (hero.dataset.sub) {
    const p = document.createElement('p');
    p.className = 'px-hero-video-sub';
    p.textContent = hero.dataset.sub;
    content.appendChild(p);
  }

  const actions = document.createElement('div');
  actions.className = 'px-hero-video-actions';

  if (hero.dataset.ctaText) {
    const a = document.createElement('a');
    a.className = 'px-hero-video-cta';
    a.href      = hero.dataset.ctaHref || '#';
    a.textContent = hero.dataset.ctaText;
    actions.appendChild(a);
  }

  if (hero.dataset.cta2Text) {
    const a2 = document.createElement('a');
    a2.className  = 'px-hero-video-cta2';
    a2.href       = hero.dataset.cta2Href || '#';
    a2.textContent = hero.dataset.cta2Text;
    actions.appendChild(a2);
  }

  content.appendChild(actions);
  hero.appendChild(content);

  // ── Scroll hint ───────────────────────────────────────────────────
  const scrollHint = document.createElement('div');
  scrollHint.className = 'px-hero-video-scroll';
  scrollHint.setAttribute('aria-hidden', 'true');
  scrollHint.innerHTML = '<span class="px-hero-video-scroll-line"></span><span>Scroll</span>';
  hero.appendChild(scrollHint);

  // ── Mute toggle (only when video present) ─────────────────────────
  const videoEl = media.querySelector('video');
  if (videoEl) {
    const muteBtn = document.createElement('button');
    muteBtn.className = 'px-hero-video-mute';
    muteBtn.setAttribute('aria-label', 'Toggle mute');
    muteBtn.innerHTML = iconMuted();

    muteBtn.addEventListener('click', () => {
      videoEl.muted = !videoEl.muted;
      muteBtn.innerHTML = videoEl.muted ? iconMuted() : iconUnmuted();
      muteBtn.setAttribute('aria-label', videoEl.muted ? 'Unmute video' : 'Mute video');
    });

    hero.appendChild(muteBtn);
  }

  function iconMuted() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  }
  function iconUnmuted() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
  }
})();
