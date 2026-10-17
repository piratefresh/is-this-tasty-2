import type { RarityToken } from "../theme/tokens";

/** "№ 042" — Dex numbers are three digits, zero-padded. */
export function dexNumber(number: number): string {
  return `№ ${String(number).padStart(3, "0")}`;
}

/**
 * Locked cards stay anonymous: the silhouette must not spoil the collectible, and the muted
 * frame no longer shows the tier, so rarity is only spoken once collected.
 */
export function describeCard({
  name,
  number,
  rarity,
  collected,
}: {
  name: string;
  number: number;
  rarity: RarityToken;
  collected: boolean;
}): string {
  return collected ? `${name}, number ${number}, ${rarity}, collected` : `Locked, number ${number}`;
}

/** Gold frame gradient for RN 0.88+ `backgroundImage` (and CSS on web): light → dark → light. */
export function frameGradient([top, mid, bottom]: readonly [string, string, string]): string {
  return `linear-gradient(180deg, ${top}, ${mid} 50%, ${bottom})`;
}
