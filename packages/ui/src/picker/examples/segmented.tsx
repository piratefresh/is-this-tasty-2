import { useState } from "react";
import { View } from "react-native";

import { space } from "../../theme/tokens";
import { SegmentedPicker } from "..";

export function SegmentedExample() {
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState(1);
  return (
    <View style={{ gap: space[3] }}>
      <SegmentedPicker label="Home" options={["Activity", "Discover", "Dex"]} selectedIndex={tab} onChange={setTab} />
      <SegmentedPicker label="Collection" options={["All", "Tried", "Wishlist", "Favorites"]} selectedIndex={filter} onChange={setFilter} />
      <SegmentedPicker label="Locked" options={["Reviews", "Details"]} selectedIndex={0} onChange={() => {}} disabled />
    </View>
  );
}
