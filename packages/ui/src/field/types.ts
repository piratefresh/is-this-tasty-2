import type { TextInputProps } from "@expo/ui";
import type { Ref } from "react";
import type { KeyboardTypeOptions, ReturnKeyTypeOptions } from "react-native";

/** RN autofill hints; become `textContentType` on iOS and HTML `autocomplete` on web. */
export type FieldAutoComplete = NonNullable<TextInputProps["autoComplete"]>;

type AutoCapitalize = NonNullable<TextInputProps["autoCapitalize"]>;

/** Imperative handle: chain focus between fields with `onSubmit`. */
export type FieldRef = {
  focus: () => void;
  blur: () => void;
  /** Routes through `onChangeText("")`, so the parent keeps the source of truth. */
  clear: () => void;
};

export type FieldProps = {
  /** Placeholder shown when empty. Also the screen reader label. */
  placeholder: string;
  /** Current text. Controlled: feed every `onChangeText` back in. */
  value: string;
  onChangeText: (text: string) => void;
  /** Obscures input: SwiftUI `SecureField` on iOS, password masking on Android. */
  secure?: boolean;
  /** Inline error: 1pt destructive border plus the message, announced when it appears. */
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  autoComplete?: FieldAutoComplete;
  returnKeyType?: ReturnKeyTypeOptions;
  /** Return key pressed. Focus the next field or submit from the last one. */
  onSubmit?: () => void;
  autoFocus?: boolean;
  editable?: boolean;
  autoCapitalize?: AutoCapitalize;
  autoCorrect?: boolean;
  maxLength?: number;
  testID?: string;
  /** Imperative `focus` / `blur` / `clear`. */
  ref?: Ref<FieldRef>;
};

/** Discover search: `returnKeyType="search"`, no autocorrect, clear button. */
export type SearchFieldProps = Omit<FieldProps, "secure">;
