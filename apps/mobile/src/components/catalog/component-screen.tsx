import { color, screenInset, space, Text } from "@is-this-tasty/ui";
import { catalog } from "@is-this-tasty/ui/catalog";
import { StyleSheet, View } from "react-native";

import { KeyboardScrollView } from "../keyboard-scroll-view";

/** All examples of one component. Examples that are heavy on their own (grids) still only mount here. */
export function ComponentScreen({ component }: { component: string }) {
  const group = catalog.find((entry) => entry.id === component);
  if (!group) return <Text variant="title">Component not found</Text>;

  return (
    <KeyboardScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <View style={styles.column}>
        <Text variant="title">{group.name}</Text>
        {group.examples.map(({ id, title, Component }) => (
          <View key={id} style={styles.example}>
            <Text variant="meta">{title}</Text>
            <Component />
          </View>
        ))}
      </View>
    </KeyboardScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: screenInset },
  column: { width: "100%", maxWidth: 760, alignSelf: "center", gap: space[4] },
  example: { gap: space[2], paddingVertical: space[4], borderTopWidth: 1, borderTopColor: color.separator },
});
