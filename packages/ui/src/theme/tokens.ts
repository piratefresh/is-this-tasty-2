// Single source of truth for design values. Hex literals are lint-banned outside src/theme/.

export const color = {
  // Surfaces
  bg: '#121214',
  surface: '#1a1a1d',
  surfaceAlt: '#1d1d20',
  sheet: '#232327',
  separator: '#2c2c30',
  handle: '#3a3a40',

  // Text
  label: '#f3f3f1',
  label2: '#cfcfd4',
  label3: '#8a8a90',
  label4: '#6e6e74', // icon-only, below 4.5:1 by design

  // Neutral primary pill fill; its text uses `bg`
  primaryFill: '#ececec',

  // Accent: the only chromatic UI color
  tint: '#a07cff',
  tintInk: '#170a2e',
  tintWash: '#221d33',
  tintText: '#c7b3ff',

  // Meaning: rating, category, rarity, status. Never chrome.
  star: '#f3b53f',
  gold: '#e0b455',
  teal: '#5cc0c0',
  pink: '#d98aa8',
  success: '#5cc98a',
  destructive: '#ff6b6b',
} as const;

/** 4pt grid. space[5] (22) is the screen inset. */
export const space = [0, 4, 8, 12, 16, 22, 32, 48] as const;
export const screenInset = space[5];

/** Pair with `borderCurve: 'continuous'` on iOS. */
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  sheet: 26,
  pill: 999,
} as const;

export const font = {
  display: 'Spectral_600SemiBold',
  subtitle: 'Spectral_400Regular',
  dex: 'Cinzel_600SemiBold',
} as const;

/** Genre → hue. Unknown genres fall back to `categoryFallback`. */
export const category = {
  DIPA: { dot: '#e0b455', text: '#f0cf88' },
  Rosé: { dot: '#d98aa8', text: '#e7a6c0' },
  Bourbon: { dot: '#5cc0c0', text: '#8fe0e0' },
} as const satisfies Record<string, { dot: string; text: string }>;

export const categoryFallback = { dot: color.label3, text: color.label2 } as const;

export type ColorToken = keyof typeof color;
export type RadiusToken = keyof typeof radius;
export type FontToken = keyof typeof font;
export type Genre = keyof typeof category;
