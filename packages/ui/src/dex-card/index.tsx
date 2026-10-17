import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from "react-native-reanimated";

import { LabelArt } from "../label-art";
import { Text } from "../text";
import { color, font, rarity, type RarityTier } from "../theme/tokens";
import { BorderBeam } from "./border-beam";
import { describeCard, dexNumber, frameGradient } from "./card";
import type { DexCardProps } from "./types";

/** Grid cell is 104×148pt; the plate scales up on the detail view. */
const RATIO = 148 / 104;
const REVEAL_MS = 600;
const OUTER_RADIUS = 12;

export function DexCard({
  name,
  number,
  rarity: tier = "common",
  collected = false,
  width = 104,
  onPress,
  testID,
}: DexCardProps) {
  const reduceMotion = useReducedMotion();
  const height = Math.round(width * RATIO);
  const tierStyle: RarityTier = rarity[tier];
  // 1 = settled. Drops to 0 only when a reveal starts, so steady cards (locked or collected) never transform.
  const reveal = useSharedValue(1);
  const wasCollected = useRef(collected);

  useEffect(() => {
    if (collected === wasCollected.current) return;
    wasCollected.current = collected;
    if (!collected) {
      reveal.value = 1; // Un-collecting is a plain swap; only the reveal animates.
      return;
    }
    reveal.value = 0;
    reveal.value = withTiming(1, {
      duration: reduceMotion ? REVEAL_MS / 3 : REVEAL_MS,
      easing: Easing.out(Easing.cubic),
    });
    if (Platform.OS !== "web") {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [collected, reduceMotion, reveal]);

  const animated = useAnimatedStyle(() => {
    if (reduceMotion) {
      // Reduce Motion gets a crossfade instead of the flip.
      return { opacity: 0.2 + 0.8 * reveal.value, transform: [{ scale: 0.96 + 0.04 * reveal.value }] };
    }
    // Flip in from edge-on (90°) so text is never mirrored mid-reveal.
    return {
      opacity: Math.min(1, reveal.value * 1.6),
      transform: [{ rotateY: `${(1 - reveal.value) * 90}deg` }, { scale: 0.55 + 0.45 * reveal.value }],
    };
  });

  const a11y = {
    accessible: true,
    accessibilityRole: onPress ? ("button" as const) : undefined,
    accessibilityLabel: describeCard({ name, number, rarity: tier, collected }),
    testID,
  };

  // The beam rides the frame, so it sits inside the flipping view and turns with the reveal.
  const beam =
    collected && tierStyle.beam && !reduceMotion && Platform.OS !== "web" ? (
      <BorderBeam
        width={width}
        height={height}
        frameWidth={tierStyle.width}
        outerRadius={OUTER_RADIUS}
        colors={tierStyle.beamColors}
      />
    ) : null;

  const card = (
    <Animated.View
      style={[
        styles.frame,
        animated,
        {
          width,
          height,
          padding: tierStyle.width,
          backgroundImage: frameGradient(collected ? tierStyle.frame : tierStyle.frameMuted),
        },
      ]}
    >
      <View style={[styles.plate, { borderRadius: OUTER_RADIUS - tierStyle.width }]}>
        <Text variant="meta" allowFontScaling={false} style={styles.number}>{dexNumber(number)}</Text>
        <View style={styles.art}>
          {/* Locked reads as a silhouette: dimmer stripes on the dark plate. */}
          <LabelArt size={Math.round(width * 0.6)} tint={collected ? color.handle : color.separator} />
        </View>
        {collected ? <Text variant="label" numberOfLines={2} style={styles.name}>{name}</Text> : null}
      </View>
      {beam}
    </Animated.View>
  );

  if (!onPress) return <View {...a11y}>{card}</View>;
  return (
    <Pressable {...a11y} onPress={onPress} style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
      {card}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: OUTER_RADIUS,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  pressable: { borderRadius: OUTER_RADIUS },
  pressed: { opacity: 0.6 },
  plate: {
    flex: 1,
    backgroundColor: color.dexPlate,
    padding: 8,
  },
  number: {
    fontFamily: font.dex,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    letterSpacing: 11 * 0.08,
    color: color.gold,
  },
  art: { flex: 1, alignItems: "center", justifyContent: "center" },
  name: {
    fontFamily: font.display,
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
});

export type { DexCardProps } from "./types";
