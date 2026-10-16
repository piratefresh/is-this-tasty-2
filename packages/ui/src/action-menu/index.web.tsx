import { ContextMenu } from "@base-ui/react/context-menu";
import { Menu } from "@base-ui/react/menu";
import { tv } from "tailwind-variants";

import { runItem } from "./confirm.web";
import type { ActionMenuItem, ActionMenuProps } from "./types";

export type { ActionMenuItem, ActionMenuProps } from "./types";

const styles = tv({
  slots: {
    trigger:
      "cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tint-text",
    popup: "min-w-48 rounded-md bg-sheet p-1 outline-none",
    item: "flex min-h-11 cursor-pointer items-center rounded-sm px-3 text-[17px] text-label data-highlighted:bg-surface",
    destructive: "text-destructive",
    separator: "my-1 h-px bg-handle",
  },
});

type Parts = typeof Menu | typeof ContextMenu;

function renderItems(P: Parts, items: ActionMenuItem[]) {
  const s = styles();
  return items.map((item, i) => {
    const key = `${i}-${item.title}`;
    if (item.items && item.inline) {
      return (
        <P.Group key={key}>
          {i > 0 && <P.Separator className={s.separator()} />}
          {renderItems(P, item.items)}
        </P.Group>
      );
    }
    if (item.items) {
      return (
        <P.SubmenuRoot key={key}>
          <P.SubmenuTrigger className={s.item()}>{item.title} ›</P.SubmenuTrigger>
          <P.Portal>
            <P.Positioner>
              <P.Popup className={s.popup()}>{renderItems(P, item.items)}</P.Popup>
            </P.Positioner>
          </P.Portal>
        </P.SubmenuRoot>
      );
    }
    return (
      <P.Item key={key} className={s.item({ className: item.destructive ? s.destructive() : "" })} onClick={() => runItem(item)}>
        {item.title}
      </P.Item>
    );
  });
}

function Popup({ P, items }: { P: Parts; items: ActionMenuItem[] }) {
  return (
    <P.Portal>
      <P.Positioner sideOffset={4}>
        <P.Popup className={styles().popup()}>{renderItems(P, items)}</P.Popup>
      </P.Positioner>
    </P.Portal>
  );
}

export function ActionMenu({ items, children, label, testID }: ActionMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger aria-label={label} className={styles().trigger()} data-testid={testID}>
        {children}
      </Menu.Trigger>
      <Popup P={Menu} items={items} />
    </Menu.Root>
  );
}

export function LongPressMenu({ items, children, testID }: ActionMenuProps) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger data-testid={testID}>{children}</ContextMenu.Trigger>
      <Popup P={ContextMenu} items={items} />
    </ContextMenu.Root>
  );
}
