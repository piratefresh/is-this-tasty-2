import { IconButton, Row, Text as NativeText } from "@expo/ui/jetpack-compose";
import { semantics } from "@expo/ui/jetpack-compose/modifiers";

import { ThemedHost } from "../theme/themed-host";
import { space } from "../theme/tokens";
import { defaultStepperStep, type StepperProps } from "./types";

export type { StepperProps } from "./types";

export function Stepper({ label, value, onChange, min = 0, max, step = defaultStepperStep, disabled }: StepperProps) {
  const decrementDisabled = disabled || value <= min;
  const incrementDisabled = disabled || (max !== undefined && value >= max);

  return (
    <ThemedHost matchContents={{ vertical: true }} style={{ width: "100%" }}>
      <Row horizontalArrangement={{ spacedBy: space[2] }} verticalAlignment="center">
        <NativeText>{label}</NativeText>
        <IconButton
          enabled={!decrementDisabled}
          onClick={() => onChange(Math.max(min, value - step))}
          modifiers={[semantics({ contentDescription: `Decrease ${label}` })]}
        >
          <NativeText style={{ fontSize: 20 }}>−</NativeText>
        </IconButton>
        <NativeText>{value}</NativeText>
        <IconButton
          enabled={!incrementDisabled}
          onClick={() => onChange(max === undefined ? value + step : Math.min(max, value + step))}
          modifiers={[semantics({ contentDescription: `Increase ${label}` })]}
        >
          <NativeText style={{ fontSize: 20 }}>+</NativeText>
        </IconButton>
      </Row>
    </ThemedHost>
  );
}
