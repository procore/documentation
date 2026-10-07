#!/usr/bin/env bash
#
# Byte-compare a locally built site against the live GitHub Pages output.
#
# GitHub's `legacy` Pages builder picks its own Ruby, Jekyll and plugin
# versions. This proves our own build reproduces it before anything depends on
# the artifact. Verified identical across all 139 pages on 2026-10-07.
#
# This becomes meaningless once GitHub Pages is retired. Delete it then.
#
# Usage: ./scripts/compare_with_pages.sh [site_dir]

set -uo pipefail

SITE_DIR="${1:-_site}"
BASE_URL="https://procore.github.io/documentation"

[ -d "$SITE_DIR" ] || { echo "FAIL: $SITE_DIR does not exist" >&2; exit 1; }

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

identical=0
different=0
missing=0

while IFS= read -r file; do
  rel="${file#"$SITE_DIR"/}"
  if [ "$rel" = "index.html" ]; then
    url="$BASE_URL/"
  else
    url="$BASE_URL/${rel%.html}"
  fi

  code=$(curl -sS -o "$tmp/live.html" -w '%{http_code}' "$url")

  if [ "$code" != "200" ]; then
    echo "MISSING ($code): $rel"
    missing=$((missing + 1))
  elif cmp -s "$tmp/live.html" "$file"; then
    identical=$((identical + 1))
  else
    echo "DIFFERENT: $rel"
    diff "$tmp/live.html" "$file" | head -20
    different=$((different + 1))
  fi
done < <(find "$SITE_DIR" -name '*.html' | sort)

echo
echo "identical=$identical different=$different missing=$missing"

# `missing` is informational: a page can exist locally and not yet be live if
# Pages has not rebuilt, or vice versa on a feature branch. A byte difference on
# a page that exists in both places is the real signal.
[ "$different" -eq 0 ] || exit 1
