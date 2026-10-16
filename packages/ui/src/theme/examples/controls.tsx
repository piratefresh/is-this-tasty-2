import { Button, Column, RNHostView, Slider, Switch } from "@expo/ui";
import { semantics } from "@expo/ui/jetpack-compose/modifiers";
import { accessibilityLabel } from "@expo/ui/swift-ui/modifiers";
import { useState } from "react";
import { Platform } from "react-native";

import { Text } from "../../text";
import { ThemedHost } from "../themed-host";
import { space } from "../tokens";

const sliderModifiers = Platform.select({
  ios: [accessibilityLabel("Theme slider")],
  android: [semantics({ contentDescription: "Theme slider" })],
  default: [],
});

/** Raw native controls deliberately share one Host to verify inherited theme. */
export function ThemeControlsExample() {
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState(0.5);
  const [presses, setPresses] = useState(0);

  return (
    <ThemedHost matchContents={{ vertical: true }} style={{ width: "100%" }}>
      <Column spacing={space[4]}>
        <RNHostView matchContents={{ vertical: true }}>
          <Text variant="body">Switch the device between light and dark mode. These controls should stay dark with violet accents.</Text>
        </RNHostView>
        <Switch label="Theme check" value={enabled} onValueChange={setEnabled} testID="theme-switch" />
        <RNHostView matchContents={{ vertical: true }}>
          <Text variant="label">Slider: {Math.round(value * 100)}%</Text>
        </RNHostView>
        <Slider value={value} onValueChange={setValue} modifiers={sliderModifiers} testID="theme-slider" />
        <Button label="Check tint" onPress={() => setPresses((count) => count + 1)} testID="theme-button" />
        <RNHostView matchContents={{ vertical: true }}>
          <Text variant="body">Switch {enabled ? "on" : "off"} · Button presses: {presses}</Text>
        </RNHostView>
      </Column>
    </ThemedHost>
  );
}
