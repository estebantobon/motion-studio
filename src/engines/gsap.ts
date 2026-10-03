import { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { gsap } from 'gsap';

/**
 * Drive a GSAP timeline from Remotion's frame number.
 * Animate a plain state object (never the DOM), then render from the returned state.
 * The timeline is paused and seeked to frame/fps on every render, so any frame,
 * in any order, renders identically.
 */
export function useGsapTimeline<S extends object>(
  createState: () => S,
  build: (tl: gsap.core.Timeline, state: S) => void,
  deps: React.DependencyList = [],
): S {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { tl, state } = useMemo(() => {
    const state = createState();
    const tl = gsap.timeline({ paused: true });
    build(tl, state);
    return { tl, state };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  tl.seek(frame / fps, false);
  return { ...state };
}
