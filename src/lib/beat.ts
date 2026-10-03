/** Beat-grid helpers: cut on bars, land hero moves on beats. */
export const framesPerBeat = (fps: number, bpm = 120) => (fps * 60) / bpm;
export const framesPerBar = (fps: number, bpm = 120, beatsPerBar = 4) => framesPerBeat(fps, bpm) * beatsPerBar;
export const beat = (n: number, fps: number, bpm = 120) => Math.round(n * framesPerBeat(fps, bpm));
