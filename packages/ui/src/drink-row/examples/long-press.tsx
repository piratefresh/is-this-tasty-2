import { useState } from "react";
import { View } from "react-native";

import { DrinkRow } from "..";
import { pourMenu } from "../../action-menu/examples/pour-menu";
import { Text } from "../../text";
import { space } from "../../theme/tokens";
import { pliny } from "./data";

export function LongPressDrinkRowExample() {
  const [last, setLast] = useState("Nothing yet");
  return (
    <View style={{ gap: space[2] }}>
      <DrinkRow drink={pliny} badge="dex" menu={pourMenu(setLast)} onPress={() => setLast("Opened drink")} />
      <Text variant="meta">Last action: {last}</Text>
    </View>
  );
}
