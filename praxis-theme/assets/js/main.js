/* global praxisData */
(function () {
  'use strict';

  // Shared — updated by theme switcher so particle canvas picks up new accent
  var accentRgb = [255, 59, 0];

  // ── 1. Custom cursor ────────────────────────────────────────────────────────
  var dot  = document.getElementById('cDot');
  var ring = document.getElementById('cRing');

  if (dot && ring && window.innerWidth > 768) {
    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function animateRing() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();
  }

  // ── 2. Particle canvas ──────────────────────────────────────────────────────
  var canvas = document.getElementById('particleCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W, H, particles = [];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function Particle() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.r  = 0.4 + Math.random() * 1.4;
      this.a  = 0.1 + Math.random() * 0.35;
    }

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    };

    for (var i = 0; i < 80; i++) particles.push(new Particle());

    function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      var ar = accentRgb;
      for (var pi = 0; pi < particles.length; pi++) {
        particles[pi].update();
        var p = particles[pi];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + ar[0] + ',' + ar[1] + ',' + ar[2] + ',' + p.a + ')';
        ctx.fill();

        for (var qi = pi + 1; qi < particles.length; qi++) {
          var q  = particles[qi];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(' + ar[0] + ',' + ar[1] + ',' + ar[2] + ',' + (0.15 * (1 - d / 120)) + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // ── 3. Typewriter ───────────────────────────────────────────────────────────
  var twEl     = document.getElementById('tw');
  var twActive = false;

  window.praxisHeroTw = 'Κάθε μέρα που δεν υπάρχεις online κερδίζει ο άλλος.';

  function startTypewriter() {
    if (!twEl) return;
    twActive = false;          // stop any running instance
    twEl.textContent = '';
    var text = window.praxisHeroTw || '';
    var i = 0;
    twActive = true;
    (function type() {
      if (!twActive || i >= text.length) return;
      twEl.textContent += text[i++];
      setTimeout(type, 52 + Math.random() * 22);
    })();
  }

  window.praxisRestartTypewriter = startTypewriter;
  setTimeout(startTypewriter, 640);

  // ── 4. Nav scroll ───────────────────────────────────────────────────────────
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ── 5. Reveal on scroll ─────────────────────────────────────────────────────
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  // ── 6. Animated counters ────────────────────────────────────────────────────
  var counters = document.querySelectorAll('.counter[data-target]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el     = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var start  = performance.now();
        var dur    = 1600;
        function tick(now) {
          var p    = Math.min((now - start) / dur, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * target);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObs.observe(el); });
  }

  // ── 7. Live Demo ────────────────────────────────────────────────────────────
  var demoInput = document.getElementById('demoInput');
  var demoRun   = document.getElementById('demoRun');
  var demoOut   = document.getElementById('demoOut');

  if (demoInput && demoRun && demoOut) {
    var demoProfiles = {
      food:    { test: /ταβ|εστ|καφ|πιτσ|σουβλ|food|restaurant|cafe|tavern/i,      palette: ['#8B4513','#FEFAE0','#F4A261','#2D1B0E'], tagline: 'Αυθεντικές γεύσεις, online παρουσία.', cta: 'Κάνε κράτηση →',    ctaColor: '#8B4513' },
      medical: { test: /ιατρ|γιατρ|φαρμ|οδοντ|clinic|doctor|medical|health/i,       palette: ['#1B2B4B','#FFFFFF','#2E86AB','#E8F4F8'], tagline: 'Εμπιστευτείτε την εμπειρία μας.', cta: 'Κλείστε ραντεβού →', ctaColor: '#2E86AB' },
      gym:     { test: /gym|γυμ|fit|crossfit|yoga|pilates|sport/i,                   palette: ['#0A0A0A','#FF3B00','#FFFFFF','#1A1A1A'], tagline: 'Σπάσε τα όρια σου.',          cta: 'Ξεκίνα δωρεάν →',    ctaColor: '#FF3B00' },
    };

    function runDemo() {
      var val = demoInput.value.trim();
      if (!val) return;
      var profile = null;
      for (var k in demoProfiles) {
        if (demoProfiles[k].test.test(val)) { profile = demoProfiles[k]; break; }
      }
      if (!profile) profile = { palette: ['#0A0A0A','#FF3B00','#F0EDE8','#161616'], tagline: 'Η επιχείρησή σου, online.', cta: 'Μάθε περισσότερα →', ctaColor: '#FF3B00' };

      demoOut.innerHTML =
        '<div class="demo-biz-name">' + escHtml(val) + '</div>' +
        '<div class="demo-tagline">'  + escHtml(profile.tagline) + '</div>' +
        '<div class="swatches">' + profile.palette.map(function (c) { return '<div class="swatch" style="background:' + c + '" title="' + c + '"></div>'; }).join('') + '</div>' +
        '<a href="#contact" class="demo-cta-preview" style="background:' + profile.ctaColor + '">' + escHtml(profile.cta) + '</a>';

      demoOut.classList.remove('show');
      void demoOut.offsetWidth;
      demoOut.classList.add('show');
    }

    demoRun.addEventListener('click', runDemo);
    demoInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') runDemo(); });
  }

  // ── 8. Theme Switcher ───────────────────────────────────────────────────────
  var SKINS = [
    {
      id: 'praxis',    name: 'PRAXIS',
      accent: '#FF3B00', bg: '#080808', bg2: '#0f0f0f', bg3: '#161616',
      white: '#F0EDE8',  ink: '#a8a6a1', muted: '#666',
      fontH: "'Exo 2', sans-serif",                       fontImport: 'Exo+2:ital,wght@0,700;0,800;1,700',
    },
    {
      id: 'akira',     name: 'AKIRA',
      accent: '#FF0040', bg: '#0A0014', bg2: '#110020', bg3: '#1A0030',
      white: '#FFE4E4',  ink: '#c4a0c4', muted: '#774477',
      fontH: "'Bebas Neue', 'Exo 2', sans-serif",          fontImport: 'Bebas+Neue',
    },
    {
      id: 'cyberpunk', name: 'CYBERPUNK',
      accent: '#00D4FF', bg: '#0D0D1A', bg2: '#13132A', bg3: '#1A1A2F',
      white: '#E0F7FF',  ink: '#8bccd8', muted: '#446677',
      fontH: "'Orbitron', 'Exo 2', sans-serif",            fontImport: 'Orbitron:wght@700;800;900',
    },
    {
      id: 'matrix',    name: 'MATRIX',
      accent: '#00FF41', bg: '#000800', bg2: '#001000', bg3: '#001800',
      white: '#CCFFCC',  ink: '#88cc88', muted: '#336633',
      fontH: "'Share Tech Mono', 'Exo 2', monospace",      fontImport: 'Share+Tech+Mono',
    },
    {
      id: 'gold',      name: 'GOLD',
      accent: '#C9A84C', bg: '#0A0800', bg2: '#110E00', bg3: '#1A1400',
      white: '#FFF8E7',  ink: '#c8b880', muted: '#776633',
      fontH: "'Playfair Display', 'Exo 2', serif",         fontImport: 'Playfair+Display:wght@700;800',
    },
    {
      id: 'ghost',     name: 'GHOST',
      accent: '#333333', bg: '#F5F5F0', bg2: '#EBEBEB', bg3: '#E0E0DA',
      white: '#111111',  ink: '#555555', muted: '#999',
      fontH: "'DM Serif Display', 'Exo 2', serif",         fontImport: 'DM+Serif+Display',
    },
    {
      id: 'vapor',     name: 'VAPOR',
      accent: '#FF71CE', bg: '#1A0A2E', bg2: '#220D3A', bg3: '#2E1448',
      white: '#FFE4FF',  ink: '#c4a0d8', muted: '#664477',
      fontH: "'Space Grotesk', 'Exo 2', sans-serif",       fontImport: 'Space+Grotesk:wght@700',
    },
  ];

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    return [parseInt(hex.slice(0,2),16), parseInt(hex.slice(2,4),16), parseInt(hex.slice(4,6),16)];
  }

  function loadGoogleFont(importStr) {
    var familySlug = importStr.split(':')[0];
    if (document.querySelector('link[data-praxis-font="' + familySlug + '"]')) return;
    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + importStr + '&display=swap';
    link.setAttribute('data-praxis-font', familySlug);
    document.head.appendChild(link);
  }

  function applySkin(skin, instant) {
    if (!instant) {
      document.documentElement.classList.add('theme-switching');
      setTimeout(function () {
        document.documentElement.classList.remove('theme-switching');
      }, 480);
    }

    var rgb = hexToRgb(skin.accent);
    accentRgb = rgb;
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var root = document.documentElement;

    root.style.setProperty('--red',           skin.accent);
    root.style.setProperty('--red-soft',      'rgba('+r+','+g+','+b+',0.10)');
    root.style.setProperty('--red-line',      'rgba('+r+','+g+','+b+',0.22)');
    root.style.setProperty('--red-glow',      'rgba('+r+','+g+','+b+',0.42)');
    root.style.setProperty('--bg',            skin.bg);
    root.style.setProperty('--bg2',           skin.bg2);
    root.style.setProperty('--bg3',           skin.bg3);
    root.style.setProperty('--white',         skin.white);
    root.style.setProperty('--ink',           skin.ink);
    root.style.setProperty('--muted',         skin.muted);
    root.style.setProperty('--font-h',        skin.fontH);

    if (skin.fontImport) loadGoogleFont(skin.fontImport);
    loadGoogleFont('Exo+2:ital,wght@0,700;0,800;1,700'); // Greek fallback, loads once

    // Update active card
    document.querySelectorAll('.skin-card').forEach(function (c) {
      c.classList.toggle('active', c.dataset.skin === skin.id);
    });

    // Update toggle button aria state
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('data-active-skin', skin.id);

    localStorage.setItem('praxis-skin', skin.id);
  }

  // Build panel cards
  var switcherPanel = document.getElementById('theme-panel');
  if (switcherPanel) {
    switcherPanel.innerHTML = SKINS.map(function (s) {
      return (
        '<button class="skin-card" role="option" data-skin="' + s.id + '">' +
          '<div class="skin-swatch">' +
            '<span style="background:' + s.bg     + ';flex:3"></span>' +
            '<span style="background:' + s.accent + ';flex:2"></span>' +
            '<span style="background:' + s.white  + ';flex:1"></span>' +
          '</div>' +
          '<span class="skin-name">' + s.name + '</span>' +
        '</button>'
      );
    }).join('');

    switcherPanel.querySelectorAll('.skin-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var skin = SKINS.filter(function (s) { return s.id === card.dataset.skin; })[0];
        if (skin) { applySkin(skin); closeThemePanel(); }
      });
    });
  }

  // Panel open/close
  var themeOpen = false;

  function openThemePanel() {
    if (!switcherPanel) return;
    switcherPanel.classList.add('open');
    themeOpen = true;
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }

  function closeThemePanel() {
    if (!switcherPanel) return;
    switcherPanel.classList.remove('open');
    themeOpen = false;
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  var themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (themeOpen) closeThemePanel(); else openThemePanel();
    });
  }

  document.addEventListener('click', function (e) {
    if (!themeOpen) return;
    var sw = document.getElementById('theme-switcher');
    if (sw && !sw.contains(e.target)) closeThemePanel();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && themeOpen) closeThemePanel();
  });

  // Init: restore saved skin (instant, no transition)
  var savedId  = localStorage.getItem('praxis-skin') || 'praxis';
  var initSkin = SKINS.filter(function (s) { return s.id === savedId; })[0] || SKINS[0];
  applySkin(initSkin, true);

  // ── Helper ───────────────────────────────────────────────────────────────────
  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

})();
