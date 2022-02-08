(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var hamburgerEL = document.getElementsByClassName("hamburger")[0];
    var navEl = document.getElementsByTagName("nav")[0];
    addNavEventListeners();

    function addNavEventListeners() {
      hamburgerEL.addEventListener("click", toggleMobileNav);
    }

    function toggleMobileNav() {
      if (hamburgerEL.classList.contains("open")) {
        hamburgerEL.classList.remove("open");
        navEl.classList.remove("open");
      } else {
        hamburgerEL.classList.add("open");
        navEl.classList.add("open");
      }
    }
  });
})();
