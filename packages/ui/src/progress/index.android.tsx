import { CircularProgressIndicator, LinearProgressIndicator } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, semantics, size } from "@expo/ui/jetpack-compose/modifiers";

import { ThemedHost } from "../theme/themed-host";
import { color } from "../theme/tokens";
import { percent, type ProgressProps } from "./types";

export type { ProgressProps } from "./types";

/** Material progress indicators. Omitting `value` animates them as indeterminate. */
export function Progress({ label, value, variant = "linear" }: ProgressProps) {
  const description = value === undefined ? label : `${label}, ${percent(value)} percent`;
  const common = { progress: value, color: color.tint, trackColor: color.handle };
  return (
    // Circular must wrap both axes: a full-width host stretches the ring past the height RN reserved.
    <ThemedHost matchContents={variant === "linear" ? { vertical: true } : true} style={variant === "linear" ? { width: "100%" } : undefined}>
      {variant === "linear" ? (
        <LinearProgressIndicator {...common} modifiers={[fillMaxWidth(), semantics({ contentDescription: description })]} />
      ) : (
        <CircularProgressIndicator {...common} modifiers={[size(40, 40), semantics({ contentDescription: description })]} />
      )}
    </ThemedHost>
  );
}
