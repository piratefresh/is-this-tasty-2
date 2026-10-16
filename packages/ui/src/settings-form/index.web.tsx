import { Fieldset } from "@base-ui/react/fieldset";
import { Form } from "@base-ui/react/form";
import { tv } from "tailwind-variants";

import { Switch } from "../switch";
import type { ButtonRowProps, NavigationRowProps, SettingsFormProps, SettingsSectionProps, SwitchRowProps } from "./types";

export type { ButtonRowProps, NavigationRowProps, SettingsFormProps, SettingsSectionProps, SwitchRowProps } from "./types";

const section = tv({
  slots: {
    root: "flex flex-col gap-2",
    legend: "px-4 text-[12px] font-bold uppercase tracking-wide text-label3",
    rows: "flex flex-col divide-y divide-separator overflow-hidden rounded-md bg-surface",
    footer: "px-4 text-[13px] text-label3",
  },
});

const row = tv({
  base: "flex min-h-11 w-full items-center gap-3 px-4 py-2 text-left text-[17px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-tint-text",
  variants: {
    tone: {
      label: "cursor-pointer text-label",
      tint: "cursor-pointer text-tint-text",
      destructive: "cursor-pointer text-destructive",
    },
    disabled: { true: "cursor-not-allowed opacity-40" },
  },
});

/** Base UI Form. Settings save on change, so submit is a no-op. */
export function SettingsForm({ children }: SettingsFormProps) {
  return (
    <Form className="flex flex-col gap-6 bg-bg py-4" onSubmit={(event) => event.preventDefault()}>
      {children}
    </Form>
  );
}

export function SettingsSection({ title, footer, children }: SettingsSectionProps) {
  const { root, legend, rows, footer: footerClass } = section();
  return (
    <Fieldset.Root className={root()}>
      {title ? <Fieldset.Legend className={legend()}>{title}</Fieldset.Legend> : null}
      <div className={rows()}>{children}</div>
      {footer ? <p className={footerClass()}>{footer}</p> : null}
    </Fieldset.Root>
  );
}

export function SwitchRow(props: SwitchRowProps) {
  return (
    <div className="px-4">
      <Switch {...props} />
    </div>
  );
}

export function NavigationRow({ label, value, onPress }: NavigationRowProps) {
  return (
    <button type="button" className={row({ tone: "label" })} onClick={onPress}>
      <span className="flex-1">{label}</span>
      {value ? <span className="text-label3">{value}</span> : null}
      <span aria-hidden className="text-label3">›</span>
    </button>
  );
}

export function ButtonRow({ label, onPress, destructive, disabled }: ButtonRowProps) {
  return (
    <button
      type="button"
      className={row({ tone: destructive ? "destructive" : "tint", disabled })}
      disabled={disabled}
      onClick={onPress}
    >
      {label}
    </button>
  );
}
