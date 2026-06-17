/* ============================================================
   BLOCK #28 — px-social (share wiring)
   Vanilla, IIFE, zero deps.

   - Builds share URLs from the page's CANONICAL url + title at
     runtime (SEO-aware) so the shared snippet matches the indexed
     page. Never hardcodes the URL.
   - Native Web Share API where available (data-net="native"),
     graceful per-network fallback otherwise.
   - data-net="link" copies the canonical URL to the clipboard and
     briefly flips the button to a confirmed state.

   Follow links (.px-soc-link) are plain anchors — no JS needed.

   Markup contract on each share button:
     <button class="px-soc-share" data-net="x">…</button>
       data-net ∈ native | facebook | x | linkedin | whatsapp | link
   ============================================================ */
(function () {
  "use strict";

  function canonicalUrl() {
    var link = document.querySelector('link[rel="canonical"]');
    if (link && link.href) return link.href;
    var og = document.querySelector('meta[property="og:url"]');
    if (og && og.content) return og.content;
    return window.location.href;
  }

  function shareTitle() {
    var og = document.querySelector('meta[property="og:title"]');
    if (og && og.content) return og.content;
    return document.title || "";
  }

  function networkUrl(net, url, title) {
    var u = encodeURIComponent(url);
    var t = encodeURIComponent(title);
    switch (net) {
      case "facebook": return "https://www.facebook.com/sharer/sharer.php?u=" + u;
      case "x":        return "https://twitter.com/intent/tweet?url=" + u + "&text=" + t;
      case "linkedin": return "https://www.linkedin.com/sharing/share-offsite/?url=" + u;
      case "whatsapp": return "https://wa.me/?text=" + t + "%20" + u;
      default:         return null;
    }
  }

  function openShare(href) {
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=520");
  }

  function copyLink(btn, url) {
    function confirmCopy() {
      var prev = btn.getAttribute("aria-label") || "";
      btn.setAttribute("data-copied", "true");
      btn.setAttribute("aria-label", "Ο σύνδεσμος αντιγράφηκε");
      setTimeout(function () {
        btn.removeAttribute("data-copied");
        if (prev) btn.setAttribute("aria-label", prev);
      }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(confirmCopy).catch(function () { fallbackCopy(url, confirmCopy); });
    } else {
      fallbackCopy(url, confirmCopy);
    }
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    if (done) done();
  }

  function handle(btn) {
    var net = btn.getAttribute("data-net") || "link";
    var url = canonicalUrl();
    var title = shareTitle();

    if (net === "link") { copyLink(btn, url); return; }

    if (net === "native") {
      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function () {});
      } else {
        /* no native share → fall back to copy */
        copyLink(btn, url);
      }
      return;
    }

    var href = networkUrl(net, url, title);
    if (href) openShare(href);
  }

  function init() {
    document.querySelectorAll(".px-soc-share").forEach(function (btn) {
      /* hide the native button when the API is unavailable */
      if (btn.getAttribute("data-net") === "native" && !navigator.share) {
        var li = btn.closest("li");
        (li || btn).remove();
        return;
      }
      btn.addEventListener("click", function (e) { e.preventDefault(); handle(btn); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
