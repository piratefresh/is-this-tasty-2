import { Alert } from "react-native";

import type { ActionMenuItem } from "./types";

/** Runs the item, behind a native alert when it destroys data. */
export function runItem({ title, destructive, onPress }: ActionMenuItem) {
  if (!destructive) return onPress?.();
  Alert.alert(title, "This can't be undone.", [
    { text: "Cancel", style: "cancel" },
    { text: title, style: "destructive", onPress },
  ]);
}
