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
            if ($link.data("original-href") || !originalHref || originalHref.startsWith("#") || originalHref.startsWith("mailto:") || originalHref.startsWith("javascript:") || originalHref.startsWith("data:") || originalHref.startsWith("vbscript:")) {
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
          console.error("Error parsing URL in templateMiddleware:", e, "value:", value);
          if (value.charAt(0) === "#") return value;
          return basePath.replace(/\/$/, "") + "/" + value.replace(/^\//, "");
        }
      }
      return value;
    },
    noResultsText: "No results found",
    limit: 10,
    fuzzy: false
  });
  
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
  }
  // Handle clicks on search result links - navigate within iframe if in one
  $("#results-container").on("click", "a", function (e) {
    var $link = $(this);
    var currentHref = $link.attr("href");
    var originalHref = $link.data("original-href");

    if (!currentHref) return;

    // If in iframe and link points to parent origin, navigate within iframe
    if (window.self !== window.top) {
      try {
        var parentOrigin = window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0 
          ? window.location.ancestorOrigins[0] 
          : document.referrer ? new URL(document.referrer).origin : null;
  
        if (parentOrigin && currentHref.startsWith(parentOrigin)) {
          e.preventDefault();
          var path = new URL(currentHref).pathname + new URL(currentHref).search + new URL(currentHref).hash;
          // Update iframe location
          window.location.href = path;
          // Update parent window URL via postMessage (cross-origin safe)
          try {
            window.parent.postMessage({
              type: 'documentationNavigation',
              path: path,
              fullUrl: parentOrigin + path
            }, parentOrigin);
          } catch (e) {
            console.warn("Could not send navigation message to parent:", e);
          }
          return false;
        }
      } catch (err) {
        console.error("Error handling search result link click:", err);
      }
    }
    
    // Fallback: handle absolute URLs pointing off-site
    if (/^https?:\/\//i.test(currentHref)) {
      try {
        var u = new URL(currentHref);
        if (u.origin !== window.location.origin) {
          e.preventDefault();
          var path = u.pathname;
          if (!path.startsWith(basePath)) {
            path = basePath.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
          }
          var newUrl = path + (u.search || "") + (u.hash || "");
          window.location.href = newUrl;
          return false;
        }
      } catch (err) {
        console.error("Error handling absolute URL in search result click:", err, "href:", currentHref);
      }
    }
  });

  // If in an iframe, rewrite link hrefs for hover display but intercept clicks to navigate within iframe
  if (window.self !== window.top) {
    try {
      var parentOrigin = window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0
        ? window.location.ancestorOrigins[0]
        : document.referrer ? new URL(document.referrer).origin : null;

      if (parentOrigin) {
        // Function to get the actual path from a href
        function getPathFromHref(href) {
          if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("javascript:") || href.startsWith("data:") || href.startsWith("vbscript:")) {
            return null;
          }
          try {
            if (href.match(/^https?:\/\//)) {
              return new URL(href).pathname + new URL(href).search + new URL(href).hash;
            } else {
              // Relative URL
              return href.startsWith("/") ? href : "/" + href;
            }
          } catch (e) {
            console.error("Error parsing href in getPathFromHref:", e, "href:", href);
            return href.startsWith("/") ? href : "/" + href;
          }
        }

        // Rewrite navigation links for hover display
        $("nav a").each(function() {
          var $link = $(this);
          var originalHref = $link.attr("href");
          var path = getPathFromHref(originalHref);

          if (path && !path.startsWith("#") && !path.startsWith("mailto:") && !path.startsWith("javascript:") && !path.startsWith("data:") && !path.startsWith("vbscript:")) {
            // Store original href in data attribute
            $link.data("original-href", originalHref);
            // Set href to parent origin for hover display
            $link.attr("href", parentOrigin + path);
          }
        });

        // Rewrite links in main content area for hover display
        $("main a").each(function() {
          var $link = $(this);
          var originalHref = $link.attr("href");
          var path = getPathFromHref(originalHref);

          if (path && !path.startsWith("#") && !path.startsWith("mailto:") && !path.startsWith("javascript:") && !path.startsWith("data:") && !path.startsWith("vbscript:")) {
            // Store original href in data attribute
            $link.data("original-href", originalHref);
            // Set href to parent origin for hover display
            $link.attr("href", parentOrigin + path);
          }
        });

        // Intercept clicks on navigation and content links to navigate within iframe
        $(document).on("click", "nav a, main a", function(e) {
          var $link = $(this);
          var originalHref = $link.data("original-href");
          var currentHref = $link.attr("href");

          // If we have a stored original href, use it; otherwise check current href
          var hrefToUse = originalHref || currentHref;

          // Skip external links, anchors, and special protocols
          if (!hrefToUse || hrefToUse.startsWith("#") || hrefToUse.startsWith("mailto:") || hrefToUse.startsWith("javascript:") || hrefToUse.startsWith("data:") || hrefToUse.startsWith("vbscript:")) {
            return; // Let default behavior handle these
          }

          // If current href points to parent origin (for display), navigate using the path within iframe
          if (currentHref && currentHref.startsWith(parentOrigin)) {
            e.preventDefault();
            var path = new URL(currentHref).pathname + new URL(currentHref).search + new URL(currentHref).hash;
            // Update iframe location
            window.location.href = path;
            // Update parent window URL via postMessage (cross-origin safe)
            try {
              window.parent.postMessage({
                type: 'documentationNavigation',
                path: path,
                fullUrl: parentOrigin + path
              }, parentOrigin);
            } catch (e) {
              console.warn("Could not send navigation message to parent:", e);
            }
            return false;
          } else if (hrefToUse.match(/^https?:\/\//) && !hrefToUse.startsWith(window.location.origin) && !hrefToUse.startsWith(parentOrigin)) {
            // External link (not parent origin, not current origin) - let it open normally
            return;
          } else if (originalHref && originalHref.startsWith(parentOrigin)) {
            // Original href was parent origin - navigate within iframe
            e.preventDefault();
            var path = new URL(originalHref).pathname + new URL(originalHref).search + new URL(originalHref).hash;
            // Update iframe location
            window.location.href = path;
            // Update parent window URL via postMessage (cross-origin safe)
            try {
              window.parent.postMessage({ 
                type: 'documentationNavigation', 
                path: path,
                fullUrl: parentOrigin + path
              }, parentOrigin);
            } catch (e) {
              console.warn("Could not send navigation message to parent:", e);
            }
            return false;
          } else if (hrefToUse && !hrefToUse.match(/^https?:\/\//)) {
            // Relative link - navigate within iframe and update parent URL
            e.preventDefault();
            var path = hrefToUse.startsWith("/") ? hrefToUse : "/" + hrefToUse;
            // Update iframe location
            window.location.href = path;
            // Update parent window URL via postMessage (cross-origin safe)
            try {
              window.parent.postMessage({
                type: 'documentationNavigation',
                path: path,
                fullUrl: parentOrigin + path
              }, parentOrigin);
            } catch (e) {
              console.warn("Could not send navigation message to parent:", e);
            }
            return false;
          }
          // For other cases, let default behavior work
        });
      }
    } catch (err) {
      console.warn("Could not rewrite links for parent origin:", err);
    }
  }
})();
