import type { RarityToken } from "../theme/tokens";

export type DexCardProps = {
  name: string;
  /** Dex number, shown zero-padded to three digits ("№ 042"). */
  number: number;
  rarity?: RarityToken;
  /** Locked (not collected) shows the silhouette and mutes the frame. Flipping to `collected` while mounted plays the reveal. */
  collected?: boolean;
  /** Card width in points; height follows the 104:148 plate ratio. Default 104 (grid cell). */
  width?: number;
  onPress?: () => void;
  testID?: string;
};
