import React, { useEffect, useState } from 'react';
import { AbsoluteFill, cancelRender, continueRender, delayRender, staticFile } from 'remotion';
import { Lottie, type LottieAnimationData } from '@remotion/lottie';
import { defaultTheme, type Theme } from '../lib/theme';

export type LottieLayerProps = { file?: string; loop?: boolean; playbackRate?: number; theme?: Theme; background?: string };

/** Engine: lottie-web via @remotion/lottie. Drop a Lottie JSON (e.g. exported from After Effects) into public/ and it plays frame-locked. */
export const LottieLayer: React.FC<LottieLayerProps> = ({ file, loop = true, playbackRate = 1, theme = defaultTheme, background }) => {
  const [data, setData] = useState<LottieAnimationData | null>(null);
  const [handle] = useState(() => (file ? delayRender(`Loading Lottie ${file}`) : null));
  useEffect(() => {
    if (!file || handle === null) return;
    fetch(staticFile(file))
      .then((r) => r.json())
      .then((json) => { setData(json); continueRender(handle); })
      .catch((err) => cancelRender(err));
  }, [file, handle]);
  return (
    <AbsoluteFill style={{ background: background ?? theme.paper, alignItems: 'center', justifyContent: 'center' }}>
      {data ? <Lottie animationData={data} loop={loop} playbackRate={playbackRate} /> : (
        <div style={{ fontFamily: theme.font, fontSize: 40, color: theme.ink, opacity: 0.6 }}>Add a Lottie JSON to public/ and pass its name as `file`</div>
      )}
    </AbsoluteFill>
  );
};
