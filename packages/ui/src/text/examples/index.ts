import { BodyExample } from "./body";
import { DisplayExample } from "./display";
import { EyebrowExample } from "./eyebrow";
import { LabelExample } from "./label";
import { MetaExample } from "./meta";
import { SubtitleExample } from "./subtitle";
import { TitleExample } from "./title";

export const textExamples = {
  id: "text",
  name: "Text",
  examples: [
    { id: "display", title: "Display", Component: DisplayExample },
    { id: "title", title: "Title", Component: TitleExample },
    { id: "subtitle", title: "Subtitle", Component: SubtitleExample },
    { id: "body", title: "Body", Component: BodyExample },
    { id: "label", title: "Label", Component: LabelExample },
    { id: "meta", title: "Meta", Component: MetaExample },
    { id: "eyebrow", title: "Eyebrow", Component: EyebrowExample },
  ],
};
