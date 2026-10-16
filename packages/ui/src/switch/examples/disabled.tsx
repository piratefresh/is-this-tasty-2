import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Switch } from "..";

export function DisabledSwitchExample() {
  return (
    <View style={{ gap: space[2] }}>
      <Switch label="Sync to Health (on, locked)" value disabled onValueChange={() => {}} />
      <Switch label="Beta features (off, locked)" value={false} disabled onValueChange={() => {}} />
    </View>
  );
}
