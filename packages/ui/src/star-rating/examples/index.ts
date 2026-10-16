import { EmptyRatingExample } from "./empty";
import { FullRatingExample } from "./full";
import { HalfRatingExample } from "./half";
import { RatingInputExample } from "./input";
import { PartialRatingExample } from "./partial";
import { SwipeableRatingExample } from "./swipeable-row";

export const starRatingExamples = {
  id: "star-rating",
  name: "StarRating",
  examples: [
    { id: "empty", title: "Empty · 0", Component: EmptyRatingExample },
    { id: "half", title: "Half · 0.5", Component: HalfRatingExample },
    { id: "partial", title: "Partial · 3.5 with count", Component: PartialRatingExample },
    { id: "full", title: "Full · 5", Component: FullRatingExample },
    { id: "input", title: "Input · tap, hold and scrub, or use arrow keys", Component: RatingInputExample },
    { id: "swipeable-row", title: "Input in a swipeable list row", Component: SwipeableRatingExample },
  ],
};
