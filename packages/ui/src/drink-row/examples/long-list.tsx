import { FlatList, ScrollView } from "react-native";

import { DrinkRow, type Drink } from "..";
import { pliny, rose } from "./data";

const rows: (Drink & { id: string })[] = Array.from({ length: 200 }, (_, i) => ({
  ...(i % 2 ? rose : pliny),
  id: String(i),
  name: `${i % 2 ? rose.name : pliny.name} ${i + 1}`,
}));

/** Scroll check for 200 rows. Needs a real mid-range Android device to judge 60fps. */
export function LongListDrinkRowExample() {
  return (
    // The catalog screen is a vertical ScrollView, and a vertical list inside one logs a nesting error.
    // A locked horizontal ScrollView in between silences it; the list still scrolls and virtualizes.
    <ScrollView horizontal scrollEnabled={false} contentContainerStyle={{ width: "100%" }}>
      <FlatList
        data={rows}
        keyExtractor={(row) => row.id}
        style={{ height: 420 }}
        nestedScrollEnabled
        renderItem={({ item, index }) => <DrinkRow drink={item} badge={index % 3 ? undefined : "dex"} onPress={() => {}} />}
      />
    </ScrollView>
  );
}
