import { View } from "react-native";

import { space } from "../../theme/tokens";
import { DexCard } from "..";
import { pliny } from "./data";

/** Rarer tiers carry a light beam traveling the gold frame (native only; web shows the static frame). */
export function RareDexCardExample() {
  return (
    <View style={{ flexDirection: "row", gap: space[3], alignItems: "flex-end" }}>
      <DexCard {...pliny} rarity="rare" collected />
      <DexCard {...pliny} rarity="rare" collected width={160} />
      <DexCard {...pliny} rarity="rare" />
    </View>
  );
}
