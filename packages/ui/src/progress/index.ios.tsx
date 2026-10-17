import { Gauge, ProgressView } from "@expo/ui/swift-ui";
import { accessibilityLabel, accessibilityValue, gaugeStyle, progressViewStyle, tint } from "@expo/ui/swift-ui/modifiers";

import { ThemedHost } from "../theme/themed-host";
import { color } from "../theme/tokens";
import { percent, type ProgressProps } from "./types";

export type { ProgressProps } from "./types";

/** SwiftUI ProgressView (linear, spinner) or Gauge (determinate ring). */
export function Progress({ label, value, variant = "linear" }: ProgressProps) {
  const a11y = [accessibilityLabel(label), ...(value === undefined ? [] : [accessibilityValue(`${percent(value)} percent`)])];
  return (
    <ThemedHost matchContents={variant === "linear" ? { vertical: true } : true} style={variant === "linear" ? { width: "100%" } : undefined}>
      {variant === "circular" && value !== undefined ? (
        <Gauge value={value} min={0} max={1} modifiers={[gaugeStyle("circularCapacity"), tint(color.tint), ...a11y]} />
      ) : (
        <ProgressView
          value={value ?? null}
          modifiers={[progressViewStyle(variant === "linear" ? "linear" : "circular"), tint(color.tint), ...a11y]}
        />
      )}
    </ThemedHost>
  );
}
