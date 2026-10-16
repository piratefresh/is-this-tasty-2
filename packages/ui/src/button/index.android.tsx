import {
  Button as ComposeButton,
  FilledTonalButton,
  Text as ComposeText,
  TextButton,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from "@expo/ui/jetpack-compose/modifiers";
import type { ComponentProps } from "react";

import { ThemedHost } from "../theme/themed-host";
import { color } from "../theme/tokens";
import { buttonHeight, buttonLabel, type ButtonProps } from "./types";

export type { ButtonProps, ButtonVariant } from "./types";

type Colors = NonNullable<ComponentProps<typeof ComposeButton>["colors"]>;

const clear = "transparent";
const palette = (container: string, content: string): Colors => ({
  containerColor: container,
  contentColor: content,
  disabledContainerColor: container === clear ? clear : `${container}66`,
  disabledContentColor: `${content}99`,
});

const spec = {
  primary: { Component: ComposeButton, colors: palette(color.primaryFill, color.bg) },
  tinted: { Component: ComposeButton, colors: palette(color.tint, color.tintInk) },
  secondary: { Component: FilledTonalButton, colors: palette(color.tintWash, color.tintText) },
  plain: { Component: TextButton, colors: palette(clear, color.tintText) },
  destructive: { Component: TextButton, colors: palette(clear, color.destructive) },
} as const;

export function Button(props: ButtonProps) {
  const { onPress, variant = "tinted", disabled, loading } = props;
  const { Component, colors } = spec[variant];

  return (
    <ThemedHost matchContents={{ vertical: true }}>
      <Component
        onClick={onPress}
        enabled={!disabled && !loading}
        colors={colors}
        modifiers={[height(buttonHeight), fillMaxWidth()]}
      >
        <ComposeText color={colors.contentColor as string} style={{ fontSize: 17, fontWeight: "600" }}>
          {buttonLabel(props)}
        </ComposeText>
      </Component>
    </ThemedHost>
  );
}
