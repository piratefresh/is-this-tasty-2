import { Button as SwiftButton } from "@expo/ui/swift-ui";
import {
  buttonBorderShape,
  buttonStyle,
  controlSize,
  disabled as disabledModifier,
  foregroundStyle,
  frame,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import type { ComponentProps } from "react";

import { ThemedHost } from "../theme/themed-host";
import { color } from "../theme/tokens";
import { buttonHeight, buttonLabel, type ButtonProps, type ButtonVariant } from "./types";

export type { ButtonProps, ButtonVariant } from "./types";

type Modifiers = NonNullable<ComponentProps<typeof SwiftButton>["modifiers"]>;

const style: Record<ButtonVariant, Modifiers> = {
  primary: [buttonStyle("borderedProminent"), tint(color.primaryFill), foregroundStyle(color.bg)],
  tinted: [buttonStyle("borderedProminent"), tint(color.tint), foregroundStyle(color.tintInk)],
  secondary: [buttonStyle("bordered"), tint(color.tintWash), foregroundStyle(color.tintText)],
  plain: [buttonStyle("borderless"), tint(color.tintText)],
  destructive: [buttonStyle("borderless")],
};

export function Button(props: ButtonProps) {
  const { onPress, variant = "tinted", disabled, loading, systemImage } = props;
  const bordered = variant !== "plain" && variant !== "destructive";

  return (
    <ThemedHost matchContents={{ vertical: true }}>
      <SwiftButton
        label={buttonLabel(props)}
        systemImage={systemImage as ComponentProps<typeof SwiftButton>["systemImage"]}
        role={variant === "destructive" ? "destructive" : undefined}
        onPress={onPress}
        modifiers={[
          ...style[variant],
          ...(bordered ? [buttonBorderShape("capsule")] : []),
          controlSize("large"),
          frame({ maxWidth: 10_000, minHeight: buttonHeight }),
          disabledModifier(!!disabled || !!loading),
        ]}
      />
    </ThemedHost>
  );
}
