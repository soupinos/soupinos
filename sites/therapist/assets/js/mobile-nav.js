/* praxis-therapist — mobile-nav.js v3
   Hamburger menu: slide-in panel, dropdown, GSAP sine.out, focus trap, a11y.
   Deps: gsap (optional). */
(function () {
  'use strict';
  var burger  = document.getElementById('nav-burger');
  var panel   = document.getElementById('nav-panel');
  var overlay = document.getElementById('nav-overlay');
  var closeBtn= document.getElementById('nav-close');
  var inner   = document.getElementById('nav-panel-inner');
  if (!burger || !panel) return;
  var hasGSAP = window.gsap;
  var reduce  = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var lastFocus = null;
  var FOCUS = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function openMenu() {
    lastFocus = document.activeElement;
    panel.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('px-no-scroll');
    if (hasGSAP && !reduce) {
      gsap.killTweensOf([inner, overlay]);
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: .4, ease: 'sine.out' });
      gsap.fromTo(inner,   { xPercent: 100 }, { xPercent: 0, duration: .5, ease: 'sine.out' });
      var links = inner.querySelectorAll('.nav-panel__list li');
      gsap.set(links, { opacity: 0, x: 18 });
      gsap.to(links, { opacity: 1, x: 0, duration: .5, ease: 'power2.out', stagger: .055, delay: .18 });
    } else {
      overlay.style.opacity = '1';
      inner.style.transform = 'translateX(0)';
      inner.querySelectorAll('.nav-panel__list li')
           .forEach(function (li) { li.style.opacity = '1'; });
    }
    setTimeout(function () { var f = panel.querySelector(FOCUS); if (f) f.focus(); }, 70);
  }

  function closeMenu(returnFocus) {
    burger.setAttribute('aria-expanded', 'false');
    function done() {
      panel.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('px-no-scroll');
      if (returnFocus !== false && lastFocus && lastFocus.focus) lastFocus.focus();
    }
    if (hasGSAP && !reduce) {
      gsap.to(inner,   { xPercent: 100, duration: .35, ease: 'power2.in' });
      gsap.to(overlay, { opacity: 0, duration: .35, ease: 'sine.in', onComplete: done });
    } else {
      inner.style.transform = 'translateX(100%)';
      overlay.style.opacity = '0';
      done();
    }
  }

  burger.addEventListener('click', openMenu);
  if (closeBtn)  closeBtn.addEventListener('click', function () { closeMenu(); });
  if (overlay)   overlay.addEventListener('click',  function () { closeMenu(); });

  /* desktop dropdown — hover via CSS; click/keyboard toggle for reliability + a11y */
  var dd        = document.querySelector('.nav-dd');
  var ddTrigger = dd && dd.querySelector('.nav-dd__trigger');
  if (dd && ddTrigger) {
    ddTrigger.addEventListener('click', function (e) {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        var open = dd.classList.toggle('is-open');
        ddTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    });
    dd.addEventListener('focusout', function () {
      setTimeout(function () {
        if (!dd.contains(document.activeElement)) {
          dd.classList.remove('is-open');
          ddTrigger.setAttribute('aria-expanded', 'false');
        }
      }, 10);
    });
    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target)) {
        dd.classList.remove('is-open');
        ddTrigger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dd.classList.contains('is-open')) {
        dd.classList.remove('is-open');
        ddTrigger.setAttribute('aria-expanded', 'false');
        ddTrigger.focus();
      }
    });
  }

  /* focus trap + Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.getAttribute('aria-hidden') === 'false') { closeMenu(); return; }
    if (e.key === 'Tab' && panel.getAttribute('aria-hidden') === 'false') {
      var els = Array.prototype.slice.call(panel.querySelectorAll(FOCUS));
      if (!els.length) return;
      var first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* close on link click → smooth scroll */
  panel.querySelectorAll('.nav-panel__list a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      closeMenu(false);
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        setTimeout(function () {
          var t = document.querySelector(href);
          if (t) t.scrollIntoView({ behavior: 'smooth' });
        }, 360);
      }
    });
  });

  /* Ραντεβού → open modal after panel closes */
  panel.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      closeMenu(false);
      setTimeout(function () {
        var ev = new CustomEvent('px:open-modal');
        document.dispatchEvent(ev);
      }, 400);
    });
  });
})();
