/* ============================================================
   BLOCK #35 — px-contact-modal
   Vanilla, IIFE. GSAP open/close if window.gsap is present, else
   the CSS [aria-hidden] fallback. Generalised from the proven
   sites/therapist contact-modal.js.

   OPEN TRIGGERS (decoupled):
     • document event  'px:open-modal'   ← dispatched by block #34
     • any [data-open-modal] click       ← e.g. block #30 banner CTA
   This block only LISTENS; it never knows who opens it.

   CLOSE: overlay click, [data-modal-close], Escape.
   FORM: honeypot (px_website) + per-field validation. Submits via
   POST to pxModal.url with action+nonce when localized (WordPress);
   without pxModal it shows the success state (static/demo mode).

   Desktop → scale-in popup; mobile (≤768px) → slide-up bottom-sheet.

   Required ids (defaults; override via data-* if needed):
     #px-contact-modal, #px-contact-form
   ============================================================ */
(function () {
  "use strict";

  var modal = document.getElementById("px-contact-modal");
  if (!modal) return;

  var dialog  = modal.querySelector(".px-modal__dialog");
  var overlay = modal.querySelector(".px-modal__overlay");
  var form    = modal.querySelector(".px-modal__form");
  var success = modal.querySelector(".px-modal__success");
  var errEl   = form ? form.querySelector(".px-form-error:not(.px-field-error)") : null;

  var hasGSAP = window.gsap;
  var reduce  = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var lastFocus = null;
  var FOCUS = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function isMobile() { return window.matchMedia("(max-width:768px)").matches; }

  /* ── open / close ─────────────────────────────────────────────── */
  function openModal() {
    if (modal.getAttribute("aria-hidden") === "false") return;
    lastFocus = document.activeElement;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("px-no-scroll");
    if (hasGSAP && !reduce) {
      gsap.killTweensOf([dialog, overlay]);
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: .4, ease: "sine.out" });
      if (isMobile()) {
        gsap.fromTo(dialog, { yPercent: 100 }, { yPercent: 0, duration: .5, ease: "power2.out" });
      } else {
        gsap.fromTo(dialog, { scale: .95, opacity: 0 }, { scale: 1, opacity: 1, duration: .4, ease: "sine.out" });
      }
    }
    setTimeout(function () { var f = modal.querySelector(FOCUS); if (f) f.focus(); }, 80);
  }

  function closeModal() {
    function done() {
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("px-no-scroll");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    if (hasGSAP && !reduce) {
      if (isMobile()) { gsap.to(dialog, { yPercent: 100, duration: .35, ease: "power2.in" }); }
      else            { gsap.to(dialog, { scale: .96, opacity: 0, duration: .3, ease: "sine.in" }); }
      gsap.to(overlay, { opacity: 0, duration: .35, ease: "sine.in", onComplete: done });
    } else {
      done();
    }
  }

  /* ── triggers (decoupled) ─────────────────────────────────────── */
  document.addEventListener("px:open-modal", openModal);
  document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
    /* skip triggers inside block #34's panel — it dispatches the event itself */
    if (btn.closest(".px-mnav")) return;
    btn.addEventListener("click", function (e) { e.preventDefault(); openModal(); });
  });
  modal.querySelectorAll("[data-modal-close]").forEach(function (btn) {
    btn.addEventListener("click", function (e) { e.preventDefault(); closeModal(); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
  });

  if (!form) return;

  /* ── form ──────────────────────────────────────────────────────── */
  var fName  = form.querySelector('[name="name"]');
  var fPhone = form.querySelector('[name="phone"]');
  var fEmail = form.querySelector('[name="email"]');
  var eName  = document.getElementById("px-err-name");
  var ePhone = document.getElementById("px-err-phone");
  var eEmail = document.getElementById("px-err-email");
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setField(input, errNode, bad) {
    if (input) input.classList.toggle("is-invalid", !!bad);
    if (errNode) errNode.hidden = !bad;
    if (input) {
      if (bad) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
  }
  function clearAll() {
    setField(fName, eName, false);
    setField(fPhone, ePhone, false);
    setField(fEmail, eEmail, false);
    if (errEl) errEl.hidden = true;
  }
  [[fName, eName], [fPhone, ePhone], [fEmail, eEmail]].forEach(function (pair) {
    if (!pair[0]) return;
    pair[0].addEventListener("input", function () {
      if (pair[1] && !pair[1].hidden) setField(pair[0], pair[1], false);
      if (errEl && !errEl.hidden) errEl.hidden = true;
    });
  });

  function showErr(msg) { if (errEl) { errEl.textContent = msg; errEl.hidden = false; } }

  function showSuccess() {
    form.hidden = true;
    if (!success) return;
    success.hidden = false;
    if (hasGSAP && !reduce) {
      var circle = success.querySelector(".px-check__circle");
      var mark   = success.querySelector(".px-check__mark");
      gsap.fromTo(success, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .6, ease: "power2.out" });
      [circle, mark].forEach(function (p) {
        if (!p) return;
        try { var len = p.getTotalLength(); gsap.set(p, { strokeDasharray: len, strokeDashoffset: len }); } catch (e) {}
      });
      if (circle) gsap.to(circle, { strokeDashoffset: 0, duration: .7, ease: "sine.out" });
      if (mark)   gsap.to(mark,   { strokeDashoffset: 0, duration: .5, ease: "power2.out", delay: .45 });
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearAll();

    /* honeypot — silently succeed for bots */
    var hp = form.querySelector('[name="px_website"]');
    if (hp && hp.value) { showSuccess(); return; }

    var name  = fName  ? fName.value.trim()  : "";
    var phone = fPhone ? fPhone.value.trim() : "";
    var email = fEmail ? fEmail.value.trim() : "";
    var ok = true;

    if (!name) { setField(fName, eName, true); ok = false; }
    var phoneValid = phone.replace(/\D/g, "").length >= 9;
    if (phone && !phoneValid) { setField(fPhone, ePhone, true); ok = false; }
    var emailValid = EMAIL_RE.test(email);
    if (email && !emailValid) { setField(fEmail, eEmail, true); ok = false; }
    if (!(phone && phoneValid) && !(email && emailValid)) {
      showErr("Συμπλήρωσε τηλέφωνο ή email — τουλάχιστον ένα από τα δύο.");
      ok = false;
    }
    if (!ok) {
      var firstBad = form.querySelector(".is-invalid");
      if (firstBad && firstBad.focus) firstBad.focus();
      return;
    }

    /* No WordPress endpoint localized → static/demo success */
    if (!(window.pxModal && window.pxModal.url)) { showSuccess(); return; }

    var btn = form.querySelector(".px-modal__submit");
    if (btn) btn.disabled = true;

    var fd = new FormData(form);
    if (window.pxModal.nonce) fd.set("px_nonce", window.pxModal.nonce);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", window.pxModal.url);
    xhr.onload = function () {
      if (btn) btn.disabled = false;
      try {
        var res = JSON.parse(xhr.responseText);
        if (res.success) showSuccess();
        else showErr((res.data && res.data.msg) ? res.data.msg : "Σφάλμα αποστολής. Δοκίμασε ξανά.");
      } catch (err) {
        showErr("Σφάλμα αποστολής. Δοκίμασε ξανά.");
      }
    };
    xhr.onerror = function () {
      if (btn) btn.disabled = false;
      showErr("Σφάλμα σύνδεσης. Δοκίμασε ξανά.");
    };
    xhr.send(fd);
  });
})();
