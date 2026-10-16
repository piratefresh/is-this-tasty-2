import { FlatList } from "react-native";

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
    <FlatList
      data={rows}
      keyExtractor={(row) => row.id}
      style={{ height: 420 }}
      nestedScrollEnabled
      renderItem={({ item, index }) => <DrinkRow drink={item} badge={index % 3 ? undefined : "dex"} onPress={() => {}} />}
    />
  );
}
