import { Select } from "@base-ui/react/select";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { tv } from "tailwind-variants";

import type { PickerProps } from "./types";

export type { PickerProps } from "./types";

const styles = tv({
  slots: {
    track: "flex w-full gap-0.5 rounded-sm bg-surface-alt p-0.5",
    segment:
      "min-h-8 flex-1 cursor-pointer rounded-xs px-3 text-[13px] font-semibold text-label2 data-pressed:bg-handle data-pressed:text-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tint-text data-disabled:cursor-not-allowed data-disabled:opacity-40",
    trigger:
      "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-md bg-surface px-3 text-[17px] text-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tint-text data-disabled:cursor-not-allowed data-disabled:opacity-40",
    popup: "max-h-72 min-w-(--anchor-width) overflow-y-auto rounded-md bg-sheet p-1 outline-none",
    item: "flex min-h-11 cursor-pointer items-center rounded-sm px-3 text-[17px] text-label data-highlighted:bg-surface data-selected:text-tint-text",
  },
});

export function SegmentedPicker({ options, selectedIndex, onChange, label, disabled, testID }: PickerProps) {
  const { track, segment } = styles();
  return (
    <ToggleGroup
      value={[String(selectedIndex)]}
      // A segmented control always has a selection, so ignore the "toggle off" click.
      onValueChange={([next]) => next !== undefined && onChange(Number(next))}
      disabled={disabled}
      aria-label={label}
      className={track()}
      data-testid={testID}
    >
      {options.map((option, index) => (
        <Toggle key={option} value={String(index)} className={segment()}>
          {option}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

export function MenuPicker({ options, selectedIndex, onChange, label, disabled, testID }: PickerProps) {
  const { trigger, popup, item } = styles();
  return (
    <Select.Root
      value={selectedIndex}
      onValueChange={(next) => next !== null && onChange(next)}
      items={options.map((option, index) => ({ label: option, value: index }))}
      disabled={disabled}
    >
      <Select.Trigger aria-label={label} className={trigger()} data-testid={testID}>
        <Select.Value />
        <Select.Icon aria-hidden>▾</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4}>
          <Select.Popup className={popup()}>
            {options.map((option, index) => (
              <Select.Item key={option} value={index} className={item()}>
                <Select.ItemText>{option}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
