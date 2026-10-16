import { CurrentGenresExample } from "./current-genres";
import { OverflowExample } from "./overflow";
import { UnknownGenreExample } from "./unknown";
import { WrappingExample } from "./wrapping";

export const genreTagExamples = {
  id: "genre-tag",
  name: "GenreTag",
  examples: [
    { id: "current-genres", title: "Current genres", Component: CurrentGenresExample },
    { id: "unknown", title: "Unknown genre", Component: UnknownGenreExample },
    { id: "overflow", title: "Overflow", Component: OverflowExample },
    { id: "wrapping", title: "Wrapping", Component: WrappingExample },
  ],
};
