#!/usr/bin/env bash
# Install the skills into Claude Code (~/.claude/skills). Pass a project path to install there instead.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${1:-$HOME}/.claude/skills"
bash "$ROOT/scripts/build-skills.sh" >/dev/null
mkdir -p "$TARGET"
for d in "$ROOT"/dist/*/; do
  name="$(basename "$d")"; rm -rf "$TARGET/$name"; cp -r "$d" "$TARGET/$name"; echo "installed $name → $TARGET/$name"
done
