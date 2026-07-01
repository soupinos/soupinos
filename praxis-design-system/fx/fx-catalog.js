/**
 * PRAXIS-IONIAN — FX Catalog
 * FX-01 … FX-12, registered against the fx-core.js registry.
 * Load AFTER fx-core.js.
 *
 * Hard rules (see docs/fx-catalog.md):
 *   1. One transform channel per element. A single FX may animate
 *      multiple transform properties on ONE element in ONE tween (that's
 *      one channel, one owner) — but two different FX must never both
 *      drive transform on the same element. Compose by targeting
 *      distinct child elements ([data-fx-target="bg"], ["fg"], …)
 *      instead of stacking tweens on one node.
 *   2. Every ScrollTrigger/timeline/listener created here is returned as
 *      a handle with .kill() so fx-core can tear it down centrally.
 *   3. prefers-reduced-motion is handled by fx-core (initFn never runs);
 *      each block's CSS must still look correct with no FX applied.
 *   4. Parallax-class effects reduce or disable amplitude on mobile
 *      (ctx.isMobile).
 */
(function (global) {
  'use strict';

  var gsap = global.gsap;
  var ScrollTrigger = global.ScrollTrigger;
  if (!gsap || !global.PraxisFX) return;

  function targets(el, name) {
    var found = el.querySelectorAll('[data-fx-target="' + name + '"]');
    return found.length ? found : [el];
  }

  /* Lightweight char/word splitter — no SplitText plugin dependency. */
  function splitEl(el, mode) {
    if (el.dataset.pxSplit === '1') return el.querySelectorAll('.px-split-unit');
    var text = el.textContent;
    var units = mode === 'word' ? text.split(/(\s+)/) : text.split('');
    el.textContent = '';
    var frag = document.createDocumentFragment();
    units.forEach(function (unit) {
      if (mode === 'char' && unit === ' ') {
        frag.appendChild(document.createTextNode(' '));
        return;
      }
      var span = document.createElement('span');
      span.className = 'px-split-unit';
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, opacity';
      span.textContent = unit;
      frag.appendChild(span);
    });
    el.appendChild(frag);
    el.dataset.pxSplit = '1';
    return el.querySelectorAll('.px-split-unit');
  }

  /* ── FX-01 · reveal-mask ─────────────────────────────────────────
     Clip-path wipe reveal on scroll-into-view. One channel: clip-path. */
  global.PraxisFX.register('fx-01', function (el, opts) {
    var els = targets(el, 'reveal');
    gsap.set(els, { clipPath: 'inset(0 0 100% 0)' });
    return ScrollTrigger.create({
      trigger: el,
      start: opts.start || 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(els, {
          clipPath: 'inset(0 0 0% 0)',
          duration: opts.duration || 1.1,
          ease: 'cubic-bezier(.16,1,.3,1)',
          stagger: els.length > 1 ? 0.08 : 0
        });
      }
    });
  });

  /* ── FX-02 · parallax-depth ──────────────────────────────────────
     Background/media layer scrubs at a different rate than scroll.
     One channel: yPercent. Reduced amplitude on mobile. */
  global.PraxisFX.register('fx-02', function (el, opts, ctx) {
    var layer = targets(el, 'parallax')[0];
    var amount = ctx.isMobile ? (opts.amount || 12) * 0.4 : (opts.amount || 12);
    gsap.set(layer, { yPercent: -amount / 2 });
    return ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.to(layer, { yPercent: amount / 2, ease: 'none' })
    });
  });

  /* ── FX-03 · pin-scrub-text ──────────────────────────────────────
     Pins the section; a statement scales/fades on scroll scrub.
     One channel: scale (opacity travels in the same tween, same
     owner — not a second channel). */
  global.PraxisFX.register('fx-03', function (el, opts) {
    var text = targets(el, 'statement')[0];
    gsap.set(text, { scale: 0.82, opacity: 0.35, transformOrigin: '50% 50%' });
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=' + (opts.distance || 100) + '%',
        pin: true,
        scrub: true
      }
    });
    tl.to(text, { scale: 1, opacity: 1, ease: 'none' });
    return tl.scrollTrigger;
  });

  /* ── FX-04 · split-char-in ────────────────────────────────────────
     Headline splits into characters, staggered rise+fade on enter.
     One channel per span: y (+opacity, same tween). */
  global.PraxisFX.register('fx-04', function (el, opts) {
    var target = targets(el, 'split')[0];
    var units = splitEl(target, opts.mode || 'char');
    gsap.set(units, { yPercent: 110, opacity: 0 });
    return ScrollTrigger.create({
      trigger: el,
      start: opts.start || 'top 75%',
      once: true,
      onEnter: function () {
        gsap.to(units, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'cubic-bezier(.16,1,.3,1)',
          stagger: opts.stagger || 0.02
        });
      }
    });
  });

  /* ── FX-05 · magnetic-cta ─────────────────────────────────────────
     Cursor-magnetic pull on a button. Desktop only. One channel: x/y
     via quickTo (single owner per axis, on the trigger element only). */
  global.PraxisFX.register('fx-05', function (el, opts, ctx) {
    if (ctx.isMobile || matchMedia('(pointer: coarse)').matches) {
      return { kill: function () {} };
    }
    var strength = opts.strength || 0.35;
    var xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    var yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

    function onMove(e) {
      var r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    }
    function onLeave() { xTo(0); yTo(0); }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return {
      kill: function () {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        gsap.set(el, { x: 0, y: 0 });
      }
    };
  });

  /* ── FX-06 · image-kenburns ───────────────────────────────────────
     Slow continuous scale on a media element while its section is in
     view. One channel: scale. */
  global.PraxisFX.register('fx-06', function (el, opts, ctx) {
    var media = targets(el, 'kenburns')[0];
    var to = ctx.isMobile ? 1.06 : (opts.scale || 1.12);
    gsap.set(media, { scale: 1.0, transformOrigin: '50% 50%' });
    var tween = gsap.to(media, {
      scale: to,
      duration: opts.duration || 8,
      ease: 'none',
      paused: true
    });
    return ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: function () { tween.play(); },
      onEnterBack: function () { tween.play(); },
      onLeave: function () { tween.pause(); },
      onLeaveBack: function () { tween.pause(); }
    });
  });

  /* ── FX-07 · stagger-grid ─────────────────────────────────────────
     Grid/list children fade+rise in, staggered, on enter.
     One channel per child: y (+opacity, same tween). */
  global.PraxisFX.register('fx-07', function (el, opts) {
    var items = targets(el, 'item');
    gsap.set(items, { y: 28, opacity: 0 });
    return ScrollTrigger.create({
      trigger: el,
      start: opts.start || 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'cubic-bezier(.16,1,.3,1)',
          stagger: opts.stagger || 0.08
        });
      }
    });
  });

  /* ── FX-08 · counter-count-up ─────────────────────────────────────
     Numeric text counts up to its data-fx-to value on enter. No
     transform channel at all — text content only. */
  global.PraxisFX.register('fx-08', function (el) {
    var nodes = targets(el, 'counter');
    return ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        nodes.forEach(function (node) {
          var to = parseFloat(node.dataset.fxTo || node.textContent) || 0;
          var decimals = (String(to).split('.')[1] || '').length;
          var proxy = { val: 0 };
          gsap.to(proxy, {
            val: to,
            duration: 1.6,
            ease: 'cubic-bezier(.16,1,.3,1)',
            onUpdate: function () { node.textContent = proxy.val.toFixed(decimals); }
          });
        });
      }
    });
  });

  /* ── FX-09 · horizontal-scrub ─────────────────────────────────────
     Pinned section, a horizontal track scrubs left as the user
     scrolls down. One channel: xPercent. */
  global.PraxisFX.register('fx-09', function (el, opts, ctx) {
    var track = targets(el, 'track')[0];
    var distance = ctx.isMobile ? 60 : (opts.distance || 100);
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=' + (distance * 3) + '%',
        pin: true,
        scrub: true
      }
    });
    tl.to(track, { xPercent: -distance, ease: 'none' });
    return tl.scrollTrigger;
  });

  /* ── FX-10 · sticky-stack ─────────────────────────────────────────
     Cards pin in sequence and stack with a scale step as the next
     card arrives. One channel per card: scale (+y offset, same tween). */
  global.PraxisFX.register('fx-10', function (el, opts) {
    var cards = targets(el, 'card');
    var triggers = [];
    cards.forEach(function (card, i) {
      gsap.set(card, { transformOrigin: '50% 0%' });
      triggers.push(ScrollTrigger.create({
        trigger: card,
        start: 'top top+=' + (i * (opts.offset || 16)),
        end: 'bottom top',
        pin: i < cards.length - 1,
        pinSpacing: false,
        scrub: true,
        animation: gsap.to(card, { scale: 0.94, ease: 'none' })
      }));
    });
    return {
      kill: function () { triggers.forEach(function (t) { t.kill(); }); }
    };
  });

  /* ── FX-11 · cursor-glow-trail ─────────────────────────────────────
     A soft accent glow follows the cursor inside the section. Desktop
     only. One channel: x/y on the glow element (not the section). */
  global.PraxisFX.register('fx-11', function (el, opts, ctx) {
    if (ctx.isMobile || matchMedia('(pointer: coarse)').matches) {
      return { kill: function () {} };
    }
    var glow = targets(el, 'glow')[0];
    var xTo = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3' });
    var yTo = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3' });
    function onMove(e) {
      var r = el.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    }
    el.addEventListener('mousemove', onMove);
    return { kill: function () { el.removeEventListener('mousemove', onMove); } };
  });

  /* ── FX-12 · modal-fade-scale ──────────────────────────────────────
     Click-triggered modal open/close. Not scroll-based. One channel
     per element: backdrop opacity, panel scale (+opacity, same tween). */
  global.PraxisFX.register('fx-12', function (el) {
    var trigger = el;
    var modalSel = trigger.getAttribute('data-fx-modal');
    var modal = modalSel ? document.querySelector(modalSel) : null;
    if (!modal) return { kill: function () {} };
    var backdrop = modal.querySelector('[data-fx-target="backdrop"]') || modal;
    var panel = modal.querySelector('[data-fx-target="panel"]') || modal.firstElementChild;

    gsap.set(modal, { display: 'none' });
    gsap.set(backdrop, { opacity: 0 });
    gsap.set(panel, { opacity: 0, scale: 0.92 });

    function open() {
      gsap.set(modal, { display: 'flex' });
      gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power1.out' });
      gsap.to(panel, { opacity: 1, scale: 1, duration: 0.45, ease: 'cubic-bezier(.16,1,.3,1)' });
      modal.setAttribute('aria-hidden', 'false');
      document.addEventListener('keydown', onKey);
    }
    function close() {
      gsap.to(panel, { opacity: 0, scale: 0.92, duration: 0.3, ease: 'power1.in' });
      gsap.to(backdrop, {
        opacity: 0, duration: 0.3, ease: 'power1.in',
        onComplete: function () { gsap.set(modal, { display: 'none' }); }
      });
      modal.setAttribute('aria-hidden', 'true');
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    function onTriggerClick() { open(); }
    function onModalClick(e) { if (e.target === modal || e.target === backdrop) close(); }

    trigger.addEventListener('click', onTriggerClick);
    modal.addEventListener('click', onModalClick);
    modal.querySelectorAll('[data-fx-close]').forEach(function (btn) {
      btn.addEventListener('click', close);
    });

    return {
      kill: function () {
        trigger.removeEventListener('click', onTriggerClick);
        modal.removeEventListener('click', onModalClick);
        document.removeEventListener('keydown', onKey);
      }
    };
  });
})(window);
