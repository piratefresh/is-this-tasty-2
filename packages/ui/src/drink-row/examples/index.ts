import { LongListDrinkRowExample } from "./long-list";
import { LongNameDrinkRowExample } from "./long-name";
import { LongPressDrinkRowExample } from "./long-press";
import { BadgeDrinkRowExample } from "./badge";
import { DefaultDrinkRowExample } from "./default";
import { SwipeDrinkRowExample } from "./swipe";
import { TrailingDrinkRowExample } from "./trailing";

export const drinkRowExamples = {
  id: "drink-row",
  name: "DrinkRow",
  examples: [
    { id: "default", title: "Default", Component: DefaultDrinkRowExample },
    { id: "badge", title: "Badge · Dex and verified", Component: BadgeDrinkRowExample },
    { id: "trailing", title: "Custom trailing", Component: TrailingDrinkRowExample },
    { id: "long-name", title: "Long name truncates", Component: LongNameDrinkRowExample },
    { id: "long-press", title: "Long-press pour menu", Component: LongPressDrinkRowExample },
    { id: "swipe", title: "Swipe actions", Component: SwipeDrinkRowExample },
    { id: "long-list", title: "200 rows", Component: LongListDrinkRowExample },
  ],
};
