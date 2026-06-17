/* ============================================================
   BLOCK #31 — px-quick-answer (optional Question JSON-LD)
   Vanilla, IIFE, zero deps.

   For each .px-qa with data-schema!="off", emits a Question JSON-LD
   built from the rendered .px-qa__q / .px-qa__a so the structured
   data always matches the visible answer (featured-snippet support).

   If several .px-qa blocks are present they are emitted together as a
   single QAPage. CSS handles all presentation — this file is schema
   only and is safe to omit if you don't want structured data.

   Markup contract:
     <div class="px-qa" data-schema="on">
       <h2 class="px-qa__q">…question…</h2>
       <p  class="px-qa__a">…40–55 word answer…</p>
     </div>
   ============================================================ */
(function () {
  "use strict";

  function text(el) { return el ? el.textContent.replace(/\s+/g, " ").trim() : ""; }

  function init() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll(".px-qa"));
    if (!blocks.length) return;

    var questions = [];
    blocks.forEach(function (block) {
      if ((block.getAttribute("data-schema") || "on").toLowerCase() === "off") return;
      var q = text(block.querySelector(".px-qa__q"));
      var a = text(block.querySelector(".px-qa__a"));
      if (!q || !a) return;
      questions.push({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a }
      });
    });

    if (!questions.length) return;

    var schema = {
      "@context": "https://schema.org",
      "@type": "QAPage",
      "mainEntity": questions.length === 1 ? questions[0] : questions
    };

    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-px-qa-schema", "");
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
