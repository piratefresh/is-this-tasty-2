import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Progress } from "..";

export function LoadingExample() {
  return (
    <View style={{ gap: space[3] }}>
      <Progress label="Loading" variant="circular" />
      <Progress label="Loading" />
    </View>
  );
}
