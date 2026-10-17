// Text tokens must hit WCAG AA (4.5:1) on bg and surface. label4 is icon-only.
// Run: node scripts/check-contrast.mjs
import assert from 'node:assert/strict';

import { category, categoryFallback, color } from '../src/theme/tokens.ts';

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

assert.ok(contrast('#ffffff', '#000000') > 20.9); // sanity

for (const bg of ['bg', 'surface']) {
  for (const fg of ['label', 'label2', 'label3']) {
    const ratio = contrast(color[fg], color[bg]);
    assert.ok(ratio >= 4.5, `${fg} on ${bg} is ${ratio.toFixed(2)}:1`);
    console.log(`${fg} on ${bg}: ${ratio.toFixed(2)}:1`);
  }
}

for (const [genre, hue] of [...Object.entries(category), ['fallback', categoryFallback]]) {
  const ratio = contrast(hue.text, color.separator);
  assert.ok(ratio >= 4.5, `${genre} on separator is ${ratio.toFixed(2)}:1`);
  console.log(`${genre} on separator: ${ratio.toFixed(2)}:1`);
}

for (const [fg, bg] of [['bg', 'primaryFill'], ['tintInk', 'tint'], ['tintText', 'tintWash'], ['destructive', 'bg'], ['destructive', 'surface'], ['tintText', 'surface'], ['gold', 'dexPlate'], ['label', 'dexPlate']]) {
  const ratio = contrast(color[fg], color[bg]);
  assert.ok(ratio >= 4.5, `${fg} on ${bg} is ${ratio.toFixed(2)}:1`);
  console.log(`${fg} on ${bg}: ${ratio.toFixed(2)}:1`);
}
