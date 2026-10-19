/* Portfolio behaviour. Each feature is its own function and fails safely. */
(function () {
  "use strict";

  // Edit this one line if your email changes.
  var EMAIL = "Singh.nikhil9655@gmail.com";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Copyright year */
  function initYear() {
    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* Mobile menu */
  function initMenu() {
    var btn = $("#menuBtn"), list = $("#navLinks");
    if (!btn || !list) return;
    function setOpen(open) {
      list.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    }
    btn.addEventListener("click", function () { setOpen(!list.classList.contains("open")); });
    list.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* Scroll reveal + active nav link */
  function initScroll() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); reveal.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { reveal.observe(el); });

    var links = $$("#navLinks a");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) {
      var s = $(a.getAttribute("href"));
      if (s) spy.observe(s);
    });
  }

  /* Project filter: All, Web3, AI/ML */
  function initFilter() {
    var buttons = $$(".chip-btn"), cards = $$("#projectGrid .card");
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.dataset.filter;
        buttons.forEach(function (x) {
          var on = x === b;
          x.classList.toggle("active", on);
          x.setAttribute("aria-pressed", String(on));
        });
        cards.forEach(function (c) { c.hidden = !(f === "all" || c.dataset.cat === f); });
      });
    });
  }

  /* Case-study modal: Escape and outside click close it */
  function initModal() {
    var dlg = $("#modal");
    if (!dlg || typeof dlg.showModal !== "function") return; // case studies stay hidden; cards still readable
    var last = null;

    function open(card, trigger) {
      var tpl = $(".case", card);
      if (!tpl) return;
      last = trigger;
      $("#modalCat").textContent = $(".cat", card).textContent;
      $("#modalTitle").textContent = $("h3", card).textContent;
      $("#modalContent").innerHTML = tpl.innerHTML;
      dlg.showModal();
    }
    function close() { dlg.close(); }

    $$("[data-open]").forEach(function (b) {
      b.addEventListener("click", function () { open(b.closest(".card"), b); });
    });
    $("#modalClose").addEventListener("click", close);
    $("#modalBack").addEventListener("click", function () {
      close();
      var p = $("#projects");
      if (p) p.scrollIntoView({ behavior: "smooth" });
    });
    // Clicking the dark backdrop (the dialog element itself) closes it
    dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
    dlg.addEventListener("close", function () { if (last) last.focus(); });
    // Escape is handled natively by <dialog>
  }

  /* Certificate lightbox */
  function initLightbox() {
    var dlg = $("#lightbox");
    if (!dlg || typeof dlg.showModal !== "function") return;
    var last = null;
    $$(".cert-thumb").forEach(function (b) {
      b.addEventListener("click", function () {
        last = b;
        $("#lightImg").src = b.dataset.full;
        $("#lightImg").alt = b.dataset.alt || "";
        dlg.showModal();
      });
    });
    $("#lightClose").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () { if (last) last.focus(); });
  }

  /* Copy email */
  function initCopy() {
    var btn = $("#copyEmail"), msg = $("#copyMsg");
    if (!btn) return;
    function say(t) { msg.textContent = t; setTimeout(function () { msg.textContent = ""; }, 3000); }
    function fallback() {
      var t = document.createElement("textarea");
      t.value = EMAIL; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(t);
      say(ok ? "Email copied." : "Copy failed. Select the address and copy it manually: " + EMAIL);
    }
    btn.addEventListener("click", function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(EMAIL).then(function () { say("Email copied."); }, fallback);
      } else { fallback(); }
    });
  }

  /* Contact form: validates, then opens a pre-filled mailto draft */
  function initForm() {
    var form = $("#contactForm"), out = $("#formMsg");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var n = form.elements.name, m = form.elements.email, t = form.elements.message;
      var bad = [];
      [n, m, t].forEach(function (f) { f.setAttribute("aria-invalid", "false"); });
      if (!n.value.trim()) bad.push(n);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.value.trim())) bad.push(m);
      if (!t.value.trim()) bad.push(t);
      out.className = "form-msg";
      if (bad.length) {
        bad.forEach(function (f) { f.setAttribute("aria-invalid", "true"); });
        out.classList.add("err");
        out.textContent = "Please enter your name, a valid email address and a message.";
        bad[0].focus();
        return;
      }
      var subject = encodeURIComponent("Portfolio message from " + n.value.trim());
      var body = encodeURIComponent(t.value.trim() + "\n\nFrom: " + n.value.trim() + " (" + m.value.trim() + ")");
      window.location.href = "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;
      out.textContent = "Your email app should open with the draft. Press send there to finish.";
    });
  }

  initYear(); initMenu(); initScroll(); initFilter(); initModal(); initLightbox(); initCopy(); initForm();
})();
