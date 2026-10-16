export type ButtonVariant = "primary" | "tinted" | "secondary" | "plain" | "destructive";

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  /** Disables the button and appends an ellipsis to the label. */
  loading?: boolean;
  /** SF Symbol name. Applied on iOS only. */
  systemImage?: string;
};

export const buttonHeight = 46;

export const buttonLabel = ({ label, loading }: ButtonProps) => (loading ? `${label}…` : label);
