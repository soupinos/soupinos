/**
 * px-lang — Client-side i18n + language switcher.
 *
 * Dictionary: <script type="application/json" class="px-lang-i18n"> with
 *   { "gr": {key:val,…}, "en": {…}, … }
 *
 * Bindings in markup:
 *   data-i18n="key"               → textContent
 *   data-i18n-<attr>="key"        → setAttribute(attr, val)
 *                                   (e.g. data-i18n-placeholder, data-i18n-aria-label)
 *
 * Switcher (.px-lang):
 *   data-default="gr"   Fallback language
 *   data-persist="true" localStorage memory (key: px-lang)
 *
 * First load: localStorage → navigator.language (with el→gr alias) →
 * data-default → first dict key. Updates <html lang>. No reload.
 *
 * Add a language = add a key to the dictionary + an <li> option.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const widget = document.querySelector('.px-lang');
  if (!widget) return;

  // ── Load dictionary ────────────────────────────────────────────────
  let dict = {};
  try {
    const dataEl = document.querySelector('.px-lang-i18n');
    if (dataEl) dict = JSON.parse(dataEl.textContent);
  } catch (e) {
    console.warn('[px-lang] Invalid JSON in .px-lang-i18n');
    return;
  }

  const langs = Object.keys(dict);
  if (!langs.length) return;

  const STORAGE_KEY = 'px-lang';
  const persist = widget.dataset.persist !== 'false';
  const fallback = widget.dataset.default && dict[widget.dataset.default]
    ? widget.dataset.default
    : langs[0];

  // navigator.language → dictionary key (el is the ISO code for Greek)
  const ALIAS = { el: 'gr' };

  const toggle  = widget.querySelector('.px-lang-toggle');
  const menu    = widget.querySelector('.px-lang-menu');
  const options = Array.from(widget.querySelectorAll('[role="option"]'));
  const codeEl  = widget.querySelector('.px-lang-code');
  const flagEl  = widget.querySelector('.px-lang-flag');

  // ── Apply a language across the page ───────────────────────────────
  function applyLang(lang) {
    const table = dict[lang] || dict[fallback] || {};

    // textContent bindings
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (key in table) el.textContent = table[key];
    });

    // attribute bindings: any data-i18n-<attr>
    document.querySelectorAll('*').forEach(el => {
      if (!el.dataset) return;
      for (const dataKey in el.dataset) {
        // dataKey like "i18nPlaceholder", "i18nAriaLabel"
        if (dataKey.indexOf('i18n') !== 0 || dataKey === 'i18n') continue;
        const attr = dataKey
          .slice(4)                                   // strip "i18n"
          .replace(/^[A-Z]/, c => c.toLowerCase())    // first letter lower
          .replace(/[A-Z]/g, c => '-' + c.toLowerCase()); // camel → kebab
        const key = el.dataset[dataKey];
        if (key in table) el.setAttribute(attr, table[key]);
      }
    });

    // Update <html lang> (use 'el' for Greek, else the key itself)
    document.documentElement.setAttribute('lang', lang === 'gr' ? 'el' : lang);

    // Update toggle display
    const opt = options.find(o => o.dataset.lang === lang);
    if (codeEl) codeEl.textContent = lang.toUpperCase();
    if (flagEl && opt) {
      const f = opt.querySelector('.px-lang-flag');
      if (f) flagEl.textContent = f.textContent;
    }

    // Selected state
    options.forEach(o => o.setAttribute('aria-selected', String(o.dataset.lang === lang)));

    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
    }
  }

  // ── Open / close menu ──────────────────────────────────────────────
  function openMenu()  { menu.hidden = false; toggle.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { menu.hidden = true;  toggle.setAttribute('aria-expanded', 'false'); }

  toggle.addEventListener('click', () => {
    menu.hidden ? openMenu() : closeMenu();
  });

  options.forEach(opt => {
    opt.setAttribute('tabindex', '0');
    const choose = () => { applyLang(opt.dataset.lang); closeMenu(); toggle.focus(); };
    opt.addEventListener('click', choose);
    opt.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(); }
    });
  });

  // Close on outside click / Escape
  document.addEventListener('click', e => { if (!widget.contains(e.target)) closeMenu(); });
  widget.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMenu(); toggle.focus(); }
  });

  // ── Determine initial language ─────────────────────────────────────
  function detectLang() {
    if (persist) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && dict[saved]) return saved;
      } catch (_) {}
    }
    const navs = navigator.languages || [navigator.language || ''];
    for (const raw of navs) {
      const two = raw.toLowerCase().slice(0, 2);
      if (dict[two]) return two;
      if (ALIAS[two] && dict[ALIAS[two]]) return ALIAS[two];
    }
    return fallback;
  }

  applyLang(detectLang());
})();
