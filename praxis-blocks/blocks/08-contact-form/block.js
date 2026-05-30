/**
 * px-contact — Contact form with validation and success state.
 *
 * Reads on .px-contact:
 *   data-whatsapp="+30..."   WhatsApp link target
 *   data-email="..."         Email link target
 *   data-action="..."        POST URL (optional; defaults to mailto: fallback)
 *
 * Validates: name, email, phone (optional), message.
 * On success: hides form, shows .px-contact-success.
 * No globals. IIFE-wrapped.
 */
;(function () {
  'use strict';

  const section = document.querySelector('.px-contact');
  if (!section) return;

  // ── Wire WhatsApp and email links ─────────────────────────────────
  const waNumber = section.dataset.whatsapp;
  const emailAddr = section.dataset.email;

  if (waNumber) {
    const waBtn = section.querySelector('.px-contact-whatsapp');
    if (waBtn) waBtn.href = `https://wa.me/${waNumber.replace(/\D/g, '')}`;
  }

  if (emailAddr) {
    const emailBtn = section.querySelector('.px-contact-email');
    if (emailBtn) emailBtn.href = `mailto:${emailAddr}`;
  }

  // ── Form validation ───────────────────────────────────────────────
  const form     = section.querySelector('.px-contact-form');
  const success  = section.querySelector('.px-contact-success');
  if (!form) return;

  const rules = {
    name: {
      required: true,
      validate: v => v.trim().length >= 2,
      msg: 'Παρακαλώ εισάγετε ονοματεπώνυμο (τουλάχιστον 2 χαρακτήρες).',
    },
    email: {
      required: true,
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msg: 'Παρακαλώ εισάγετε έγκυρη διεύθυνση email.',
    },
    phone: {
      required: false,
      validate: v => !v.trim() || /^[\d\s\+\-\(\)]{7,20}$/.test(v.trim()),
      msg: 'Παρακαλώ εισάγετε έγκυρο τηλέφωνο.',
    },
    message: {
      required: true,
      validate: v => v.trim().length >= 10,
      msg: 'Παρακαλώ γράψτε τουλάχιστον 10 χαρακτήρες.',
    },
    consent: {
      required: true,
      validate: (_, el) => el.checked,
      msg: 'Απαιτείται η αποδοχή της Πολιτικής Απορρήτου.',
    },
  };

  function getField(name) {
    return form.querySelector(`[name="${name}"]`);
  }

  function getErrorEl(name) {
    const field = getField(name);
    if (!field) return null;
    return document.getElementById(field.getAttribute('aria-describedby')) ||
           field.closest('.px-contact-field')?.querySelector('.px-contact-error');
  }

  function validateField(name) {
    const rule  = rules[name];
    const field = getField(name);
    const errEl = getErrorEl(name);
    if (!field || !rule) return true;

    const value  = field.value;
    const valid  = rule.validate(value, field);
    const wrap   = field.closest('.px-contact-field');

    if (!valid) {
      if (errEl) errEl.textContent = rule.msg;
      if (wrap)  wrap.classList.add('has-error');
      field.setAttribute('aria-invalid', 'true');
      return false;
    }

    if (errEl) errEl.textContent = '';
    if (wrap)  wrap.classList.remove('has-error');
    field.setAttribute('aria-invalid', 'false');
    return true;
  }

  // Inline validation on blur
  Object.keys(rules).forEach(name => {
    const field = getField(name);
    if (field) field.addEventListener('blur', () => validateField(name), { passive: true });
  });

  // ── Submit ─────────────────────────────────────────────────────────
  form.addEventListener('submit', e => {
    e.preventDefault();

    const allValid = Object.keys(rules).map(validateField).every(Boolean);
    if (!allValid) {
      const firstError = form.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.focus();
      return;
    }

    // If a real action URL is provided, post the form
    const action = section.dataset.action;
    if (action) {
      const btn = form.querySelector('.px-contact-submit');
      if (btn) { btn.disabled = true; btn.querySelector('.px-contact-submit-label').textContent = 'Αποστολή…'; }

      const data = new FormData(form);
      fetch(action, { method: 'POST', body: data })
        .then(res => { if (res.ok) showSuccess(); else throw new Error('Network error'); })
        .catch(() => { if (btn) { btn.disabled = false; btn.querySelector('.px-contact-submit-label').textContent = 'Αποστολή μηνύματος'; } });
      return;
    }

    // No action — fallback to mailto
    if (emailAddr) {
      const name    = getField('name')?.value || '';
      const email   = getField('email')?.value || '';
      const message = getField('message')?.value || '';
      window.location.href = `mailto:${emailAddr}?subject=Νέο μήνυμα από ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AEmail: ${encodeURIComponent(email)}`;
    }

    showSuccess();
  });

  function showSuccess() {
    form.hidden = true;
    if (success) {
      success.hidden = false;
      success.focus?.();
    }
  }
})();
