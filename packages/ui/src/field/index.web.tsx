import { Field as BaseField } from "@base-ui/react/field";
import { Input } from "@base-ui/react/input";
import { useImperativeHandle, useRef, type ComponentProps, type KeyboardEvent } from "react";
import { tv } from "tailwind-variants";

import type { FieldAutoComplete, FieldProps, SearchFieldProps } from "./types";

export type { FieldAutoComplete, FieldProps, FieldRef, SearchFieldProps } from "./types";

const field = tv({
  slots: {
    root: "flex w-full flex-col gap-1",
    // Transparent 1pt border reserves the error border's space, so the field
    // doesn't shift when the error appears.
    // 13px/14px paddings aren't on the 4pt token scale, and tokens.css resets
    // Tailwind's dynamic spacing (--spacing), so fractional spacing utilities
    // like px-3.5 would silently resolve to zero. Use literal px.
    control:
      "flex w-full items-center gap-2 rounded-md border border-transparent bg-surface px-[14px] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-tint-text data-[invalid]:border-destructive",
    input:
      "w-full cursor-text bg-transparent py-[13px] text-[17px] text-label placeholder:text-label3 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40",
    clear: "shrink-0 cursor-pointer py-[13px] text-[15px] font-semibold text-label3",
    error: "text-[13px] font-medium text-destructive",
  },
});

type HTMLInputProps = ComponentProps<"input">;

const inputMode: Partial<Record<NonNullable<FieldProps["keyboardType"]>, HTMLInputProps["inputMode"]>> = {
  "email-address": "email",
  "phone-pad": "tel",
  url: "url",
  "number-pad": "numeric",
  numeric: "numeric",
  "decimal-pad": "decimal",
};

// RN and HTML autocomplete tokens match except these.
const autoCompleteToken: Partial<Record<FieldAutoComplete, HTMLInputProps["autoComplete"]>> = {
  password: "current-password",
  country: "country-name",
};

const enterKeyHint: Partial<Record<NonNullable<FieldProps["returnKeyType"]>, HTMLInputProps["enterKeyHint"]>> = {
  done: "done",
  go: "go",
  next: "next",
  previous: "previous",
  search: "search",
  send: "send",
};

export function Field(props: FieldProps) {
  return <FieldControl {...props} />;
}

export function SearchField(props: SearchFieldProps) {
  const {
    autoComplete = "off",
    autoCapitalize = "none",
    autoCorrect = false,
    returnKeyType = "search",
    ...rest
  } = props;
  return (
    <FieldControl
      {...rest}
      autoComplete={autoComplete}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      returnKeyType={returnKeyType}
      clearable
    />
  );
}

type FieldControlProps = FieldProps & { clearable?: boolean };

function FieldControl({
  ref,
  placeholder,
  value,
  onChangeText,
  secure,
  error,
  keyboardType,
  autoComplete,
  returnKeyType,
  onSubmit,
  autoFocus,
  editable,
  autoCapitalize,
  autoCorrect,
  maxLength,
  testID,
  clearable,
}: FieldControlProps) {
  const { root, control, input, clear, error: errorClass } = field();
  const inputRef = useRef<HTMLElement>(null);
  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => onChangeText(""),
    }),
    [onChangeText],
  );

  const submitOnEnter = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && !event.shiftKey) onSubmit?.();
  };

  return (
    <BaseField.Root className={root()} invalid={!!error} disabled={editable === false}>
      <div className={control()} data-invalid={error ? "" : undefined}>
        <Input
          ref={inputRef}
          className={input()}
          value={value}
          onValueChange={(next) => onChangeText(next ?? "")}
          placeholder={placeholder}
          type={secure ? "password" : "text"}
          inputMode={keyboardType ? inputMode[keyboardType] : undefined}
          // Unmapped RN tokens pass through: every other RN value is also an HTML token.
          autoComplete={autoComplete ? ((autoCompleteToken[autoComplete] ?? autoComplete) as HTMLInputProps["autoComplete"]) : undefined}
          enterKeyHint={returnKeyType ? enterKeyHint[returnKeyType] : undefined}
          autoCapitalize={autoCapitalize}
          spellCheck={autoCorrect}
          maxLength={maxLength}
          autoFocus={autoFocus}
          onKeyDown={submitOnEnter}
          data-testid={testID}
        />
        {clearable && value !== "" ? (
          <button type="button" className={clear()} aria-label="Clear" onClick={() => onChangeText("")}>
            ✕
          </button>
        ) : null}
      </div>
      {error ? (
        // role="alert" announces the message when it mounts, matching the
        // native announceForAccessibility behavior.
        <BaseField.Error match className={errorClass()} role="alert">
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
