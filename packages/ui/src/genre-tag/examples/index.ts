import { CurrentGenresExample } from "./current-genres";
import { OverflowExample } from "./overflow";
import { UnknownGenreExample } from "./unknown";
import { WrappingExample } from "./wrapping";

export const genreTagExamples = {
  name: "GenreTag",
  examples: [
    { title: "Current genres", Component: CurrentGenresExample },
    { title: "Unknown genre", Component: UnknownGenreExample },
    { title: "Overflow", Component: OverflowExample },
    { title: "Wrapping", Component: WrappingExample },
  ],
};
