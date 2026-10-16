import { color, screenInset, space, Text } from "@is-this-tasty/ui";
import { catalog } from "@is-this-tasty/ui/catalog";
import { ScrollView, StyleSheet, View } from "react-native";

export function ExampleScreen({ component, example }: { component: string; example: string }) {
  const group = catalog.find((entry) => entry.id === component);
  const entry = group?.examples.find((item) => item.id === example);
  if (!entry) return <Text variant="title">Example not found</Text>;
  const Component = entry.Component;

  return (
    <ScrollView role="main" accessibilityLabel={`${component}/${example} example`} contentContainerStyle={styles.content}>
      <View style={styles.example} testID={`preview-${component}-${example}`}>
        <Text variant="title" role="heading" aria-level={1}>{group?.name} / {entry.title}</Text>
        <Component />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, padding: screenInset, backgroundColor: color.bg },
  example: { gap: space[4], width: "100%", maxWidth: 760, alignSelf: "center" },
});
