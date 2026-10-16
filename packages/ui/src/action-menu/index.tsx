import { MenuView, type MenuAction } from "@expo/ui/community/menu";

import { runItem } from "./confirm";
import type { ActionMenuItem, ActionMenuProps } from "./types";

export type { ActionMenuItem, ActionMenuProps } from "./types";

function toActions(items: ActionMenuItem[], path = ""): MenuAction[] {
  return items.map((item, i) => ({
    id: `${path}${i}`,
    title: item.title,
    image: item.icon,
    attributes: { destructive: item.destructive },
    subactions: item.items && toActions(item.items, `${path}${i}.`),
    displayInline: item.inline,
  }));
}

function find(items: ActionMenuItem[], id: string): ActionMenuItem | undefined {
  const [head, ...rest] = id.split(".").map(Number);
  const item = items[head];
  return rest.length ? find(item?.items ?? [], rest.join(".")) : item;
}

function Menu({ items, children, testID, longPress }: ActionMenuProps & { longPress: boolean }) {
  return (
    <MenuView
      actions={toActions(items)}
      shouldOpenOnLongPress={longPress}
      onPressAction={({ nativeEvent }) => {
        const item = find(items, nativeEvent.event);
        if (item) runItem(item);
      }}
      testID={testID}
    >
      {children}
    </MenuView>
  );
}

/** Tap menu for "···" and "+" triggers. SwiftUI Menu on iOS, Material DropdownMenu on Android. */
export function ActionMenu(props: ActionMenuProps) {
  return <Menu {...props} longPress={false} />;
}

// ponytail: system menu only. A blurred backdrop and scaled row preview (like reacticx's context-menu: expo-blur + Reanimated) would be a custom JS menu; add if the native look feels too plain.
/** Wrap any row: long-press opens the same menu (with a row preview on iOS). */
export function LongPressMenu(props: ActionMenuProps) {
  return <Menu {...props} longPress />;
}
