import { TextInput, useNativeState, type TextInputProps, type TextInputRef } from "@expo/ui";
import { useCallback, useEffect, useRef } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";

import { useKeyboardReveal } from "../keyboard-reveal";
import { Text } from "../text";
import { ThemedHost } from "../theme/themed-host";
import { color, radius, space } from "../theme/tokens";
import { defaultStepperStep, type StepperProps } from "./types";

const inputTextStyle = Platform.select<TextInputProps["textStyle"]>({
  ios: { color: color.label, textAlign: "center" },
  default: { color: color.label, fontSize: 17, textAlign: "center" },
});

const styles = StyleSheet.create({
  root: { width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space[4] },
  label: { flexShrink: 1 },
  controls: { flexDirection: "row", alignItems: "center", gap: space[1] },
  button: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: color.surfaceAlt,
  },
  // RN chrome owns size, fill and vertical centering; the native input sizes to its text (same as Field).
  inputChrome: { width: 56, height: 40, justifyContent: "center", borderRadius: radius.sm, backgroundColor: color.surfaceAlt },
  inputHost: { width: 56 },
  input: { width: 56, padding: 0, backgroundColor: "transparent" },
  disabled: { opacity: 0.4 },
});

function parseNumber(text: string) {
  if (!text.trim()) return undefined;
  const value = Number(text);
  return Number.isFinite(value) ? value : undefined;
}

// Round to the step's precision so 0.1 + 0.2 shows 0.3, not 0.30000000000000004.
function roundToStep(value: number, step: number) {
  return Number(value.toFixed((String(step).split(".")[1] ?? "").length));
}

function clampValue(value: number, min: number, max: number | undefined) {
  return Math.max(min, max === undefined ? value : Math.min(max, value));
}

export function StepperNative({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = defaultStepperStep,
  disabled,
}: StepperProps) {
  const text = String(value);
  const inputState = useNativeState(text);
  const inputRef = useRef<TextInputRef>(null);
  const draft = useRef(text);
  const focused = useRef(false);
  const currentValue = useRef(value);
  const { ref: revealRef, onFocus: revealOnFocus } = useKeyboardReveal();

  useEffect(() => {
    currentValue.current = value;
    if (focused.current) return;
    const nextText = String(value);
    draft.current = nextText;
    if (inputState.get() !== nextText) inputState.set(nextText);
  }, [inputState, value]);

  const handleChangeText = useCallback(
    (nextText: string) => {
      draft.current = nextText;
      const parsed = parseNumber(nextText);
      if (parsed === undefined) return;
      // Out-of-range drafts wait for commitDraft so typing "0" with min=1 doesn't emit 1 mid-edit.
      if (parsed < min || (max !== undefined && parsed > max)) return;
      currentValue.current = parsed;
      onChange(parsed);
    },
    [max, min, onChange],
  );

  const commitDraft = useCallback(() => {
    focused.current = false;
    const parsed = parseNumber(draft.current);
    const nextValue = clampValue(parsed ?? currentValue.current, min, max);
    const nextText = String(nextValue);
    draft.current = nextText;
    if (inputState.get() !== nextText) inputState.set(nextText);
    if (currentValue.current !== nextValue) {
      currentValue.current = nextValue;
      onChange(nextValue);
    }
  }, [inputState, max, min, onChange]);

  const stepBy = useCallback(
    (direction: -1 | 1) => {
      const baseValue = parseNumber(draft.current) ?? currentValue.current;
      const nextValue = roundToStep(clampValue(baseValue + direction * step, min, max), step);
      const nextText = String(nextValue);
      draft.current = nextText;
      currentValue.current = nextValue;
      if (inputState.get() !== nextText) inputState.set(nextText);
      onChange(nextValue);
    },
    [inputState, max, min, onChange, step],
  );

  const decrementDisabled = disabled || value <= min;
  const incrementDisabled = disabled || (max !== undefined && value >= max);

  return (
    <View ref={revealRef} style={styles.root}>
      <Text variant="label" color="label" style={styles.label}>
        {label}
      </Text>
      <View style={styles.controls}>
        <Pressable
          style={[styles.button, decrementDisabled && styles.disabled]}
          disabled={decrementDisabled}
          onPress={() => stepBy(-1)}
          hitSlop={space[1]}
          accessibilityRole="button"
          accessibilityLabel={`Decrease ${label}`}
          accessibilityState={{ disabled: decrementDisabled }}
        >
          <Text variant="label" color="label">−</Text>
        </Pressable>
        <View style={styles.inputChrome}>
          <ThemedHost matchContents={{ vertical: true }} style={styles.inputHost}>
            <TextInput
              ref={inputRef}
              value={inputState}
              onChangeText={handleChangeText}
              onFocus={() => {
                focused.current = true;
                revealOnFocus();
                draft.current = String(currentValue.current);
              }}
              onBlur={commitDraft}
              onSubmitEditing={() => {
                commitDraft();
                inputRef.current?.blur();
              }}
              placeholder={label}
              keyboardType="decimal-pad"
              returnKeyType="done"
              editable={!disabled}
              cursorColor={color.tint}
              selectionColor={color.tint}
              textStyle={inputTextStyle}
              style={styles.input}
            />
          </ThemedHost>
        </View>
        <Pressable
          style={[styles.button, incrementDisabled && styles.disabled]}
          disabled={incrementDisabled}
          onPress={() => stepBy(1)}
          hitSlop={space[1]}
          accessibilityRole="button"
          accessibilityLabel={`Increase ${label}`}
          accessibilityState={{ disabled: incrementDisabled }}
        >
          <Text variant="label" color="label">+</Text>
        </Pressable>
      </View>
    </View>
  );
}
