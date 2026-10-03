#!/usr/bin/env bash
# Usage: probe.sh <file.mp4> <width> <height> <seconds>
# Checks resolution, frame rate, duration, codec, pixel format and decode errors.
set -u
FILE="$1"; W="$2"; H="$3"; SECS="$4"

if command -v ffprobe >/dev/null 2>&1; then PROBE="ffprobe"; else PROBE="npx remotion ffprobe"; fi
if command -v ffmpeg  >/dev/null 2>&1; then FF="ffmpeg";  else FF="npx remotion ffmpeg";  fi

INFO=$($PROBE -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,codec_name,pix_fmt,color_space \
  -show_entries format=duration -of default=nw=1 "$FILE")
echo "$INFO"
fail=0
get() { echo "$INFO" | grep "^$1=" | head -1 | cut -d= -f2; }

[ "$(get width)" = "$W" ]  || { echo "FAIL width";  fail=1; }
[ "$(get height)" = "$H" ] || { echo "FAIL height"; fail=1; }
[ "$(get r_frame_rate)" = "60/1" ] || { echo "FAIL fps (expected 60/1)"; fail=1; }
[ "$(get codec_name)" = "h264" ] || { echo "WARN codec is $(get codec_name)"; }
[ "$(get pix_fmt)" = "yuv420p" ] || { echo "FAIL pix_fmt"; fail=1; }
[ "$(get color_space)" = "bt709" ] || { echo "WARN color_space is $(get color_space)"; }

DUR=$(get duration)
awk -v d="$DUR" -v t="$SECS" 'BEGIN{ if (d-t > 0.02 || t-d > 0.02) exit 1 }' \
  || { echo "FAIL duration $DUR vs $SECS"; fail=1; }

ERRS=$($FF -v error -i "$FILE" -f null - 2>&1 | wc -l)
[ "$ERRS" -eq 0 ] || { echo "FAIL $ERRS decode errors"; fail=1; }

[ $fail -eq 0 ] && echo "TECHNICAL CHECK: PASS" || echo "TECHNICAL CHECK: FAIL"
exit $fail
