(function () {
  "use strict";
  var KEY = "ll_cookie_consent";

  function init() {
    if (localStorage.getItem(KEY)) return;
    var banner = document.getElementById("ll-cookie");
    if (!banner) return;
    banner.removeAttribute("hidden");

    document.getElementById("ll-cookie-accept").addEventListener("click", function () {
      localStorage.setItem(KEY, "all");
      banner.setAttribute("hidden", "");
    });
    document.getElementById("ll-cookie-necessary").addEventListener("click", function () {
      localStorage.setItem(KEY, "necessary");
      banner.setAttribute("hidden", "");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
