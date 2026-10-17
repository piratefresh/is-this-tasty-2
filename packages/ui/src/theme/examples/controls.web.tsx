import { useState } from "react";
import { View } from "react-native";

import { Button } from "../../button";
import { Switch } from "../../switch";
import { TasteSlider } from "../../taste-slider";
import { Text } from "../../text";
import { space } from "../tokens";

export function ThemeControlsExample() {
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState(0.5);
  const [presses, setPresses] = useState(0);

  return (
    <View style={{ gap: space[3] }}>
      <Text variant="body">The catalog controls stay dark with violet accents on web.</Text>
      <Switch label="Theme check" value={enabled} onValueChange={setEnabled} />
      <TasteSlider
        leftLabel="Cool"
        rightLabel="Warm"
        value={value}
        onChange={setValue}
        onChangeEnd={setValue}
      />
      <Button label="Check tint" onPress={() => setPresses((count) => count + 1)} />
      <Text variant="body">Switch {enabled ? "on" : "off"} · Button presses: {presses}</Text>
    </View>
  );
}
