import { NumberField } from "@base-ui/react/number-field";
import { tv } from "tailwind-variants";

import { defaultStepperStep, type StepperProps } from "./types";

export type { StepperProps } from "./types";

const styles = tv({
  slots: {
    root: "flex w-full items-center justify-between gap-4",
    label: "text-base font-medium text-label",
    controls: "inline-flex items-center gap-1",
    button: "grid h-9 w-9 place-items-center rounded-md bg-surface-alt text-tint-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tint-text data-disabled:opacity-40",
    input: "h-7 w-14 rounded-md bg-transparent text-center text-label outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tint-text",
  },
});

export function Stepper({ label, value, onChange, min = 0, max, step = defaultStepperStep, disabled }: StepperProps) {
  const classNames = styles();
  return (
    <NumberField.Root
      className={classNames.root()}
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onValueChange={(nextValue) => {
        if (nextValue !== null) onChange(nextValue);
      }}
    >
      <span className={classNames.label()}>{label}</span>
      <div className={classNames.controls()}>
        <NumberField.Decrement
          className={classNames.button()}
          aria-label={`Decrease ${label}`}
          disabled={disabled || value <= min}
        >
          −
        </NumberField.Decrement>
        <NumberField.Input className={classNames.input()} aria-label={label} />
        <NumberField.Increment
          className={classNames.button()}
          aria-label={`Increase ${label}`}
          disabled={disabled || (max !== undefined && value >= max)}
        >
          +
        </NumberField.Increment>
      </div>
    </NumberField.Root>
  );
}
