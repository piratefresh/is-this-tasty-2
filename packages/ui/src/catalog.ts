import type { ComponentType } from "react";

import { webExamples } from "./examples";
import { textExamples } from "./text/examples";

export type CatalogEntry = {
  name: string;
  examples: readonly { title: string; Component: ComponentType }[];
};

export const catalog: readonly CatalogEntry[] = [textExamples, ...webExamples];
