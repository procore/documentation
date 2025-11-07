(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    const hamburgerEL = document.getElementsByClassName("hamburger")[0];
    const navEl = document.getElementsByTagName("nav")[0];
    const params = new URLSearchParams(window.location.search);
    const shouldHideNav = params.get("hideNav");
    addNavEventListeners();

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
  // Ensure search results stay on developers.procore.com under /documentation
  var basePath = "/documentation";
  var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById("search-input"),
    resultsContainer: document.getElementById("results-container"),
    json: basePath + "/search.json",
    searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
    // Force URLs from the index to resolve to this site's origin and base path
    templateMiddleware: function (prop, value) {
      if (prop === "url" && value) {
        try {
          var u = new URL(value, window.location.origin);
          var path = u.pathname;
          if (!path.startsWith(basePath)) {
            path = basePath.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
          }
          // Return a same-origin, site-relative URL (preserves query/hash)
          return path + (u.search || "") + (u.hash || "");
        } catch (e) {
          // Fallback for odd values (e.g., "page.html" or "#anchor")
          if (value.charAt(0) === "#") return value;
          return basePath.replace(/\/$/, "") + "/" + value.replace(/^\//, "");
        }
      }
      return value;
    },
  });
  // Defensive: if a result link is absolute and points off-site, rewrite it to this host
  $("#results-container").on("click", "a", function (e) {
    var href = $(this).attr("href");
    if (!href) return;
    // Only act on absolute URLs
    if (/^https?:\/\//i.test(href)) {
      try {
        var u = new URL(href);
        if (u.origin !== window.location.origin) {
          e.preventDefault();
          var path = u.pathname;
          if (!path.startsWith(basePath)) {
            path = basePath.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
          }
          window.location.href = path + (u.search || "") + (u.hash || "");
        }
      } catch (err) {
        // ignore malformed URLs
      }
    }
  });
})();
