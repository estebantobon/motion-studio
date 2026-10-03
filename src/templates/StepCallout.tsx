import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { defaultTheme, type Theme } from '../lib/theme';
import { springAt } from '../engines/motion';

export type Region = { x: number; y: number; w: number; h: number }; // fractions of the screenshot
export type StepCalloutProps = { src?: string; step: number; instruction: string; region: Region; theme?: Theme };

/** Tutorial building block. Zooms into the region that matters, dims the rest, draws a ring on it, and shows a numbered instruction. */
export const StepCallout: React.FC<StepCalloutProps> = ({ src, step, instruction, region, theme = defaultTheme }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const zoomT = springAt(frame, fps, { delay: 8, stiffness: 90, damping: 18 });
  const target = Math.min(2.6, 0.7 / Math.max(region.w, region.h));
  const scale = interpolate(zoomT, [0, 1], [1, target]);
  const cx = region.x + region.w / 2, cy = region.y + region.h / 2;
  const tx = interpolate(zoomT, [0, 1], [0, (0.5 - cx) * width * scale]);
  const ty = interpolate(zoomT, [0, 1], [0, (0.42 - cy) * height * scale]);
  const ring = interpolate(frame, [fps * 0.6, fps * 1.1], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dim = interpolate(frame, [fps * 0.5, fps * 0.9], [0, 0.55], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label = springAt(frame, fps, { delay: fps * 0.3, stiffness: 160, damping: 15 });
  const rx = region.x * width, ry = region.y * height, rw = region.w * width, rh = region.h * height;
  const perim = 2 * (rw + rh);
  return (
    <AbsoluteFill style={{ background: theme.ink, overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `translate(${tx}px, ${ty}px) scale(${scale})`, transformOrigin: `${cx * 100}% ${cy * 100}%` }}>
        {src ? <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <AbsoluteFill style={{ background: 'repeating-linear-gradient(0deg,#2a2a30 0 40px,#222228 40px 80px)' }} />}
        <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <mask id="hole"><rect width={width} height={height} fill="white" /><rect x={rx} y={ry} width={rw} height={rh} rx={12} fill="black" /></mask>
          </defs>
          <rect width={width} height={height} fill="black" opacity={dim} mask="url(#hole)" />
          <rect x={rx} y={ry} width={rw} height={rh} rx={12} fill="none" stroke={theme.accent} strokeWidth={6 / scale} strokeDasharray={perim} strokeDashoffset={perim * ring} />
        </svg>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute', left: width * 0.06, right: width * 0.06, bottom: height * 0.07, background: theme.paper, borderRadius: width * 0.03,
          padding: width * 0.04, display: 'flex', alignItems: 'center', gap: width * 0.035,
          transform: `translateY(${(1 - label) * 200}px)`, opacity: Math.min(1, label * 1.5),
        }}
      >
        <div style={{ minWidth: width * 0.11, height: width * 0.11, borderRadius: '50%', background: theme.accent, color: theme.paper, fontFamily: theme.font, fontWeight: 900, fontSize: width * 0.06, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step}</div>
        <div style={{ fontFamily: theme.font, fontWeight: 700, fontSize: width * 0.05, color: theme.ink, lineHeight: 1.15 }}>{instruction}</div>
      </div>
    </AbsoluteFill>
  );
};
