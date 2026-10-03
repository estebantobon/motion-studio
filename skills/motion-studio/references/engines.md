# Animation engines

Remotion is the renderer. Six engines plug into it, each best at something different. Pick by the shot, not by habit.

| Engine | Best for | How it runs inside Remotion |
|---|---|---|
| Remotion core (`interpolate`, `spring`) | Most 2D moves, type, layout | Native; the default |
| **Motion** (`motion`) | Premium easing curves and physics springs | Use only its math: `cubicBezier`, `backOut`, `anticipate`, `spring()` generator, via `engines/motion.ts` (`ease.*`, `springAt`). Never use `motion.div` / `animate()` — they run on a real-time clock |
| **GSAP** (`gsap`) | Long choreographed sequences with overlaps (`'<'`, `'-=0.3'`), rich eases (`elastic`, `back`, `expo`) | `useGsapTimeline` in `engines/gsap.ts`: paused timeline animating a plain state object, seeked to `frame / fps` |
| **anime.js** (`animejs` v4) | Staggers across many items, counters, typewriter text, SVG line drawing | `useAnimeTimeline` in `engines/anime.ts`: `createTimeline({ autoplay: false })`, seeked in ms |
| **three.js** + **React Three Fiber** | Real 3D: particles, extruded logos, product objects, camera moves | `<ThreeCanvas>` from `@remotion/three`. Drive everything from `useCurrentFrame()`; never `useFrame`'s clock. Seeded `random()` only. Render with `--gl=angle`; test one frame first |
| **lottie-web** | After Effects animations exported as Lottie JSON (icons, illustrations) | `<Lottie>` from `@remotion/lottie`, frame-locked automatically. Only use JSON the user supplies or owns |

## Rules that keep every engine deterministic
- Animate data, render from data. Engines mutate plain objects; React renders from those values. Never let an engine touch the DOM directly.
- Build timelines once (`useMemo`) and seek every render. Seeking must be absolute so frames can render in any order.
- No `Date.now`, timers, CSS transitions/keyframes, `requestAnimationFrame`, or unseeded `Math.random`.

## Licensing (tell the user if it matters)
- three.js, React Three Fiber, anime.js, Motion, lottie-web: MIT.
- GSAP: GreenSock's standard no-charge license, including commercial use; read https://gsap.com/standard-license for its restrictions.
- Remotion itself: free for individuals and small companies; larger companies need a company license (https://remotion.dev/license). Flag this when the user is working for a large organization.

## The template pack
`templates/remotion-pack/` is a ready Remotion project (MIT) with an adapter per engine and eight templates: KineticHeadline, ParticleForm, PromptTyping, DeviceShowcase, StepCallout, BarBuild, CtaPill, LottieLayer. Start new jobs by copying it, then compose templates into the shot list and restyle through `src/lib/theme.ts`. Templates are starting points: adapt them to the brief rather than shipping them unchanged.
