# NullMotion (github.com/blixvip/NullMotion)

Node 22+ local app, no dependencies (`npm start` → http://127.0.0.1:4343). Animations are HTML + GSAP; export uses WebCodecs in Chrome/Edge.
License: none selected — learn from it privately, don't redistribute. Showcase footage belongs to other creators.

## Template gallery — `public/NN-name/index.html`
Each is one self-contained file; open it to read timings and eases.
- CTAs: `01-cta-pill`, `18-cta-click`, `04-morph-panel` (button morphs into a panel)
- AI / product UI: `07-chat-sim`, `08-prompt-bar`, `20-search-typing`, `23-prompt-composer`, `21-connector-list`, `17-integrations-grid`
- Devices & app proof: `19-phone-showcase`, `03-slide-showcase`, `05-app-icons`, `27-icon-stack-rise`, `06-notification`, `24-showreel-notify`
- Data: `10-candlestick`, `13-compare-bars`, `14-leaderboard`, `15-bar-3d`, `16-line-growth`, `09-grid-network`
- Type & brand: `22-kinetic-headline`, `12-blur-reveal`, `26-null-manifesto`, `27-cinematic-hud-overlay`
- Story structure: `02-three-step`

## Workflow ideas
- `public/drafts.mjs` — plain black-and-white "draft" scenes per section from a small vocabulary of beats (text, logo, phone, window, input, chat, cards, list, chart, cloud). Model for planning: block every shot in flat B&W first, approve the structure, then polish.
- `scripts/plan-sections.mjs` — splits a reference ad into 3–8 sections at real scene cuts (FFmpeg scene detection) with contact sheets. Use it to reverse-engineer the pacing of an ad you admire.
- `public/demo.mjs` — frame-accurate browser export: plays the film slowly, captures each decoded frame via `requestVideoFrameCallback`, encodes with WebCodecs at the frame's own timestamp.

## Translating to Remotion
GSAP timelines → `interpolate()`/`spring()` keyed to `useCurrentFrame()`. Convert durations to frames at 60fps (0.5s = 30 frames). GSAP `power3.out` ≈ `Easing.out(Easing.cubic)`; `back.out` ≈ a spring with low damping.
