/** Brand tokens. Swap these for brand.json values; every template reads from here. */
export type Theme = {
  /** 3–5 scene backgrounds, rotated between shots */
  palette: string[];
  ink: string; // near-black
  paper: string; // off-white
  accent: string;
  font: string;
  mono: string;
};

export const defaultTheme: Theme = {
  palette: ['#111114', '#FF5A1F', '#EFEBE3', '#2A4BFF', '#0F7B5F'],
  ink: '#111114',
  paper: '#EFEBE3',
  accent: '#FF5A1F',
  font: 'Inter, "Helvetica Neue", Arial, sans-serif',
  mono: '"JetBrains Mono", Menlo, Consolas, monospace',
};

/** Readable text colour for a given background (simple luminance test). */
export const onColor = (hex: string, t: Theme = defaultTheme): string => {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 150 ? t.ink : t.paper;
};
