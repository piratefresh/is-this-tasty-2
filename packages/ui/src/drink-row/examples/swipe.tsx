import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import ReanimatedSwipeable, { type SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

import { DrinkRow } from "..";
import { Button } from "../../button";
import { color, space } from "../../theme/tokens";
import { pliny } from "./data";

// ponytail: RNGH swipeable on both platforms, as in star-rating's swipeable-row. Swap for native List + SwipeActions (and add reorder) once it can be checked on a device.
export function SwipeDrinkRowExample() {
  const swipeable = useRef<SwipeableMethods>(null);
  return (
    <ReanimatedSwipeable
      ref={swipeable}
      overshootRight={false}
      renderRightActions={() => (
        <View style={styles.actions}>
          <Button label="Add to rotation" variant="plain" onPress={() => swipeable.current?.close()} />
          <Button label="Remove" variant="destructive" onPress={() => swipeable.current?.close()} />
        </View>
      )}
    >
      <View style={styles.row}>
        <DrinkRow drink={pliny} onPress={() => {}} />
      </View>
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  row: { backgroundColor: color.bg },
  actions: { flexDirection: "row", alignItems: "center", gap: space[2], paddingHorizontal: space[2], backgroundColor: color.tintWash },
});
