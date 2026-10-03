import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

/** Deterministic film grain: the noise seed is derived from the frame number. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.035 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity, mixBlendMode: 'overlay' }}>
      <svg width="100%" height="100%">
        <filter id={`grain-${frame}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={frame % 97} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${frame})`} />
      </svg>
    </AbsoluteFill>
  );
};
