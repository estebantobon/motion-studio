#!/usr/bin/env bash
# Build installable skills into dist/: bundles the template pack (repo root) into motion-studio.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"; STAGE="$(mktemp -d)"
rm -rf "$DIST"; mkdir -p "$DIST"
for skill in "$ROOT"/skills/*/; do
  name="$(basename "$skill")"
  cp -r "$skill" "$STAGE/$name"
  cp "$ROOT/LICENSE" "$STAGE/$name/LICENSE"
  if [ "$name" = "motion-studio" ]; then
    PACK="$STAGE/$name/templates/remotion-pack"; mkdir -p "$PACK"
    cp -r "$ROOT/src" "$ROOT/public" "$ROOT/tsconfig.json" "$ROOT/remotion.config.ts" "$ROOT/package.json" "$ROOT/LICENSE" "$PACK/"
  fi
  (cd "$STAGE" && zip -rq "$DIST/$name.zip" "$name" -x '*/node_modules/*' -x '*.DS_Store')
  cp "$DIST/$name.zip" "$DIST/$name.skill"
  echo "built dist/$name.skill"
done
cp -r "$STAGE"/* "$DIST/" 2>/dev/null || true
rm -rf "$STAGE"
