import { WhoCanSeeExample } from "./who-can-see";
import { SheetWithFieldExample } from "./with-field";

export const sheetExamples = {
  id: "sheet",
  name: "Sheet",
  examples: [
    { id: "who-can-see", title: "ChoiceSheet · who can see this", Component: WhoCanSeeExample },
    { id: "with-field", title: "Sheet · text field, medium to large", Component: SheetWithFieldExample },
  ],
};
