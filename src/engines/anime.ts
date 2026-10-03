import { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { createTimeline, type Timeline } from 'animejs';

/**
 * Drive an anime.js v4 timeline from Remotion's frame number.
 * Targets are plain objects; the timeline never autoplays and is seeked (in ms) each frame.
 * Great for staggers: tl.add(items, { h: [0, 1], delay: stagger(80) }).
 */
export function useAnimeTimeline<S extends object>(
  createState: () => S,
  build: (tl: Timeline, state: S) => void,
  deps: React.DependencyList = [],
): S {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { tl, state } = useMemo(() => {
    const state = createState();
    const tl = createTimeline({ autoplay: false });
    build(tl, state);
    return { tl, state };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  tl.seek((frame / fps) * 1000);
  return structuredClone(state);
}
