import * as Haptics from "expo-haptics";
import { useRef, useState, type ReactNode } from "react";
import { Platform, StyleSheet, View, type KeyDownEvent } from "react-native";
import { GestureDetector, useCompetingGestures, usePanGesture, useTapGesture } from "react-native-gesture-handler";

import { Text } from "../text";
import { color, radius, space } from "../theme/tokens";
import { normalizeRating, ratingAtPosition, selectRating, STAR_COUNT, STAR_GAP } from "./rating";
import { RatingStar } from "./rating-star";

export type StarRatingProps = {
  value: number;
  /** Defaults to 16 for display and 30 for input. */
  size?: number;
  /** Omit for a read-only rating. Values change in half steps from 0 to 5. */
  onChange?: (value: number) => void;
  showValue?: boolean;
  count?: number;
  accessibilityLabel?: string;
};

function selectionFeedback() {
  if (Platform.OS !== "web") {
    // Feedback is optional on devices without a haptic engine; selection must still work.
    void Haptics.selectionAsync().catch(() => {});
  }
}

function RatingInput({
  value, size, onChange, accessibilityLabel, children,
}: {
  value: number;
  size: number;
  onChange: (value: number) => void;
  accessibilityLabel: string;
  children: ReactNode;
}) {
  const lastValue = useRef(value);
  const [focused, setFocused] = useState(false);
  const select = (next: number) => {
    lastValue.current = selectRating(next, lastValue.current, onChange, selectionFeedback);
  };
  const begin = () => { lastValue.current = value; };
  const pan = usePanGesture({
    runOnJS: true,
    activeOffsetX: [-12, 12],
    failOffsetY: [-8, 8],
    // A normal row swipe wins; hold briefly before scrubbing the stars.
    activateAfterLongPress: 200,
    maxPointers: 1,
    onBegin: begin,
    onActivate: (event) => select(ratingAtPosition(event.x, size)),
    onUpdate: (event) => select(ratingAtPosition(event.x, size)),
  });
  const tap = useTapGesture({
    runOnJS: true,
    maxDistance: 8,
    onBegin: begin,
    onActivate: (event) => select(ratingAtPosition(event.x, size)),
  });
  const gesture = useCompetingGestures(pan, tap);
  const adjust = (next: number) => {
    begin();
    select(next);
  };
  const webProps = Platform.OS === "web" ? {
    tabIndex: 0 as const,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onKeyDown: (event: KeyDownEvent) => {
      const next = {
        ArrowRight: value + 0.5, ArrowUp: value + 0.5,
        ArrowLeft: value - 0.5, ArrowDown: value - 0.5,
        Home: 0, End: STAR_COUNT,
      }[event.nativeEvent.key];
      if (next === undefined) return;
      event.preventDefault();
      adjust(next);
    },
  } : {};

  return (
    <GestureDetector gesture={gesture} touchAction="pan-y">
      <View
        {...webProps}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint="Tap to rate. Hold briefly, then drag to adjust by half a star."
        accessibilityValue={{ min: 0, max: STAR_COUNT, now: value, text: `${value} out of 5 stars` }}
        aria-valuemin={0}
        aria-valuemax={STAR_COUNT}
        aria-valuenow={value}
        aria-valuetext={`${value} out of 5 stars`}
        accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
        onAccessibilityAction={({ nativeEvent }) => {
          if (nativeEvent.actionName === "increment") adjust(value + 0.5);
          if (nativeEvent.actionName === "decrement") adjust(value - 0.5);
        }}
        hitSlop={{ top: 7, bottom: 7 }}
        style={[styles.input, focused && styles.focused]}
      >
        {children}
      </View>
    </GestureDetector>
  );
}

export function StarRating({
  value, size = 0, onChange, showValue = false, count, accessibilityLabel = "Rating",
}: StarRatingProps) {
  const rating = normalizeRating(value);
  const starSize = Number.isFinite(size) && size > 0 ? size : onChange ? 30 : 16;
  const countLabel = count === undefined ? undefined : `${count} ${count === 1 ? "rating" : "ratings"}`;
  const stars = (
    <View aria-hidden style={styles.stars}>
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <RatingStar key={index} size={starSize} fill={Math.max(0, Math.min(1, rating - index))} />
      ))}
    </View>
  );

  return (
    <View style={styles.root}>
      {onChange ? (
        <RatingInput value={rating} size={starSize} onChange={onChange} accessibilityLabel={accessibilityLabel}>
          {stars}
        </RatingInput>
      ) : (
        <View accessible accessibilityRole="image" accessibilityLabel={`${accessibilityLabel}: ${rating} out of 5 stars`}>
          {stars}
        </View>
      )}
      {showValue ? (
        <Text variant="title" accessibilityRole="text" aria-hidden>{rating.toFixed(1)}</Text>
      ) : null}
      {countLabel ? <Text variant="meta">{countLabel}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: space[2] },
  stars: { flexDirection: "row", gap: STAR_GAP },
  input: { minHeight: 44, justifyContent: "center", borderRadius: radius.xs, alignSelf: "flex-start" },
  focused: { outlineWidth: 2, outlineColor: color.tintText, outlineStyle: "solid" },
});
