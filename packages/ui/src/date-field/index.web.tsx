import type { DateFieldProps } from "./types";

export type { DateFieldProps } from "./types";

// Local calendar day as yyyy-mm-dd, which is what <input type="date"> reads and writes.
const toInputValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export function DateField({ label, value, onChange, maxDate = new Date() }: DateFieldProps) {
  return (
    <label className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 px-4 py-2 text-[17px] text-label">
      {label}
      <input
        type="date"
        className="rounded-sm bg-handle px-2 py-1 text-[17px] text-label scheme-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tint-text"
        value={toInputValue(value)}
        max={toInputValue(maxDate)}
        onChange={(event) => {
          if (event.target.value) onChange(new Date(`${event.target.value}T00:00`));
        }}
      />
    </label>
  );
}
