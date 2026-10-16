import { useState } from "react";
import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Text } from "../../text";
import { MenuPicker } from "..";

const countries = [
  "Belgium", "Canada", "Czechia", "Denmark", "France", "Germany",
  "Ireland", "Japan", "Norway", "Sweden", "United Kingdom", "United States",
];

/** 12 options: the menu must scroll on a small screen. */
export function MenuExample() {
  const [country, setCountry] = useState(0);
  return (
    <View style={{ gap: space[3] }}>
      <MenuPicker label="Country" options={countries} selectedIndex={country} onChange={setCountry} />
      <MenuPicker label="Sort" options={["Newest", "Top rated", "A to Z", "Nearest", "ABV"]} selectedIndex={0} onChange={() => {}} disabled />
      <Text variant="meta">Selected: {countries[country]}</Text>
    </View>
  );
}
