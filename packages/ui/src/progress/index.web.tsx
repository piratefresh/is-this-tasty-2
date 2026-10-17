import { Progress as BaseProgress } from "@base-ui/react/progress";
import { tv } from "tailwind-variants";

import { percent, type ProgressProps } from "./types";

export type { ProgressProps } from "./types";

const styles = tv({
  slots: {
    track: "relative h-1 w-full overflow-hidden rounded-pill bg-handle",
    indicator: "h-full rounded-pill bg-tint data-indeterminate:w-1/3 data-indeterminate:animate-pulse",
    ring: "size-8 -rotate-90 data-indeterminate:animate-spin",
  },
});

const RING_RADIUS = 14;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

export function Progress({ label, value, variant = "linear" }: ProgressProps) {
  const classNames = styles();
  const pct = value === undefined ? null : percent(value);
  return (
    <BaseProgress.Root
      value={pct}
      aria-label={label}
      getAriaValueText={(_, current) => (current === null ? "" : `${current} percent`)}
      className={variant === "linear" ? "w-full" : "inline-block"}
    >
      {variant === "linear" ? (
        <BaseProgress.Track className={classNames.track()}>
          <BaseProgress.Indicator className={classNames.indicator()} />
        </BaseProgress.Track>
      ) : (
        <svg viewBox="0 0 32 32" className={classNames.ring()} data-indeterminate={pct === null ? "" : undefined} aria-hidden>
          <circle cx="16" cy="16" r={RING_RADIUS} fill="none" strokeWidth="4" className="stroke-handle" />
          <circle
            cx="16"
            cy="16"
            r={RING_RADIUS}
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            className="stroke-tint"
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH * (1 - (pct === null ? 0.25 : pct / 100))}
          />
        </svg>
      )}
    </BaseProgress.Root>
  );
}
