import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { Button } from "../../button";
import { space } from "../../theme/tokens";
import { Text } from "../../text";
import { SegmentedPicker } from "..";

const tabs = ["Activity", "Discover", "Dex"];

/**
 * Home-tabs pattern. All panes stay mounted (hidden with display: none), so
 * switching never remounts. The selection is state of this screen, so it
 * survives pushing a route and coming back.
 */
export function TabsExample() {
  const [tab, setTab] = useState(0);
  return (
    <View style={{ gap: space[3] }}>
      <SegmentedPicker label="Home" options={tabs} selectedIndex={tab} onChange={setTab} />
      {tabs.map((name, index) => (
        <View key={name} style={{ display: index === tab ? "flex" : "none" }}>
          <Text variant="body">{name} pane</Text>
        </View>
      ))}
      <Button variant="secondary" label="Push a route, then go back" onPress={() => router.push("/dev/catalog")} />
    </View>
  );
}
