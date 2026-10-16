import { ThemedHost } from "../theme/themed-host";
import { SwitchControl } from "./control";
import type { SwitchProps } from "./types";

export type { SwitchProps } from "./types";

/** Standalone labeled switch. Inside a Form use SwitchRow instead. */
export function Switch(props: SwitchProps) {
  return (
    <ThemedHost matchContents={{ vertical: true }}>
      <SwitchControl {...props} />
    </ThemedHost>
  );
}
