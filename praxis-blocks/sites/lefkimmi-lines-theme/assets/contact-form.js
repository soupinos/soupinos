/* ============================================================
   Lefkimmi Lines — Contact form AJAX submission
   Reads llContact.ajaxUrl + llContact.nonce (wp_localize_script)
   ============================================================ */
(function () {
  "use strict";

  var form   = document.getElementById("ll-cform");
  var btnSub = form && form.querySelector("button[type=submit]");
  var okEl   = form && form.parentNode.querySelector(".form-ok");
  var errEl  = form && form.parentNode.querySelector(".form-err");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Client-side validation
    var fname  = form.querySelector("[name=fname]").value.trim();
    var femail = form.querySelector("[name=femail]").value.trim();
    var fmsg   = form.querySelector("[name=fmsg]").value.trim();
    if (!fname || !femail || !fmsg) {
      showErr(window.llContact && window.llContact.errFields
        ? window.llContact.errFields
        : "Παρακαλώ συμπληρώστε όλα τα πεδία.");
      return;
    }

    // Loading state
    if (btnSub) { btnSub.disabled = true; btnSub.dataset.orig = btnSub.textContent; btnSub.textContent = "…"; }

    var data = new FormData(form);
    data.append("action", "ll_contact");

    fetch(window.llContact ? window.llContact.ajaxUrl : "/wp-admin/admin-ajax.php", {
      method: "POST",
      body: data,
      credentials: "same-origin",
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.success) {
          form.style.display = "none";
          if (okEl) okEl.style.display = "block";
        } else {
          var code = res.data && res.data.code;
          var msg  = window.llContact && window.llContact["err_" + code]
            ? window.llContact["err_" + code]
            : (window.llContact && window.llContact.errServer) || "Σφάλμα αποστολής. Δοκιμάστε ξανά.";
          showErr(msg);
          resetBtn();
        }
      })
      .catch(function () {
        showErr((window.llContact && window.llContact.errServer) || "Σφάλμα αποστολής. Δοκιμάστε ξανά.");
        resetBtn();
      });
  });

  function showErr(msg) {
    if (!errEl) return;
    errEl.textContent = msg;
    errEl.style.display = "block";
    errEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function resetBtn() {
    if (btnSub) { btnSub.disabled = false; btnSub.textContent = btnSub.dataset.orig || "Αποστολή"; }
  }
})();
