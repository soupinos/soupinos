/* ============================================================
   BLOCK #32 — px-key-facts (optional count-up)
   Vanilla, IIFE, zero deps.

   Only active when .px-kf has data-count="on". For each .px-kf__fig
   with data-count-to, animates the number from 0 → target once it
   scrolls into view (IntersectionObserver), easeOutQuart. Any
   prefix/suffix text in the figure is preserved.

   Graceful: no data-count="on", no IntersectionObserver, or
   prefers-reduced-motion → the final value (already in the markup)
   is left untouched. The block is fully readable without this file.

   Markup contract:
     <div class="px-kf" data-count="on">
       <span class="px-kf__fig" data-count-to="12">12</span>+ έτη
     </div>
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function decimals(str) {
    var m = String(str).match(/[.,](\d+)$/);
    return m ? m[1].length : 0;
  }

  function format(value, dec) {
    return dec > 0 ? value.toFixed(dec).replace(".", ",") : Math.round(value).toString();
  }

  function animate(fig) {
    var raw = fig.getAttribute("data-count-to");
    var target = parseFloat(String(raw).replace(",", "."));
    if (isNaN(target)) return;
    var dec = decimals(raw);

    /* preserve any prefix/suffix the figure wraps around the number */
    var full = fig.textContent;
    var numMatch = full.match(/[\d.,]+/);
    var prefix = numMatch ? full.slice(0, numMatch.index) : "";
    var suffix = numMatch ? full.slice(numMatch.index + numMatch[0].length) : "";

    var DURATION = 1500;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / DURATION);
      var val = easeOutQuart(p) * target;
      fig.textContent = prefix + format(val, dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else fig.textContent = prefix + format(target, dec) + suffix;
    }
    requestAnimationFrame(step);
  }

  function init() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll('.px-kf[data-count="on"]'));
    if (!blocks.length) return;

    var figs = [];
    blocks.forEach(function (b) {
      b.querySelectorAll(".px-kf__fig[data-count-to]").forEach(function (f) { figs.push(f); });
    });
    if (!figs.length) return;

    if (reduce || !("IntersectionObserver" in window)) return; /* leave final values as authored */

    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    figs.forEach(function (f) { io.observe(f); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
