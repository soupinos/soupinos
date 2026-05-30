/**
 * px-schedule — Responsive timetable with direction toggle + optional auto-feed.
 *
 * Reads on .px-schedule:
 *   data-from, data-to        Direction labels (build toggle + caption)
 *   data-columns="a,b,c,…"    Parametric column headers
 *   data-source=""            PHASE 2 hook. Empty = static (default).
 *                             URL = fetch JSON {outbound:[…], return:[…]}
 *                             with row objects {ship,departure,arrival,
 *                             duration,price}. Fails → static fallback.
 *
 * Canonical field order for fetched rows:
 *   ['ship','departure','arrival','duration','price']
 *
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const root = document.querySelector('.px-schedule');
  if (!root) return;

  const FIELDS = ['ship', 'departure', 'arrival', 'duration', 'price'];

  const from = root.dataset.from || 'A';
  const to   = root.dataset.to   || 'B';

  const cols = (root.dataset.columns || 'Πλοίο,Αναχώρηση,Άφιξη,Διάρκεια,Τιμή')
    .split(',')
    .map(s => s.trim());

  const table    = root.querySelector('.px-schedule-table');
  const caption  = root.querySelector('.px-schedule-caption');
  const thead    = table.querySelector('thead tr');
  const dirBtns  = Array.from(root.querySelectorAll('.px-schedule-dir'));
  const note     = root.querySelector('.px-schedule-note');

  let activeDir = 'outbound';

  // ── Apply parametric column headers + sync mobile labels ───────────
  function applyColumns() {
    // Header cells
    const ths = thead.querySelectorAll('th');
    ths.forEach((th, i) => { if (cols[i]) th.textContent = cols[i]; });

    // Keep <td data-label> in sync so mobile cards match the headers
    root.querySelectorAll('tbody tr').forEach(tr => {
      tr.querySelectorAll('td').forEach((td, i) => {
        if (cols[i]) td.dataset.label = cols[i];
      });
    });
  }

  // ── Direction toggle labels ────────────────────────────────────────
  function labelFor(dir) {
    return dir === 'outbound' ? `${from} → ${to}` : `${to} → ${from}`;
  }

  function applyDirection(dir) {
    activeDir = dir;

    // Show the matching tbody, hide the other
    root.querySelectorAll('tbody[data-dir]').forEach(tb => {
      tb.hidden = tb.dataset.dir !== dir;
    });

    // Buttons state
    dirBtns.forEach(btn => {
      const on = btn.dataset.dir === dir;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });

    // Caption for screen readers + small print
    if (caption) caption.textContent = `Δρομολόγια: ${labelFor(dir)}`;
  }

  // Set button text from from/to and wire clicks
  dirBtns.forEach(btn => {
    btn.textContent = labelFor(btn.dataset.dir);
    btn.addEventListener('click', () => applyDirection(btn.dataset.dir));
  });

  // ── PHASE 2: optional auto-feed (dormant unless data-source is set) ─
  function renderRows(dir, rows) {
    const tbody = root.querySelector(`tbody[data-dir="${dir}"]`);
    if (!tbody || !Array.isArray(rows) || !rows.length) return false;

    tbody.innerHTML = rows.map(row => {
      const cells = FIELDS.map((key, i) => {
        const val = Array.isArray(row) ? (row[i] ?? '') : (row[key] ?? '');
        return `<td data-label="${cols[i] || key}">${String(val)}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    return true;
  }

  function autoFeed(url) {
    fetch(url, { headers: { Accept: 'application/json' } })
      .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(data => {
        const okOut = renderRows('outbound', data.outbound);
        const okRet = renderRows('return',   data.return);
        if (!okOut && !okRet) throw new Error('Empty feed');
        applyColumns();        // re-sync labels on fresh rows
        applyDirection(activeDir);
      })
      .catch(err => {
        // Graceful fallback: static rows already in the DOM stay as-is
        if (note) {
          note.hidden = false;
          note.textContent = 'Τα ζωντανά δρομολόγια δεν είναι διαθέσιμα — εμφανίζεται το προεπιλεγμένο πρόγραμμα.';
        }
        console.warn('[px-schedule] auto-feed failed, using static rows:', err.message);
      });
  }

  // ── Init ───────────────────────────────────────────────────────────
  applyColumns();
  applyDirection('outbound');

  const source = (root.dataset.source || '').trim();
  if (source) autoFeed(source);   // OFF by default (data-source is empty)
})();
