module.exports = {
  "no-restricted-syntax": [
    "error",
    {
      selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
      message: "No hex colors outside packages/ui/src/theme/. Import tokens from @is-this-tasty/ui.",
    },
    {
      selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b/]",
      message: "No hex colors outside packages/ui/src/theme/. Import tokens from @is-this-tasty/ui.",
    },
  ],
};
