import { FlatList, ScrollView } from "react-native";

import { space } from "../../theme/tokens";
import { DexCard } from "..";
import { grid } from "./data";

/** Scroll check for a 3-column grid of 150 plates, about a third of them beaming. Needs a real mid-range Android device to judge 60fps. */
export function GridDexCardExample() {
  return (
    // The catalog screen is a vertical ScrollView, and a vertical list inside one logs a nesting error.
    // A locked horizontal ScrollView in between silences it; the list still scrolls and virtualizes.
    <ScrollView horizontal scrollEnabled={false} contentContainerStyle={{ width: "100%" }}>
      <FlatList
        data={grid}
        keyExtractor={(card) => card.id}
        numColumns={3}
        columnWrapperStyle={{ gap: space[3] }}
        contentContainerStyle={{ gap: space[3], paddingVertical: space[1] }}
        style={{ height: 640 }}
        nestedScrollEnabled
        renderItem={({ item }) => (
          <DexCard name={item.name} number={item.number} rarity={item.rarity} collected={item.collected} onPress={() => {}} />
        )}
      />
    </ScrollView>
  );
}
