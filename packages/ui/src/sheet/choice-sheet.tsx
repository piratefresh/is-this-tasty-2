import { Pressable } from "react-native";

import { Text } from "../text";
import { space } from "../theme/tokens";
import { Sheet } from "./sheet";
import type { ChoiceSheetProps } from "./types";

/** Single-select list in a Sheet: tint checkmark on the selected row, tap selects and closes. */
export function ChoiceSheet({ options, selectedIndex, onSelect, onClose, ...sheet }: ChoiceSheetProps) {
  return (
    <Sheet onClose={onClose} {...sheet}>
      {options.map((option, index) => {
        const selected = index === selectedIndex;
        return (
          <Pressable
            key={option}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => {
              onSelect(index);
              onClose();
            }}
            style={{ minHeight: 44, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space[3] }}
          >
            <Text variant="body">{option}</Text>
            {/* Checkmark is decorative: selection is announced through accessibilityState. */}
            {selected && <Text variant="body" color="tintText" accessibilityElementsHidden importantForAccessibility="no">✓</Text>}
          </Pressable>
        );
      })}
    </Sheet>
  );
}
