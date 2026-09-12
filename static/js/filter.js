(function () {
  var dropdown = document.getElementById("filter-dropdown");
  var btn = document.getElementById("filter-btn");
  var menu = document.getElementById("filter-menu");
  if (!dropdown || !btn || !menu) return;

  var options = menu.querySelectorAll(".filter-option");
  var postItems = document.querySelectorAll(".post-item");
  var yearHeaders = document.querySelectorAll(".year-header");

  var currentYear = String(new Date().getFullYear());
  yearHeaders.forEach(function (header) {
    if (header.getAttribute("data-year") === currentYear) {
      header.dataset.isCurrentYear = "true";
    }
  });

  function openMenu(open) {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    openMenu(menu.hidden);
  });

  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      openMenu(false);
    }
  });

  function applyFilter(tag) {
    postItems.forEach(function (item) {
      var visible = !tag || item.getAttribute("data-tags") === tag;
      item.hidden = !visible;
    });

    yearHeaders.forEach(function (header) {
      if (header.dataset.isCurrentYear === "true") {
        header.hidden = true;
        return;
      }
      var year = header.getAttribute("data-year");
      var anyVisible = false;
      postItems.forEach(function (item) {
        if (item.getAttribute("data-year") === year && !item.hidden) {
          anyVisible = true;
        }
      });
      header.hidden = !anyVisible;
    });
  }

  options.forEach(function (option) {
    option.addEventListener("click", function () {
      var tag = option.getAttribute("data-tag");
      options.forEach(function (o) {
        o.classList.toggle("is-active", o === option);
      });
      btn.textContent = tag || "filter";
      btn.classList.toggle("is-active", !!tag);
      applyFilter(tag);
      openMenu(false);
    });
  });

  applyFilter("");
})();
