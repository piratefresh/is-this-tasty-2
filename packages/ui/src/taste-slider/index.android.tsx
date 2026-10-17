import { Slider as NativeSlider } from "@expo/ui/jetpack-compose";
import { semantics } from "@expo/ui/jetpack-compose/modifiers";
import { useEffect, useRef } from "react";
import { View } from "react-native";

import { Text } from "../text";
import { ThemedHost } from "../theme/themed-host";
import { space } from "../theme/tokens";
import { defaultTasteSliderStep, type TasteSliderProps } from "./types";

export type { TasteSliderProps } from "./types";

// Ticks only when step divides 0..1 evenly; otherwise move continuously and snap to step.
function snapToStep(value: number, step: number) {
  if (step <= 0) return value;
  const snapped = Math.min(Math.round(value / step) * step, 1);
  return Number(snapped.toFixed((String(step).split(".")[1] ?? "").length));
}

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
          steps={step > 0 && Math.abs(1 / step - Math.round(1 / step)) < 1e-9 ? Math.round(1 / step) - 1 : 0}
          onValueChange={(nextValue) => {
            const snapped = snapToStep(nextValue, step);
            currentValue.current = snapped;
            onChange(snapped);
          }}
          onValueChangeFinished={() => onChangeEnd(currentValue.current)}
          modifiers={[semantics({ contentDescription: `${leftLabel} to ${rightLabel}` })]}
        />
      </ThemedHost>
    </View>
  );
}
