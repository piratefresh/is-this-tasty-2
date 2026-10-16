import type { ActionMenuItem } from "..";

/** The standard pour menu from the spec. */
export const pourMenu = (log: (action: string) => void): ActionMenuItem[] => [
  { title: "Share pour", icon: "square.and.arrow.up", onPress: () => log("Shared") },
  { title: "Add to rotation", icon: "plus", onPress: () => log("Added to rotation") },
  { title: "", inline: true, items: [{ title: "Remove review", icon: "trash", destructive: true, onPress: () => log("Removed") }] },
];
