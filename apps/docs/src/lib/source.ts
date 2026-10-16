import { loader } from "fumadocs-core/source";

import { components, docs } from "../../.source/server";

const componentSource = components.toFumadocsSource({ baseDir: "components" });

export const source = loader({
  baseUrl: "/docs",
  source: {
    files: [
      ...docs.toFumadocsSource().files,
      ...componentSource.files.map((file) => ({
        ...file,
        path: file.path.replace(/\/docs\.mdx$/, ".mdx"),
      })),
    ],
  },
});
