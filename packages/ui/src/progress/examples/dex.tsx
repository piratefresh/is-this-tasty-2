import { View } from "react-native";

import { Text } from "../../text";
import { space } from "../../theme/tokens";
import { Progress } from "..";

export function DexCompletionExample() {
  return (
    <View style={{ gap: space[3] }}>
      <Text variant="meta">35% of the Dex discovered</Text>
      <Progress label="Dex completion" value={0.35} />
      <Progress label="Dex completion" value={0.35} variant="circular" />
    </View>
  );
}
