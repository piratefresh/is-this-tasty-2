import { View } from "react-native";

import { space } from "../../theme/tokens";
import { DexCard } from "..";
import { pliny } from "./data";

export function LargeDexCardExample() {
  return (
    <View style={{ flexDirection: "row", gap: space[4] }}>
      <DexCard {...pliny} rarity="rare" collected width={220} />
      <DexCard {...pliny} rarity="rare" width={220} />
    </View>
  );
}
