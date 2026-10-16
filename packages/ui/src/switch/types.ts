export type SwitchProps = {
  /** Read with the value by VoiceOver and TalkBack. */
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  testID?: string;
};
