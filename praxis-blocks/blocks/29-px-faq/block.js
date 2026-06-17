/* ============================================================
   BLOCK #29 — px-faq (accordion + FAQPage JSON-LD)
   Vanilla, IIFE. GSAP-height accordion if window.gsap is present,
   otherwise instant open/close. Generalised from the proven
   sites/therapist px-faq.js.

   - Reads the question from data-question on each .px-faq__item.
   - Wraps the answer content in an animated panel, prepends a
     real <button> trigger with full aria wiring + arrow-key nav.
   - One-open-at-a-time.
   - Builds ONE FAQPage JSON-LD <script> from the DOM (unless
     data-schema="off") so the Q&As are eligible for the FAQ rich
     result. Schema text is taken from the rendered answer, never
     duplicated by hand.

   Markup contract:
     <div class="px-faq" data-block="px-faq">
       <div class="px-faq__item" data-question="…;">
         <p>…answer html…</p>
       </div>
     </div>
   ============================================================ */
(function () {
  "use strict";

  var CHEVRON = '<svg class="px-faq__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
                '<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var _c = 0, _m = new WeakMap();
  function gid(el) { if (!_m.has(el)) _m.set(el, ++_c); return _m.get(el); }

  var hasGSAP = window.gsap;
  var reduce  = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  function open(item) {
    var p = item.querySelector(".px-faq__panel");
    var t = item.querySelector(".px-faq__trigger");
    item.dataset.open = "true";
    if (t) t.setAttribute("aria-expanded", "true");
    if (hasGSAP && !reduce) { gsap.to(p, { height: "auto", duration: .6, ease: "power2.out" }); }
    else { p.style.height = "auto"; }
  }

  function close(item) {
    var p = item.querySelector(".px-faq__panel");
    var t = item.querySelector(".px-faq__trigger");
    item.dataset.open = "false";
    if (t) t.setAttribute("aria-expanded", "false");
    if (hasGSAP && !reduce) { gsap.to(p, { height: 0, duration: .5, ease: "power2.inOut" }); }
    else { p.style.height = "0px"; }
  }

  function focusItem(items, i) {
    var clamped = Math.max(0, Math.min(items.length - 1, i));
    var b = items[clamped].querySelector(".px-faq__trigger");
    if (b) b.focus();
  }

  function enhance(block) {
    var items = Array.prototype.slice.call(block.querySelectorAll(".px-faq__item"));
    if (!items.length) return;

    items.forEach(function (item) {
      var q = item.dataset.question || "";
      var panelId   = "faq-panel-"   + gid(item);
      var triggerId = "faq-trigger-" + gid(item);

      var panel = document.createElement("div");
      panel.className = "px-faq__panel";
      panel.id        = panelId;
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", triggerId);
      panel.style.height   = "0px";
      panel.style.overflow = "hidden";

      var inner = document.createElement("div");
      inner.className = "px-faq__panel-inner";
      while (item.firstChild) inner.appendChild(item.firstChild);
      panel.appendChild(inner);

      var trigger = document.createElement("button");
      trigger.className = "px-faq__trigger";
      trigger.id        = triggerId;
      trigger.type      = "button";
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", panelId);
      trigger.innerHTML = "<span>" + q + "</span>" + CHEVRON;

      item.appendChild(trigger);
      item.appendChild(panel);
      item.dataset.open = "false";

      trigger.addEventListener("click", function () {
        var isOpen = item.dataset.open === "true";
        if (isOpen) { close(item); return; }
        items.forEach(function (other) { if (other !== item && other.dataset.open === "true") close(other); });
        open(item);
      });

      trigger.addEventListener("keydown", function (e) {
        var idx = items.indexOf(item);
        if      (e.key === "ArrowDown") { e.preventDefault(); focusItem(items, idx + 1); }
        else if (e.key === "ArrowUp")   { e.preventDefault(); focusItem(items, idx - 1); }
        else if (e.key === "Home")      { e.preventDefault(); focusItem(items, 0); }
        else if (e.key === "End")       { e.preventDefault(); focusItem(items, items.length - 1); }
      });
    });
  }

  /* Build a single FAQPage JSON-LD from all enhanced blocks. The answer
     text is read from the rendered panel so it never drifts from the page. */
  function injectSchema(blocks) {
    var entities = [];
    blocks.forEach(function (block) {
      if ((block.getAttribute("data-schema") || "on").toLowerCase() === "off") return;
      block.querySelectorAll(".px-faq__item").forEach(function (item) {
        var q = (item.dataset.question || "").trim();
        var ansEl = item.querySelector(".px-faq__panel-inner");
        var a = ansEl ? ansEl.textContent.replace(/\s+/g, " ").trim() : "";
        if (!q || !a) return;
        entities.push({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a }
        });
      });
    });
    if (!entities.length) return;

    var schema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": entities };
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-px-faq-schema", "");
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  function init() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll('.px-faq[data-block="px-faq"]'));
    if (!blocks.length) return;
    blocks.forEach(enhance);
    injectSchema(blocks);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
