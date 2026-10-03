import React from 'react';
import { AbsoluteFill, Series, useVideoConfig } from 'remotion';
import { defaultTheme } from './lib/theme';
import { framesPerBar } from './lib/beat';
import { Grain } from './lib/Grain';
import { KineticHeadline } from './templates/KineticHeadline';
import { ParticleForm } from './templates/ParticleForm';
import { PromptTyping } from './templates/PromptTyping';
import { DeviceShowcase } from './templates/DeviceShowcase';
import { StepCallout } from './templates/StepCallout';
import { BarBuild } from './templates/BarBuild';
import { CtaPill } from './templates/CtaPill';

/** The pack's own showreel: one bar per template, cut on the 120 BPM grid. */
export const PackReel: React.FC = () => {
  const { fps } = useVideoConfig();
  const bar = Math.round(framesPerBar(fps));
  const t = defaultTheme;
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={bar}><KineticHeadline words={['Free', 'motion', 'templates', 'for Claude']} /></Series.Sequence>
        <Series.Sequence durationInFrames={bar}><ParticleForm shape="ring" /></Series.Sequence>
        <Series.Sequence durationInFrames={bar}><PromptTyping prompt="Make a 12s ad for my site" background={t.palette[1]} charsPerSecond={22} /></Series.Sequence>
        <Series.Sequence durationInFrames={bar}><DeviceShowcase device="phone" /></Series.Sequence>
        <Series.Sequence durationInFrames={bar}><StepCallout step={1} instruction="Paste the prompt into Claude Code" region={{ x: 0.2, y: 0.3, w: 0.5, h: 0.12 }} /></Series.Sequence>
        <Series.Sequence durationInFrames={bar}><BarBuild data={[{ label: 'A', value: 24 }, { label: 'B', value: 41 }, { label: 'C', value: 68 }, { label: 'D', value: 92 }]} title="Data that builds" sample /></Series.Sequence>
        <Series.Sequence durationInFrames={bar * 1.5}><CtaPill label="Get the skill — free" brand="Motion Studio" /></Series.Sequence>
      </Series>
      <Grain />
    </AbsoluteFill>
  );
};
