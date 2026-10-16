import assert from "node:assert/strict";
import { test } from "node:test";

import { normalizeRating, ratingAtPosition, selectRating } from "../src/star-rating/rating.ts";

test("ratings clamp to half steps, including invalid inputs", () => {
  for (const [value, expected] of [[0, 0], [0.5, 0.5], [3.5, 3.5], [5, 5], [-1, 0], [6, 5], [2.26, 2.5], [NaN, 0], [Infinity, 0]]) {
    assert.equal(normalizeRating(value), expected);
  }
});

test("pointer positions respect glyph halves, gaps, and scrub bounds at both sizes", () => {
  for (const size of [16, 30]) {
    assert.equal(ratingAtPosition(-10, size), 0);
    assert.equal(ratingAtPosition(0, size), 0);
    for (let index = 0; index < 5; index++) {
      const start = index * (size + 4);
      assert.equal(ratingAtPosition(start + size / 4, size), index + 0.5);
      assert.equal(ratingAtPosition(start + size / 2, size), index + 1);
      assert.equal(ratingAtPosition(start + size + 2, size), index + 1);
    }
    assert.equal(ratingAtPosition(1000, size), 5);
  }
});

test("repeated scrub events and endpoint adjustments emit feedback only for changes", () => {
  const changes = [];
  let feedback = 0;
  let previous = 3.5;
  for (const value of [3.5, 3.5, 4, 4, 4.5, 4.5, 5, 5.5, 5, 4.5, 0, -0.5]) {
    previous = selectRating(value, previous, (next) => changes.push(next), () => feedback++);
  }
  assert.deepEqual(changes, [4, 4.5, 5, 4.5, 0]);
  assert.equal(feedback, changes.length);
});
