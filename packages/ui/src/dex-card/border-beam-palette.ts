/** Up to six gradient stops for the border-beam shader (fixed array in WGSL). */
export const MAX_BEAM_COLORS = 6;

export type BorderBeamProps = {
  /** Card size: the canvas covers the card exactly and the sweep rides the frame's centerline. */
  width: number;
  height: number;
  /** Frame ring thickness and the card's outer radius (12 for DexCard). */
  frameWidth: number;
  outerRadius: number;
  /** Seconds per lap. */
  duration?: number;
  /** Beam angular size as a fraction of the full turn. */
  beamLength?: number;
  /** Halo reach in points. */
  glow?: number;
  colors?: readonly string[];
  intensity?: number;
  /** Static base glow under the beam. */
  ambient?: number;
};

/** CSS hex (#rgb/#rrggbb) or rgb()/rgba() string → linear 0–1 RGB triple for Skia uniforms. */
export function parseBeamColor(input: string): [number, number, number] {
  const s = input.trim();
  if (s.startsWith("#")) {
    let hex = s.slice(1);
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const n = parseInt(hex, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  const m = s.match(/rgba?\(([^)]+)\)/i);
  if (m) {
    const parts = m[1].split(",").map((v) => parseFloat(v));
    return [(parts[0] || 0) / 255, (parts[1] || 0) / 255, (parts[2] || 0) / 255];
  }
  return [1, 1, 1];
}

/**
 * Flattens beam colors into the shader's fixed 6-slot uniform: fewer colors repeat the last,
 * more are dropped, and at least two are kept so the palette mix never divides by zero.
 */
export function buildBeamPalette(colors: readonly string[]): { flat: number[]; count: number } {
  const list = colors.slice(0, MAX_BEAM_COLORS).map(parseBeamColor);
  const count = Math.max(2, list.length);
  const flat: number[] = [];
  for (let i = 0; i < MAX_BEAM_COLORS; i++) {
    const c = list[i] ?? list[list.length - 1];
    flat.push(c[0], c[1], c[2]);
  }
  return { flat, count };
}
