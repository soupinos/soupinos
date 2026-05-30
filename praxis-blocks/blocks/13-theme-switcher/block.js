/**
 * px-theme-switcher — Multi-skin theme switcher.
 *
 * Reads on .px-theme-switcher:
 *   data-persist="true"    Save to localStorage (default: true)
 *   data-themes='[…]'      JSON array: [{id, label, swatch (hex), vars: {…}}]
 *
 * Applies theme by setting CSS variables on :root.
 * All blocks that read var(--…) tokens update instantly.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const widget = document.querySelector('.px-theme-switcher');
  if (!widget) return;

  const persist = widget.dataset.persist !== 'false';
  const STORAGE_KEY = 'px-theme';

  let themes = [];
  try {
    themes = JSON.parse(widget.dataset.themes || '[]');
  } catch (e) {
    console.warn('[px-theme-switcher] Invalid JSON in data-themes');
    return;
  }

  if (!themes.length) return;

  // ── Apply theme ───────────────────────────────────────────────────
  function applyTheme(id) {
    const theme = themes.find(t => t.id === id);
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme.vars || {}).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });

    buttons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.themeId === id);
      btn.setAttribute('aria-pressed', String(btn.dataset.themeId === id));
    });

    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, id); } catch (_) {}
    }
  }

  // ── Build buttons ─────────────────────────────────────────────────
  const buttons = themes.map(theme => {
    const btn = document.createElement('button');
    btn.className = 'px-theme-btn';
    btn.dataset.themeId = theme.id;
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-label', `Switch to ${theme.label} theme`);
    btn.setAttribute('aria-pressed', 'false');

    if (theme.swatch) {
      const dot = document.createElement('span');
      dot.className = 'px-theme-swatch';
      dot.style.background = theme.swatch;
      dot.setAttribute('aria-hidden', 'true');
      btn.appendChild(dot);
    }

    btn.appendChild(document.createTextNode(theme.label));
    btn.addEventListener('click', () => applyTheme(theme.id));
    widget.appendChild(btn);
    return btn;
  });

  // ── Keyboard: arrow navigation ────────────────────────────────────
  widget.setAttribute('role', 'radiogroup');
  widget.setAttribute('aria-label', 'Theme selector');

  widget.addEventListener('keydown', e => {
    const active = buttons.findIndex(b => b.classList.contains('is-active'));
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      applyTheme(themes[(active + 1) % themes.length].id);
      buttons[(active + 1) % buttons.length].focus();
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      applyTheme(themes[(active - 1 + themes.length) % themes.length].id);
      buttons[(active - 1 + buttons.length) % buttons.length].focus();
    }
  });

  // ── Init: restore saved or apply first theme ──────────────────────
  let saved = null;
  if (persist) {
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}
  }

  const initial = (saved && themes.find(t => t.id === saved)) ? saved : themes[0].id;
  applyTheme(initial);
})();
