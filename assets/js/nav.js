(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    const hamburgerEL = document.getElementsByClassName("hamburger")[0];
    const navEl = document.getElementsByTagName("nav")[0];
    const backdropEl = document.getElementById("nav-backdrop");
    const closeEl = document.getElementById("nav-close");
    const params = new URLSearchParams(window.location.search);
    const shouldHideNav = params.get("hideNav");
    addNavEventListeners();

    if (shouldHideNav) {
      hideNav();
    }

    function addNavEventListeners() {
      hamburgerEL.addEventListener("click", toggleMobileNav);
      if (backdropEl) backdropEl.addEventListener("click", closeMobileNav);
      if (closeEl) closeEl.addEventListener("click", closeMobileNav);
    }

    function openMobileNav() {
      hamburgerEL.classList.add("open");
      navEl.classList.add("open");
      if (backdropEl) backdropEl.classList.add("open");
      document.documentElement.classList.add("nav-locked");
    }

    function closeMobileNav() {
      hamburgerEL.classList.remove("open");
      navEl.classList.remove("open");
      if (backdropEl) backdropEl.classList.remove("open");
      document.documentElement.classList.remove("nav-locked");
    }

    function toggleMobileNav() {
      if (navEl.classList.contains("open")) closeMobileNav();
      else openMobileNav();
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
    .addClass("open");
  $(".collapsible")
    .find(".trigger")
    .on("click", function () {
      $(this).closest(".collapsible").find(".col_content").slideToggle("350");
      $(this).find(".icon").toggleClass("open");
    });
  // Ensure search results stay on developers.procore.com under /documentation
  var basePath = "/documentation";
  var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById("search-input"),
    resultsContainer: document.getElementById("results-container"),
    json: basePath + "/search.json",
    searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
    noResultsText: '<li class="no-results">No results found</li>',
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

  // Clear-search ("X") button — appears when the field has text
  (function () {
    var searchInput = document.getElementById("search-input");
    var clearBtn = document.getElementById("search-clear");
    var resultsContainer = document.getElementById("results-container");
    if (!searchInput || !clearBtn) return;
    searchInput.addEventListener("input", function () {
      clearBtn.classList.toggle("visible", searchInput.value.length > 0);
    });
    clearBtn.addEventListener("click", function () {
      searchInput.value = "";
      if (resultsContainer) resultsContainer.innerHTML = "";
      clearBtn.classList.remove("visible");
      searchInput.focus();
    });
  })();

  // Helper function to check if a link should be skipped during rewriting
  function shouldSkipLink($link, originalHref) {
    // Skip if already processed, missing href, or special protocol links
    if ($link.data("original-href") || !originalHref) {
      return true;
    }

    // Skip special protocol links (anchors, mailto, javascript, data, vbscript)
    var specialProtocols = ["#", "mailto:", "javascript:", "data:", "vbscript:"];
    return specialProtocols.some(function(protocol) {
      return originalHref.startsWith(protocol);
    });
  }

  // Function to rewrite search result links for iframe display
  function rewriteSearchResultLinks() {
    if (window.self !== window.top) {
      try {
        var parentOrigin = window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0
          ? window.location.ancestorOrigins[0]
          : document.referrer ? new URL(document.referrer).origin : null;

        if (parentOrigin) {
          $("#results-container a").each(function() {
            var $link = $(this);
            var originalHref = $link.attr("href");

            // Skip if already processed or special links
            if (shouldSkipLink($link, originalHref)) {
              return;
            }

            // Get the path from the href
            var path = originalHref;
            if (!path.startsWith("/")) {
              path = "/" + path;
            }

            // Store original and set to parent origin for hover display
            $link.data("original-href", originalHref);
            $link.attr("href", parentOrigin + path);
          });
        }
      } catch (err) {
        console.warn("Could not rewrite search result links:", err);
      }
    }
  }

  // Function to rewrite navigation links for iframe display
  function rewriteNavigationLinks() {
    if (window.self !== window.top) {
      try {
        var parentOrigin = window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0
          ? window.location.ancestorOrigins[0]
          : document.referrer ? new URL(document.referrer).origin : null;

        if (parentOrigin) {
          // Find all navigation links (nav a elements)
          $("nav a").each(function() {
            var $link = $(this);
            var originalHref = $link.attr("href");

            // Skip if already processed or special links
            if (shouldSkipLink($link, originalHref)) {
              return;
            }

            // Extract path from href (handle both absolute and relative URLs)
            var path = originalHref;
            try {
              // If it's an absolute URL, extract just the pathname
              if (path.startsWith("http://") || path.startsWith("https://")) {
                var url = new URL(path);
                path = url.pathname + (url.search || "") + (url.hash || "");
              }
            } catch (e) {
              // If URL parsing fails, treat as relative path
              console.warn("Could not parse URL:", path, e);
            }

            // Ensure path starts with /
            if (!path.startsWith("/")) {
              path = "/" + path;
            }

            // Store original and set to parent origin for hover display
            $link.data("original-href", originalHref);
            $link.attr("href", parentOrigin + path);
          });
        }
      } catch (err) {
        console.warn("Could not rewrite navigation links:", err);
      }
    }
  }

  // Use MutationObserver to rewrite search result links when they're added
  if (window.self !== window.top) {
    var resultsContainer = document.getElementById("results-container");
    if (resultsContainer) {
      var observer = new MutationObserver(function(mutations) {
        rewriteSearchResultLinks();
      });
      observer.observe(resultsContainer, {
        childList: true,
        subtree: true
      });
    }
    
    // Rewrite navigation links when page loads (nav is static HTML, so no need for MutationObserver)
    $(document).ready(function() {
      rewriteNavigationLinks();
    });
  }
})();
