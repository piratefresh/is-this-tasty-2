import { useState } from "react";
import { View } from "react-native";

import { Button } from "../../button";
import { space } from "../../theme/tokens";
import { DexCard } from "..";
import { pliny } from "./data";

/** Tap the locked card (or Reveal) to collect it; Reset locks it again so the reveal can be replayed. */
export function RevealDexCardExample() {
  const [collected, setCollected] = useState(false);
  return (
    <View style={{ alignItems: "flex-start", gap: space[4] }}>
      <DexCard {...pliny} collected={collected} onPress={() => setCollected(true)} />
      <View style={{ flexDirection: "row", gap: space[2] }}>
        <Button label="Reveal" variant="secondary" onPress={() => setCollected(true)} disabled={collected} />
        <Button label="Reset" variant="plain" onPress={() => setCollected(false)} disabled={!collected} />
      </View>
    </View>
  );
}
