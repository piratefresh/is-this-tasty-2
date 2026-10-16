import { Picker } from "@expo/ui";
import { SegmentedControl } from "@expo/ui/community/segmented-control";

import { ThemedHost } from "../theme/themed-host";
import { color } from "../theme/tokens";
import type { PickerProps } from "./types";

export type { PickerProps } from "./types";

/** Tabs and filters, 2 to 4 options. SwiftUI segmented Picker on iOS, Material segmented buttons on Android. */
export function SegmentedPicker({ options, selectedIndex, onChange, disabled, testID }: PickerProps) {
  return (
    <SegmentedControl
      values={[...options]}
      selectedIndex={selectedIndex}
      onChange={({ nativeEvent }) => onChange(nativeEvent.selectedSegmentIndex)}
      enabled={!disabled}
      appearance="dark"
      tintColor={color.tint}
      testID={testID}
    />
  );
}

/** 5 or more options (country, style, sort). SwiftUI menu Picker on iOS, exposed dropdown on Android. */
export function MenuPicker({ options, selectedIndex, onChange, disabled, testID }: PickerProps) {
  return (
    <ThemedHost matchContents={{ vertical: true }}>
      <Picker selectedValue={selectedIndex} onValueChange={(index) => onChange(Number(index))} enabled={!disabled} testID={testID}>
        {options.map((option, index) => (
          <Picker.Item key={option} label={option} value={index} />
        ))}
      </Picker>
    </ThemedHost>
  );
}
