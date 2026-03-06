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
  var searchInputEl = document.getElementById("search-input");
  var resultsContainerEl = document.getElementById("results-container");
  var searchDebounceTimer = null;

  function parentOrigin() {
    try {
      if (window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0) {
        return window.location.ancestorOrigins[0];
      }
      if (document.referrer) {
        return new URL(document.referrer).origin;
      }
    } catch (e) {
      console.warn("Could not determine parent origin:", e);
    }
    return null;
  }

  function searchApiBase() {
    // 1. When embedded in an iframe the parent app IS the dev-portal; use its
    //    origin so the request is always same-origin from the parent's point
    //    of view (avoids CORS entirely).
    var parent = parentOrigin();
    if (parent) return parent;

    // 2. Value baked in at Jekyll build/serve time via the DEV_PORTAL_BASE_URL
    //    environment variable (see _plugins/env_config.rb).  This is the
    //    authoritative config-time answer and is preferred over runtime
    //    hostname sniffing.
    if (window.DEV_PORTAL_BASE_URL && window.DEV_PORTAL_BASE_URL !== "") {
      return window.DEV_PORTAL_BASE_URL;
    }

    // 3. Runtime fallback — keeps things working even if the global is somehow
    //    absent (e.g. an older cached build).
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "http://localhost:3001";
    }
    if (window.location.hostname.indexOf("github.io") !== -1) {
      return "https://developers.procore.com";
    }
    return window.location.origin;
  }

  function buildSearchUrl(query) {
    return (
      searchApiBase() +
      "/api/v1/documentations?q=" +
      encodeURIComponent(query) +
      "&page=1&per_page=10"
    );
  }

  function clearSearchResults() {
    resultsContainerEl.innerHTML = "";
  }

  function renderSearchResults(results) {
    clearSearchResults();
    if (!results || results.length === 0) return;

    results.forEach(function(result) {
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.textContent = result.title || result.file_path || "Untitled";
      link.href = result.url || ("/documentation/" + (result.file_path || "").replace(/\.md$/, ""));
      li.appendChild(link);
      resultsContainerEl.appendChild(li);
    });
  }

  function performSearch(query) {
    if (!query || query.length < 2) {
      clearSearchResults();
      return;
    }

    fetch(buildSearchUrl(query))
      .then(function(response) {
        if (!response.ok) {
          throw new Error("Search request failed with status " + response.status);
        }
        return response.json();
      })
      .then(function(payload) {
        renderSearchResults(payload.results || []);
        rewriteSearchResultLinks();
      })
      .catch(function(error) {
        console.warn("Documentation search request failed:", error);
        clearSearchResults();
      });
  }

  if (searchInputEl && resultsContainerEl) {
    searchInputEl.addEventListener("input", function(event) {
      var query = event.target.value.trim();
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(function() {
        performSearch(query);
      }, 200);
    });
  }
  
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
