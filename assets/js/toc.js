/* ============================================================
   On this page — in-page H2 navigation rail (AGX-7204)

   Builds a single-tier list of the page's H2s, keeps the current
   section highlighted while scrolling, and takes over in-page
   anchor clicks.

   The click handling is not cosmetic. _layouts/default.html sets
   <base target="_parent">, which resolves every bare <a href="#x">
   into the PARENT browsing context. On developers.procore.com the
   docs are iframed, so clicking an in-page anchor navigates the
   host page to procore.github.io/...?hideNav=true#x — the reader
   is thrown out of the frame and stranded on a navless page on
   another domain. That affects the ~184 in-content anchors that
   already exist, not just this rail, so the handler is bound to
   all of <main> rather than to the rail alone.
   ============================================================ */

(function () {
  "use strict";

  // --- What earns a rail -------------------------------------------------
  //
  // Page rule: three or more indexable H2s. Below that the rail is a label,
  // not navigation — and since "## Overview" is the house-standard intro
  // heading on 76 pages, a two-entry rail is almost always "Overview plus one
  // thing" in exchange for 272px of horizontal space.
  //
  // Deliberately NOT gated on page length. Measured against the live corpus,
  // every page clears 1.5 viewports (1.75–2.37 sampled, including a 241-word
  // one) because the card layout inflates height independently of content, so
  // a length test never fires. Section count is also the better signal on its
  // own: /introduction is 413 words with 7 sections and needs navigation,
  // while /building-apps-install-arch is 749 words with 2 and has none.
  var MIN_HEADINGS = 3;

  // Section rule: the rail indexes what the page teaches. Two classes of
  // heading are not that, and both are excluded.
  //
  //   1. Injected chrome — put on the page by an include, identical wherever
  //      it appears, not authored for this page. Test: would this heading read
  //      the same on every page that has it?
  //   2. Exit ramps — sections whose content is links off this page. Test:
  //      does it describe what this page covers, or where to go next? The rail
  //      answers the first question; an exit ramp is the door out, not a room.
  //
  // Matched case-insensitively. Authors can exclude anything else per-heading
  // with a kramdown IAL: {: .toc-exclude}
  // The corpus was normalised to house headings on 2026-08-18, so each entry
  // here maps to exactly one canonical spelling rather than chasing variants.
  // Add to this list only alongside a heading standard — a new spelling is a
  // content problem, not a matching problem. One-offs use {: .toc-exclude}.
  var EXCLUDED_TITLES = [
    "need help?",            // chrome — _includes/need_help_section.md (5)
    "see also",              // exit ramp — lateral related reading (48)
    "next steps",            // exit ramp — forward sequence (6)
    "related documentation"  // guide set navigator, top of multi-page guides (3)
  ];

  // Distance from the top of the viewport at which a heading becomes "current".
  var ACTIVE_OFFSET = 96;

  document.addEventListener("DOMContentLoaded", function () {
    var main = document.querySelector("main");
    var rail = document.getElementById("toc");
    if (!main || !rail) return;

    // Baseline protection, applied whether or not this page gets a rail:
    // an explicit target on the element beats <base target>, so even if the
    // click handler below never runs, anchors scroll in place instead of
    // breaking the page out of its iframe.
    forceSelfTarget(main);

    var headings = collectHeadings(main);

    // Bind clicks regardless — pages with too few headings for a rail still
    // have prose cross-references that need the same fix.
    bindAnchorClicks(main, rail);

    if (headings.length < MIN_HEADINGS) return;

    var links = render(rail, headings);
    forceSelfTarget(rail);
    document.body.classList.add("has-toc");
    rail.hidden = false;

    bindScrollSpy(rail, headings, links);
  });

  /* ---------------- Building the list ---------------- */

  // A collapsible section's title is a <summary class="collapseListH2">, not an
  // <h2> — deliberately, because a real heading would break the disclosure
  // widget. Per the house collapsible taxonomy that class IS the section level,
  // so it is indexed as a peer of h2. collapseListTierOne is a step or example
  // *inside* a section and is never indexed. querySelectorAll returns document
  // order, so the two kinds interleave correctly on mixed pages.
  var HEADING_SELECTOR = "h2, summary.collapseListH2";

  function collectHeadings(main) {
    var found = [];
    var nodes = main.querySelectorAll(HEADING_SELECTOR);

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var label = headingLabel(node);
      if (!label) continue;
      if (isExcluded(node, label)) continue;

      // kramdown's auto_ids gives every heading an id and all 640 H2s in this
      // repo are kramdown-generated, so this is a fallback for hand-authored
      // HTML headings rather than the normal path.
      if (!node.id) node.id = uniqueId(slugify(label));

      found.push(node);
    }

    return found;
  }

  // A <summary> holds the section title AND a .collapseSubhead description.
  // textContent would return both, producing a paragraph-long rail entry, so
  // the description is stripped from a clone before reading the label.
  function headingLabel(node) {
    if (node.tagName !== "SUMMARY") {
      return (node.textContent || "").trim();
    }

    var clone = node.cloneNode(true);
    var subhead = clone.querySelector(".collapseSubhead");
    if (subhead && subhead.parentNode) {
      subhead.parentNode.removeChild(subhead);
    }
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  // Jumping to a section inside a closed <details> would otherwise land the
  // reader on a collapsed accordion with nothing visible under the title.
  function revealTarget(el) {
    var node = el;
    while (node && node !== document.body) {
      if (node.tagName === "DETAILS" && !node.open) {
        node.open = true;
      }
      node = node.parentNode;
    }
  }

  function isExcluded(node, label) {
    if (node.classList && node.classList.contains("toc-exclude")) return true;

    var normalized = label.toLowerCase().replace(/\s+/g, " ").trim();
    for (var i = 0; i < EXCLUDED_TITLES.length; i++) {
      if (normalized === EXCLUDED_TITLES[i]) return true;
    }
    return false;
  }

  function slugify(text) {
    return (
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-") || "section"
    );
  }

  function uniqueId(base) {
    var id = base;
    var n = 2;
    while (document.getElementById(id)) {
      id = base + "-" + n;
      n++;
    }
    return id;
  }

  function render(rail, headings) {
    var title = document.createElement("h2");
    title.className = "toc__title";
    title.id = "toc-title";
    title.textContent = "On this page";

    var list = document.createElement("ul");
    list.className = "toc__list";

    var links = [];

    for (var i = 0; i < headings.length; i++) {
      var item = document.createElement("li");
      item.className = "toc__item";

      var link = document.createElement("a");
      link.className = "toc__link";
      link.href = "#" + headings[i].id;
      link.target = "_self";
      link.textContent = headingLabel(headings[i]);

      item.appendChild(link);
      list.appendChild(item);
      links.push(link);
    }

    rail.setAttribute("aria-labelledby", "toc-title");
    rail.appendChild(title);
    rail.appendChild(list);

    return links;
  }

  /* ---------------- Anchor clicks ---------------- */

  function forceSelfTarget(root) {
    var anchors = root.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].setAttribute("target", "_self");
    }
  }

  function bindAnchorClicks(main, rail) {
    document.addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      var link = closestAnchor(event.target);
      if (!link) return;
      if (!main.contains(link) && !rail.contains(link)) return;

      var href = link.getAttribute("href");
      if (!href || href === "#") return;

      var id = decodeURIComponent(href.slice(1));
      var target = document.getElementById(id);

      // Unknown fragment — leave it to the browser rather than swallowing it.
      if (!target) return;

      event.preventDefault();
      // Open before measuring — expanding a <details> changes layout height,
      // so scrolling first would land at a stale offset.
      revealTarget(target);
      target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });

      // preventDefault() suppresses the browser's native fragment navigation,
      // which also moves focus and resets the sequential-navigation start point
      // to the target. Without restoring that, a keyboard or screen-reader user
      // jumps the viewport but keeps focus in the rail, and tabbing continues
      // from the rail rather than the section they just chose.
      // tabindex="-1" makes a non-interactive heading programmatically
      // focusable; preventScroll leaves the smooth scroll above undisturbed.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });

      // replaceState, not pushState. An iframe shares its session history with
      // the host page, so pushing an entry per jump makes the reader's Back
      // button crawl backwards through in-page anchors instead of leaving
      // the docs.
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", "#" + id);
      }
    });
  }

  function scrollBehavior() {
    if (!window.matchMedia) return "auto";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  }

  function closestAnchor(node) {
    while (node && node !== document) {
      if (node.tagName === "A" && (node.getAttribute("href") || "").charAt(0) === "#") {
        return node;
      }
      node = node.parentNode;
    }
    return null;
  }

  /* ---------------- Active section ---------------- */

  function bindScrollSpy(rail, headings, links) {
    var ticking = false;

    function update() {
      var currentId = headings[0].id;

      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top <= ACTIVE_OFFSET) {
          currentId = headings[i].id;
        } else {
          break;
        }
      }

      // At the bottom of the page the last section may be too short to ever
      // cross the offset, so it would never highlight without this.
      if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 2) {
        currentId = headings[headings.length - 1].id;
      }

      setActive(rail, links, currentId);
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  function setActive(rail, links, id) {
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var isActive = link.getAttribute("href") === "#" + id;

      if (isActive) {
        if (link.getAttribute("aria-current") !== "true") {
          link.setAttribute("aria-current", "true");
          keepVisible(rail, link);
        }
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }

  // Scrolls the rail's own overflow, never the page — long pages would
  // otherwise fight the reader for control of the scroll position.
  function keepVisible(rail, link) {
    if (rail.scrollHeight <= rail.clientHeight) return;

    var top = link.offsetTop;
    var bottom = top + link.offsetHeight;

    if (top < rail.scrollTop) {
      rail.scrollTop = top;
    } else if (bottom > rail.scrollTop + rail.clientHeight) {
      rail.scrollTop = bottom - rail.clientHeight;
    }
  }
})();
