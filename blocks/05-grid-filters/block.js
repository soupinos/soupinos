/**
 * px-grid — Responsive card grid with client-side filtering.
 *
 * Reads on .px-grid:
 *   data-cols="3"    Cards per row on desktop (sets --px-cols CSS var)
 *
 * Reads on each .px-grid-card:
 *   data-cat="..."     Category slug
 *   data-price="..."   Numeric price for range filter
 *   data-area="..."    Optional area/location tag
 *
 * Filter controls:
 *   .px-grid-cat-btn[data-cat]     Category pill buttons
 *   .px-grid-filter-search input   Live text search
 *
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const section = document.querySelector('.px-grid');
  if (!section) return;

  // Apply column count from data attribute
  if (section.dataset.cols) {
    section.querySelector('.px-grid-cards').style.setProperty('--px-cols', section.dataset.cols);
  }

  const cards      = Array.from(section.querySelectorAll('.px-grid-card'));
  const catBtns    = Array.from(section.querySelectorAll('.px-grid-cat-btn'));
  const searchInput = section.querySelector('.px-grid-filter-search input');
  const countEl    = section.querySelector('.px-grid-count');
  const emptyEl    = section.querySelector('.px-grid-empty');
  const resetBtn   = section.querySelector('.px-grid-reset');

  let activeCat  = 'all';
  let searchTerm = '';

  // ── Filter logic ──────────────────────────────────────────────────
  function applyFilters() {
    let visible = 0;

    cards.forEach((card, i) => {
      const catMatch    = activeCat === 'all' || card.dataset.cat === activeCat;
      const cardText    = card.textContent.toLowerCase();
      const searchMatch = !searchTerm || cardText.includes(searchTerm);
      const show        = catMatch && searchMatch;

      card.classList.toggle('is-hidden', !show);

      if (show) {
        visible++;
        // Stagger animation restart
        card.classList.remove('is-visible');
        // Use requestAnimationFrame to allow class removal to register
        const delay = Math.min(i, 8) * 40;
        setTimeout(() => card.classList.add('is-visible'), delay);
      }
    });

    // Update count
    if (countEl) {
      countEl.textContent = visible === cards.length
        ? `${visible} αποτελέσματα`
        : `${visible} από ${cards.length} αποτελέσματα`;
    }

    // Empty state
    if (emptyEl) {
      emptyEl.hidden = visible > 0;
    }
  }

  // ── Category buttons ──────────────────────────────────────────────
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCat = btn.dataset.cat;
      catBtns.forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      applyFilters();
    });

    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-pressed', String(btn.dataset.cat === activeCat));
  });

  // ── Search ────────────────────────────────────────────────────────
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchTerm = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // ── Reset ─────────────────────────────────────────────────────────
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCat  = 'all';
      searchTerm = '';
      if (searchInput) searchInput.value = '';
      catBtns.forEach(b => {
        b.classList.toggle('is-active', b.dataset.cat === 'all');
        b.setAttribute('aria-pressed', String(b.dataset.cat === 'all'));
      });
      applyFilters();
    });
  }

  // ── Init ──────────────────────────────────────────────────────────
  applyFilters();
})();
