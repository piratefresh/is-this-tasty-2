import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({ dir: "content/docs" });
export const components = defineDocs({
  dir: "../../packages/ui/src",
  docs: { files: ["**/docs.mdx"] },
});

export default defineConfig();
