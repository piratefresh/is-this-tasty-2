import { Slider as NativeSlider } from "@expo/ui/swift-ui";
import { accessibilityLabel, accessibilityValue } from "@expo/ui/swift-ui/modifiers";
import { useEffect, useRef } from "react";
import { View } from "react-native";

import { Text } from "../text";
import { ThemedHost } from "../theme/themed-host";
import { space } from "../theme/tokens";
import { defaultTasteSliderStep, type TasteSliderProps } from "./types";

export type { TasteSliderProps } from "./types";

export function TasteSlider({ leftLabel, rightLabel, value, onChange, onChangeEnd, step = defaultTasteSliderStep }: TasteSliderProps) {
  const currentValue = useRef(value);
  useEffect(() => {
    currentValue.current = value;
  }, [value]);

  return (
    <View style={{ gap: space[1] }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text variant="meta">{leftLabel}</Text>
        <Text variant="meta">{rightLabel}</Text>
      </View>
      <ThemedHost matchContents={{ vertical: true }} style={{ width: "100%" }}>
        <NativeSlider
          value={value}
          min={0}
          max={1}
          step={step}
          onValueChange={(nextValue) => {
            currentValue.current = nextValue;
            onChange(nextValue);
          }}
          onEditingChanged={(editing) => {
            if (!editing) onChangeEnd(currentValue.current);
          }}
          modifiers={[
            accessibilityLabel(`${leftLabel} to ${rightLabel}`),
            accessibilityValue(`${Math.round(value * 100)} percent`),
          ]}
        />
      </ThemedHost>
    </View>
  );
}
