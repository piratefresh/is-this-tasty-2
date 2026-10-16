import { useState } from "react";
import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Text } from "../../text";
import { ActionMenu } from "..";
import { pourMenu } from "./pour-menu";

export function OverflowExample() {
  const [last, setLast] = useState("Nothing yet");
  const items = pourMenu(setLast);
  return (
    <View style={{ gap: space[3] }}>
      <View style={{ flexDirection: "row", gap: space[4] }}>
        <ActionMenu label="More actions" items={items}>
          <Text variant="body">···</Text>
        </ActionMenu>
        <ActionMenu label="Add" items={[{ title: "Log a pour", icon: "plus", onPress: () => setLast("Log a pour") }]}>
          <Text variant="body">+</Text>
        </ActionMenu>
      </View>
      <Text variant="meta">Last action: {last}</Text>
    </View>
  );
}
