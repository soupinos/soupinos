/**
 * px-nav — Sticky header with dropdown menus and mobile hamburger.
 *
 * Reads:
 *   data-transparent="true"   Start transparent → solid on scroll
 *   data-logo="Brand"         Override logo text at runtime
 *
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const nav = document.querySelector('.px-nav');
  if (!nav) return;

  // ── Scroll transition ──────────────────────────────────────────────
  if (nav.dataset.transparent === 'true') {
    const THRESHOLD = 60;
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on init
  }

  // ── Logo text override ─────────────────────────────────────────────
  if (nav.dataset.logo) {
    const logoText = nav.querySelector('.px-nav-logo-text');
    const logoMark = nav.querySelector('.px-nav-logo-mark');
    if (logoText) logoText.textContent = nav.dataset.logo;
    if (logoMark) logoMark.textContent = nav.dataset.logo.charAt(0).toUpperCase();
  }

  // ── Desktop dropdowns ──────────────────────────────────────────────
  const dropdownTriggers = nav.querySelectorAll('.px-nav-has-dropdown > button');

  function closeAllDropdowns(except) {
    dropdownTriggers.forEach(btn => {
      if (btn === except) return;
      btn.setAttribute('aria-expanded', 'false');
      const panel = btn.nextElementSibling;
      if (panel) panel.classList.remove('is-open');
    });
  }

  dropdownTriggers.forEach(btn => {
    const panel = btn.nextElementSibling;
    if (!panel) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns(isOpen ? null : btn);
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.add('is-open');
      } else {
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
      }
    });

    // Close on Escape
    panel.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
        btn.focus();
      }
    });
  });

  // Click outside closes dropdowns
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) closeAllDropdowns();
  });

  // ── Mobile hamburger ───────────────────────────────────────────────
  const hamburger = nav.querySelector('.px-nav-hamburger');
  const mobileDrawer = nav.querySelector('.px-nav-mobile');

  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileDrawer.setAttribute('aria-hidden', String(isOpen));
      mobileDrawer.classList.toggle('is-open', !isOpen);
    });
  }

  // ── Mobile sub-menus ───────────────────────────────────────────────
  const mobileToggles = nav.querySelectorAll('.px-nav-mobile-toggle');

  mobileToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const sub = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (sub) sub.hidden = isOpen;
    });
  });

  // ── Keyboard: close on Escape globally ────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
      if (hamburger && hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileDrawer.classList.remove('is-open');
        hamburger.focus();
      }
    }
  });
})();
