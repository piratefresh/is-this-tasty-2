import { Stepper as NativeStepper } from "@expo/ui/swift-ui";
import { disabled as disabledModifier } from "@expo/ui/swift-ui/modifiers";

import { ThemedHost } from "../theme/themed-host";
import { defaultStepperStep, type StepperProps } from "./types";

export type { StepperProps } from "./types";

export function Stepper({ label, value, onChange, min = 0, max, step = defaultStepperStep, disabled }: StepperProps) {
  return (
    <ThemedHost matchContents={{ vertical: true }} style={{ width: "100%" }}>
      <NativeStepper
        label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={onChange}
        modifiers={[disabledModifier(!!disabled)]}
      />
    </ThemedHost>
  );
}
