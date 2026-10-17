import { DatePickerDialog, ListItem, Text as ComposeText } from "@expo/ui/jetpack-compose";
import { clickable } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";

import { color } from "../theme/tokens";
import type { DateFieldProps } from "./types";

export type { DateFieldProps } from "./types";

/** Material row that opens a date dialog. Render inside a `Form`, which supplies the Host. */
export function DateField({ label, value, onChange, maxDate = new Date() }: DateFieldProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem colors={{ containerColor: color.surface }} modifiers={[clickable(() => setOpen(true))]}>
        <ListItem.HeadlineContent>
          <ComposeText color={color.label}>{label}</ComposeText>
        </ListItem.HeadlineContent>
        <ListItem.SupportingContent>
          <ComposeText color={color.label3}>
            {value.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </ComposeText>
        </ListItem.SupportingContent>
      </ListItem>
      {open ? (
        <DatePickerDialog
          initialDate={value.toISOString()}
          selectableDates={{ end: maxDate }}
          color={color.tint}
          onDateSelected={(date) => {
            setOpen(false);
            onChange(date);
          }}
          onDismissRequest={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
