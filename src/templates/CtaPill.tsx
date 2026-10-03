import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { defaultTheme, onColor, type Theme } from '../lib/theme';
import { useGsapTimeline } from '../engines/gsap';

export type CtaPillProps = { label: string; brand?: string; theme?: Theme; background?: string };

/** Engine: GSAP. A dot grows into a pill, the label lands, a cursor clicks it, a ripple floods the frame. Holds still at the end. */
export const CtaPill: React.FC<CtaPillProps> = ({ label, brand, theme = defaultTheme, background }) => {
  const { width, height } = useVideoConfig();
  const bg = background ?? theme.paper;
  const s = useGsapTimeline(
    () => ({ w: 0.04, h: 0.04, label: 0, labelY: 40, cx: 1.2, cy: 1.1, press: 1, ripple: 0, rippleOp: 0.35, brand: 0 }),
    (tl, st) => {
      tl.to(st, { w: 0.04, h: 0.04, duration: 0.15 })
        .to(st, { w: 0.78, h: 0.12, duration: 0.55, ease: 'expo.out' })
        .to(st, { label: 1, labelY: 0, duration: 0.35, ease: 'back.out(2)' }, '-=0.3')
        .to(st, { cx: 0.62, cy: 0.56, duration: 0.5, ease: 'power3.inOut' }, '-=0.1')
        .to(st, { press: 0.93, duration: 0.08, ease: 'power2.in' })
        .to(st, { press: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' })
        .to(st, { ripple: 3, rippleOp: 0, duration: 0.7, ease: 'expo.out' }, '<')
        .to(st, { brand: 1, duration: 0.4, ease: 'power3.out' }, '-=0.5');
    },
    [label],
  );
  const pw = s.w * width, ph = Math.max(s.h * width, 0);
  return (
    <AbsoluteFill style={{ background: bg, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: width * s.ripple, height: width * s.ripple, borderRadius: '50%', background: theme.accent, opacity: s.rippleOp }} />
      <div
        style={{
          width: pw, height: ph, borderRadius: ph, background: theme.accent, transform: `scale(${s.press})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
        }}
      >
        <span style={{ fontFamily: theme.font, fontWeight: 800, fontSize: width * 0.058, color: onColor(theme.accent, theme), opacity: s.label, transform: `translateY(${s.labelY}px)`, whiteSpace: 'nowrap' }}>
          {label}
        </span>
      </div>
      {brand ? (
        <div style={{ position: 'absolute', bottom: height * 0.1, fontFamily: theme.font, fontWeight: 700, fontSize: width * 0.04, color: onColor(bg, theme), opacity: s.brand }}>
          {brand}
        </div>
      ) : null}
      {/* Cursor */}
      <svg width={width * 0.07} viewBox="0 0 24 24" style={{ position: 'absolute', left: s.cx * width, top: s.cy * height, transform: `scale(${s.press})` }}>
        <path d="M3 2l7.5 19 2.6-7.4L21 11z" fill={theme.ink} stroke={theme.paper} strokeWidth={1.5} strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};
