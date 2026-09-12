(function () {
  var links = document.querySelectorAll(".toc-link");
  if (!links.length) return;

  var headings = Array.prototype.map
    .call(links, function (link) {
      return document.getElementById(link.getAttribute("data-toc-target"));
    })
    .filter(Boolean);

  if (!headings.length) return;

  var OFFSET = 120;

  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-toc-target") === id);
    });
  }

  function updateActive() {
    var current = headings[0];
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top - OFFSET <= 0) {
        current = headings[i];
      } else {
        break;
      }
    }
    setActive(current.id);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateActive();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateActive();
})();
