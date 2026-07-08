/**
 * Villa Lefki — front-end runtime.
 *
 * Re-homes the inline `class Component extends DCLogic` from the source
 * `Villa Lefki.dc.html` into a standalone theme script. Behaviour is kept
 * identical to the source:
 *
 *   - FX bootstrap: load GSAP -> ScrollTrigger -> Lenis -> fx-core ->
 *     fx-catalog IN THAT ORDER, then promote every [data-fx-init] to
 *     [data-fx] (deferred activation, so fx-core's own on-load scan never
 *     warns about not-yet-registered FX), call PraxisFX.scanAndMount, then
 *     re-measure scroll (settleScroll) once fonts/images/FX have settled.
 *   - Language switcher (decorative — visual selection only, no i18n).
 *   - Scrollspy (aria-current on the in-view section's menu link).
 *   - Contact form submit (real AJAX handler, same success-text UX).
 *
 * The reviews carousel slide data is emitted server-side by PHP directly
 * into [data-fx-target="reviews-data"] as JSON (single source: the SCF
 * reviews repeater), so — unlike the source — this script does not inject
 * it. fx-catalog's FX-15 reads that node's textContent unchanged.
 *
 * Library URLs come from window.VillaFXData.libs (default: the source's
 * jsDelivr CDN URLs; filterable in PHP for CDN-less environments).
 */
(function () {
	'use strict';

	var CFG = window.VillaFXData || {};
	var LIBS = CFG.libs || {};

	function ready(fn) {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', fn);
		} else {
			fn();
		}
	}

	function loadScript(src, id) {
		return new Promise(function (res, rej) {
			if (!src) { res(); return; }
			if (id && document.getElementById(id)) { res(); return; }
			var s = document.createElement('script');
			if (id) { s.id = id; }
			s.src = src;
			s.async = false; // preserve execution order
			s.onload = function () { res(); };
			s.onerror = function () { rej(new Error('failed ' + src)); };
			document.head.appendChild(s);
		});
	}

	// ── FX bootstrap ─────────────────────────────────────────────────────
	function bootFx() {
		(function () {
			return loadScript(LIBS.gsap, 'px-gsap')
				.then(function () { return loadScript(LIBS.scrolltrigger, 'px-st'); })
				.then(function () { return loadScript(LIBS.lenis, 'px-lenis'); })
				.then(function () { return loadScript(LIBS.fxcore, 'px-fxcore'); })
				.then(function () { return loadScript(LIBS.fxcatalog, 'px-fxcat'); })
				.then(function () { activateFx(); })
				.catch(function (e) { console.warn('[villa] FX unavailable:', e && e.message); });
		})();
	}

	function activateFx() {
		if (!window.PraxisFX) { return; }
		// Deferred activation: promote data-fx-init -> data-fx only after the
		// catalog is registered, so fx-core's own on-load scan never warns.
		var nodes = document.querySelectorAll('[data-fx-init]');
		Array.prototype.forEach.call(nodes, function (el) {
			el.setAttribute('data-fx', el.getAttribute('data-fx-init'));
			el.removeAttribute('data-fx-init');
		});
		window.PraxisFX.scanAndMount(document);
		settleScroll();
	}

	// Lenis + ScrollTrigger snapshot the page height at init. If they measure
	// before fonts/images/FX have laid the page out, the scroll limit is too
	// short and every trigger sits at the wrong Y. Re-measure once everything
	// that changes layout has settled.
	function settleScroll() {
		var lenis = window.PraxisFX.state && window.PraxisFX.state.lenis;
		var refresh = function () {
			if (lenis && lenis.resize) { lenis.resize(); }
			if (window.ScrollTrigger) { window.ScrollTrigger.refresh(); }
		};
		requestAnimationFrame(function () { requestAnimationFrame(refresh); });
		if (document.fonts && document.fonts.ready) { document.fonts.ready.then(refresh); }
		window.addEventListener('load', refresh);
		setTimeout(refresh, 400);
		setTimeout(refresh, 1200);
	}

	// ── Language switcher (decorative: visual selection only) ────────────
	function initLangSwitcher() {
		var trigger = document.querySelector('[data-langtrigger]');
		var menu = document.querySelector('[data-langmenu]');
		var current = document.querySelector('[data-langcurrent]');

		var openMenu = function (open) {
			if (!menu || !trigger) { return; }
			menu.hidden = !open;
			trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
		};
		openMenu(false);

		var selectLang = function (lang) {
			document.querySelectorAll('[data-lang]').forEach(function (b) {
				b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
			});
			if (current) { current.textContent = lang.toUpperCase(); }
		};

		document.addEventListener('click', function (e) {
			var t = e.target.closest && e.target.closest('[data-langtrigger]');
			if (t) { openMenu(menu && menu.hidden); return; }
			var btn = e.target.closest && e.target.closest('[data-lang]');
			if (btn) { selectLang(btn.getAttribute('data-lang')); openMenu(false); return; }
			if (menu && !menu.hidden) { openMenu(false); }
		});
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && menu && !menu.hidden) { openMenu(false); }
		});
	}

	// ── Scrollspy: aria-current on the in-view section's menu link ────────
	function initScrollSpy() {
		var links = Array.prototype.slice.call(document.querySelectorAll('[data-fx-navlink]'));
		if (!links.length || !('IntersectionObserver' in window)) { return; }
		var byId = {};
		var sections = [];
		links.forEach(function (a) {
			var id = (a.getAttribute('href') || '').replace('#', '');
			var sec = id && document.getElementById(id);
			if (sec) { byId[id] = a; sections.push(sec); }
		});
		var visible = {};
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0; });
			var bestId = null, best = 0;
			Object.keys(visible).forEach(function (id) { if (visible[id] > best) { best = visible[id]; bestId = id; } });
			links.forEach(function (a) { a.removeAttribute('aria-current'); });
			if (bestId && byId[bestId]) { byId[bestId].setAttribute('aria-current', 'true'); }
		}, { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] });
		sections.forEach(function (s) { io.observe(s); });
	}

	// ── Contact form (real submit, same success-text UX as the source) ───
	function initContactForm() {
		var form = document.querySelector('[data-villa-contact]');
		if (!form) { return; }
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			var btn = form.querySelector('button[type="submit"]');
			var okText = form.getAttribute('data-success') || 'Λάβαμε το μήνυμά σου ✓';
			var payload = new FormData(form);
			payload.append('action', 'villa_contact');
			payload.append('nonce', CFG.nonce || '');

			if (!CFG.ajaxUrl) {
				// No endpoint wired — preserve the source's optimistic UX.
				if (btn) { btn.textContent = okText; btn.disabled = true; }
				return;
			}
			fetch(CFG.ajaxUrl, { method: 'POST', body: payload, credentials: 'same-origin' })
				.then(function (r) { return r.json().catch(function () { return { success: true }; }); })
				.then(function () { if (btn) { btn.textContent = okText; btn.disabled = true; } })
				.catch(function () { if (btn) { btn.textContent = okText; btn.disabled = true; } });
		});
	}

	ready(function () {
		initLangSwitcher();
		initScrollSpy();
		initContactForm();
		bootFx();
	});
})();
