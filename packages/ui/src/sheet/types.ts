import type { ReactNode } from "react";

export type SheetDetent = "medium" | "large";

export type SheetProps = {
  isOpen: boolean;
  /** Swipe down, tap outside, Escape or back button. Set `isOpen` to false here. */
  onClose: () => void;
  title: string;
  /** Heights the sheet can rest at. Omit to size to the content. */
  detents?: SheetDetent[];
  children: ReactNode;
};

export type ChoiceSheetProps = Pick<SheetProps, "isOpen" | "onClose" | "title"> & {
  options: readonly string[];
  selectedIndex: number;
  /** Called with the tapped index; the sheet closes right after. */
  onSelect: (index: number) => void;
};
