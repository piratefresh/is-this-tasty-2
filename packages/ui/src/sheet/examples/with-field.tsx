import { useState } from "react";
import { View } from "react-native";

import { Button } from "../../button";
import { Field } from "../../field";
import { Text } from "../../text";
import { space } from "../../theme/tokens";
import { Sheet } from "..";

export function SheetWithFieldExample() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  return (
    <View style={{ gap: space[3] }}>
      <Button label="Add a tasting note" onPress={() => setOpen(true)} />
      <Text variant="meta">Note: {note || "none"}</Text>
      <Sheet isOpen={open} onClose={() => setOpen(false)} title="Tasting note" snapPoints={["medium", "large"]}>
        <Field placeholder="Smoky, honeyed, long finish" value={note} onChangeText={setNote} onSubmit={() => setOpen(false)} />
      </Sheet>
    </View>
  );
}
