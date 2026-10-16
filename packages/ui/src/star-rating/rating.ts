export const STAR_COUNT = 5;
export const STAR_GAP = 4;

export function normalizeRating(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(STAR_COUNT, Math.round(value * 2) / 2)) : 0;
}

/** Gaps belong to the preceding star; the left half of each glyph selects .5. */
export function ratingAtPosition(x: number, size: number): number {
  if (x <= 0) return 0;
  const index = Math.floor(x / (size + STAR_GAP));
  const withinStar = x - index * (size + STAR_GAP);
  return normalizeRating(index + (withinStar < size / 2 ? 0.5 : 1));
}

/** Return the last emitted value so repeated move events cannot repeat feedback. */
export function selectRating(
  value: number,
  previous: number,
  onChange: (value: number) => void,
  feedback: () => void,
): number {
  const next = normalizeRating(value);
  if (next !== previous) {
    onChange(next);
    feedback();
  }
  return next;
}
