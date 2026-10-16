import type { ComponentType } from "react";

import { buttonExamples } from "./button/examples";
import { genreTagExamples } from "./genre-tag/examples";
import { fieldExamples } from "./field/examples";
import { formExamples } from "./form/examples";
import { starRatingExamples } from "./star-rating/examples";
import { switchExamples } from "./switch/examples";
import { textExamples } from "./text/examples";

export type CatalogEntry = {
  id: string;
  name: string;
  examples: readonly { id: string; title: string; Component: ComponentType }[];
};

export const catalog: readonly CatalogEntry[] = [
  textExamples,
  buttonExamples,
  switchExamples,
  formExamples,
  fieldExamples,
  genreTagExamples,
  starRatingExamples,
];
