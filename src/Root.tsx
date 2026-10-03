import React from 'react';
import { Composition } from 'remotion';
import { KineticHeadline } from './templates/KineticHeadline';
import { CtaPill } from './templates/CtaPill';
import { PromptTyping } from './templates/PromptTyping';
import { DeviceShowcase } from './templates/DeviceShowcase';
import { StepCallout } from './templates/StepCallout';
import { BarBuild } from './templates/BarBuild';
import { ParticleForm } from './templates/ParticleForm';
import { LottieLayer } from './templates/LottieLayer';
import { PackReel } from './PackReel';

const FPS = 60;
const F45 = { width: 1080, height: 1350, fps: FPS };
const F916 = { width: 1080, height: 1920, fps: FPS };

export const Root: React.FC = () => (
  <>
    <Composition id="PackReel-4x5" component={PackReel} durationInFrames={FPS * 15} {...F45} />
    <Composition id="PackReel-9x16" component={PackReel} durationInFrames={FPS * 15} {...F916} />
    <Composition id="KineticHeadline" component={KineticHeadline} durationInFrames={FPS * 2} {...F45} defaultProps={{ words: ['Stop', 'the', 'scroll', 'now'] }} />
    <Composition id="CtaPill" component={CtaPill} durationInFrames={FPS * 3} {...F45} defaultProps={{ label: 'Try it free', brand: 'Your brand' }} />
    <Composition id="PromptTyping" component={PromptTyping} durationInFrames={FPS * 3} {...F45} defaultProps={{ prompt: 'Turn this screenshot into a 4:5 ad' }} />
    <Composition id="DeviceShowcase" component={DeviceShowcase} durationInFrames={FPS * 3} {...F45} defaultProps={{ device: 'phone' as const }} />
    <Composition id="StepCallout" component={StepCallout} durationInFrames={FPS * 4} {...F45} defaultProps={{ step: 1, instruction: 'Click New Project', region: { x: 0.55, y: 0.1, w: 0.35, h: 0.08 } }} />
    <Composition id="BarBuild" component={BarBuild} durationInFrames={FPS * 3} {...F45} defaultProps={{ data: [{ label: 'Q1', value: 12 }, { label: 'Q2', value: 30 }, { label: 'Q3', value: 55 }], unit: '%', title: 'Sample chart', sample: true }} />
    <Composition id="ParticleForm" component={ParticleForm} durationInFrames={FPS * 3} {...F45} defaultProps={{ shape: 'sphere' as const }} />
    <Composition id="LottieLayer" component={LottieLayer} durationInFrames={FPS * 3} {...F45} defaultProps={{}} />
  </>
);
