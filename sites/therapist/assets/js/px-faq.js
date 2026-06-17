/* praxis-therapist — px-faq.js v3
   GSAP-height accordion. Reads question from data-question attr on <li>.
   JSON-LD output server-side via functions.php wp_head hook. */
(function () {
  'use strict';
  var CHEVRON = '<svg class="px-faq__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var _c = 0, _m = new WeakMap();
  function gid(el) { if (!_m.has(el)) _m.set(el, ++_c); return _m.get(el); }
  var hasGSAP = window.gsap;
  var reduce  = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  function open(item) {
    var p = item.querySelector('.px-faq__panel');
    var t = item.querySelector('.px-faq__trigger');
    item.dataset.open = 'true';
    t.setAttribute('aria-expanded', 'true');
    if (hasGSAP && !reduce) { gsap.to(p, { height: 'auto', duration: .6, ease: 'power2.out' }); }
    else { p.style.height = 'auto'; }
  }
  function close(item) {
    var p = item.querySelector('.px-faq__panel');
    var t = item.querySelector('.px-faq__trigger');
    item.dataset.open = 'false';
    t.setAttribute('aria-expanded', 'false');
    if (hasGSAP && !reduce) { gsap.to(p, { height: 0, duration: .5, ease: 'power2.inOut' }); }
    else { p.style.height = '0px'; }
  }
  function focusItem(items, i) {
    var b = items[Math.max(0, Math.min(items.length - 1, i))].querySelector('.px-faq__trigger');
    if (b) b.focus();
  }

  document.querySelectorAll('.px-faq[data-block="px-faq"]').forEach(function (block) {
    var items = Array.prototype.slice.call(block.querySelectorAll('.px-faq__item'));
    if (!items.length) return;

    items.forEach(function (item) {
      /* rebuild DOM: wrap inner content in panel, inject trigger */
      var q = item.dataset.question || '';
      var panelId  = 'faq-panel-'   + gid(item);
      var triggerId= 'faq-trigger-' + gid(item);

      var panel = document.createElement('div');
      panel.className = 'px-faq__panel';
      panel.id        = panelId;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', triggerId);
      panel.style.height = '0px';
      panel.style.overflow = 'hidden';

      var inner = document.createElement('div');
      inner.className = 'px-faq__panel-inner';
      while (item.firstChild) inner.appendChild(item.firstChild);
      panel.appendChild(inner);

      var trigger = document.createElement('button');
      trigger.className = 'px-faq__trigger';
      trigger.id        = triggerId;
      trigger.type      = 'button';
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', panelId);
      trigger.innerHTML = '<span>' + q + '</span>' + CHEVRON;

      item.appendChild(trigger);
      item.appendChild(panel);
      item.dataset.open = 'false';

      trigger.addEventListener('click', function () {
        var isOpen = item.dataset.open === 'true';
        if (isOpen) { close(item); }
        else {
          items.forEach(function (other) { if (other !== item && other.dataset.open === 'true') close(other); });
          open(item);
        }
      });

      trigger.addEventListener('keydown', function (e) {
        var idx = items.indexOf(item);
        if (e.key === 'ArrowDown') { e.preventDefault(); focusItem(items, idx + 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); focusItem(items, idx - 1); }
        else if (e.key === 'Home') { e.preventDefault(); focusItem(items, 0); }
        else if (e.key === 'End') { e.preventDefault(); focusItem(items, items.length - 1); }
      });
    });
  });
})();
