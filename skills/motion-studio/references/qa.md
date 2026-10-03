# Quality checks

Run all three. Each catches problems the others can't.

## 1. Technical
Run `bash scripts/probe.sh out/<job-name>/<file>.mp4 <width> <height> <seconds>`. It confirms:
- the file decodes without errors
- exact width and height, 60fps, duration within one frame of the target
- H.264, `yuv420p`, BT.709 colour

Render with `--codec=h264 --pixel-format=yuv420p --color-space=bt709 --crf=16` (lower CRF, e.g. 10, if grain or gradients shimmer on a still ending).
Audio present only if AUDIO was supplied; fade it out over the last ~0.5s.

## 2. Content
Compare the video against the brief and assets, line by line:
- The takeaway and CTA match the brief.
- Every name, number, command and UI element is traceable to the brief, assets or source site.
- The logo is the original file or a plain wordmark.
- Spelling of every on-screen word.

## 3. Visual
Export one still per shot at its peak moment (`npx remotion still`) and grade each yes/no:
- Main subject fills most of the frame
- Different background or composition from the previous shot
- Different visual approach from the previous shot (ad/showcase)
- Thread present, or deliberately absent
- Would this frame work as a thumbnail on its own?
- Text readable at phone size (view the still at ~400px wide)

Any "no" on the first three gets fixed and re-rendered. Also check the CTA and final frames at phone width.

## Reporting
List each check as passed, failed-and-fixed, or not run (with the reason). Don't claim to have watched or listened to anything you only measured.
