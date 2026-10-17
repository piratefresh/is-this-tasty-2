import assert from "node:assert/strict";
import { test } from "node:test";

import { buildBeamPalette, parseBeamColor } from "../src/dex-card/border-beam-palette.ts";
import { describeCard, dexNumber, frameGradient } from "../src/dex-card/card.ts";

test("dex numbers are zero-padded to three digits", () => {
  assert.equal(dexNumber(7), "№ 007");
  assert.equal(dexNumber(42), "№ 042");
  assert.equal(dexNumber(150), "№ 150");
  assert.equal(dexNumber(1042), "№ 1042");
});

test("collected cards speak name, number, tier and state; locked cards stay anonymous", () => {
  assert.equal(
    describeCard({ name: "Pliny the Elder", number: 42, rarity: "common", collected: true }),
    "Pliny the Elder, number 42, common, collected",
  );
  assert.equal(
    describeCard({ name: "Pliny the Elder", number: 42, rarity: "rare", collected: false }),
    "Locked, number 42",
  );
});

test("frame gradients run light → dark → light for RN backgroundImage and CSS", () => {
  assert.equal(
    frameGradient(["#e0b455", "#8a6a2f", "#e0b455"]),
    "linear-gradient(180deg, #e0b455, #8a6a2f 50%, #e0b455)",
  );
});

test("beam colors parse from hex and rgb() strings", () => {
  assert.deepEqual(parseBeamColor("#fff"), [1, 1, 1]);
  assert.deepEqual(parseBeamColor("#e0b455"), [224 / 255, 180 / 255, 85 / 255]);
  assert.deepEqual(parseBeamColor("rgba(224, 180, 85, 0.5)"), [224 / 255, 180 / 255, 85 / 255]);
  assert.deepEqual(parseBeamColor("nope"), [1, 1, 1]);
});

test("beam palettes fill the shader's six uniform slots without dividing by zero", () => {
  assert.deepEqual(buildBeamPalette(["#ff0000", "#00ff00"]), {
    flat: [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    count: 2,
  });
  // One color still yields two stops (the shader mixes between count - 1 segments).
  assert.equal(buildBeamPalette(["#ff0000"]).count, 2);
  // Extra colors are dropped at six slots.
  const seven = buildBeamPalette(["#100000", "#200000", "#300000", "#400000", "#500000", "#600000", "#700000"]);
  assert.equal(seven.flat.length, 18);
  assert.deepEqual(seven.flat.slice(15), [0x60 / 255, 0, 0]);
});
