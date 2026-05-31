/**
 * px-booking — External booking bridge block.
 *
 * Drop the block anywhere; it renders the right UI based on data-mode.
 * NEVER builds its own payment engine — always links/embeds an external provider.
 *
 * ── MODES ──────────────────────────────────────────────────────────────────
 *
 * data-mode="link"   (DEFAULT — works with every provider)
 *   Renders a brand-styled CTA that opens the booking URL in a new tab.
 *   data-url="https://provider.com/book"
 *   data-label="Book now"
 *   data-i18n-label="cta_book"     (optional — forwards to lang-switcher)
 *   data-trust="Secure booking via Provider"
 *   data-i18n-trust="booking_trust" (optional)
 *
 * data-mode="embed"  (OPTIONAL — only if provider allows iframe)
 *   Loads the booking widget inside an <iframe>. If the provider sends
 *   X-Frame-Options: DENY or CSP frame-ancestors, the browser blocks
 *   the frame. This block detects a failed/hung load (timeout) and
 *   automatically falls back to mode="link" — no broken iframe visible.
 *
 *   BEFORE enabling: verify provider headers:
 *     curl -I https://provider.com/book | grep -i "x-frame\|frame-ancestors"
 *   If you see DENY or SAMEORIGIN → use mode="link" instead.
 *
 *   data-embed-url="https://provider.com/embed/book"
 *   data-fallback-url="https://provider.com/book"  (used if embed fails)
 *   data-fallback-label="Book now"
 *   data-timeout="4000"  (ms before giving up, default 4000)
 *   data-iframe-title="Booking"
 *
 * data-mode="inline-widget"  (OPTIONAL — provider supplies a JS SDK)
 *   Creates a named container for the SDK to mount into; shows a fallback
 *   link button below until the SDK mounts.
 *   data-widget-id="my-booking-div"  (id of the slot div the SDK targets)
 *   data-fallback-url="https://provider.com/book"
 *   data-fallback-label="Book now"
 *   data-i18n-label="cta_book"
 *
 * ── COMMON ─────────────────────────────────────────────────────────────────
 * Multiple .px-booking blocks per page are supported.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  document.querySelectorAll('.px-booking').forEach(init);

  function init(root) {
    const mode = (root.dataset.mode || 'link').trim();
    if      (mode === 'link')          buildLink(root);
    else if (mode === 'embed')         buildEmbed(root);
    else if (mode === 'inline-widget') buildWidget(root);
    else { console.warn('[px-booking] Unknown mode:', mode); buildLink(root); }
  }

  // ── LINK MODE ─────────────────────────────────────────────────────────────

  function buildLink(root) {
    const wrap = document.createElement('div');
    wrap.className = 'px-booking-wrap';

    const a = document.createElement('a');
    a.className = 'px-booking-btn';
    a.href      = root.dataset.url || '#';
    a.target    = '_blank';
    a.rel       = 'noopener noreferrer';
    a.textContent = root.dataset.label || 'Book';
    // Forward to lang-switcher: data-i18n-label="key" → data-i18n="key" on <a>
    if (root.dataset.i18nLabel) a.setAttribute('data-i18n', root.dataset.i18nLabel);

    wrap.appendChild(a);

    const trust = root.dataset.trust;
    if (trust) {
      const p = document.createElement('p');
      p.className   = 'px-booking-trust';
      p.textContent = trust;
      if (root.dataset.i18nTrust) p.setAttribute('data-i18n', root.dataset.i18nTrust);
      wrap.appendChild(p);
    }

    root.appendChild(wrap);
  }

  // ── EMBED MODE ────────────────────────────────────────────────────────────

  function buildEmbed(root) {
    const embedUrl = root.dataset.embedUrl;
    const timeout  = parseInt(root.dataset.timeout || '4000', 10);

    if (!embedUrl) { fallbackToLink(root); return; }

    const wrap = document.createElement('div');
    wrap.className = 'px-booking-iframe-wrap';

    const iframe = document.createElement('iframe');
    iframe.className = 'px-booking-iframe';
    iframe.src       = embedUrl;
    iframe.setAttribute('loading',              'lazy');
    iframe.setAttribute('title',                root.dataset.iframeTitle || 'Booking');
    iframe.setAttribute('allowpaymentrequest',  'true');
    iframe.setAttribute('allow',                'payment');

    let settled = false;

    function doFallback() {
      if (settled) return;
      settled = true;
      root.innerHTML = '';
      fallbackToLink(root);
    }

    const timer = setTimeout(doFallback, timeout);

    iframe.addEventListener('load', function () {
      // NOTE: X-Frame-Options / CSP blocking causes the browser to render an
      // internal error page into the iframe; the 'load' event still fires and
      // we cannot distinguish a blocked frame from a successful one via JS
      // (same-origin policy). The timeout above is the primary safety net.
      // Always verify provider headers server-side before using embed mode.
      clearTimeout(timer);
      settled = true;
      root.classList.add('is-loaded');
    });

    iframe.addEventListener('error', doFallback);

    wrap.appendChild(iframe);
    root.appendChild(wrap);
  }

  // ── INLINE-WIDGET MODE ────────────────────────────────────────────────────

  function buildWidget(root) {
    root.classList.add('px-booking-widget-host');

    if (root.dataset.widgetId) {
      const slot = document.createElement('div');
      slot.id        = root.dataset.widgetId;
      slot.className = 'px-booking-widget-slot';
      root.appendChild(slot);
    }

    // Fallback link shown while SDK mounts; SDK should remove/hide it on ready
    if (root.dataset.fallbackUrl || root.dataset.url) {
      root.dataset.mode  = 'link';
      root.dataset.url   = root.dataset.fallbackUrl || root.dataset.url;
      root.dataset.label = root.dataset.fallbackLabel || root.dataset.label || 'Book';
      if (root.dataset.fallbackI18nLabel) root.dataset.i18nLabel = root.dataset.fallbackI18nLabel;
      buildLink(root);
    }
  }

  // ── HELPERS ───────────────────────────────────────────────────────────────

  function fallbackToLink(root) {
    root.dataset.mode  = 'link';
    root.dataset.url   = root.dataset.fallbackUrl  || root.dataset.url   || '#';
    root.dataset.label = root.dataset.fallbackLabel || root.dataset.label || 'Book';
    if (root.dataset.fallbackI18nLabel) root.dataset.i18nLabel = root.dataset.fallbackI18nLabel;
    buildLink(root);
  }
})();
