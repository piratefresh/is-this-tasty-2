export type TasteSliderProps = {
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
  onChangeEnd: (value: number) => void;
  step?: number;
};

export const defaultTasteSliderStep = 0.1;
