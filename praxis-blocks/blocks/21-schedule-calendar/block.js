/*
 * px-schedule-calendar
 * 4-direction timetable with mini date picker.
 *
 * What it does:
 *   Finds every .px-sc-root on the page, parses embedded JSON, then builds:
 *   - A tab bar with 4 route directions (LL / HL / LP / PL)
 *   - For each direction: a mini month calendar + timetable
 *   The calendar is cosmetic (same schedule every day). Today is pre-selected.
 *   Duration (departure → arrival) is computed in JS and displayed as "50′".
 *
 * Data attributes on .px-sc-root:
 *   data-book-url   Booking link appended to every row button. Default: "#"
 *
 * Embedded data (<script type="application/json" class="px-sched-data"> inside .px-sc-root):
 *   {
 *     "ll": [{"ship": "Αγία Τριάδα", "dep": "06:00", "arr": "06:50"}, ...],
 *     "hl": [...],
 *     "lp": [...],
 *     "pl": [...]
 *   }
 *
 * i18n:
 *   All user-visible strings carry data-i18n attributes so i18n.js can
 *   swap them after this script runs. Load this block BEFORE i18n.js.
 *   Keys used:
 *     sched.tabLL, sched.tabHL, sched.tabLP, sched.tabPL
 *     sched.colShip, sched.colDep, sched.colArr, sched.colDur, sched.colBook
 *     sched.disclaimer
 *
 * Example:
 *   <div class="px-sc-root" data-book-url="https://lefkimmilines.gr/el/reservation/">
 *     <script type="application/json" class="px-sched-data">
 *       {"ll":[{"ship":"Αγία Τριάδα","dep":"06:00","arr":"06:50"}],
 *        "hl":[{"ship":"Αγία Τριάδα","dep":"07:10","arr":"08:00"}],
 *        "lp":[{"ship":"Παξός Express","dep":"09:00","arr":"10:30"}],
 *        "pl":[{"ship":"Παξός Express","dep":"11:00","arr":"12:30"}]}
 *     </script>
 *   </div>
 */
