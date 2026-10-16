const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
const baseUiPrehydrationStub = path.join(
  path.dirname(require.resolve("@base-ui/react/package.json")),
  "internals/prehydrationScript.stub.mjs",
);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web" && moduleName === "#prehydration/slider/thumb") {
    return { filePath: baseUiPrehydrationStub, type: "sourceFile" };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
