import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { defaultTheme, onColor, type Theme } from '../lib/theme';
import { framesPerBeat } from '../lib/beat';
import { ease } from '../engines/motion';

export type KineticHeadlineProps = { words: string[]; bpm?: number; theme?: Theme };

/** Engine: Remotion core + Motion easing. One word per beat, slammed in from 3x, background cuts each beat. */
export const KineticHeadline: React.FC<KineticHeadlineProps> = ({ words, bpm = 120, theme = defaultTheme }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const fpb = framesPerBeat(fps, bpm);
  const i = Math.min(words.length - 1, Math.floor(frame / fpb));
  const local = frame - i * fpb;
  const bg = theme.palette[i % theme.palette.length];
  const scale = interpolate(local, [0, fpb * 0.45], [3.2, 1], { easing: ease.snap, extrapolateRight: 'clamp' });
  const skew = interpolate(local, [0, fpb * 0.45], [-12, 0], { easing: ease.snap, extrapolateRight: 'clamp' });
  const drift = interpolate(local, [0, fpb], [0, -width * 0.04]);
  const word = words[i] ?? '';
  // Size so long words run past the frame edge on purpose.
  const fontSize = Math.min(width * 0.42, (width * 1.25) / Math.max(3, word.length * 0.6));
  return (
    <AbsoluteFill style={{ background: bg, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div
        style={{
          fontFamily: theme.font, fontWeight: 900, fontSize, lineHeight: 0.85, letterSpacing: '-0.05em',
          color: onColor(bg, theme), whiteSpace: 'nowrap', textTransform: 'uppercase',
          transform: `translateX(${drift}px) scale(${scale}) skewX(${skew}deg)`,
        }}
      >
        {word}
      </div>
    </AbsoluteFill>
  );
};
