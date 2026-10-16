import { Slider } from "@base-ui/react/slider";
import { tv } from "tailwind-variants";

import { Text } from "../text";
import { defaultTasteSliderStep, type TasteSliderProps } from "./types";

export type { TasteSliderProps } from "./types";

const styles = tv({
  slots: {
    root: "flex w-full flex-col gap-2",
    labels: "flex items-center justify-between",
    control: "relative flex h-7 w-full touch-none items-center select-none",
    track: "relative h-1 w-full overflow-hidden rounded-pill bg-handle",
    indicator: "absolute h-full rounded-pill bg-tint",
    thumb: "relative block h-5 w-5 rounded-pill bg-tint focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-tint-text",
  },
});

export function TasteSlider({ leftLabel, rightLabel, value, onChange, onChangeEnd, step = defaultTasteSliderStep }: TasteSliderProps) {
  const classNames = styles();
  return (
    <Slider.Root
      className={classNames.root()}
      value={value}
      min={0}
      max={1}
      step={step}
      onValueChange={onChange}
      onValueCommitted={onChangeEnd}
    >
      <div className={classNames.labels()}>
        <Text variant="meta">{leftLabel}</Text>
        <Text variant="meta">{rightLabel}</Text>
      </div>
      <Slider.Control className={classNames.control()}>
        <Slider.Track className={classNames.track()}>
          <Slider.Indicator className={classNames.indicator()} />
        </Slider.Track>
        <Slider.Thumb
          className={classNames.thumb()}
          aria-label={`${leftLabel} to ${rightLabel}`}
          getAriaValueText={(_, nextValue) => `${Math.round(nextValue * 100)}%`}
        />
      </Slider.Control>
    </Slider.Root>
  );
}
