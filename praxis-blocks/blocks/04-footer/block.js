/**
 * px-footer — Multi-column footer.
 *
 * Reads on .px-footer:
 *   data-company="..."   Company display name
 *   data-vat="..."       ΑΦΜ number
 *   data-gemi="..."      ΓΕΜΗ number
 *
 * Auto-fills copyright year. Applies data overrides to DOM.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const footer = document.querySelector('.px-footer');
  if (!footer) return;

  // ── Auto year ─────────────────────────────────────────────────────
  const yearEls = footer.querySelectorAll('.px-footer-year');
  const year    = new Date().getFullYear();
  yearEls.forEach(el => { el.textContent = year; });

  // ── Data overrides ────────────────────────────────────────────────
  if (footer.dataset.company) {
    footer.querySelectorAll('.px-footer-company').forEach(el => {
      el.textContent = footer.dataset.company;
    });
    // Drop-cap logo: badge = first letter, wordmark = the rest, so the
    // pair reads as the full company name without a doubled first letter.
    const logoText = footer.querySelector('.px-footer-logo-text');
    const logoMark = footer.querySelector('.px-footer-logo-mark');
    if (logoMark) logoMark.textContent = footer.dataset.company.charAt(0).toUpperCase();
    if (logoText) logoText.textContent = footer.dataset.company.slice(1);
  }

  if (footer.dataset.vat) {
    footer.querySelectorAll('.px-footer-vat').forEach(el => {
      el.textContent = footer.dataset.vat;
    });
  }

  if (footer.dataset.gemi) {
    footer.querySelectorAll('.px-footer-gemi').forEach(el => {
      el.textContent = footer.dataset.gemi;
    });
  }
})();
