#!/usr/bin/env bash
# Clone or update every repo listed in repos.txt into $REPO_DIR (default ~/claude-repos).
set -u
HERE="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${REPO_DIR:-$HOME/claude-repos}"
mkdir -p "$DEST"
grep -v '^\s*#' "$HERE/repos.txt" | grep -v '^\s*$' | while IFS='|' read -r url note license; do
  url="$(echo "$url" | xargs)"
  name="$(basename "$url" .git)"
  if [ -d "$DEST/$name/.git" ]; then
    echo "Updating $name"; git -C "$DEST/$name" pull --ff-only --quiet || echo "  could not fast-forward $name"
  else
    echo "Cloning $name"; git clone --depth 1 --quiet "$url" "$DEST/$name" || echo "  clone failed: $url"
  fi
done
echo "Library at $DEST"
