import { color, screenInset, space, Text } from "@is-this-tasty/ui";
import { catalog } from "@is-this-tasty/ui/catalog";
import { ScrollView, StyleSheet, View } from "react-native";

import { TokenPreviews } from "./token-previews";

export function CatalogScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <View style={styles.column}>
        <View style={styles.intro}>
          <Text variant="display">Is This Tasty?</Text>
          <Text variant="body" color="label2">Design system · development catalog</Text>
        </View>
        <TokenPreviews />
        {catalog.map(({ name, examples }) => (
          <View key={name} style={styles.section}>
            <Text variant="title">{name}</Text>
            {examples.map(({ title, Component }) => (
              <View key={title} style={styles.example}>
                <Text variant="meta">{title}</Text>
                <Component />
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: screenInset },
  column: { width: "100%", maxWidth: 760, alignSelf: "center", gap: space[6] },
  intro: { gap: space[2] },
  section: { gap: space[4] },
  example: { gap: space[2], paddingVertical: space[4], borderTopWidth: 1, borderTopColor: color.separator },
});
