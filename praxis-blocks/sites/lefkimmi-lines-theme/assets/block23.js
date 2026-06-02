/*
 * px-booking-form — Block #23
 * Demo-mode booking search form. Redirects to provider on submit.
 * Root: .px-bf-root
 * data-book-url: submit target (default: https://lefkimmilines.gr/el/reservation/)
 * ⚠️ DEMO MODE — change data-book-url for live booking integration (booktickets.gr API or other)
 * i18n: renders data-i18n attrs — load BEFORE i18n.js
 * Example:
 *   <div class="px-bf-root" data-book-url="https://lefkimmilines.gr/el/reservation/"></div>
 */

(function () {
  'use strict';

  var DEFAULT_BOOK_URL = 'https://lefkimmilines.gr/el/reservation/';

  var PORTS = [
    { value: 'lefkimmi',     label: 'Λευκίμμη' },
    { value: 'igoumenitsa',  label: 'Ηγουμενίτσα' },
    { value: 'paxoi',        label: 'Παξοί' },
  ];

  var VEHICLES = [
    { value: 'none',  label: 'Χωρίς όχημα' },
    { value: 'moto',  label: 'Μηχανή' },
    { value: 'car',   label: 'Αυτοκίνητο' },
  ];

  /* ── Helpers ── */

  function pad2(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function buildOptions(list) {
    return list.map(function (item) {
      return '<option value="' + item.value + '">' + item.label + '</option>';
    }).join('');
  }

  function buildSelectField(id, i18nKey, defaultLabel, options) {
    return (
      '<div class="px-bf-field">' +
        '<label class="px-bf-label" for="' + id + '" data-i18n="' + i18nKey + '">' + defaultLabel + '</label>' +
        '<select class="px-bf-select" id="' + id + '" name="' + id + '">' +
          options +
        '</select>' +
      '</div>'
    );
  }

  function buildForm(rootEl) {
    var today = todayISO();

    var html =
      '<div class="px-bf-title" data-i18n="book.title">Αναζήτηση Δρομολογίου</div>' +
      '<form class="px-bf-form" novalidate>' +

        /* From */
        buildSelectField('px-bf-from', 'book.from', 'Από', buildOptions(PORTS)) +

        /* To */
        buildSelectField('px-bf-to', 'book.to', 'Προς', buildOptions(PORTS)) +

        /* Date */
        '<div class="px-bf-field">' +
          '<label class="px-bf-label" for="px-bf-date" data-i18n="book.date">Ημερομηνία</label>' +
          '<input class="px-bf-input" type="date" id="px-bf-date" name="date" min="' + today + '" value="' + today + '">' +
        '</div>' +

        /* Passenger counter */
        '<div class="px-bf-field">' +
          '<label class="px-bf-label" data-i18n="book.pax">Επιβάτες</label>' +
          '<div class="px-bf-counter" role="group" aria-label="Επιβάτες">' +
            '<button type="button" class="px-bf-counter-btn px-bf-counter-minus" aria-label="Μείωση" disabled>−</button>' +
            '<span class="px-bf-counter-val" aria-live="polite" aria-atomic="true">1</span>' +
            '<button type="button" class="px-bf-counter-btn px-bf-counter-plus" aria-label="Αύξηση">+</button>' +
          '</div>' +
          '<input type="hidden" name="pax" value="1">' +
        '</div>' +

        /* Vehicle */
        buildSelectField('px-bf-vehicle', 'book.vehicle', 'Όχημα', buildOptions(VEHICLES)) +

        /* Submit */
        '<button type="submit" class="px-bf-submit" data-i18n="book.search">ΑΝΑΖΗΤΗΣΗ ΔΡΟΜΟΛΟΓΙΩΝ</button>' +

      '</form>';

    return html;
  }

  function initCounter(rootEl) {
    var minusBtn = rootEl.querySelector('.px-bf-counter-minus');
    var plusBtn  = rootEl.querySelector('.px-bf-counter-plus');
    var valEl    = rootEl.querySelector('.px-bf-counter-val');
    var hiddenEl = rootEl.querySelector('input[name="pax"]');

    if (!minusBtn || !plusBtn || !valEl) return;

    var count = 1;
    var MIN = 1;
    var MAX = 9;

    function updateUI() {
      valEl.textContent = count;
      if (hiddenEl) hiddenEl.value = count;
      minusBtn.disabled = count <= MIN;
      plusBtn.disabled  = count >= MAX;
    }

    minusBtn.addEventListener('click', function () {
      if (count > MIN) { count--; updateUI(); }
    });

    plusBtn.addEventListener('click', function () {
      if (count < MAX) { count++; updateUI(); }
    });
  }

  function initForm(rootEl) {
    var bookUrl = rootEl.getAttribute('data-book-url') || DEFAULT_BOOK_URL;
    var form = rootEl.querySelector('.px-bf-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Collect values for query string passthrough (demo mode) */
      var from    = form.querySelector('#px-bf-from')    ? form.querySelector('#px-bf-from').value    : '';
      var to      = form.querySelector('#px-bf-to')      ? form.querySelector('#px-bf-to').value      : '';
      var date    = form.querySelector('#px-bf-date')    ? form.querySelector('#px-bf-date').value    : '';
      var pax     = form.querySelector('input[name="pax"]') ? form.querySelector('input[name="pax"]').value : '1';
      var vehicle = form.querySelector('#px-bf-vehicle') ? form.querySelector('#px-bf-vehicle').value : '';

      var params = new URLSearchParams({ from: from, to: to, date: date, pax: pax, vehicle: vehicle });
      var target = bookUrl + (bookUrl.indexOf('?') === -1 ? '?' : '&') + params.toString();

      window.open(target, '_blank', 'noopener,noreferrer');
    });
  }

  function initRoot(rootEl) {
    if (!rootEl) return;
    rootEl.innerHTML = buildForm(rootEl);
    initCounter(rootEl);
    initForm(rootEl);
  }

  function init() {
    var roots = document.querySelectorAll('.px-bf-root');
    if (!roots || roots.length === 0) return;
    Array.prototype.forEach.call(roots, initRoot);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
