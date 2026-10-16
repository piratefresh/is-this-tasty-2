import { StyleSheet, View } from "react-native";
import Animated, { ReduceMotion, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { Text } from "../text";

export function RatingStar({ size, fill }: { size: number; fill: number }) {
  const animatedFill = useAnimatedStyle(() => ({
    width: withTiming(size * fill, { duration: 140, reduceMotion: ReduceMotion.System }),
  }), [size, fill]);
  const glyphSize = { fontSize: size, lineHeight: size, width: size };

  return (
    <View style={{ width: size, height: size }}>
      <Text variant="body" color="handle" allowFontScaling={false} style={[styles.glyph, glyphSize]}>★</Text>
      <Animated.View style={[styles.fill, animatedFill]}>
        <Text variant="body" color="star" allowFontScaling={false} style={[styles.glyph, glyphSize]}>★</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  glyph: { textAlign: "center", includeFontPadding: false, userSelect: "none" },
  fill: { position: "absolute", top: 0, left: 0, bottom: 0, overflow: "hidden" },
});
