import { BodyExample } from "./body";
import { DisplayExample } from "./display";
import { EyebrowExample } from "./eyebrow";
import { LabelExample } from "./label";
import { MetaExample } from "./meta";
import { SubtitleExample } from "./subtitle";
import { TitleExample } from "./title";

export const textExamples = {
  name: "Text",
  examples: [
    { title: "Display", Component: DisplayExample },
    { title: "Title", Component: TitleExample },
    { title: "Subtitle", Component: SubtitleExample },
    { title: "Body", Component: BodyExample },
    { title: "Label", Component: LabelExample },
    { title: "Meta", Component: MetaExample },
    { title: "Eyebrow", Component: EyebrowExample },
  ],
};
