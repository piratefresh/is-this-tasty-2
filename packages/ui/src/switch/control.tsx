import { ListItem, Switch as ComposeSwitch, Text as ComposeText } from "@expo/ui/jetpack-compose";
import { testID as testIDModifier, toggleable } from "@expo/ui/jetpack-compose/modifiers";
import * as Haptics from "expo-haptics";

import { color } from "../theme/tokens";
import type { SwitchProps } from "./types";

export type SwitchControlProps = SwitchProps & {
  /** Row background. Android only; iOS takes it from the Form. */
  containerColor?: string;
};

const switchColors = {
  checkedTrackColor: color.tint,
  checkedBorderColor: color.tint,
  checkedThumbColor: color.tintInk,
};

/**
 * Compose ListItem with a trailing Switch. The whole row is toggleable, so
 * TalkBack reads label + state once. Render inside a Host.
 */
export function SwitchControl({ label, value, onValueChange, disabled, testID, containerColor = "transparent" }: SwitchControlProps) {
  const toggle = () => {
    const next = !value;
    // Compose Switch has no built-in haptic; feedback is optional, the toggle is not.
    void Haptics.performAndroidHapticsAsync(next ? Haptics.AndroidHaptics.Toggle_On : Haptics.AndroidHaptics.Toggle_Off).catch(() => {});
    onValueChange(next);
  };

  return (
    <ListItem
      colors={{ containerColor }}
      modifiers={[
        ...(disabled ? [] : [toggleable(value, toggle, { role: "switch" })]),
        ...(testID ? [testIDModifier(testID)] : []),
      ]}
    >
      <ListItem.HeadlineContent>
        <ComposeText color={disabled ? color.label3 : color.label}>{label}</ComposeText>
      </ListItem.HeadlineContent>
      <ListItem.TrailingContent>
        <ComposeSwitch value={value} enabled={!disabled} colors={switchColors} />
      </ListItem.TrailingContent>
    </ListItem>
  );
}
