/**
 * px-hreflang — Injects <link rel="alternate" hreflang="…"> into <head>.
 *
 * Config: <script type="application/json" class="px-hreflang-cfg">
 * {
 *   "xDefault": "https://www.example.com/",
 *   "langs": [
 *     { "code": "el", "url": "https://www.example.com/el/" },
 *     { "code": "en", "url": "https://www.example.com/en/" }
 *   ]
 * }
 *
 * IMPORTANT — single-URL limitation:
 * hreflang is fully effective only when each language has a distinct URL
 * (e.g. /el/, /en/, /fr/). On a single-URL client-side i18n site (JS lang
 * switching), Googlebot sees one URL regardless of the active language,
 * so hreflang tags have limited crawl impact. These tags are added for
 * correctness and forward-compatibility. For full multilingual SEO, serve
 * separate URLs per language (WordPress multisite, subdirectories, or
 * subdomains) — that is a routing/hosting decision, outside this block's scope.
 *
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const cfgEl = document.querySelector('script.px-hreflang-cfg[type="application/json"]');
  if (!cfgEl) return;

  let cfg;
  try { cfg = JSON.parse(cfgEl.textContent); }
  catch (e) { console.warn('[px-hreflang] Invalid JSON config:', e); return; }

  if (!cfg.langs || !Array.isArray(cfg.langs)) return;

  cfg.langs.forEach(function (item) {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.setAttribute('hreflang', item.code);
    link.href = item.url;
    document.head.appendChild(link);
  });

  // x-default points to the canonical URL (usually the default-lang version)
  if (cfg.xDefault) {
    const xd = document.createElement('link');
    xd.rel = 'alternate';
    xd.setAttribute('hreflang', 'x-default');
    xd.href = cfg.xDefault;
    document.head.appendChild(xd);
  }
})();
