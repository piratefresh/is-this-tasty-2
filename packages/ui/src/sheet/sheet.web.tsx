import { Dialog } from "@base-ui/react/dialog";
import { tv } from "tailwind-variants";

import type { SheetProps } from "./types";

const styles = tv({
  slots: {
    backdrop: "fixed inset-0 bg-black/60",
    popup:
      "fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-lg flex-col gap-3 overflow-y-auto rounded-t-sheet bg-sheet px-5.5 pb-5.5 pt-2 outline-none",
    grabber: "mx-auto h-1 w-9 shrink-0 rounded-pill bg-handle",
    title: "font-display text-[22px] leading-[26px] text-label",
  },
  variants: {
    // Medium caps at half the viewport, large fills most of it; no detent sizes to the content.
    detent: { medium: { popup: "max-h-[50dvh]" }, large: { popup: "h-[90dvh]" } },
  },
});

/** Base UI Dialog docked to the bottom. Escape and outside click dismiss. */
export function Sheet({ isOpen, onClose, title, detents, children }: SheetProps) {
  const s = styles({ detent: detents?.[0] });
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className={s.backdrop()} />
        <Dialog.Popup className={s.popup()}>
          <div className={s.grabber()} aria-hidden />
          <Dialog.Title className={s.title()}>{title}</Dialog.Title>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
