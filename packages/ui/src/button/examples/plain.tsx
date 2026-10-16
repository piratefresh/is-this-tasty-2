import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Button } from "..";

export function PlainButtonExample() {
  return (
    <View style={{ gap: space[2] }}>
      <Button variant="plain" label="Plain" />
      <Button variant="plain" label="Plain disabled" disabled />
      <Button variant="plain" label="Plain loading" loading />
    </View>
  );
}
