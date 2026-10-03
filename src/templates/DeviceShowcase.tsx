import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { defaultTheme, type Theme } from '../lib/theme';
import { springAt, ease } from '../engines/motion';

export type DeviceShowcaseProps = { src?: string; device?: 'phone' | 'browser'; theme?: Theme; background?: string };

/** Engine: Remotion core + Motion spring. A real screenshot in a device frame rises in, tilts flat, and the camera pushes in. */
export const DeviceShowcase: React.FC<DeviceShowcaseProps> = ({ src, device = 'phone', theme = defaultTheme, background }) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const rise = springAt(frame, fps, { stiffness: 120, damping: 14 });
  const tilt = interpolate(rise, [0, 1], [28, 6]);
  const push = interpolate(frame, [0, durationInFrames], [0.92, 1.18], { easing: ease.glide });
  const isPhone = device === 'phone';
  const w = isPhone ? width * 0.56 : width * 0.9;
  const h = isPhone ? w * 2.05 : w * 0.66;
  const r = isPhone ? w * 0.13 : w * 0.025;
  const screen = src ? (
    <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
  ) : (
    <div style={{ width: '100%', height: '100%', background: `linear-gradient(160deg, ${theme.accent}, ${theme.palette[3] ?? theme.ink})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.paper, fontFamily: theme.font, fontSize: width * 0.035 }}>
      Your screenshot here
    </div>
  );
  return (
    <AbsoluteFill style={{ background: background ?? theme.palette[2] ?? theme.paper, alignItems: 'center', justifyContent: 'center', perspective: 1800, overflow: 'hidden' }}>
      <div
        style={{
          width: w, height: h, borderRadius: r, background: theme.ink, padding: isPhone ? w * 0.035 : 0, boxSizing: 'border-box',
          transform: `translateY(${(1 - rise) * height * 0.6}px) rotateX(${tilt}deg) scale(${push})`,
          boxShadow: '0 60px 140px rgba(0,0,0,0.35)', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}
      >
        {!isPhone && (
          <div style={{ height: w * 0.045, background: theme.ink, display: 'flex', alignItems: 'center', gap: w * 0.01, paddingLeft: w * 0.02 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => <div key={c} style={{ width: w * 0.014, height: w * 0.014, borderRadius: '50%', background: c }} />)}
          </div>
        )}
        <div style={{ flex: 1, borderRadius: isPhone ? r * 0.75 : 0, overflow: 'hidden' }}>{screen}</div>
      </div>
    </AbsoluteFill>
  );
};
