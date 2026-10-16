import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";

import { previewIds } from "./record-previews.mjs";

test("record exactly the documented component examples", () => {
  const mdx = readFileSync(new URL("../packages/ui/src/button/docs.mdx", import.meta.url), "utf8");
  assert.deepEqual(previewIds("button", mdx), ["primary", "tinted", "secondary", "plain", "destructive"]);
  assert.deepEqual(previewIds("button", '<Preview example="text/body" /><Preview example="button/plain" /><Preview example="button/plain" />'), ["plain"]);
});

test("reject traversal and missing examples before using device paths", () => {
  assert.throws(() => previewIds("../button", ""));
  assert.throws(() => previewIds("button", '<Preview example="button/../secret" />'));
});

test("every documented preview has a source file and a matching catalog ID", () => {
  const base = new URL("../packages/ui/src/", import.meta.url);
  for (const component of readdirSync(base)) {
    const mdxFile = new URL(`${component}/docs.mdx`, base);
    if (!existsSync(mdxFile)) continue;
    const ids = previewIds(component, readFileSync(mdxFile, "utf8"));
    const registry = readFileSync(new URL(`${component}/examples/index.ts`, base), "utf8");
    const registryIds = [...registry.matchAll(/\{ id: "([a-z0-9-]+)"/g)].map((match) => match[1]);
    assert.deepEqual(new Set(ids), new Set(registryIds), component);
    for (const id of ids) assert.ok(existsSync(new URL(`${component}/examples/${id}.tsx`, base)), `${component}/${id}`);
  }
});
