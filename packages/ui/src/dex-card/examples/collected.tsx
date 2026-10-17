import { DexCard } from "..";
import { pliny } from "./data";

export function CollectedDexCardExample() {
  return <DexCard {...pliny} collected />;
}
