/* ============================================================
   PRAXIS THERAPIST — interactions (vanilla, no dependencies)
   header scroll · scroll reveal · mobile drawer · greek caps
   Deliberately minimal: no counters, no parallax, no video,
   no i18n (GR monolingual v1). "less is more".
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

  /* ---------- hero layout (center default) ---------- */
  var hero = document.querySelector(".hero");
  if (hero && !hero.getAttribute("data-layout")) hero.setAttribute("data-layout", "center");

  /* ---------- scroll reveal (IntersectionObserver, fade-up) ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- mobile drawer ---------- */
  var burger = document.querySelector(".burger");
  var drawer = document.querySelector(".drawer");
  if (burger && drawer) {
    var closeBtn = drawer.querySelector(".close");
    burger.addEventListener("click", function () { drawer.classList.add("open"); });
    if (closeBtn) closeBtn.addEventListener("click", function () { drawer.classList.remove("open"); });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { drawer.classList.remove("open"); });
    });
  }

  /* ============================================================
     GREEK UPPERCASE WITHOUT TONOS
     CSS text-transform:uppercase in Chrome/Blink does NOT strip the
     Greek tonos (acute accent). Firefox follows the spec; Chrome does
     not. Fix: strip tonos in JS via Unicode NFD decomposition, while
     KEEPING U+0308 (dialytika) so ϊ → Ϊ stays correct.
     (Shared utility also lives in praxis-blocks/utils/greek-caps.js.)
     ============================================================ */
  var TONOS_RE = new RegExp("[̀-̇̉-ͯ]", "g"); /* skips U+0308 */

  function stripTonosUC(s) {
    return s.normalize("NFD").replace(TONOS_RE, "").toUpperCase();
  }
  function processTextNodes(el) {
    Array.prototype.forEach.call(el.childNodes, function (n) {
      if (n.nodeType !== 3) return;          /* text nodes only */
      if (!n.textContent.trim()) return;
      n.textContent = stripTonosUC(n.textContent);
    });
  }

  /* Apply once to every element CSS uppercases (eyebrows, nav, buttons…). */
  function applyGreekCaps() {
    if (document.documentElement.lang && document.documentElement.lang !== "el") return;
    var sel = ".eyebrow, .navlink, .btn, .hero-eyebrow, .footer-col h4, .scroll-cue span, .contact-info .k";
    document.querySelectorAll(sel).forEach(function (el) {
      var cs = window.getComputedStyle(el);
      if (cs.textTransform === "uppercase") processTextNodes(el);
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyGreekCaps);
  } else {
    applyGreekCaps();
  }

})();
