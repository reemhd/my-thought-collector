(function () {
  var btn = document.getElementById("back-to-top");
  if (!btn) return;

  function onScroll() {
    btn.hidden = window.scrollY <= 300;
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
