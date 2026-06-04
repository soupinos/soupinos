/* ============================================================
   BLOCK #27 — testimonials (render guard)
   Vanilla, IIFE, zero deps.

   Renders the block ONLY when it holds real, consented cards.
   Removes the root (and an optional wrapping section via
   data-hide-target) when there are no cards or data-render="off".
   This enforces the "no demo testimonials" rule structurally.

   Attributes on .px-ts-root:
     data-render      "auto" (default) | "off"
     data-hide-target CSS selector of an ancestor/section to remove too
   ============================================================ */
(function () {
  "use strict";

  function removeWith(root) {
    var hideSel = root.getAttribute("data-hide-target");
    var target = null;
    if (hideSel) {
      target = root.closest(hideSel) || document.querySelector(hideSel);
    }
    (target || root).remove();
  }

  function process(root) {
    var mode = (root.getAttribute("data-render") || "auto").toLowerCase();
    if (mode === "off") { removeWith(root); return; }

    var cards = root.querySelectorAll(".px-ts-card");
    if (cards.length === 0) { removeWith(root); return; }
    /* else: real, consented content present → leave as-is */
  }

  function init() {
    document.querySelectorAll(".px-ts-root").forEach(process);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
