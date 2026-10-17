import { DexCompletionExample } from "./dex";
import { LoadingExample } from "./loading";
import { StepsExample } from "./steps";

export const progressExamples = {
  id: "progress",
  name: "Progress",
  examples: [
    { id: "steps", title: "Linear · onboarding steps", Component: StepsExample },
    { id: "dex", title: "Linear and circular · Dex completion", Component: DexCompletionExample },
    { id: "loading", title: "Indeterminate · loading", Component: LoadingExample },
  ],
};
