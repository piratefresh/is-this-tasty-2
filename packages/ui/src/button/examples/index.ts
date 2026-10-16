import { DestructiveButtonExample } from "./destructive";
import { PlainButtonExample } from "./plain";
import { PrimaryButtonExample } from "./primary";
import { SecondaryButtonExample } from "./secondary";
import { TintedButtonExample } from "./tinted";

export const buttonExamples = {
  name: "Button",
  examples: [
    { title: "Primary", Component: PrimaryButtonExample },
    { title: "Tinted", Component: TintedButtonExample },
    { title: "Secondary", Component: SecondaryButtonExample },
    { title: "Plain", Component: PlainButtonExample },
    { title: "Destructive", Component: DestructiveButtonExample },
  ],
};
