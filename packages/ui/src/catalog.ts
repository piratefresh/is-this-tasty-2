import type { ComponentType } from "react";

import { webExamples } from "./examples";
import { buttonExamples } from "./button/examples";
import { genreTagExamples } from "./genre-tag/examples";
import { starRatingExamples } from "./star-rating/examples";
import { textExamples } from "./text/examples";

export type CatalogEntry = {
  id: string;
  name: string;
  examples: readonly { id: string; title: string; Component: ComponentType }[];
};

export const catalog: readonly CatalogEntry[] = [textExamples, buttonExamples, genreTagExamples, starRatingExamples, ...webExamples];
