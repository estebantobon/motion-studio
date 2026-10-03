import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { defaultTheme, type Theme } from '../lib/theme';
import { useAnimeTimeline } from '../engines/anime';

export type PromptTypingProps = { prompt: string; placeholder?: string; theme?: Theme; background?: string; charsPerSecond?: number };

/** Engine: anime.js. A prompt bar scales in, types the prompt verbatim, then the send button fires. */
export const PromptTyping: React.FC<PromptTypingProps> = ({ prompt, placeholder = 'Ask anything…', theme = defaultTheme, background, charsPerSecond = 28 }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const typeMs = (prompt.length / charsPerSecond) * 1000;
  const s = useAnimeTimeline(
    () => ({ bar: 0, chars: 0, send: 0, push: 1 }),
    (tl, st) => {
      tl.add(st, { bar: [0, 1], duration: 500, ease: 'outBack(1.6)' }, 0)
        .add(st, { chars: [0, prompt.length], duration: typeMs, ease: 'linear' }, 450)
        .add(st, { send: [0, 1], duration: 250, ease: 'outExpo' }, 450 + typeMs + 150)
        .add(st, { push: [1, 1.12], duration: 900, ease: 'inOutQuad' }, 450 + typeMs + 150);
    },
    [prompt, typeMs],
  );
  const shown = prompt.slice(0, Math.round(s.chars));
  const caretOn = Math.floor(frame / 16) % 2 === 0 || s.chars < prompt.length;
  return (
    <AbsoluteFill style={{ background: background ?? theme.ink, alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: width * 0.86, minHeight: width * 0.15, borderRadius: width * 0.045, background: theme.paper,
          transform: `scale(${s.bar * s.push})`, padding: `${width * 0.035}px ${width * 0.045}px`, boxSizing: 'border-box',
          display: 'flex', alignItems: 'center', gap: width * 0.03, boxShadow: '0 40px 120px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ flex: 1, fontFamily: theme.font, fontSize: width * 0.045, fontWeight: 500, color: shown ? theme.ink : '#8a8a8a', lineHeight: 1.25 }}>
          {shown || placeholder}
          <span style={{ display: 'inline-block', width: 4, height: '1em', marginLeft: 3, verticalAlign: '-0.12em', background: theme.accent, opacity: caretOn ? 1 : 0 }} />
        </div>
        <div style={{ width: width * 0.09, height: width * 0.09, borderRadius: '50%', background: s.send > 0 ? theme.accent : '#d6d2ca', transform: `scale(${1 + s.send * 0.15})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="45%" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke={theme.paper} strokeWidth={3} fill="none" strokeLinecap="round" /></svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
