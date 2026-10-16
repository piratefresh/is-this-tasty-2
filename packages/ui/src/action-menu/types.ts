import type { ReactNode } from "react";
import type { MenuAction } from "@expo/ui/community/menu";

export type ActionMenuItem = {
  title: string;
  /** SF Symbol name (iOS only; Android and web show text). */
  icon?: Extract<MenuAction["image"], string>;
  onPress?: () => void;
  /** Renders red and asks for confirmation before `onPress` runs. */
  destructive?: boolean;
  /** Nested items. A submenu, or a divided section when `inline` is set. */
  items?: ActionMenuItem[];
  inline?: boolean;
};

export type ActionMenuProps = {
  items: ActionMenuItem[];
  /** The trigger: a "···" or "+" button, or any view for the long-press menu. */
  children: ReactNode;
  /** Screen reader name for the trigger on web. */
  label?: string;
  testID?: string;
};
