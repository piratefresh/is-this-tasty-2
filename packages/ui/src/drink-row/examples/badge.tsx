import { View } from "react-native";

import { DrinkRow } from "..";
import { pliny, rose } from "./data";

export function BadgeDrinkRowExample() {
  return (
    <View>
      <DrinkRow drink={pliny} badge="dex" onPress={() => {}} />
      <DrinkRow drink={rose} badge="verified" onPress={() => {}} />
    </View>
  );
}
