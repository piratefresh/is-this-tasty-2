import { DisabledSwitchExample } from "./disabled";
import { SwitchStatesExample } from "./states";

export const switchExamples = {
  id: "switch",
  name: "Switch",
  examples: [
    { id: "states", title: "On and off", Component: SwitchStatesExample },
    { id: "disabled", title: "Disabled", Component: DisabledSwitchExample },
  ],
};
