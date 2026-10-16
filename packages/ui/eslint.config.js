const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const noHexRules = require("./eslint-no-hex.cjs");

module.exports = defineConfig([
  expoConfig,
  {
    files: ["src/**"],
    ignores: ["src/theme/**"],
    rules: noHexRules,
  },
]);
