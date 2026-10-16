import { Field } from "@base-ui/react/field";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { tv } from "tailwind-variants";

import type { SwitchProps } from "./types";

export type { SwitchProps } from "./types";

const styles = tv({
  slots: {
    label: "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 text-[17px] text-label data-disabled:cursor-not-allowed data-disabled:text-label3",
    root: "flex h-6 w-7 shrink-0 cursor-pointer items-center justify-start rounded-pill bg-handle p-1 data-checked:justify-end data-checked:bg-tint data-disabled:cursor-not-allowed data-disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tint-text",
    thumb: "block size-5 rounded-pill bg-label data-checked:bg-tint-ink",
  },
});

export function Switch({ label, value, onValueChange, disabled, testID }: SwitchProps) {
  const { label: labelClass, root, thumb } = styles();
  return (
    <Field.Root disabled={disabled}>
      <Field.Label className={labelClass()}>
        {label}
        {/* The wrapping label targets Base UI's hidden input, not the focusable role="switch" span. */}
        <BaseSwitch.Root aria-label={label} checked={value} onCheckedChange={(checked) => onValueChange(checked)} className={root()} data-testid={testID}>
          <BaseSwitch.Thumb className={thumb()} />
        </BaseSwitch.Root>
      </Field.Label>
    </Field.Root>
  );
}
