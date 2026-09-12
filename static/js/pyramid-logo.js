(function () {
  var svg = document.getElementById("pyramid-logo");
  if (!svg) return;

  var base = document.getElementById("pyramid-base");
  var eye = document.getElementById("pyramid-eye");
  var pupil = document.getElementById("pyramid-pupil");

  var hovered = false;
  var blinking = false;

  function applyHover() {
    var fill = hovered ? "#fdba74" : "#e5e5e5";
    base.setAttribute("fill", fill);
    eye.setAttribute("fill", fill);
  }

  svg.addEventListener("mouseenter", function () {
    hovered = true;
    applyHover();
  });
  svg.addEventListener("mouseleave", function () {
    hovered = false;
    applyHover();
  });

  function movePupil(clientX, clientY) {
    var rect = svg.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var dx = clientX - cx;
    var dy = clientY - cy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    var d = Math.min(dist, 8);
    var x = 90 + d * Math.cos(angle);
    var y = 108 + d * Math.sin(angle);
    pupil.setAttribute("cx", x);
    pupil.setAttribute("cy", y);
  }

  window.addEventListener("mousemove", function (e) {
    movePupil(e.clientX, e.clientY);
  });
  window.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches.length > 0) {
        movePupil(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );

  function scheduleBlink() {
    var delay = Math.random() * 3000 + 2000;
    setTimeout(function () {
      blinking = true;
      eye.setAttribute("ry", "2");
      pupil.setAttribute("ry", "0");
      setTimeout(function () {
        blinking = false;
        eye.setAttribute("ry", "19");
        pupil.setAttribute("ry", "15");
        scheduleBlink();
      }, 150);
    }, delay);
  }

  scheduleBlink();
})();
