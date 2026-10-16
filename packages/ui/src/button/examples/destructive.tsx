import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Button } from "..";

export function DestructiveButtonExample() {
  return (
    <View style={{ gap: space[2] }}>
      <Button variant="destructive" label="Destructive" />
      <Button variant="destructive" label="Destructive disabled" disabled />
      <Button variant="destructive" label="Destructive loading" loading />
    </View>
  );
}
