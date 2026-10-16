import type { ComponentType } from "react";

import { textExamples } from "./text/examples";

export type CatalogEntry = {
  name: string;
  examples: readonly { title: string; Component: ComponentType }[];
};

export const catalog: readonly CatalogEntry[] = [textExamples];
