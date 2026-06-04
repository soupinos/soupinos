/* ============================================================
   LEFKIMMI LINES — interactions (vanilla)
   header scroll · count-up stats · scroll reveal · drawer ·
   hero-layout (tweakable) · video fallback
   ============================================================ */
(function () {
  "use strict";

  /* ---------- header shrink on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- hero layout (center = brief default / left = cinematic) ---------- */
  var hero = document.querySelector(".hero");
  function applyHeroLayout(v) {
    if (hero) hero.setAttribute("data-layout", v === "left" ? "left" : "center");
  }
  var savedLayout = "center";
  try { savedLayout = localStorage.getItem("ll_hero_layout") || "center"; } catch (e) {}
  applyHeroLayout(savedLayout);
  window.LLsetHeroLayout = function (v) {
    applyHeroLayout(v);
    try { localStorage.setItem("ll_hero_layout", v); } catch (e) {}
  };

  /* ---------- video graceful fallback ---------- */
  document.querySelectorAll("video.hero-video").forEach(function (v) {
    function fb() {
      if (v.dataset.fell) return;
      v.dataset.fell = "1";
      var img = v.parentNode.querySelector("img.kb");
      if (img) { img.style.display = "block"; v.style.display = "none"; }
    }
    v.addEventListener("error", fb);
    v.querySelectorAll("source").forEach(function (s) { s.addEventListener("error", fb); });
    setTimeout(function () { if (v.readyState === 0) fb(); }, 4000);
  });

  /* ---------- count-up stats ---------- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion:reduce)");
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced.matches) {
      el.textContent = target + suffix;
      return;
    }
    var dur = 1000, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- scroll reveal + trigger count-up ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      if (e.target.hasAttribute("data-count") && !e.target.dataset.done) {
        e.target.dataset.done = "1";
        countUp(e.target);
      }
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(".reveal, [data-count]").forEach(function (el) { io.observe(el); });

  /* ---------- mobile drawer ---------- */
  var burger = document.querySelector(".burger");
  var drawer = document.querySelector(".drawer");
  if (burger && drawer) {
    burger.addEventListener("click", function () { drawer.classList.add("open"); });
    drawer.querySelector(".close").addEventListener("click", function () { drawer.classList.remove("open"); });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { drawer.classList.remove("open"); });
    });
  }

  /* ---------- defer map iframe until after load (non-blocking) ---------- */
  function loadMap() {
    var f = document.querySelector(".map-card iframe[data-src]");
    if (f) f.setAttribute("src", f.getAttribute("data-src"));
  }
  if (document.readyState === "complete") setTimeout(loadMap, 400);
  else window.addEventListener("load", function () { setTimeout(loadMap, 400); });

  /* ---------- subtle parallax (hero media + 2 offset photos) ---------- */
  var mqDesk   = window.matchMedia("(min-width:861px)");
  var mqMotion = window.matchMedia("(prefers-reduced-motion: no-preference)");
  function pxOn() { return mqDesk.matches && mqMotion.matches; }

  var pxItems = [];
  function setupParallax() {
    document.body.classList.toggle("px-on", pxOn());
    var media = document.querySelector(".hero .media");
    var phs = document.querySelectorAll(".offset .ph img");
    pxItems = [];
    if (pxOn()) {
      if (media) pxItems.push({ el: media, type: "hero" });
      phs.forEach(function (img) { pxItems.push({ el: img, type: "ph" }); });
    } else {
      if (media) media.style.transform = "";
      phs.forEach(function (img) { img.style.objectPosition = ""; });
    }
  }
  var pxTick = false;
  function pxFrame() {
    pxTick = false;
    if (!pxItems.length) return;
    var vh = window.innerHeight;
    pxItems.forEach(function (it) {
      var r = it.el.getBoundingClientRect();
      if (it.type === "hero") {
        var prog = Math.min(Math.max(-r.top / (r.height || vh), 0), 1);
        it.el.style.transform = "translate3d(0," + (prog * 8).toFixed(2) + "%,0)";
      } else {
        var center = r.top + r.height / 2;
        var rel = (center - vh / 2) / vh;
        var pos = Math.max(34, Math.min(66, 50 + rel * 14));
        it.el.style.objectPosition = "50% " + pos.toFixed(1) + "%";
      }
    });
  }
  function onPxScroll() { if (!pxTick) { pxTick = true; requestAnimationFrame(pxFrame); } }
  setupParallax();
  window.addEventListener("scroll", onPxScroll, { passive: true });
  window.addEventListener("resize", function () { setupParallax(); pxFrame(); }, { passive: true });
  if (mqMotion.addEventListener) mqMotion.addEventListener("change", function () { setupParallax(); pxFrame(); });
  pxFrame();

  /* =================================================================
     FIX 1 — GREEK UPPERCASE WITHOUT TONOS
     CSS text-transform:uppercase in Chrome/Blink does NOT remove Greek
     tonos (acute accent) even when html[lang="el"]. Firefox follows the
     CSS spec; Chrome does not. Fix: strip tonos in JS via Unicode NFD.

     NFD decomposes e.g. "ά" → "α" (U+03B1) + combining acute (U+0301).
     We then remove combining marks U+0300–U+0307 and U+0309–U+036F,
     intentionally KEEPING U+0308 (diaeresis/dialytika) so that
     ϊ (iota-diaeresis) uppercase correctly becomes Ϊ, not just Ι.

     Block library note: this utility belongs in praxis-blocks/utils/
     as greek-caps.js so future sites can import it.
     ================================================================= */

  /* Build regex using explicit codepoints to avoid encoding ambiguity. */
  var TONOS_RE = (function () {
    /* Combine two ranges into one character class:
       [̀-̇̉-ͯ]  (skips U+0308 diaeresis) */
    return new RegExp(
      "[̀-̇̉-ͯ]", "g"
    );
  }());

  function stripTonosUC(s) {
    return s.normalize("NFD").replace(TONOS_RE, "").toUpperCase();
  }

  /* Process direct text nodes of el — does not recurse into child elements. */
  function processTextNodes(el) {
    Array.prototype.forEach.call(el.childNodes, function (n) {
      if (n.nodeType !== 3) return;
      var t = n.textContent;
      if (!t.trim()) return;
      n.textContent = stripTonosUC(t);
    });
  }

  /* One-time fix for hardcoded Greek text that CSS uppercases but is never
     replaced by i18n.js (no data-i18n attribute). */
  document.querySelectorAll(".lk-txt .ln2").forEach(processTextNodes);

  /* Called after every i18n language switch. Only acts when lang="el"
     because other languages do not have Greek-specific tonos in their text. */
  function applyGreekCaps() {
    if (document.documentElement.lang !== "el") return;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var cs = window.getComputedStyle(el);
      if (cs.textTransform !== "uppercase") return;
      processTextNodes(el);
    });
  }

  /* Patch window.LLi18n.apply (i18n.js exposes it before app.js runs). */
  (function patchI18n() {
    if (!window.LLi18n) return;
    var orig = window.LLi18n.apply;
    window.LLi18n.apply = function (lang) {
      orig.call(window.LLi18n, lang);
      applyGreekCaps();
    };
    applyGreekCaps(); /* handle current state set by i18n init */
  }());

})();
