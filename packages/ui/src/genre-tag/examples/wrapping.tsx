import { StyleSheet, View } from "react-native";

import { GenreTagList } from "..";

export function WrappingExample() {
  return (
    <View style={styles.container}>
      <GenreTagList genres={["DIPA", "Rosé", "Bourbon"]} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { maxWidth: 120 } });
