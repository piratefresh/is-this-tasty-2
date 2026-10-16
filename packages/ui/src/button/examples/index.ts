import { DestructiveButtonExample } from "./destructive";
import { PlainButtonExample } from "./plain";
import { PrimaryButtonExample } from "./primary";
import { SecondaryButtonExample } from "./secondary";
import { TintedButtonExample } from "./tinted";

export const buttonExamples = {
  id: "button",
  name: "Button",
  examples: [
    { id: "primary", title: "Primary", Component: PrimaryButtonExample },
    { id: "tinted", title: "Tinted", Component: TintedButtonExample },
    { id: "secondary", title: "Secondary", Component: SecondaryButtonExample },
    { id: "plain", title: "Plain", Component: PlainButtonExample },
    { id: "destructive", title: "Destructive", Component: DestructiveButtonExample },
  ],
};
