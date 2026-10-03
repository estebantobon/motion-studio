import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { stagger } from 'animejs';
import { defaultTheme, onColor, type Theme } from '../lib/theme';
import { useAnimeTimeline } from '../engines/anime';

export type Datum = { label: string; value: number };
export type BarBuildProps = { data: Datum[]; unit?: string; title?: string; sample?: boolean; theme?: Theme; background?: string };

/** Engine: anime.js stagger. Bars shoot up one after another with count-up labels. Only use numbers the user supplied. */
export const BarBuild: React.FC<BarBuildProps> = ({ data, unit = '', title, sample = false, theme = defaultTheme, background }) => {
  const { width, height } = useVideoConfig();
  const bg = background ?? theme.palette[3] ?? theme.ink;
  const fg = onColor(bg, theme);
  const max = Math.max(...data.map((d) => d.value), 1);
  const s = useAnimeTimeline(
    () => ({ title: 0, bars: data.map(() => ({ t: 0 })) }),
    (tl, st) => {
      tl.add(st, { title: [0, 1], duration: 400, ease: 'outExpo' }, 0)
        .add(st.bars, { t: [0, 1], duration: 900, ease: 'outElastic(1, .6)', delay: stagger(110) }, 250);
    },
    [JSON.stringify(data)],
  );
  const chartH = height * 0.58, barW = (width * 0.84) / data.length;
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: theme.font, color: fg }}>
      {title && <div style={{ position: 'absolute', top: height * 0.08, left: width * 0.08, right: width * 0.08, fontSize: width * 0.065, fontWeight: 900, lineHeight: 1, opacity: s.title, transform: `translateY(${(1 - s.title) * 40}px)` }}>{title}</div>}
      <div style={{ position: 'absolute', left: width * 0.08, bottom: height * 0.1, height: chartH, display: 'flex', alignItems: 'flex-end' }}>
        {data.map((d, i) => {
          const t = Math.max(0, s.bars[i]?.t ?? 0);
          const h = (d.value / max) * chartH * 0.85 * t;
          return (
            <div key={d.label} style={{ width: barW, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
              <div style={{ fontSize: width * 0.045, fontWeight: 800, marginBottom: 8 }}>{Math.round(d.value * Math.min(1, t))}{unit}</div>
              <div style={{ width: barW * 0.72, height: h, background: i === data.length - 1 ? theme.accent : fg, borderRadius: `${barW * 0.08}px ${barW * 0.08}px 0 0` }} />
              <div style={{ fontSize: width * 0.03, fontWeight: 600, marginTop: 12, opacity: 0.8 }}>{d.label}</div>
            </div>
          );
        })}
      </div>
      {sample && <div style={{ position: 'absolute', top: 24, right: 24, fontSize: width * 0.025, fontWeight: 800, padding: '6px 12px', border: `2px solid ${fg}`, borderRadius: 8 }}>SAMPLE DATA</div>}
    </AbsoluteFill>
  );
};
