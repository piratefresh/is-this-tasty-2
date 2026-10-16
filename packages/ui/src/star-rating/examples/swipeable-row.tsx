import { useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ReanimatedSwipeable, { type SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

import { StarRating } from "..";
import { Button } from "../../button";
import { Text } from "../../text";
import { color, radius, space } from "../../theme/tokens";

const drinks = [{ id: "catalog-pour", name: "Evening pour" }];

export function SwipeableRatingExample() {
  const [value, setValue] = useState(3.5);
  const swipeable = useRef<SwipeableMethods>(null);

  return (
    <View style={styles.example}>
      <Text variant="meta">Swipe left for actions. Hold the stars for 200ms, then drag to rate.</Text>
      <FlatList
        data={drinks}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReanimatedSwipeable
            ref={swipeable}
            overshootRight={false}
            renderRightActions={() => (
              <View style={styles.actions}>
                <Button label="Close actions" variant="plain" onPress={() => swipeable.current?.close()} />
              </View>
            )}
          >
            <View style={styles.row}>
              <Text variant="subtitle">{item.name}</Text>
              <StarRating value={value} onChange={setValue} showValue accessibilityLabel="Evening pour rating" />
            </View>
          </ReanimatedSwipeable>
        )}
      />
      <Button label="Show row actions" variant="plain" onPress={() => swipeable.current?.openRight()} />
    </View>
  );
}

const styles = StyleSheet.create({
  example: { gap: space[2] },
  row: { backgroundColor: color.surface, borderRadius: radius.md, padding: space[4], gap: space[2] },
  actions: { width: 240, justifyContent: "center", backgroundColor: color.tintWash, padding: space[2] },
});
