import { useState } from "react";
import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Switch } from "..";

export function SwitchStatesExample() {
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);
  return (
    <View style={{ gap: space[2] }}>
      <Switch label="Share to club" value={on} onValueChange={setOn} />
      <Switch label="Notify on new pours" value={off} onValueChange={setOff} />
    </View>
  );
}
