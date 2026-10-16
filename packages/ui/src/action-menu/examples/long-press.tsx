import { useState } from "react";
import { View } from "react-native";

import { color, radius, space } from "../../theme/tokens";
import { Text } from "../../text";
import { LongPressMenu } from "..";
import { pourMenu } from "./pour-menu";

export function LongPressExample() {
  const [last, setLast] = useState("Nothing yet");
  return (
    <View style={{ gap: space[3] }}>
      <LongPressMenu items={pourMenu(setLast)}>
        <View style={{ padding: space[4], borderRadius: radius.md, backgroundColor: color.surface }}>
          <Text variant="body">Long-press this row</Text>
        </View>
      </LongPressMenu>
      <Text variant="meta">Last action: {last}</Text>
    </View>
  );
}
