import { Column, ListItem, Text as ComposeText } from "@expo/ui/jetpack-compose";
import { background, clickable, clip, fillMaxSize, fillMaxWidth, padding, Shapes, verticalScroll } from "@expo/ui/jetpack-compose/modifiers";

import { SwitchControl } from "../switch/control";
import { ThemedHost } from "../theme/themed-host";
import { color, radius } from "../theme/tokens";
import type { ButtonRowProps, NavigationRowProps, FormProps, FormSectionProps, SwitchRowProps } from "./types";

export type { ButtonRowProps, NavigationRowProps, FormProps, FormSectionProps, SwitchRowProps } from "./types";

const rowColors = { containerColor: color.surface };

/** Scrolling Compose Column of sections. */
export function Form({ children }: FormProps) {
  return (
    <ThemedHost style={{ flex: 1 }}>
      <Column
        verticalArrangement={{ spacedBy: 24 }}
        modifiers={[fillMaxSize(), background(color.bg), verticalScroll(), padding(16, 16, 16, 16)]}
      >
        {children}
      </Column>
    </ThemedHost>
  );
}

/** Rows grouped on `surface` with a 12pt radius, Material settings style. */
export function FormSection({ title, footer, children }: FormSectionProps) {
  return (
    <Column verticalArrangement={{ spacedBy: 8 }} modifiers={[fillMaxWidth()]}>
      {title ? (
        <ComposeText color={color.label3} style={{ typography: "labelLarge" }} modifiers={[padding(16, 0, 16, 0)]}>
          {title.toUpperCase()}
        </ComposeText>
      ) : null}
      <Column modifiers={[fillMaxWidth(), clip(Shapes.RoundedCorner(radius.md))]}>{children}</Column>
      {footer ? (
        <ComposeText color={color.label3} style={{ typography: "bodySmall" }} modifiers={[padding(16, 0, 16, 0)]}>
          {footer}
        </ComposeText>
      ) : null}
    </Column>
  );
}

export function SwitchRow(props: SwitchRowProps) {
  return <SwitchControl {...props} containerColor={color.surface} />;
}

/** Material pattern: the current value sits below the label, no chevron. TalkBack reads both. */
export function NavigationRow({ label, value, onPress }: NavigationRowProps) {
  return (
    <ListItem colors={rowColors} modifiers={[clickable(onPress)]}>
      <ListItem.HeadlineContent>
        <ComposeText color={color.label}>{label}</ComposeText>
      </ListItem.HeadlineContent>
      {value ? (
        <ListItem.SupportingContent>
          <ComposeText color={color.label3}>{value}</ComposeText>
        </ListItem.SupportingContent>
      ) : null}
    </ListItem>
  );
}

export function ButtonRow({ label, onPress, destructive, disabled }: ButtonRowProps) {
  const tone = disabled ? color.label3 : destructive ? color.destructive : color.tintText;
  return (
    <ListItem colors={rowColors} modifiers={disabled ? [] : [clickable(onPress)]}>
      <ListItem.HeadlineContent>
        <ComposeText color={tone}>{label}</ComposeText>
      </ListItem.HeadlineContent>
    </ListItem>
  );
}
