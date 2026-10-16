import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import { color, screenInset, space, Text } from "@is-this-tasty/ui";

export default function HomeScreen() {
  return (
    <View style={styles.content}>
      <Stack.Screen options={{ title: "Is This Tasty?" }} />
      <Text variant="display">Is This Tasty?</Text>
      {__DEV__ ? (
        <>
          <Link href="/dev/catalog" asChild>
            <Text variant="label" style={styles.link}>Open component catalog</Text>
          </Link>
          <Link
            href={{ pathname: "/preview/[component]/[example]", params: { component: "settings-form", example: "privacy" } }}
            asChild
          >
            <Text variant="label" style={styles.link}>Open settings form preview</Text>
          </Link>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: screenInset, gap: space[4] },
  link: { color: color.tintText, paddingVertical: space[3], textDecorationLine: "underline" },
});
