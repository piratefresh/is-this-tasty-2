import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Button } from "..";

export function TintedButtonExample() {
  return (
    <View style={{ gap: space[2] }}>
      <Button variant="tinted" label="Tinted" />
      <Button variant="tinted" label="Tinted disabled" disabled />
      <Button variant="tinted" label="Tinted loading" loading />
    </View>
  );
}