;(function () {
  'use strict';

  /* ── Greek locale helpers ──────────────────────────────────────────────── */

  var MONTHS_GR = [
    'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος',    'Απρίλιος',
    'Μάιος',      'Ιούνιος',     'Ιούλιος',     'Αύγουστος',
    'Σεπτέμβριος','Οκτώβριος',   'Νοέμβριος',   'Δεκέμβριος'
  ];

  var DAYS_GR = ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πέ', 'Πα', 'Σά'];

  /* ── Tab definitions ───────────────────────────────────────────────────── */

  var TABS = [
    { key: 'll', i18n: 'sched.tabLL', label: 'Λευκίμμη → Ηγουμενίτσα' },
    { key: 'hl', i18n: 'sched.tabHL', label: 'Ηγουμενίτσα → Λευκίμμη' },
    { key: 'lp', i18n: 'sched.tabLP', label: 'Λευκίμμη → Παξοί'        },
    { key: 'pl', i18n: 'sched.tabPL', label: 'Παξοί → Λευκίμμη'        }
  ];

  /* ── Column definitions ────────────────────────────────────────────────── */

  var COLS = [
    { i18n: 'sched.colShip', label: 'Πλοίο'      },
    { i18n: 'sched.colDep',  label: 'Αναχώρηση'  },
    { i18n: 'sched.colArr',  label: 'Άφιξη'       },
    { i18n: 'sched.colDur',  label: 'Διάρκεια'    },
    { i18n: 'sched.colBook', label: 'Κλείσε'      }
  ];

  /* ── Duration computation ──────────────────────────────────────────────── */

  function parseMins(timeStr) {
    var parts = (timeStr || '').split(':');
    if (parts.length < 2) return 0;
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  function computeDuration(dep, arr) {
    var d = parseMins(dep);
    var a = parseMins(arr);
    if (a === 0 && d === 0) return '—';
    // Allow overnight crossings: if arrival is earlier, add 24 h
    var diff = a >= d ? a - d : a - d + 1440;
    if (diff <= 0) return '—';
    var h = Math.floor(diff / 60);
    var m = diff % 60;
    if (h > 0 && m > 0) return h + 'ω ' + m + '′';
    if (h > 0)          return h + 'ω';
    return m + '′';
  }

  /* ── DOM helpers ───────────────────────────────────────────────────────── */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') {
          node.className = attrs[k];
        } else if (k === 'textContent') {
          node.textContent = attrs[k];
        } else {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    if (children) {
      children.forEach(function (c) {
        if (c) node.appendChild(c);
      });
    }
    return node;
  }

  function txt(s) {
    return document.createTextNode(s);
  }

  /* ── Calendar builder ──────────────────────────────────────────────────── */

  function buildCalendar(panelEl, reducedMotion) {
    var now = new Date();
    var state = {
      year:  now.getFullYear(),
      month: now.getMonth(),   // 0-based
      todayY: now.getFullYear(),
      todayM: now.getMonth(),
      todayD: now.getDate(),
      selY:   now.getFullYear(),
      selM:   now.getMonth(),
      selD:   now.getDate()
    };

    var cal = el('div', { className: 'px-sc-calendar', role: 'application',
                          'aria-label': 'Επιλογή ημερομηνίας' });

    /* header */
    var titleEl = el('p', { className: 'px-sc-cal-title', 'aria-live': 'polite' });
    var prevBtn = el('button', {
      className: 'px-sc-cal-nav',
      type: 'button',
      'aria-label': 'Προηγούμενος μήνας'
    }, [txt('‹')]);
    var nextBtn = el('button', {
      className: 'px-sc-cal-nav',
      type: 'button',
      'aria-label': 'Επόμενος μήνας'
    }, [txt('›')]);
    var header = el('div', { className: 'px-sc-cal-header' },
      [prevBtn, titleEl, nextBtn]);

    /* day-of-week row */
    var dowRow = el('div', { className: 'px-sc-cal-dow', 'aria-hidden': 'true' });
    DAYS_GR.forEach(function (d) {
      dowRow.appendChild(el('div', { className: 'px-sc-cal-dow-cell', textContent: d }));
    });

    /* grid */
    var grid = el('div', { className: 'px-sc-cal-grid', role: 'grid',
                            'aria-label': 'Ημέρες μήνα' });

    cal.appendChild(header);
    cal.appendChild(dowRow);
    cal.appendChild(grid);

    function render() {
      titleEl.textContent = MONTHS_GR[state.month] + ' ' + state.year;
      grid.innerHTML = '';

      /* first weekday of month (Sunday=0) */
      var first = new Date(state.year, state.month, 1).getDay();
      /* days in month */
      var daysInMonth = new Date(state.year, state.month + 1, 0).getDate();
      /* days in previous month */
      var prevDays = new Date(state.year, state.month, 0).getDate();

      /* leading cells from previous month */
      for (var p = first - 1; p >= 0; p--) {
        var dayNum = prevDays - p;
        var cell = el('button', {
          type: 'button',
          className: 'px-sc-cal-day other-month',
          textContent: String(dayNum),
          'aria-hidden': 'true',
          tabindex: '-1'
        });
        grid.appendChild(cell);
      }

      /* current month cells */
      for (var d = 1; d <= daysInMonth; d++) {
        (function (day) {
          var classes = ['px-sc-cal-day'];
          var isToday = (state.year === state.todayY &&
                         state.month === state.todayM &&
                         day === state.todayD);
          var isSel   = (state.year === state.selY &&
                         state.month === state.selM &&
                         day === state.selD);
          if (isToday) classes.push('today');
          if (isSel)   classes.push('selected');

          var dateStr = state.year + '-' +
                        String(state.month + 1).padStart(2, '0') + '-' +
                        String(day).padStart(2, '0');
          var cell = el('button', {
            type: 'button',
            className: classes.join(' '),
            textContent: String(day),
            'aria-label': String(day) + ' ' + MONTHS_GR[state.month] + ' ' + state.year,
            'aria-pressed': isSel ? 'true' : 'false',
            'data-date': dateStr,
            role: 'gridcell'
          });

          cell.addEventListener('click', function () {
            state.selY = state.year;
            state.selM = state.month;
            state.selD = day;
            render();
          });

          grid.appendChild(cell);
        }(d));
      }

      /* trailing cells to fill last row */
      var total = first + daysInMonth;
      var trailing = total % 7 === 0 ? 0 : 7 - (total % 7);
      for (var t = 1; t <= trailing; t++) {
        var tCell = el('button', {
          type: 'button',
          className: 'px-sc-cal-day other-month',
          textContent: String(t),
          'aria-hidden': 'true',
          tabindex: '-1'
        });
        grid.appendChild(tCell);
      }
    }

    prevBtn.addEventListener('click', function () {
      state.month -= 1;
      if (state.month < 0) { state.month = 11; state.year -= 1; }
      render();
    });

    nextBtn.addEventListener('click', function () {
      state.month += 1;
      if (state.month > 11) { state.month = 0; state.year += 1; }
      render();
    });

    render();
    return cal;
  }

  /* ── Table builder ─────────────────────────────────────────────────────── */

  function buildTable(rows, bookUrl) {
    var wrap = el('div', { className: 'px-sc-table-wrap' });
    var table = el('table', {
      className: 'px-sc-table',
      role: 'table',
      'aria-label': 'Δρομολόγια'
    });

    /* thead */
    var thead = el('thead');
    var tr    = el('tr');
    COLS.forEach(function (col) {
      var th = el('th', {
        scope: 'col',
        'data-i18n': col.i18n,
        textContent: col.label
      });
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    /* tbody */
    var tbody = el('tbody');

    if (!rows || rows.length === 0) {
      var emptyRow = el('tr');
      var emptyTd  = el('td', {
        colspan: String(COLS.length),
        className: 'px-sc-disclaimer',
        textContent: 'Δεν υπάρχουν διαθέσιμα δρομολόγια.'
      });
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      rows.forEach(function (row) {
        var tr = el('tr');
        var dur = computeDuration(row.dep, row.arr);

        /* Ship */
        var shipWrap = el('span', { className: 'px-sc-ship', textContent: row.ship || '—' });
        var tdShip   = el('td', { 'data-label': COLS[0].label });
        tdShip.appendChild(shipWrap);
        tr.appendChild(tdShip);

        /* Departure */
        var tdDep = el('td', {
          className: 'px-sc-time',
          'data-label': COLS[1].label,
          textContent: row.dep || '—'
        });
        tr.appendChild(tdDep);

        /* Arrival */
        var tdArr = el('td', {
          className: 'px-sc-time',
          'data-label': COLS[2].label,
          textContent: row.arr || '—'
        });
        tr.appendChild(tdArr);

        /* Duration */
        var tdDur = el('td', {
          className: 'px-sc-dur',
          'data-label': COLS[3].label,
          textContent: dur
        });
        tr.appendChild(tdDur);

        /* Book button */
        var btn = el('a', {
          className: 'px-sc-btn',
          href: bookUrl || '#',
          target: '_blank',
          rel: 'noopener noreferrer',
          'data-i18n': 'sched.colBook',
          textContent: 'Κλείσε'
        });
        var tdBook = el('td', { 'data-label': COLS[4].label });
        tdBook.appendChild(btn);
        tr.appendChild(tdBook);

        tbody.appendChild(tr);
      });
    }

    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  /* ── Block initialiser ─────────────────────────────────────────────────── */

  function initBlock(root) {
    if (!root) return;

    /* Parse JSON data */
    var scriptEl = root.querySelector('script.px-sched-data');
    var data = {};
    if (scriptEl) {
      try {
        data = JSON.parse(scriptEl.textContent || scriptEl.innerHTML || '{}');
      } catch (e) {
        console.warn('[px-schedule-calendar] JSON parse error:', e.message);
      }
    }

    var bookUrl = (root.dataset.bookUrl || '#').trim();

    /* Respect prefers-reduced-motion */
    var reducedMotion = window.matchMedia &&
                        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Clear any server-rendered content */
    root.innerHTML = '';

    /* ── Tab bar ── */
    var tabBar = el('div', {
      className: 'px-sc-tabs',
      role: 'tablist',
      'aria-label': 'Επιλογή κατεύθυνσης'
    });

    var tabButtons  = [];
    var tabPanels   = [];

    TABS.forEach(function (tabDef, idx) {
      /* Tab button */
      var btn = el('button', {
        type: 'button',
        className: 'px-sc-tab' + (idx === 0 ? ' active' : ''),
        role: 'tab',
        'aria-selected': idx === 0 ? 'true' : 'false',
        'aria-controls': 'px-sc-panel-' + tabDef.key,
        id: 'px-sc-tab-' + tabDef.key,
        'data-i18n': tabDef.i18n,
        textContent: tabDef.label
      });
      tabBar.appendChild(btn);
      tabButtons.push(btn);

      /* Panel */
      var panel = el('div', {
        className: 'px-sc-panel' + (idx === 0 ? ' active' : ''),
        role: 'tabpanel',
        id: 'px-sc-panel-' + tabDef.key,
        'aria-labelledby': 'px-sc-tab-' + tabDef.key
      });
      if (idx !== 0) panel.setAttribute('hidden', '');

      /* Calendar + table row */
      var calRow = el('div', { className: 'px-sc-cal-row' });

      var cal = buildCalendar(panel, reducedMotion);
      var tableWrap = buildTable(data[tabDef.key] || [], bookUrl);

      calRow.appendChild(cal);
      calRow.appendChild(tableWrap);
      panel.appendChild(calRow);

      /* Disclaimer */
      var disclaimer = el('p', {
        className: 'px-sc-disclaimer',
        'data-i18n': 'sched.disclaimer',
        textContent: 'Τα δρομολόγια ενδέχεται να τροποποιηθούν. ' +
                     'Επικοινωνήστε με την εταιρεία για επιβεβαίωση.'
      });
      panel.appendChild(disclaimer);

      tabPanels.push(panel);
    });

    /* ── Tab switching logic ── */
    function activateTab(index) {
      tabButtons.forEach(function (b, i) {
        var active = i === index;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
        b.tabIndex = active ? 0 : -1;
      });
      tabPanels.forEach(function (p, i) {
        var active = i === index;
        p.classList.toggle('active', active);
        if (active) {
          p.removeAttribute('hidden');
        } else {
          p.setAttribute('hidden', '');
        }
      });
    }

    tabButtons.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        activateTab(idx);
      });

      /* Keyboard: left/right arrows cycle tabs */
      btn.addEventListener('keydown', function (e) {
        var count = tabButtons.length;
        var current = tabButtons.indexOf(document.activeElement);
        if (current === -1) return;

        var next = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          next = (current + 1) % count;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          next = (current - 1 + count) % count;
        } else if (e.key === 'Home') {
          next = 0;
        } else if (e.key === 'End') {
          next = count - 1;
        }

        if (next !== -1) {
          e.preventDefault();
          activateTab(next);
          tabButtons[next].focus();
        }
      });

      /* Initial tabIndex state */
      btn.tabIndex = idx === 0 ? 0 : -1;
    });

    /* ── Assemble into root ── */
    root.appendChild(tabBar);
    tabPanels.forEach(function (panel) {
      root.appendChild(panel);
    });

    /* Activate first tab */
    activateTab(0);
  }

  /* ── Boot: find all blocks ─────────────────────────────────────────────── */

  document.querySelectorAll('.px-sc-root').forEach(function (root) {
    initBlock(root);
  });

})();
