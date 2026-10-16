import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Button } from "..";

export function PrimaryButtonExample() {
  return (
    <View style={{ gap: space[2] }}>
      <Button variant="primary" label="Primary" />
      <Button variant="primary" label="Primary disabled" disabled />
      <Button variant="primary" label="Primary loading" loading />
    </View>
  );
}
