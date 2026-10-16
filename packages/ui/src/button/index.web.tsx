import { Button as BaseButton } from "@base-ui/react/button";
import { tv } from "tailwind-variants";

import { buttonLabel, type ButtonProps } from "./types";

export type { ButtonProps, ButtonVariant } from "./types";

const button = tv({
  base: "inline-flex h-11.5 w-full cursor-pointer items-center justify-center rounded-pill px-5 text-[17px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tint-text data-disabled:cursor-not-allowed data-disabled:opacity-40",
  variants: {
    variant: {
      primary: "bg-primary-fill text-bg",
      tinted: "bg-tint text-tint-ink",
      secondary: "bg-tint-wash text-tint-text",
      plain: "bg-transparent text-tint-text",
      destructive: "bg-transparent text-destructive",
    },
  },
});

export function Button(props: ButtonProps) {
  const { onPress, variant = "tinted", disabled, loading } = props;
  return (
    <BaseButton
      className={button({ variant })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onPress}
    >
      {buttonLabel(props)}
    </BaseButton>
  );
}
