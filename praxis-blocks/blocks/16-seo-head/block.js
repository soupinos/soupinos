/**
 * px-seo-head — Dynamic meta tag manager (title, description, OG, Twitter Card).
 *
 * Config: <script type="application/json" class="px-seo-cfg">
 * {
 *   "canonical": "https://www.example.com/",   // updates <link rel="canonical">
 *   "robots":    "index,follow",                // default: "index,follow"
 *   "og": {
 *     "image":    "https://…/og.jpg",           // og:image + twitter:image
 *     "url":      "https://www.example.com/",   // og:url
 *     "type":     "website",                    // og:type
 *     "siteName": "Brand Name"                  // og:site_name
 *   },
 *   "default": "el",                            // fallback lang key (ISO)
 *   "langs": {
 *     "el": { "title": "…50–60 chars…", "description": "…150–160 chars…" },
 *     "en": { "title": "…", "description": "…" }
 *   }
 * }
 *
 * Lang detection: reads <html lang> (updated by px-lang switcher).
 * Lang change: MutationObserver on html[lang] — no event coupling needed.
 *
 * Loads in <body> like other blocks; writes to <head> via DOM.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const cfgEl = document.querySelector('script.px-seo-cfg[type="application/json"]');
  if (!cfgEl) return;

  let cfg;
  try { cfg = JSON.parse(cfgEl.textContent); }
  catch (e) { console.warn('[px-seo-head] Invalid JSON config:', e); return; }

  // og:locale map (ISO 639-1 html lang → locale)
  const OG_LOCALE = {
    el: 'el_GR', en: 'en_US', fr: 'fr_FR', it: 'it_IT',
    de: 'de_DE', es: 'es_ES', ro: 'ro_RO', bg: 'bg_BG', ru: 'ru_RU'
  };

  // Upsert a <meta> by its selector attribute
  function meta(attr, val, content) {
    let el = document.querySelector('meta[' + attr + '="' + val + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, val);
      document.head.appendChild(el);
    }
    el.content = content;
  }

  // Apply lang-specific tags
  function apply(lang) {
    const L = cfg.langs && (cfg.langs[lang] || cfg.langs[cfg.default || 'el']) || {};
    if (!L.title && !L.description) return;

    if (L.title) {
      document.title = L.title;
      meta('property', 'og:title',       L.title);
      meta('name',     'twitter:title',  L.title);
    }
    if (L.description) {
      meta('name',     'description',          L.description);
      meta('property', 'og:description',       L.description);
      meta('name',     'twitter:description',  L.description);
    }
    meta('property', 'og:locale', OG_LOCALE[lang] || 'el_GR');
  }

  // Static (lang-agnostic) tags — run once
  meta('name', 'robots', cfg.robots || 'index,follow');

  if (cfg.og) {
    meta('name', 'twitter:card', 'summary_large_image');
    if (cfg.og.image)    { meta('property', 'og:image', cfg.og.image); meta('name', 'twitter:image', cfg.og.image); }
    if (cfg.og.url)      meta('property', 'og:url',      cfg.og.url);
    if (cfg.og.type)     meta('property', 'og:type',     cfg.og.type);
    if (cfg.og.siteName) meta('property', 'og:site_name', cfg.og.siteName);
  }

  if (cfg.canonical) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = cfg.canonical;
  }

  // Initial render: <html lang> is set by browser/lang-switcher
  // px-lang switcher maps dict key 'gr' → html lang 'el', others pass through
  apply(document.documentElement.lang || 'el');

  // Reactively update when px-lang-switcher changes <html lang>
  new MutationObserver(function (muts) {
    for (const m of muts) {
      if (m.attributeName === 'lang') apply(document.documentElement.lang || 'el');
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
