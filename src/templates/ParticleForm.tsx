import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import * as THREE from 'three';
import { defaultTheme, type Theme } from '../lib/theme';
import { springAt } from '../engines/motion';

export type ParticleFormProps = { count?: number; shape?: 'sphere' | 'ring' | 'helix'; theme?: Theme; background?: string; seed?: string };

const target = (shape: string, i: number, n: number): [number, number, number] => {
  const t = i / n;
  if (shape === 'ring') {
    const a = t * Math.PI * 2 * 7, r = 2 + 0.35 * Math.sin(a * 3);
    return [Math.cos(t * Math.PI * 2) * r, Math.sin(t * Math.PI * 2) * r, Math.sin(a) * 0.3];
  }
  if (shape === 'helix') {
    const a = t * Math.PI * 12;
    return [Math.cos(a) * 1.3, (t - 0.5) * 5, Math.sin(a) * 1.3];
  }
  const phi = Math.acos(1 - 2 * t), theta = Math.PI * (1 + Math.sqrt(5)) * i; // golden-spiral sphere
  return [Math.sin(phi) * Math.cos(theta) * 2.2, Math.cos(phi) * 2.2, Math.sin(phi) * Math.sin(theta) * 2.2];
};

/** Engine: three.js via React Three Fiber (@remotion/three). Seeded particles assemble into a shape and rotate. Fully deterministic. */
export const ParticleForm: React.FC<ParticleFormProps> = ({ count = 2400, shape = 'sphere', theme = defaultTheme, background, seed = 'pf' }) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const { start, end, geometry } = useMemo(() => {
    const start = new Float32Array(count * 3), end = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      for (let k = 0; k < 3; k++) start[i * 3 + k] = (random(`${seed}-${i}-${k}`) - 0.5) * 14;
      end.set(target(shape, i, count), i * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    return { start, end, geometry };
  }, [count, shape, seed]);
  const pos = geometry.getAttribute('position') as THREE.BufferAttribute;
  for (let i = 0; i < count; i++) {
    const t = Math.min(1, springAt(frame, fps, { delay: random(`${seed}-d-${i}`) * fps * 0.6, stiffness: 70, damping: 14 }));
    for (let k = 0; k < 3; k++) (pos.array as Float32Array)[i * 3 + k] = start[i * 3 + k] + (end[i * 3 + k] - start[i * 3 + k]) * t;
  }
  pos.needsUpdate = true;
  const rot = interpolate(frame, [0, durationInFrames], [0, Math.PI * 0.9]);
  return (
    <AbsoluteFill style={{ background: background ?? theme.ink }}>
      <ThreeCanvas width={width} height={height} camera={{ position: [0, 0, 7], fov: 50 }}>
        <points geometry={geometry} rotation={[0.3, rot, 0]}>
          <pointsMaterial size={0.05} color={theme.accent} sizeAttenuation />
        </points>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
