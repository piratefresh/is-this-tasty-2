import { Image } from "expo-image";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { LongPressMenu, type ActionMenuItem } from "../action-menu";
import { Text } from "../text";
import { category, categoryFallback, color, radius, space } from "../theme/tokens";
import type { Drink } from "./types";

export type { Drink } from "./types";

export type DrinkRowProps = {
  drink: Drink;
  /** "dex" means in your Dex; "verified" means the producer is verified. */
  badge?: "dex" | "verified";
  /** Replaces the compact rating. */
  trailing?: ReactNode;
  /** Spoken in place of the rating when `trailing` is set, e.g. "added today". */
  trailingLabel?: string;
  onPress?: () => void;
  /** Long-press menu, usually the pour menu (right-click on web, long-press on touch). Omit for no menu. */
  menu?: ActionMenuItem[];
  testID?: string;
};

const THUMB = 52;
const BADGE = 18;
const BADGE_RING = 2.5;
const STRIPES = [0, 1, 2, 3, 4, 5, 6, 7];

function hueFor(genre: string) {
  return Object.hasOwn(category, genre) ? category[genre as keyof typeof category] : categoryFallback;
}

/** Tokens-only stand-in until photos exist. */
function Placeholder() {
  return (
    <View aria-hidden style={styles.placeholder}>
      {STRIPES.map((i) => (
        <View key={i} style={[styles.stripe, { left: i * 14 - THUMB / 2 }]} />
      ))}
    </View>
  );
}

function describe({ drink, badge, trailing, trailingLabel }: Pick<DrinkRowProps, "drink" | "badge" | "trailing" | "trailingLabel">) {
  const parts = [drink.name, drink.producer];
  if (trailing === undefined) parts.push(`rated ${drink.rating.toFixed(1)}`);
  else if (trailingLabel) parts.push(trailingLabel);
  if (badge) parts.push(badge === "dex" ? "in your Dex" : "verified");
  return parts.join(", ");
}

export function DrinkRow({ drink, badge, trailing, trailingLabel, onPress, menu, testID }: DrinkRowProps) {
  const hue = hueFor(drink.genre);
  const a11y = {
    accessible: true,
    accessibilityRole: onPress ? ("button" as const) : undefined,
    accessibilityLabel: describe({ drink, badge, trailing, trailingLabel }),
    testID,
  };
  const content = (
    <>
      <View style={styles.thumbWrap}>
        <View style={[styles.thumb, { borderColor: hue.dot }]}>
          {drink.imageUrl ? (
            <Image
              source={drink.imageUrl}
              transition={150}
              cachePolicy="memory-disk"
              contentFit="cover"
              accessible={false}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <Placeholder />
          )}
        </View>
        {badge ? (
          <View aria-hidden style={styles.badge}>
            <Text variant="meta" style={styles.check}>✓</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.text}>
        <Text variant="label" numberOfLines={1}>{drink.name}</Text>
        <Text variant="meta" numberOfLines={1}>{drink.producer}</Text>
      </View>
      {trailing ?? <Text variant="label" color="star">★ {drink.rating.toFixed(1)}</Text>}
    </>
  );

  // With a menu, the menu owns touch handling (see ActionMenuProps.onPress): no Pressable inside it.
  if (menu) {
    return (
      <LongPressMenu items={menu} onPress={onPress}>
        <View {...a11y} style={styles.row}>{content}</View>
      </LongPressMenu>
    );
  }
  return (
    <Pressable {...a11y} onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: space[2], minHeight: 44 },
  pressed: { opacity: 0.6 },
  thumbWrap: { width: THUMB, height: THUMB },
  thumb: {
    width: THUMB,
    height: THUMB,
    borderRadius: radius.sm,
    borderCurve: "continuous",
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: color.surfaceAlt,
  },
  placeholder: { ...StyleSheet.absoluteFill, overflow: "hidden" },
  stripe: {
    position: "absolute",
    top: -THUMB,
    width: 6,
    height: THUMB * 3,
    backgroundColor: color.separator,
    transform: [{ rotate: "45deg" }],
  },
  badge: {
    position: "absolute",
    left: -BADGE_RING,
    bottom: -BADGE_RING,
    width: BADGE + BADGE_RING * 2,
    height: BADGE + BADGE_RING * 2,
    borderRadius: radius.pill,
    borderWidth: BADGE_RING,
    borderColor: color.bg,
    backgroundColor: color.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  check: { color: color.tintInk, fontSize: 10, lineHeight: 12, fontWeight: "800" },
  text: { flex: 1, minWidth: 0 },
});
