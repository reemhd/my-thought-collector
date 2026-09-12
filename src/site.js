/* Reem/ — progressive enhancement only.
   Everything below is optional: with JS off, all posts are visible, the logo
   is a static eye, and "back to top" is simply absent. */

(function () {
  "use strict";

  /* --- pyramid logo: follows the cursor, blinks on its own ---------------- */

  function initLogo() {
    var svg = document.querySelector("[data-logo]");
    if (!svg) return;

    var face = svg.querySelector(".logo__face");
    var iris = svg.querySelector(".logo__iris");
    var pupil = svg.querySelector(".logo__pupil");
    if (!face || !iris || !pupil) return;

    var CENTER = { x: 90, y: 108 };
    var MAX_OFFSET = 8;
    var OPEN_IRIS = 19;
    var OPEN_PUPIL = 15;

    var blinking = false;
    var hovered = false;

    function paint() {
      var colour = hovered ? "#fdba74" : "#e5e5e5";
      face.setAttribute("fill", colour);
      iris.setAttribute("fill", colour);
      iris.setAttribute("ry", blinking ? 2 : OPEN_IRIS);
      pupil.setAttribute("ry", blinking ? 0 : OPEN_PUPIL);
    }

    function look(clientX, clientY) {
      var rect = svg.getBoundingClientRect();
      var dx = clientX - (rect.left + rect.width / 2);
      var dy = clientY - (rect.top + rect.height / 2);
      var distance = Math.min(Math.sqrt(dx * dx + dy * dy), MAX_OFFSET);
      var angle = Math.atan2(dy, dx);
      pupil.setAttribute("cx", CENTER.x + distance * Math.cos(angle));
      pupil.setAttribute("cy", CENTER.y + distance * Math.sin(angle));
    }

    window.addEventListener("mousemove", function (e) {
      look(e.clientX, e.clientY);
    });

    window.addEventListener(
      "touchmove",
      function (e) {
        if (e.touches.length) look(e.touches[0].clientX, e.touches[0].clientY);
      },
      { passive: true }
    );

    svg.addEventListener("mouseenter", function () {
      hovered = true;
      paint();
    });

    svg.addEventListener("mouseleave", function () {
      hovered = false;
      paint();
    });

    (function scheduleBlink() {
      setTimeout(function () {
        blinking = true;
        paint();
        setTimeout(function () {
          blinking = false;
          paint();
        }, 150);
        scheduleBlink();
      }, Math.random() * 3000 + 2000);
    })();
  }

  /* --- tag filter --------------------------------------------------------- */

  function initFilter() {
    var root = document.querySelector("[data-filter]");
    if (!root) return;

    var toggle = root.querySelector(".filter__toggle");
    var menu = root.querySelector(".filter__menu");
    var options = Array.prototype.slice.call(root.querySelectorAll(".filter__option"));
    var cards = Array.prototype.slice.call(document.querySelectorAll(".post-card"));
    var years = Array.prototype.slice.call(document.querySelectorAll(".year"));
    var empty = document.querySelector("[data-empty]");

    function closeMenu() {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }

    function apply(tag) {
      cards.forEach(function (card) {
        var tags = (card.dataset.tags || "").split("|");
        card.hidden = Boolean(tag) && tags.indexOf(tag) === -1;
      });

      // A year heading is only meaningful while it still has visible posts.
      years.forEach(function (year) {
        var visible = year.querySelectorAll(".post-card:not([hidden])").length;
        year.hidden = visible === 0;
      });

      if (empty) empty.hidden = cards.some(function (c) { return !c.hidden; });

      toggle.textContent = tag || "filter";
      toggle.dataset.active = tag ? "true" : "false";
      options.forEach(function (option) {
        option.setAttribute("aria-checked", String((option.dataset.tag || "") === (tag || "")));
      });
    }

    toggle.addEventListener("click", function () {
      if (menu.hidden) openMenu();
      else closeMenu();
    });

    options.forEach(function (option) {
      option.addEventListener("click", function () {
        apply(option.dataset.tag || "");
        closeMenu();
        toggle.focus();
      });
    });

    document.addEventListener("mousedown", function (e) {
      if (!root.contains(e.target)) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) {
        closeMenu();
        toggle.focus();
      }
    });

    closeMenu();
  }

  /* --- back to top -------------------------------------------------------- */

  function initBackToTop() {
    var button = document.querySelector("[data-to-top]");
    if (!button) return;

    function sync() {
      button.hidden = window.scrollY <= 300;
    }

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  /* --- wide tables get their own scroll container ------------------------- */

  function initTables() {
    document.querySelectorAll(".prose table").forEach(function (table) {
      if (table.parentElement.classList.contains("table-scroll")) return;
      var wrap = document.createElement("div");
      wrap.className = "table-scroll";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }

  initLogo();
  initFilter();
  initBackToTop();
  initTables();
})();
