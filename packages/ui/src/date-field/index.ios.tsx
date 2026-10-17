import { DatePicker } from "@expo/ui/swift-ui";
import { datePickerStyle } from "@expo/ui/swift-ui/modifiers";

import type { DateFieldProps } from "./types";

export type { DateFieldProps } from "./types";

/** SwiftUI compact DatePicker row. Render inside a `Form`, which supplies the Host. */
export function DateField({ label, value, onChange, maxDate = new Date() }: DateFieldProps) {
  return (
    <DatePicker
      title={label}
      selection={value}
      range={{ end: maxDate }}
      displayedComponents={["date"]}
      onDateChange={onChange}
      modifiers={[datePickerStyle("compact")]}
    />
  );
}
