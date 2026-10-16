import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import noHex from "../../packages/ui/eslint-no-hex.cjs";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  { rules: noHex },
  globalIgnores([".next/**", ".source/**", "next-env.d.ts"]),
]);
