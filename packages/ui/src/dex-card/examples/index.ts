import { CollectedDexCardExample } from "./collected";
import { GridDexCardExample } from "./grid";
import { LargeDexCardExample } from "./large";
import { LockedDexCardExample } from "./locked";
import { RareDexCardExample } from "./rare";
import { RevealDexCardExample } from "./reveal";

export const dexCardExamples = {
  id: "dex-card",
  name: "DexCard",
  examples: [
    { id: "collected", title: "Collected", Component: CollectedDexCardExample },
    { id: "locked", title: "Locked", Component: LockedDexCardExample },
    { id: "reveal", title: "Reveal", Component: RevealDexCardExample },
    { id: "rare", title: "Rare · border beam", Component: RareDexCardExample },
    { id: "large", title: "Detail size", Component: LargeDexCardExample },
    { id: "grid", title: "150-card grid", Component: GridDexCardExample },
  ],
};
