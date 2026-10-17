export type DateFieldProps = {
  /** Row label, e.g. "Poured on". Read with the value by VoiceOver and TalkBack. */
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  /** Latest selectable day. Defaults to today, so future dates are disabled. */
  maxDate?: Date;
};
