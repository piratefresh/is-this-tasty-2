import { TextInput, useNativeState, type TextInputProps, type TextInputRef } from "@expo/ui";
import { AccessibilityInfo, Platform, Pressable, StyleSheet, View } from "react-native";
import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

import { ThemedHost } from "../theme/themed-host";
import { color, radius, space } from "../theme/tokens";
import { Text } from "../text";
import type { FieldProps, FieldRef, SearchFieldProps } from "./types";

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
    paddingHorizontal: 14,
  },
  host: { flex: 1, minWidth: 0 },
  input: { backgroundColor: "transparent", paddingVertical: 13 },
  error: { marginTop: space[1] },
});

/** True when `error` transitioned to a non-empty value after mount. */
function useAnnounceError(error: string | undefined) {
  const previous = useRef(error);
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
export function Field({ ref, ...props }: FieldProps) {
  return <FieldControl {...props} ref={ref} />;
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
}: FieldControlProps & { ref?: Ref<FieldRef> }) {
  // Observable state shared with the native field. Typing updates it natively;
  // re-sync here only when the parent drove a change the field didn't see
  // (clear button, formatting, form reset).
  const state = useNativeState(value);
  if (state.get() !== value) state.set(value);

  const inputRef = useRef<TextInputRef>(null);
  useImperativeHandle(
    ref,
    () => ({ focus: () => inputRef.current?.focus(), blur: () => inputRef.current?.blur(), clear: () => onChangeText("") }),
    [onChangeText],
  );

  useAnnounceError(error);

  return (
    <View>
      <View style={[styles.chrome, error && { borderColor: color.destructive }]}>
        <ThemedHost matchContents={{ vertical: true }} style={styles.host}>
          <TextInput
            ref={inputRef}
            value={state}
            onChangeText={onChangeText}
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
            onPress={() => onChangeText("")}
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
        <Text variant="meta" color="destructive" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
