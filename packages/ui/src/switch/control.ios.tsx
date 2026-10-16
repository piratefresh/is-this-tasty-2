import { Switch as UniversalSwitch } from "@expo/ui";
import { tint } from "@expo/ui/swift-ui/modifiers";

import { color } from "../theme/tokens";
import type { SwitchControlProps } from "./control";

/** SwiftUI Toggle: the system draws the row and plays the toggle haptic. Render inside a Host. */
export function SwitchControl({ containerColor: _, ...props }: SwitchControlProps) {
  return <UniversalSwitch {...props} modifiers={[tint(color.tint)]} />;
}
