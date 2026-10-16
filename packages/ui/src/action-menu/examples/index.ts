import { LongPressExample } from "./long-press";
import { OverflowExample } from "./overflow";

export const actionMenuExamples = {
  id: "action-menu",
  name: "ActionMenu",
  examples: [
    { id: "overflow", title: "Overflow and add · tap", Component: OverflowExample },
    { id: "long-press", title: "Long-press on a row", Component: LongPressExample },
  ],
};
