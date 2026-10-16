import type { ComponentType } from "react";

import { buttonExamples } from "./button/examples";
import { actionMenuExamples } from "./action-menu/examples";
import { pickerExamples } from "./picker/examples";
import { genreTagExamples } from "./genre-tag/examples";
import { drinkRowExamples } from "./drink-row/examples";
import { fieldExamples } from "./field/examples";
import { formExamples } from "./form/examples";
import { sheetExamples } from "./sheet/examples";
import { starRatingExamples } from "./star-rating/examples";
import { switchExamples } from "./switch/examples";
import { textExamples } from "./text/examples";
import { themeExamples } from "./theme/examples";

export type CatalogEntry = {
  id: string;
  name: string;
  examples: readonly { id: string; title: string; Component: ComponentType }[];
};

export const catalog: readonly CatalogEntry[] = [
  themeExamples,
  textExamples,
  buttonExamples,
  actionMenuExamples,
  switchExamples,
  formExamples,
  fieldExamples,
  genreTagExamples,
  drinkRowExamples,
  pickerExamples,
  starRatingExamples,
  sheetExamples,
];
