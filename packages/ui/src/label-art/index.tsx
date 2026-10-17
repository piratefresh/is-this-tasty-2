import { StyleSheet, View } from "react-native";

import { color } from "../theme/tokens";

const STRIPES = [0, 1, 2, 3, 4, 5, 6, 7];

/** Tokens-only stand-in for drink label art until photos exist. Stripe pitch scales with `size`. */
export function LabelArt({ size, tint = color.separator }: { size: number; tint?: string }) {
  const scale = size / 52; // DrinkRow's 52pt thumb is the reference pitch (14pt stripes of 6pt).
  return (
    <View aria-hidden style={[styles.art, { width: size, height: size }]}>
      {STRIPES.map((i) => (
        <View
          key={i}
          style={[
            styles.stripe,
            { left: i * 14 * scale - size / 2, top: -size, width: 6 * scale, height: size * 3, backgroundColor: tint },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  art: { overflow: "hidden" },
  stripe: { position: "absolute", transform: [{ rotate: "45deg" }] },
});
