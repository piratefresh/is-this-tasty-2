export type PickerProps = {
  /** Option labels, in order. Segmented: 2 to 4. Menu: 5 or more. */
  options: readonly string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  /** Screen reader name on web. Native controls announce the selected option. */
  label?: string;
  disabled?: boolean;
  testID?: string;
};
