import { GenreTagList } from "..";
import { category } from "../../theme/tokens";

export function CurrentGenresExample() {
  return <GenreTagList genres={Object.keys(category)} />;
}
