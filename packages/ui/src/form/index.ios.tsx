import { Button, Form as SwiftForm, HStack, Image, LabeledContent, Section, Text } from "@expo/ui/swift-ui";
import {
  accessibilityHidden,
  background,
  buttonStyle,
  contentShape,
  disabled as disabledModifier,
  font,
  foregroundStyle,
  scrollContentBackground,
  shapes,
} from "@expo/ui/swift-ui/modifiers";

import { SwitchControl } from "../switch/control";
import { ThemedHost } from "../theme/themed-host";
import { color } from "../theme/tokens";
import type { ButtonRowProps, NavigationRowProps, FormProps, FormSectionProps, SwitchRowProps } from "./types";

export type { ButtonRowProps, NavigationRowProps, FormProps, FormSectionProps, SwitchRowProps } from "./types";

/** SwiftUI Form. Row height, separators and insets come from the system. */
export function Form({ children }: FormProps) {
  return (
    <ThemedHost style={{ flex: 1 }}>
      <SwiftForm modifiers={[scrollContentBackground("hidden"), background(color.bg)]}>{children}</SwiftForm>
    </ThemedHost>
  );
}

export function FormSection({ title, footer, children }: FormSectionProps) {
  return (
    <Section title={title} footer={footer ? <Text>{footer}</Text> : undefined}>
      {children}
    </Section>
  );
}

export function SwitchRow(props: SwitchRowProps) {
  return <SwitchControl {...props} />;
}

/** Label, value and chevron. VoiceOver reads "label, value, button". */
export function NavigationRow({ label, value, onPress }: NavigationRowProps) {
  return (
    <Button onPress={onPress} modifiers={[buttonStyle("plain")]}>
      <LabeledContent label={label} modifiers={[contentShape(shapes.rectangle())]}>
        <HStack spacing={6}>
          {value ? <Text modifiers={[foregroundStyle({ type: "color", color: "secondaryLabel" })]}>{value}</Text> : null}
          <Image
            systemName="chevron.right"
            modifiers={[
              font({ textStyle: "footnote", weight: "semibold" }),
              foregroundStyle({ type: "color", color: "tertiaryLabel" }),
              accessibilityHidden(true),
            ]}
          />
        </HStack>
      </LabeledContent>
    </Button>
  );
}

/** Form button: tinted label, or red with the destructive role. */
export function ButtonRow({ label, onPress, destructive, disabled }: ButtonRowProps) {
  return (
    <Button
      label={label}
      role={destructive ? "destructive" : undefined}
      onPress={onPress}
      modifiers={[disabledModifier(!!disabled)]}
    />
  );
}
