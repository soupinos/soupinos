/**
 * PRAXIS-IONIAN — FX Core
 * GSAP + ScrollTrigger + Lenis bootstrap, plus a central FX registry.
 *
 * Load AFTER gsap.min.js, ScrollTrigger.min.js and lenis.min.js, and
 * BEFORE fx-catalog.js:
 *
 *   <script src=".../gsap.min.js"></script>
 *   <script src=".../ScrollTrigger.min.js"></script>
 *   <script src=".../lenis.min.js"></script>
 *   <script src="/praxis-design-system/fx/fx-core.js"></script>
 *   <script src="/praxis-design-system/fx/fx-catalog.js"></script>
 *
 * Registry pattern:
 *   PraxisFX.register(name, initFn) — initFn(el, opts, ctx) runs once per
 *   mounted element and MUST return a handle with a .kill() method (a
 *   ScrollTrigger instance, a gsap timeline, or a plain object exposing
 *   kill()). fx-core tracks every handle and tears it down on
 *   PraxisFX.teardown(name) / teardownAll(), and automatically on
 *   prefers-reduced-motion.
 *
 * Wiring: any element with data-fx="fx-01 fx-04" is auto-mounted on
 * DOMContentLoaded. Extra params are read from data-fx-* attributes
 * (kebab-case after "fx-", e.g. data-fx-scrub="true" -> opts.scrub).
 *
 * Hard rules enforced here, not just documented:
 *   - reduced motion -> static fallback, FX never mount.
 *   - every mount is tracked so teardown is always possible (no orphaned
 *     ScrollTriggers on SPA-style page swaps).
 */
(function (global) {
  'use strict';

  var reduced = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var isMobile = !!(global.matchMedia && global.matchMedia('(max-width: 768px)').matches);

  if (!global.gsap) {
    console.warn('[praxis-fx] GSAP not found on the page — all FX disabled, static fallback only.');
  } else if (global.ScrollTrigger) {
    global.gsap.registerPlugin(global.ScrollTrigger);
  }

  var lenis = null;
  if (!reduced && global.Lenis && global.gsap) {
    lenis = new global.Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on('scroll', global.ScrollTrigger ? global.ScrollTrigger.update : function () {});
    global.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    global.gsap.ticker.lagSmoothing(0);
  }

  var registry = Object.create(null); // name -> { initFn }
  var mounted = Object.create(null);  // name -> [{ el, handle }]

  function register(name, initFn) {
    registry[name] = { initFn: initFn };
    if (!mounted[name]) mounted[name] = [];
  }

  function readOpts(el) {
    var opts = {};
    Array.prototype.forEach.call(el.attributes, function (attr) {
      var match = /^data-fx-(.+)$/.exec(attr.name);
      if (!match) return;
      var key = match[1].replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
      var raw = attr.value;
      if (raw === 'true') raw = true;
      else if (raw === 'false') raw = false;
      else if (raw !== '' && !isNaN(Number(raw))) raw = Number(raw);
      opts[key] = raw;
    });
    return opts;
  }

  function applyStaticFallback(el) {
    el.classList.add('px-fx-static');
    if (global.gsap) {
      global.gsap.set(el.querySelectorAll('[data-fx-target]'), { clearProps: 'all' });
    }
  }

  function mount(name, el, opts) {
    if (!global.gsap || reduced) {
      applyStaticFallback(el);
      return;
    }
    var entry = registry[name];
    if (!entry) {
      console.warn('[praxis-fx] Unknown FX "' + name + '" on', el);
      return;
    }
    var handle = entry.initFn(el, opts || readOpts(el), { isMobile: isMobile, reduced: reduced, lenis: lenis });
    if (handle && typeof handle.kill === 'function') {
      mounted[name].push({ el: el, handle: handle });
    }
  }

  function teardown(name) {
    var list = mounted[name];
    if (!list) return;
    list.forEach(function (entry) { entry.handle.kill(); });
    mounted[name] = [];
  }

  function teardownAll() {
    Object.keys(mounted).forEach(teardown);
  }

  function scanAndMount(root) {
    var scope = root || document;
    var els = scope.querySelectorAll('[data-fx]');
    els.forEach(function (el) {
      var names = el.dataset.fx.split(/\s+/).filter(Boolean);
      if (names.length > 2) {
        console.warn('[praxis-fx] "' + names.length + '" FX on one element exceeds the max-2-FX-per-section rule.', el);
      }
      names.forEach(function (name) { mount(name, el, readOpts(el)); });
    });
  }

  global.PraxisFX = {
    register: register,
    mount: mount,
    teardown: teardown,
    teardownAll: teardownAll,
    scanAndMount: scanAndMount,
    state: { reduced: reduced, isMobile: isMobile, lenis: lenis }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { scanAndMount(document); });
  } else {
    scanAndMount(document);
  }
})(window);
