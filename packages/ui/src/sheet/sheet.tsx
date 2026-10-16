import { BottomSheet } from "@expo/ui";
import { View } from "react-native";

import { Text } from "../text";
import { color, screenInset, space } from "../theme/tokens";
import type { SheetProps } from "./types";

// ponytail: system corner radius, not radius.sheet (26). The universal BottomSheet has no radius prop; add swift-ui presentationCornerRadius behind index.ios if design needs it.
/** SwiftUI sheet on iOS, Material ModalBottomSheet on Android. Brings its own Host, so open it from anywhere. */
export function Sheet({ isOpen, onClose, title, snapPoints, children }: SheetProps) {
  return (
    <BottomSheet
      isPresented={isOpen}
      onDismiss={onClose}
      snapPoints={snapPoints?.map((point) => (point === "medium" ? "half" : "full"))}
      containerColor={color.sheet}
      contentPadding={{ top: space[3], bottom: space[5], left: screenInset, right: screenInset }}
    >
      <View style={{ gap: space[3] }}>
        <Text variant="title">{title}</Text>
        {children}
      </View>
    </BottomSheet>
  );
}
