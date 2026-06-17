/* ============================================================
   BLOCK #34 — px-nav-mobile (drawer)
   Vanilla, IIFE. GSAP slide if window.gsap is present, otherwise the
   CSS [aria-hidden] fallback handles open/close. Generalised from the
   proven sites/therapist mobile-nav.js.

   - Hamburger → slide-in panel + overlay, body scroll lock.
   - Focus trap + Escape + overlay/close-button dismissal.
   - Staggered link entrance (GSAP only).
   - The panel CTA (or any [data-open-modal] inside the panel) closes
     the menu, then dispatches  new CustomEvent('px:open-modal')  on
     document. THIS BLOCK NEVER REFERENCES A MODAL — block #35 listens.
     34 + 35 are decoupled through this event name alone.

   Required ids: px-mnav-burger, px-mnav-panel, px-mnav-inner,
   px-mnav-overlay, px-mnav-close.
   ============================================================ */
(function () {
  "use strict";

  var burger  = document.getElementById("px-mnav-burger");
  var panel   = document.getElementById("px-mnav-panel");
  var inner   = document.getElementById("px-mnav-inner");
  var overlay = document.getElementById("px-mnav-overlay");
  var closeBtn= document.getElementById("px-mnav-close");
  if (!burger || !panel || !inner) return;

  var root    = panel.closest(".px-mnav") || document;
  var side    = (root.getAttribute && root.getAttribute("data-side")) === "left" ? "left" : "right";
  var offEdge = side === "left" ? -100 : 100;

  var hasGSAP = window.gsap;
  var reduce  = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var lastFocus = null;
  var FOCUS = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function openMenu() {
    lastFocus = document.activeElement;
    panel.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.classList.add("px-no-scroll");
    if (hasGSAP && !reduce) {
      gsap.killTweensOf([inner, overlay]);
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: .4, ease: "sine.out" });
      gsap.fromTo(inner,   { xPercent: offEdge }, { xPercent: 0, duration: .5, ease: "sine.out" });
      var links = inner.querySelectorAll(".px-mnav__list li");
      gsap.set(links, { opacity: 0, x: side === "left" ? -18 : 18 });
      gsap.to(links, { opacity: 1, x: 0, duration: .5, ease: "power2.out", stagger: .055, delay: .18 });
    }
    setTimeout(function () { var f = panel.querySelector(FOCUS); if (f) f.focus(); }, 70);
  }

  function closeMenu(returnFocus) {
    burger.setAttribute("aria-expanded", "false");
    function done() {
      panel.setAttribute("aria-hidden", "true");
      document.body.classList.remove("px-no-scroll");
      if (returnFocus !== false && lastFocus && lastFocus.focus) lastFocus.focus();
    }
    if (hasGSAP && !reduce) {
      gsap.to(inner,   { xPercent: offEdge, duration: .35, ease: "power2.in" });
      gsap.to(overlay, { opacity: 0, duration: .35, ease: "sine.in", onComplete: done });
    } else {
      done();
    }
  }

  burger.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", function () { closeMenu(); });
  if (overlay)  overlay.addEventListener("click",  function () { closeMenu(); });

  /* focus trap + Escape */
  document.addEventListener("keydown", function (e) {
    if (panel.getAttribute("aria-hidden") !== "false") return;
    if (e.key === "Escape") { closeMenu(); return; }
    if (e.key === "Tab") {
      var els = Array.prototype.slice.call(panel.querySelectorAll(FOCUS));
      if (!els.length) return;
      var first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* close on link click → smooth scroll to in-page targets */
  panel.querySelectorAll(".px-mnav__list a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href");
      closeMenu(false);
      if (href && href.charAt(0) === "#" && href.length > 1) {
        e.preventDefault();
        setTimeout(function () {
          var t = document.querySelector(href);
          if (t) t.scrollIntoView({ behavior: "smooth" });
        }, 360);
      }
    });
  });

  /* CTA → close menu, then fire px:open-modal (DECOUPLED from block #35) */
  panel.querySelectorAll("[data-open-modal]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      closeMenu(false);
      setTimeout(function () {
        document.dispatchEvent(new CustomEvent("px:open-modal"));
      }, 400);
    });
  });
})();
