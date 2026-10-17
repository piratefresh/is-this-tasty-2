import { View } from "react-native";

import { Text } from "../../text";
import { space } from "../../theme/tokens";
import { Progress } from "..";

const steps = [1, 2, 3, 4];

export function StepsExample() {
  return (
    <View style={{ gap: space[3] }}>
      {steps.map((step) => (
        <View key={step} style={{ gap: space[1] }}>
          <Text variant="meta">Step {step} of 4</Text>
          <Progress label={`Onboarding step ${step} of 4`} value={step / 4} />
        </View>
      ))}
    </View>
  );
}
