import type { ReactNode } from "react";

import type { SwitchProps } from "../switch/types";

export type SettingsFormProps = {
  /** SettingsSection elements. The form fills its parent and scrolls. */
  children: ReactNode;
};

export type SettingsSectionProps = {
  /** Header. The platform sets the case (uppercase on iOS and web). */
  title?: string;
  footer?: string;
  children: ReactNode;
};

export type SwitchRowProps = SwitchProps;

export type NavigationRowProps = {
  label: string;
  /** Current choice, e.g. "Club only". Shown before the chevron on iOS and below the label on Android. */
  value?: string;
  onPress: () => void;
};

export type ButtonRowProps = {
  label: string;
  onPress: () => void;
  /** Uses the system destructive role. Only for irreversible actions. */
  destructive?: boolean;
  disabled?: boolean;
};
