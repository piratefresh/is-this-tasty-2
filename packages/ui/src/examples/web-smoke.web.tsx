import { Switch } from "@base-ui/react/switch";
import { tv } from "tailwind-variants";

import { Text } from "../text";

// STO-625 pipeline proof; remove when the Form/Switch examples land in STO-609.
const styles = tv({
  slots: {
    label: "flex min-h-7 cursor-pointer items-center gap-3 rounded-md bg-bg p-4",
    root: "flex h-6 w-7 shrink-0 cursor-pointer items-center justify-start rounded-pill bg-handle p-1 data-checked:justify-end data-checked:bg-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tint-text",
    thumb: "block size-5 rounded-pill bg-label data-checked:bg-tint-ink",
  },
});

export function WebSmokeExample() {
  const { label, root, thumb } = styles();
  return (
    <label className={label()}>
      <Switch.Root defaultChecked className={root()}>
        <Switch.Thumb className={thumb()} />
      </Switch.Root>
      <Text variant="label">Share to club</Text>
    </label>
  );
}
