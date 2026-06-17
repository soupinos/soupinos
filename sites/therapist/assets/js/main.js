/* praxis-therapist — main.js v3
   GSAP choreography (calm therapist rhythm) + nav scroll + botanical animations.
   Deps: gsap, ScrollTrigger (enqueued before this). */
(function () {
  'use strict';

  /* ── NAV SCROLL ── */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── SPLIT WORDS HELPER ── */
  function pxSplitWords(el) {
    var text = el.textContent;
    el.textContent = '';
    var frag = document.createDocumentFragment();
    text.split(/(\s+)/).forEach(function (tok) {
      if (tok.trim() === '') { frag.appendChild(document.createTextNode(tok)); return; }
      var s = document.createElement('span');
      s.className = 'w';
      s.textContent = tok;
      frag.appendChild(s);
    });
    el.appendChild(frag);
    return el.querySelectorAll('.w');
  }

  /* ── GSAP CHOREOGRAPHY — «calm therapist» rhythm ──
     Slow, soft, ease-out / sine.inOut only. No bounce/elastic/back.
     Like a deep breath. */
  var hasGSAP = window.gsap && window.ScrollTrigger;
  var reduce  = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* split always (layout) */
  var headlineEls = document.querySelectorAll('.hero-headline [data-split="words"]');
  var headlineWords = [];
  headlineEls.forEach(function (el) {
    var ws = pxSplitWords(el);
    for (var i = 0; i < ws.length; i++) headlineWords.push(ws[i]);
  });
  var stmt = document.querySelector('[data-split="words-blur"]');
  var stmtWords = stmt ? pxSplitWords(stmt) : [];

  function revealAll() {
    stmtWords.forEach(function (w) { w.style.filter = 'none'; w.style.opacity = '1'; w.style.color = '#3A2A20'; });
  }
  if (!hasGSAP || reduce) { revealAll(); return; }

  gsap.registerPlugin(ScrollTrigger);

  var mm = gsap.matchMedia();
  mm.add({
    isDesktop: '(min-width:881px)',
    isMobile:  '(max-width:880px)'
  }, function (ctx) {
    var isDesktop = ctx.conditions.isDesktop;

    /* HERO — mask reveal (desktop only) */
    var heroMedia = document.querySelector('[data-mask="hero"]');
    if (heroMedia && isDesktop) {
      gsap.fromTo(heroMedia,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 2.2, ease: 'sine.inOut', delay: .15 });
    } else if (heroMedia) {
      heroMedia.style.clipPath = 'none';
    }
    if (headlineWords.length) {
      gsap.set(headlineWords, { yPercent: 58, opacity: 0 });
      gsap.to(headlineWords, { yPercent: 0, opacity: 1, duration: 1.5, ease: 'power2.out', stagger: .12, delay: .5 });
    }
    /* hero botanical accent — calm draw-in */
    var haStem = document.querySelector('.ha-stem');
    if (haStem) {
      var haLen = (haStem.getTotalLength && haStem.getTotalLength()) || 420;
      gsap.set(haStem, { strokeDasharray: haLen, strokeDashoffset: haLen });
      gsap.to(haStem, { strokeDashoffset: 0, duration: 3.4, ease: 'power2.out', delay: .6 });
      var haLeaves = gsap.utils.toArray('.ha-leaf');
      gsap.set(haLeaves, { opacity: 0 });
      gsap.to(haLeaves, { opacity: .42, duration: 1.3, ease: 'power2.out', stagger: .28, delay: 1.5 });
    }
    if (isDesktop) {
      var heroImg = document.querySelector('[data-parallax="hero"]');
      if (heroImg) gsap.to(heroImg, { yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.4 } });
    }

    /* generic fade-up — slow & soft */
    gsap.utils.toArray('[data-anim="fade"]').forEach(function (el) {
      gsap.set(el, { y: 24, opacity: 0 });
      gsap.to(el, { y: 0, opacity: 1, duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    /* STATEMENT — blur-to-focus scrub */
    if (stmtWords.length) {
      gsap.set(stmtWords, { filter: 'blur(7px)', opacity: .28 });
      gsap.to(stmtWords, { filter: 'blur(0px)', opacity: 1, ease: 'none', stagger: { each: .4 },
        scrollTrigger: { trigger: stmt, start: 'top 80%', end: 'bottom 60%', scrub: 1.1 } });
    }

    /* ABOUT — subtle depth parallax (two speeds) + slow ring rotate */
    if (isDesktop) {
      var aA = document.querySelector('[data-parallax="about-a"]');
      var aB = document.querySelector('[data-parallax="about-b"]');
      if (aA) gsap.fromTo(aA, { yPercent: -5 }, { yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      if (aB) gsap.fromTo(aB, { yPercent: 8 }, { yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    }
    var ring = document.querySelector('[data-spin]');
    if (ring) gsap.to(ring, { rotation: 360, repeat: -1, duration: 120, ease: 'none' });

    /* SERVICES — gentle staggered entry */
    gsap.utils.toArray('.services-grid').forEach(function (grid) {
      var cards = grid.querySelectorAll('[data-anim="card"]');
      gsap.set(cards, { y: 42, opacity: 0 });
      gsap.to(cards, { y: 0, opacity: 1, duration: 1.15, ease: 'power2.out', stagger: .12,
        scrollTrigger: { trigger: grid, start: 'top 84%' } });
    });

    /* PHILOSOPHY — scrubbed timeline: line flows, dots bloom, leaves appear */
    var line  = document.querySelector('[data-drawline]');
    var items = gsap.utils.toArray('[data-anim="manifesto"]');
    if (line) gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });
    items.forEach(function (li) {
      var dot = li.querySelector('.why-dot');
      gsap.set(li, { opacity: 0, y: 16 });
      gsap.set(dot, { scale: 0, transformOrigin: 'center' });
    });
    if (line || items.length) {
      var philoTL = gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: { trigger: '.why-manifesto', start: 'top 78%', end: 'bottom 82%', scrub: 1.4 }
      });
      if (line) philoTL.to(line, { scaleY: 1, duration: 6 }, 0);
      var grow = document.querySelector('.botanica--philo .bo-grow');
      if (grow) { gsap.set(grow, { strokeDashoffset: 1 }); philoTL.to(grow, { strokeDashoffset: 0, duration: 6 }, 0); }
      var blooms = gsap.utils.toArray('.botanica--philo .bo-bloom');
      items.forEach(function (li, i) {
        var dot = li.querySelector('.why-dot');
        var at  = 0.5 + i * 1.3;
        philoTL.to(dot, { scale: 1, duration: .8, ease: 'sine.out' }, at)
               .to(li,  { opacity: 1, y: 0, duration: 1.4, ease: 'sine.out' }, at + .15);
        if (blooms[i]) philoTL.to(blooms[i], { opacity: 1, duration: 1.1, ease: 'sine.out' }, at + .1);
      });
    }

    /* DECORATIVE BOTANICALS — float and parallax */
    gsap.utils.toArray('[data-float]').forEach(function (el) {
      gsap.fromTo(el, { y: -14, rotation: -2.5 }, { y: 14, rotation: 2.5, ease: 'sine.inOut',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 2 } });
    });
    if (isDesktop) {
      gsap.utils.toArray('[data-parallax-deco]').forEach(function (el) {
        var depth = parseFloat(el.getAttribute('data-parallax-deco')) || 0.3;
        gsap.fromTo(el, { yPercent: -6 * depth }, { yPercent: 14 * depth, ease: 'none',
          scrollTrigger: { trigger: '#services', start: 'top bottom', end: 'bottom top', scrub: 1.6 } });
      });
    }
    gsap.utils.toArray('[data-rotate-deco]').forEach(function (el) {
      var dir      = parseFloat(el.getAttribute('data-rotate-deco')) || 1;
      var targetOp = Number(getComputedStyle(el).opacity) || 0.15;
      gsap.set(el, { opacity: 0 });
      gsap.to(el, { opacity: targetOp, duration: 1.4, ease: 'sine.out',
        scrollTrigger: { trigger: '#cta-banner', start: 'top 80%' } });
      gsap.fromTo(el, { rotation: -4 * dir }, { rotation: 4 * dir, ease: 'sine.inOut',
        scrollTrigger: { trigger: '#cta-banner', start: 'top bottom', end: 'bottom top', scrub: 2 } });
    });

    /* CTA — subtle bg parallax */
    if (isDesktop) {
      var ctaBg = document.querySelector('[data-parallax="cta"]');
      if (ctaBg) gsap.fromTo(ctaBg, { yPercent: -6 }, { yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: '#cta-banner', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    }

    /* CONTACT — photo mask reveal (desktop only) + parallax */
    var cMedia = document.querySelector('[data-mask="contact"]');
    if (cMedia && !isDesktop) { cMedia.style.clipPath = 'none'; }
    if (cMedia && isDesktop) {
      gsap.fromTo(cMedia,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'sine.inOut',
          scrollTrigger: { trigger: cMedia, start: 'top 82%' } });
    }
    if (isDesktop) {
      var cImg = document.querySelector('[data-parallax="contact"]');
      if (cImg) gsap.fromTo(cImg, { yPercent: -6, scale: 1.08 }, { yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    }

    /* FOOTER — social gentle fade-in */
    var socials = gsap.utils.toArray('.px-social__link');
    if (socials.length) {
      gsap.set(socials, { y: 14, opacity: 0 });
      gsap.to(socials, { y: 0, opacity: 1, duration: .8, ease: 'power2.out', stagger: .1,
        scrollTrigger: { trigger: 'footer', start: 'top 90%' } });
    }
  });

  /* FAILSAFE — never leave content hidden if rAF ticker stalls */
  function pxFailsafe() {
    if (gsap.ticker.time > 0.05) return;
    try { ScrollTrigger.getAll().forEach(function (t) { t.kill(false); }); } catch (e) {}
    try { gsap.globalTimeline.clear(); } catch (e) {}
    gsap.set('[data-anim],[data-parallax],.hero-headline .w,.statement-reveal .w,.why-line,.svc-card,.px-social__link,.about-ring,.why-dot,[data-mask],.ha-stem,.ha-leaf,[data-rotate-deco]', { clearProps: 'all' });
    document.querySelectorAll('.statement-reveal .w').forEach(function (w) { w.style.filter = 'none'; w.style.opacity = '1'; w.style.color = '#3A2A20'; });
    document.querySelectorAll('[data-mask]').forEach(function (m) { m.style.clipPath = 'none'; });
    var ln = document.querySelector('.why-line'); if (ln) ln.style.transform = 'scaleY(1)';
    var gw = document.querySelector('.botanica--philo .bo-grow'); if (gw) gw.style.strokeDashoffset = '0';
    document.querySelectorAll('.botanica--philo .bo-bloom').forEach(function (b) { b.style.opacity = '1'; });
    document.querySelectorAll('[data-anim="manifesto"]').forEach(function (li) {
      li.style.opacity = '1'; li.style.transform = 'none';
      var d = li.querySelector('.why-dot'); if (d) d.style.transform = 'scale(1)';
    });
  }
  window.addEventListener('load', function () { setTimeout(pxFailsafe, 700); });
  setTimeout(pxFailsafe, 1500);
})();
