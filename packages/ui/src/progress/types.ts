export type ProgressProps = {
  /** Read by VoiceOver and TalkBack with the value, e.g. "Dex completion, 35 percent". */
  label: string;
  /** 0 to 1. Omit for an indeterminate spinner. */
  value?: number;
  /** `linear` is a 4pt bar for steps and completion; `circular` is a ring. */
  variant?: "linear" | "circular";
};

export const percent = (value: number) => Math.round(Math.min(Math.max(value, 0), 1) * 100);
