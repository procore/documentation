(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    const hamburgerEL = document.getElementsByClassName("hamburger")[0];
    const navEl = document.getElementsByTagName("nav")[0];
    const params = new URLSearchParams(window.location.search);
    const shouldHideNav = params.get("hideNav");
    addNavEventListeners();
    console.log("hello");

    if (shouldHideNav) {
      hideNav();
    }

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

    function hideNav() {
      navEl.remove();
      hamburgerEL.remove();
      const articleEl = document.getElementsByTagName("article")[0];
      const sectionEl = document.getElementsByTagName("section")[0];
      articleEl.classList.add("no-padding");
      sectionEl.classList.add("full-width");
    }
  });
  $('.col_content:not(:has("dd.active"))').hide();
  $(".collapsible")
    .has("dd.active")
    .find(".icon")
    .toggleClass(["fa-square-minus", "fa-square-plus"]);
  $(".collapsible")
    .find(".trigger")
    .on("click", function () {
      $(this).closest(".collapsible").find(".col_content").slideToggle("350");
      $(this).find(".icon").toggleClass(["fa-square-minus", "fa-square-plus"]);
    });
})();
