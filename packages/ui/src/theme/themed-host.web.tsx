import type { UniversalHostProps } from "@expo/ui";
import { View } from "react-native";

/** Web uses React Native views because Expo UI's native toolkit is unavailable here. */
export function ThemedHost({
  children,
  colorScheme: _colorScheme,
  seedColor: _seedColor,
  ignoreSafeArea: _ignoreSafeArea,
  layoutDirection: _layoutDirection,
  matchContents,
  onLayoutContent: _onLayoutContent,
  useViewportSizeMeasurement: _useViewportSizeMeasurement,
  style,
  ...viewProps
}: UniversalHostProps) {
  const shrink = typeof matchContents === "object"
    ? matchContents.horizontal || matchContents.vertical
    : matchContents;

  return (
    <View
      {...viewProps}
      style={[shrink && { alignSelf: "flex-start" }, style]}
    >
      {children}
    </View>
  );
}
