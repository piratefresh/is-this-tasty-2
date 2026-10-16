import { MenuView, type MenuAction, type MenuComponentRef } from "@expo/ui/community/menu";
import { useRef } from "react";
import { Platform, Pressable } from "react-native";

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

function Menu({ items, children, testID, onPress, longPress }: ActionMenuProps & { longPress: boolean }) {
  const menu = useRef<MenuComponentRef>(null);
  return (
    <MenuView
      ref={menu}
      actions={toActions(items)}
      shouldOpenOnLongPress={longPress}
      onPressAction={({ nativeEvent }) => {
        const item = find(items, nativeEvent.event);
        if (item) runItem(item);
      }}
      testID={testID}
    >
      {onPress ? (
        // Android opens the menu from MenuView's own Pressable, which an inner tap target would
        // swallow, so route the long-press through show(). iOS opens it natively.
        <Pressable onPress={onPress} onLongPress={Platform.OS === "android" ? () => menu.current?.show() : undefined}>
          {children}
        </Pressable>
      ) : (
        children
      )}
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
