/**
 * greek-caps.js — Strip Greek tonos before CSS text-transform:uppercase
 *
 * WHY: CSS text-transform:uppercase in Chrome/Blink does NOT remove
 * Greek tonos (acute accent) even with lang="el" on <html>.
 * Firefox follows the CSS spec and does strip them. This utility
 * produces cross-browser correct uppercase Greek via NFD normalization.
 *
 * HOW (NFD approach):
 *   NFD decomposes e.g. "ά" → "α" (U+03B1) + combining acute (U+0301).
 *   We remove combining marks U+0300–U+0307 and U+0309–U+036F,
 *   intentionally KEEPING U+0308 (diaeresis/dialytika) so that
 *   ϊ (iota with diaeresis) uppercases correctly to Ϊ, not Ι.
 *
 * USAGE (standalone):
 *   <script src="greek-caps.js"></script>
 *   Then LLGreekCaps.apply() or LLGreekCaps.stripTonosUC("Ποιοι είμαστε")
 *
 * USAGE (with px-lang / LLi18n):
 *   Call LLGreekCaps.apply() after every language switch when lang="el".
 *   The hook is: patch your i18n library's apply() to call LLGreekCaps.apply().
 *
 * IMPORTANT: targets only elements with computed text-transform:uppercase
 * that also have lang="el" (or html[lang="el"]). Processes direct text
 * nodes only — does not recurse into child element nodes.
 */
;(function (global) {
  'use strict';

  /* Regex: remove combining marks U+0300-U+0307 and U+0309-U+036F.
     U+0308 (diaeresis) is intentionally skipped.
     Built with explicit codepoints to survive all text editors/encodings. */
  var TONOS_RE = new RegExp(
    "[̀-̇̉-ͯ]",
    "g"
  );

  /**
   * Return an uppercase version of s with Greek tonos stripped.
   * Safe for any language string — non-Greek chars are unaffected.
   *
   * @param {string} s
   * @returns {string}
   */
  function stripTonosUC(s) {
    return s.normalize("NFD").replace(TONOS_RE, "").toUpperCase();
  }

  /**
   * Process direct text nodes of el, applying stripTonosUC to each.
   * Does not recurse into child element nodes.
   *
   * @param {Element} el
   */
  function processTextNodes(el) {
    Array.prototype.forEach.call(el.childNodes, function (n) {
      if (n.nodeType !== 3) return;        /* text nodes only */
      var t = n.textContent;
      if (!t.trim()) return;               /* skip whitespace-only */
      n.textContent = stripTonosUC(t);
    });
  }

  /**
   * Apply Greek caps to:
   *   1. All [data-i18n] elements whose computed text-transform is "uppercase"
   *   2. Any extra static selectors passed via the `staticSelectors` option
   *
   * Called automatically on page load and should be called again after
   * each language switch (if lang is "el").
   *
   * @param {Object}   [opts]
   * @param {string[]} [opts.staticSelectors]  Extra CSS selectors for
   *                                            hardcoded Greek uppercase
   *                                            text that has no data-i18n.
   */
  function apply(opts) {
    var lang = document.documentElement.lang || "el";
    if (lang !== "el") return;

    /* Dynamic i18n-bound elements */
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var cs = window.getComputedStyle(el);
      if (cs.textTransform !== "uppercase") return;
      processTextNodes(el);
    });

    /* Optional static elements (hardcoded text, no data-i18n) */
    var statics = (opts && opts.staticSelectors) || [];
    statics.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(processTextNodes);
    });
  }

  global.LLGreekCaps = { stripTonosUC: stripTonosUC, apply: apply };

})(window);
