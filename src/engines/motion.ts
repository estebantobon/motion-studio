import { spring, cubicBezier, backOut, anticipate, circOut } from 'motion';

/** Motion's easing curves, usable as Remotion `interpolate(..., { easing })`. */
export const ease = {
  snap: cubicBezier(0.2, 0.9, 0.1, 1), // fast in, long settle
  punch: cubicBezier(0.7, 0, 0.2, 1), // slow start, hard hit
  overshoot: backOut,
  windup: anticipate,
  glide: circOut,
};

/**
 * Value of a Motion physics spring at a given frame — pure function of the frame.
 * Use for overshoot and settle that feels physical.
 */
export function springAt(
  frame: number,
  fps: number,
  { from = 0, to = 1, delay = 0, stiffness = 180, damping = 16, mass = 1 } = {},
): number {
  const t = frame - delay;
  if (t <= 0) return from;
  const gen = spring({ keyframes: [from, to], stiffness, damping, mass });
  return gen.next((t / fps) * 1000).value as number;
}
