import { useState } from "react";
import { View } from "react-native";

import { Button } from "../../button";
import { Text } from "../../text";
import { space } from "../../theme/tokens";
import { ChoiceSheet } from "..";

export const audiences = ["Just me", "The Tavern", "All my clubs"] as const;

export function WhoCanSeeExample() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(1);
  return (
    <View style={{ gap: space[3] }}>
      <Button label="Who can see this" onPress={() => setOpen(true)} />
      <Text variant="meta">Selected: {audiences[selected]}</Text>
      <ChoiceSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Who can see this"
        options={audiences}
        selectedIndex={selected}
        onSelect={setSelected}
      />
    </View>
  );
}
