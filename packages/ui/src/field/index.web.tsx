import { Field as BaseField } from "@base-ui/react/field";
import { Input } from "@base-ui/react/input";
import { useImperativeHandle, useRef, type ComponentProps, type KeyboardEvent } from "react";
import { tv } from "tailwind-variants";

import { withSearchDefaults, type FieldAutoComplete, type FieldProps, type SearchFieldProps } from "./types";

export type { FieldAutoComplete, FieldProps, FieldRef, SearchFieldProps } from "./types";

const field = tv({
  slots: {
    root: "flex w-full flex-col gap-1",
    // Transparent 1pt border reserves the error border's space, so the field
    // doesn't shift when the error appears.
    control:
      "flex w-full items-center gap-2 rounded-md border border-transparent bg-surface px-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-tint-text data-[invalid]:border-destructive",
    input:
      "w-full cursor-text bg-transparent py-3 text-[17px] text-label placeholder:text-label3 focus:outline-none",
    clear: "shrink-0 cursor-pointer py-3 text-[15px] font-semibold text-label3",
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

export function SearchField(props: SearchFieldProps) {
  return <FieldControl {...withSearchDefaults(props)} clearable />;
}

export { FieldControl as Field };

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
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) onSubmit?.();
  };

  return (
    <BaseField.Root className={root()} invalid={!!error}>
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
          readOnly={editable === false}
          onKeyDown={submitOnEnter}
          data-testid={testID}
        />
        {clearable && value !== "" ? (
          <button type="button" className={clear()} aria-label="Clear" onClick={() => {
              onChangeText("");
              inputRef.current?.focus();
            }}
          >
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
