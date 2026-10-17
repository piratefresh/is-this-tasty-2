import { useState } from "react";
import { View } from "react-native";

import { Text } from "../../text";
import { space } from "../../theme/tokens";
import { TasteSlider } from "..";

export function TasteProfileExample() {
  const [profile, setProfile] = useState({ sweet: 0.6, body: 0.5, fruit: 0.4 });
  const [savedSweet, setSavedSweet] = useState(profile.sweet);
  const update = (axis: keyof typeof profile, value: number) =>
    setProfile((current) => ({ ...current, [axis]: value }));

  return (
    <View style={{ gap: space[3] }}>
      <TasteSlider
        leftLabel="Bitter"
        rightLabel="Sweet"
        value={profile.sweet}
        onChange={(value) => update("sweet", value)}
        onChangeEnd={setSavedSweet}
      />
      <TasteSlider
        leftLabel="Light"
        rightLabel="Full body"
        value={profile.body}
        onChange={(value) => update("body", value)}
        onChangeEnd={(value) => update("body", value)}
      />
      <TasteSlider
        leftLabel="Dry"
        rightLabel="Fruity"
        value={profile.fruit}
        onChange={(value) => update("fruit", value)}
        onChangeEnd={(value) => update("fruit", value)}
      />
      <Text variant="meta">Sweetness saved at {Math.round(savedSweet * 100)}%</Text>
    </View>
  );
}
