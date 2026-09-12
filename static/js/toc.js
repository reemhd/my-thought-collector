(function () {
  var links = document.querySelectorAll(".toc-link");
  if (!links.length) return;

  var headings = Array.prototype.map
    .call(links, function (link) {
      return document.getElementById(link.getAttribute("data-toc-target"));
    })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-toc-target") === id);
    });
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    headings.forEach(function (h) {
      observer.observe(h);
    });
  }

  if (headings.length) setActive(headings[0].id);
})();
