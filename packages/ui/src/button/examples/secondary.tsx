import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Button } from "..";

export function SecondaryButtonExample() {
  return (
    <View style={{ gap: space[2] }}>
      <Button variant="secondary" label="Secondary" />
      <Button variant="secondary" label="Secondary disabled" disabled />
      <Button variant="secondary" label="Secondary loading" loading />
    </View>
  );
}
