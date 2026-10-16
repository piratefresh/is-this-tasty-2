import { MenuExample } from "./menu";
import { SegmentedExample } from "./segmented";
import { TabsExample } from "./tabs";

export const pickerExamples = {
  id: "picker",
  name: "Picker",
  examples: [
    { id: "segmented", title: "Segmented · tabs and filters", Component: SegmentedExample },
    { id: "menu", title: "Menu · 12 countries scroll", Component: MenuExample },
    { id: "tabs", title: "Tabs · no remount, selection kept on back", Component: TabsExample },
  ],
};
