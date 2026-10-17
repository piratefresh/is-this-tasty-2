import { color, screenInset, space, Text } from "@is-this-tasty/ui";
import { catalog } from "@is-this-tasty/ui/catalog";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { TokenPreviews } from "./token-previews";

/** Index of the catalog: one row per component, each opening its own screen so only that component's examples mount. */
export function CatalogScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <View style={styles.column}>
        <View style={styles.intro}>
          <Text variant="display">Is This Tasty?</Text>
          <Text variant="body" color="label2">Design system · development catalog</Text>
        </View>
        <View>
          <Link href="/dev/catalog/tokens" style={styles.row}>
            <Text variant="label">Tokens</Text>
          </Link>
          {catalog.map(({ id, name, examples }) => (
            <Link key={id} href={{ pathname: "/dev/catalog/[component]", params: { component: id } }} style={styles.row}>
              <Text variant="label">{name}</Text>
              <Text variant="meta" color="label2">  {examples.length} examples</Text>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

/** Token swatches, kept off the index so it stays light. */
export function TokensScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <View style={styles.column}>
        <TokenPreviews />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: screenInset },
  column: { width: "100%", maxWidth: 760, alignSelf: "center", gap: space[6] },
  intro: { gap: space[2] },
  row: { paddingVertical: space[4], borderTopWidth: 1, borderTopColor: color.separator },
});
