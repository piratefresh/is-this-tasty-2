import { StyleSheet, View } from "react-native";

import { Text } from "../text";
import { category, categoryFallback, color, radius, space } from "../theme/tokens";

export type GenreTagProps = { genre: string };
export type GenreTagListProps = { genres: readonly string[] };

export function GenreTag({ genre }: GenreTagProps) {
  const hue = Object.hasOwn(category, genre)
    ? category[genre as keyof typeof category]
    : categoryFallback;

  return (
    <View style={styles.chip}>
      <View aria-hidden style={[styles.dot, { backgroundColor: hue.dot }]} />
      <Text variant="meta" style={[styles.label, { color: hue.text }]}>{genre}</Text>
    </View>
  );
}

export function GenreTagList({ genres }: GenreTagListProps) {
  if (genres.length === 0) return null;

  const overflow = genres.length - 3;
  return (
    <View style={styles.list}>
      {genres.slice(0, 3).map((genre, index) => (
        <GenreTag key={`${index}:${genre}`} genre={genre} />
      ))}
      {overflow > 0 ? (
        <View style={styles.chip}>
          <Text
            variant="meta"
            accessibilityLabel={`${overflow} more genres: ${genres.slice(3).join(", ")}`}
            style={[styles.label, styles.overflow]}
          >
            +{overflow}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    backgroundColor: color.separator,
    borderRadius: radius.xs,
    borderCurve: "continuous",
    paddingVertical: 3,
    paddingHorizontal: 7,
    gap: space[1],
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: radius.pill,
    flexShrink: 0,
  },
  label: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    flexShrink: 1,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space[2],
  },
  overflow: { color: categoryFallback.text },
});
