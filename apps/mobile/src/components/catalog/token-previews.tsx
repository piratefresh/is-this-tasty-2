import { category, categoryFallback, color, radius, space, Text } from "@is-this-tasty/ui";
import { StyleSheet, View } from "react-native";

const swatches = [
  ...Object.entries(color),
  ...Object.entries(category).flatMap(([name, tones]) =>
    Object.entries(tones).map(([role, value]) => [`category.${name}.${role}`, value]),
  ),
  ...Object.entries(categoryFallback).map(([role, value]) => [`categoryFallback.${role}`, value]),
];

export function TokenPreviews() {
  return (
    <View style={styles.section}>
      <Text variant="title">Tokens</Text>
      <Text variant="subtitle">Colors</Text>
      <View style={styles.swatches}>
        {swatches.map(([name, value]) => (
          <View key={name} style={styles.swatch}>
            <View accessible={false} style={[styles.colorSample, { backgroundColor: value }]} />
            <Text variant="label" selectable>{name}</Text>
            <Text variant="meta" selectable>{value}</Text>
          </View>
        ))}
      </View>
      <Text variant="subtitle">Spacing</Text>
      {space.map((value, index) => (
        <View key={index} style={styles.row}>
          <Text variant="label" style={styles.scaleLabel}>space[{index}] · {value} pt</Text>
          <View accessible={false} style={[styles.spacingSample, { width: value }]} />
        </View>
      ))}
      <Text variant="subtitle">Radii</Text>
      <View style={styles.swatches}>
        {Object.entries(radius).map(([name, value]) => (
          <View key={name} style={styles.swatch}>
            <View accessible={false} style={[styles.radiusSample, { borderRadius: value }]} />
            <Text variant="label">{name}</Text>
            <Text variant="meta">{value} pt</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: space[4] },
  swatches: { flexDirection: "row", flexWrap: "wrap", gap: space[4] },
  swatch: { flexBasis: "45%", flexGrow: 1, gap: space[1] },
  colorSample: { height: space[7], borderWidth: 1, borderColor: color.handle, borderRadius: radius.sm },
  row: { flexDirection: "row", alignItems: "center", gap: space[4] },
  scaleLabel: { flex: 1 },
  spacingSample: { height: space[4], backgroundColor: color.tint },
  radiusSample: {
    width: space[7] * 2,
    height: space[7],
    backgroundColor: color.tintWash,
    borderColor: color.tint,
    borderWidth: 1,
    borderCurve: "continuous",
  },
});
