import { memo, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import {
  DIGIT_HEIGHT_RATIO,
  GLIDE_SPRING,
  SEPARATOR_WIDTH_RATIO,
} from "./const";
import { styles } from "./styles";
import type { ISeparatorProps } from "./types";

import { Text } from "../text";

const Separator = memo(
  ({ char, active, fontSize, color, fontWeight, fontFamily }: ISeparatorProps) => {
    const fullWidth = fontSize * SEPARATOR_WIDTH_RATIO;
    const height = fontSize * DIGIT_HEIGHT_RATIO;

    const presence = useSharedValue(active ? 1 : 0);

    useEffect(() => {
      presence.value = withSpring(active ? 1 : 0, GLIDE_SPRING);
    }, [active, presence]);

    const cellStyle = useAnimatedStyle(() => {
      const p = Math.min(1, Math.max(0, presence.value));
      return { width: fullWidth * p, opacity: p };
    });

    return (
      <Animated.View style={[styles.digit, { height }, cellStyle]}>
        <Text
          variant="title"
          accessibilityRole="text"
          allowFontScaling={false}
          style={[
            styles.glyph,
            { fontSize, color, fontWeight, fontFamily, lineHeight: height },
          ]}
        >
          {char}
        </Text>
      </Animated.View>
    );
  },
);

Separator.displayName = "NumberFlowSeparator";

export { Separator };
