#!/usr/bin/env bash
#
# Structural checks on a built Jekyll site.
#
# Jekyll exits 0 on plenty of outcomes that are not a usable site — a missing
# layout renders an empty page, an unresolved `{% include %}` leaves the Liquid
# tag in the HTML, and a misconfigured source directory produces a handful of
# pages instead of all of them. These assertions catch that before the artifact
# is published.
#
# Usage: ./scripts/verify_site.sh [site_dir]

set -euo pipefail

SITE_DIR="${1:-_site}"

# Floors, not exact counts — they fail on a broken build, not on an added page.
# Raise them if the site grows substantially. Current values: 139 pages, 42 MB.
MIN_PAGES=130
MIN_SIZE_KB=30000

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

[ -d "$SITE_DIR" ] || fail "$SITE_DIR does not exist"

echo "Verifying $SITE_DIR"

# --- The site is there at all ------------------------------------------------

[ -f "$SITE_DIR/index.html" ] || fail "no index.html"
[ -d "$SITE_DIR/assets" ] || fail "no assets directory"
[ -f "$SITE_DIR/search.json" ] || fail "no search.json"

page_count=$(find "$SITE_DIR" -name '*.html' | wc -l | tr -d '[:space:]')
[ "$page_count" -ge "$MIN_PAGES" ] || fail "only $page_count HTML pages, expected at least $MIN_PAGES"

size_kb=$(du -sk "$SITE_DIR" | cut -f1)
[ "$size_kb" -ge "$MIN_SIZE_KB" ] || fail "site is ${size_kb}KB, expected at least ${MIN_SIZE_KB}KB (images missing?)"

echo "  $page_count HTML pages, ${size_kb}KB"

# --- Nothing rendered empty --------------------------------------------------

empty_pages=$(find "$SITE_DIR" -name '*.html' -size -1k)
if [ -n "$empty_pages" ]; then
  echo "$empty_pages" >&2
  fail "pages under 1KB — layout or front matter problem"
fi

# --- No Liquid leaked into the output ----------------------------------------

if leaked=$(grep -rlE '\{%[[:space:]]*(include|link|if|for)\b|\{\{[[:space:]]*site\.' \
  --include='*.html' "$SITE_DIR"); then
  echo "$leaked" >&2
  fail "unrendered Liquid tags in the output"
fi

# --- The baseurl contract still holds ----------------------------------------
#
# The Developer Portal embeds this site in an iframe and relies on `baseurl:
# "/documentation"` resolving links. A build that drops it produces a site that
# looks fine in isolation and breaks on the portal.

grep -q 'href="/documentation/' "$SITE_DIR/index.html" \
  || fail "index.html has no /documentation-prefixed links — baseurl lost?"

# --- The gated pages are present and accounted for ---------------------------
#
# Six erp-* pages ship in this artifact and are gated by the Developer Portal
# (AGX-7688). Their absence would silently 404 for entitled users; their
# presence is a reminder that this artifact contains gated content.

for page in erp-intro erp-technical-guide erp-metadata-details \
  erp-external-data-details erp-staged-records-details erp-events-dictionary; do
  [ -f "$SITE_DIR/$page.html" ] || fail "gated page $page.html is missing"
done

echo "PASS"
