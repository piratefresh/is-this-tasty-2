import type { ActionMenuItem } from "./types";

// react-native-web's Alert is a no-op, so use the browser dialog.
export function runItem({ title, destructive, onPress }: ActionMenuItem) {
  if (!destructive || window.confirm(`${title}? This can't be undone.`)) onPress?.();
}
