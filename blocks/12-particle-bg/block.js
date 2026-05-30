/**
 * px-particles — Canvas particle network background.
 *
 * Reads on .px-particles:
 *   data-count="60"        Number of particles
 *   data-color="#FF3B00"   Particle and line colour
 *   data-speed="0.4"       Movement speed multiplier
 *   data-connect="120"     Max connection distance (px)
 *
 * Canvas fills the container (position:absolute, inset 0).
 * Pauses on hidden tab; resizes on window resize.
 * Skips animation when prefers-reduced-motion is set.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const container = document.querySelector('.px-particles');
  if (!container) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Parse options
  const COUNT   = parseInt(container.dataset.count,   10)    || 60;
  const COLOR   = container.dataset.color                    || '#FF3B00';
  const SPEED   = parseFloat(container.dataset.speed)        || 0.4;
  const CONNECT = parseInt(container.dataset.connect, 10)    || 120;

  // Build canvas
  const canvas = document.createElement('canvas');
  canvas.className = 'px-particles-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  container.prepend(canvas);

  if (reduced) return; // CSS hides canvas, bail

  const ctx = canvas.getContext('2d');
  let W, H, particles, raf;

  // Parse colour to rgba helper
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `${r},${g},${b}`;
  }
  const RGB = hexToRgb(COLOR.startsWith('#') ? COLOR : '#FF3B00');

  // ── Particle class ──────────────────────────────────────────────
  class Particle {
    constructor() { this.reset(true); }

    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : (Math.random() > 0.5 ? -4 : H + 4);
      this.vx = (Math.random() - 0.5) * SPEED;
      this.vy = (Math.random() - 0.5) * SPEED;
      this.r  = Math.random() * 1.5 + 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) {
        this.reset(false);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${RGB}, 0.7)`;
      ctx.fill();
    }
  }

  // ── Resize ─────────────────────────────────────────────────────
  function resize() {
    const rect = container.getBoundingClientRect();
    W = canvas.width  = rect.width  * devicePixelRatio;
    H = canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    W = rect.width;
    H = rect.height;
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  resize();

  // ── Render loop ─────────────────────────────────────────────────
  function render() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => { p.update(); p.draw(); });

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > CONNECT) continue;
        const alpha = (1 - dist / CONNECT) * 0.4;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(${RGB}, ${alpha})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }

    raf = requestAnimationFrame(render);
  }

  // ── Page visibility — pause when hidden ────────────────────────
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      render();
    }
  });

  render();
})();
