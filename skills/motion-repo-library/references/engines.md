# Animation engine repos

All cloned to `~/claude-repos/<name>`. These are big; open specific paths, don't scan the whole repo. In Remotion jobs, drive every engine from the frame number (see motion-studio's `references/engines.md` and its adapters).

## three.js (MIT) — `three.js/`
- `examples/jsm/` — add-ons by topic: `geometries`, `effects`, `lines`, `loaders` (GLTF, SVG, fonts), `math`, `modifiers`, `objects`, `postprocessing`, `curves`.
- `examples/*.html` — hundreds of runnable demos; search by name (`webgl_points_*`, `webgl_geometry_text*`, `webgl_postprocessing_*`) for particle, text and glow ideas.
- `manual/` and `docs/` — API reference. `llms.txt` at the root is a condensed doc index made for AI tools.
- Translate any `clock.getElapsedTime()` / animation loop into `frame / fps`.

## React Three Fiber (MIT) — `react-three-fiber/`
- `docs/API`, `docs/advanced` (performance, pitfalls), `docs/tutorials`.
- `example/` — React demos. Ignore `useFrame` timing; in Remotion, compute from `useCurrentFrame()` inside `<ThreeCanvas>`.

## GSAP (standard no-charge license) — `GSAP/`
- `src/` — one file per plugin: `CustomEase.js`, `CustomBounce.js`, `CustomWiggle.js`, `EasePack.js`, `SplitText.ts`, `MorphSVGPlugin.js`, `DrawSVGPlugin.js`, `MotionPathPlugin.js`, `ScrambleTextPlugin.js`, `TextPlugin.js`, `Flip.js`.
- `types/` — TypeScript definitions; quickest way to learn options.
- Paused timeline + `seek()` is deterministic. Avoid `ScrollTrigger`, `ScrollSmoother`, `Draggable`, `Observer` (interaction-driven).
- SplitText and MorphSVG manipulate the DOM: in Remotion, prefer splitting text yourself into spans and animating state.

## anime.js v4 (MIT) — `anime/`
- `examples/` — runnable ideas worth stealing: `stagger`, `advanced-grid-staggering`, `svg-line-drawing`, `svg-graph`, `text`, `irregular-playback-typewriter`, `timeline-seamless-loop`, `layered-css-transforms`, `threejs`, `canvas-2d`.
- `src/` — engine source; `eases` and `stagger` options are the parts most useful in video.
- `createTimeline({ autoplay: false })` + `seek(ms)` is deterministic; animate plain objects.

## Motion (MIT) — `motion/packages/`
- `motion-utils/` and `motion-dom/` — easing curves (`cubicBezier`, `backOut`, `anticipate`, `circOut`, `steps`) and the physics `spring` generator. These pure functions are what to use in video.
- `framer-motion/` — React components; interaction and layout animation run on real time, so don't use them in renders.
- Repo ships `CLAUDE.md` / `AGENTS.md` describing its structure — read those first.

## lottie-web (MIT) — `lottie-web/`
- `docs/json/` — the Lottie JSON schema, useful when generating or editing simple Lottie files by hand.
- `player/` — the player source. In Remotion, use `@remotion/lottie` rather than calling lottie-web directly.
- Only use Lottie files the user owns or that carry a license allowing reuse.
