import { readFile, writeFile } from "node:fs/promises";

import { category, categoryFallback, color, font, radius, space } from "../src/theme/tokens.ts";

const kebab = (name) => name
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
  .toLowerCase();

const variables = (namespace, values, format = String) =>
  Object.entries(values).map(([name, value]) => `  --${namespace}-${kebab(name)}: ${format(value)};`);

const colors = {
  ...color,
  ...Object.fromEntries(Object.entries(category).flatMap(([name, tones]) =>
    Object.entries(tones).map(([role, value]) => [`category-${name}-${role}`, value]),
  )),
  ...Object.fromEntries(Object.entries(categoryFallback).map(([role, value]) =>
    [`category-fallback-${role}`, value],
  )),
};

const css = [
  "/* Generated from tokens.ts by pnpm tokens. Do not edit. */",
  "@theme {",
  "  --color-*: initial;",
  "  --spacing: initial;",
  "  --spacing-*: initial;",
  "  --radius-*: initial;",
  "  --font-*: initial;",
  ...variables("color", colors),
  ...variables("spacing", space, (value) => `${value}px`),
  ...variables("radius", radius, (value) => `${value}px`),
  ...variables("font", font, (value) => `\"${value}\", serif`),
  "}",
  "",
].join("\n");

const output = new URL("../src/theme/tokens.css", import.meta.url);
if (process.argv.includes("--check")) {
  const committed = await readFile(output, "utf8").catch((error) => {
    if (error.code === "ENOENT") return "";
    throw error;
  });
  if (committed.replace(/\r\n/g, "\n") !== css) {
    console.error("tokens.css is stale. Run pnpm tokens and commit the result.");
    process.exitCode = 1;
  }
} else {
  await writeFile(output, css);
  console.log("Generated packages/ui/src/theme/tokens.css");
}
