import { useState } from "react";
import { View } from "react-native";

import { Text } from "../../text";
import { space } from "../../theme/tokens";
import { Stepper } from "..";

export function PourCountExample() {
  const [pours, setPours] = useState(2);

  return (
    <View style={{ gap: space[2] }}>
      <Stepper label="Number of pours" value={pours} onChange={setPours} min={1} max={8} />
      <Text variant="meta">Choose between 1 and 8 pours.</Text>
    </View>
  );
}
