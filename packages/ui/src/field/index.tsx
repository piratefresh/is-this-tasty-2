import { TextInput, useNativeState, type TextInputProps, type TextInputRef } from "@expo/ui";
import { AccessibilityInfo, Platform, Pressable, StyleSheet, View } from "react-native";
import { useCallback, useEffect, useImperativeHandle, useRef, type Ref } from "react";

import { ThemedHost } from "../theme/themed-host";
import { color, radius, space } from "../theme/tokens";
import { useKeyboardReveal } from "../keyboard-reveal";
import { Text } from "../text";
import { withSearchDefaults, type FieldProps, type FieldRef, type SearchFieldProps } from "./types";

export type { FieldAutoComplete, FieldProps, FieldRef, SearchFieldProps } from "./types";

/**
 * iOS: no explicit font, so the field keeps SwiftUI's 17pt body text and
 * Dynamic Type. Android: BasicTextField has no theme, so pin 17sp (sp still
 * scales with the user's font size).
 */
const inputTextStyle = Platform.select<TextInputProps["textStyle"]>({
  ios: { color: color.label },
  default: { fontSize: 17, color: color.label },
});

const styles = StyleSheet.create({
  chrome: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[2],
    // Transparent 1pt border reserves the error border's space, so the field
    // doesn't shift when the error appears.
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: color.surface,
    borderRadius: radius.md,
    paddingHorizontal: space[3],
  },
  host: { flex: 1, minWidth: 0 },
  input: { backgroundColor: "transparent", paddingVertical: space[3] },
  error: { marginTop: space[1] },
});

/** Announces `error` whenever it changes to a new non-empty message, including at mount. */
function useAnnounceError(error: string | undefined) {
  const previous = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (error && previous.current !== error) AccessibilityInfo.announceForAccessibility(error);
    previous.current = error;
  }, [error]);
}

/**
 * Native text entry: SwiftUI `TextField`/`SecureField` on iOS, Compose
 * `BasicTextField` on Android, hosted per field inside an RN chrome that owns
 * the surface fill, radius and error border.
 */
export { FieldControl as Field };

export function SearchField(props: SearchFieldProps) {
  return <FieldControl {...withSearchDefaults(props)} clearable />;
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
}: FieldControlProps & { ref?: Ref<FieldRef> }) {
  // Observable state shared with the native field. Typing updates it natively.
  // `emitted` holds texts sent to the parent that haven't echoed back yet, so a
  // stale echo ("a" while native already has "ab") isn't written over newer
  // input. A value we never emitted was driven by the parent (clear button,
  // formatting, form reset) and is pushed to the native field.
  const state = useNativeState(value);
  const emitted = useRef<string[]>([]);
  const handleChangeText = useCallback(
    (text: string) => {
      emitted.current.push(text);
      onChangeText(text);
    },
    [onChangeText],
  );
  useEffect(() => {
    const index = emitted.current.indexOf(value);
    if (index >= 0) {
      emitted.current.splice(0, index + 1);
      return;
    }
    emitted.current = [];
    if (state.get() !== value) state.set(value);
  }, [value, state]);

  const inputRef = useRef<TextInputRef>(null);
  const { ref: revealRef, onFocus: revealOnFocus } = useKeyboardReveal();
  useImperativeHandle(
    ref,
    () => ({ focus: () => inputRef.current?.focus(), blur: () => inputRef.current?.blur(), clear: () => onChangeText("") }),
    [onChangeText],
  );

  useAnnounceError(error);

  return (
    <View ref={revealRef}>
      <View style={[styles.chrome, error && { borderColor: color.destructive }]}>
        <ThemedHost matchContents={{ vertical: true }} style={styles.host}>
          <TextInput
            ref={inputRef}
            value={state}
            onChangeText={handleChangeText}
            onFocus={revealOnFocus}
            placeholder={placeholder}
            placeholderTextColor={color.label3}
            secureTextEntry={secure}
            keyboardType={keyboardType}
            autoComplete={autoComplete}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmit}
            autoFocus={autoFocus}
            editable={editable}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            maxLength={maxLength}
            cursorColor={color.tint}
            selectionColor={color.tint}
            textStyle={inputTextStyle}
            style={styles.input}
            testID={testID}
          />
        </ThemedHost>
        {clearable && value !== "" ? (
          <Pressable
            onPress={() => {
              onChangeText("");
              inputRef.current?.focus();
            }}
            hitSlop={space[2]}
            accessibilityRole="button"
            accessibilityLabel="Clear"
          >
            <Text variant="label" color="label3">
              ✕
            </Text>
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text
          variant="meta"
          color="destructive"
          style={styles.error}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
