import { EmptyRatingExample } from "./empty";
import { FullRatingExample } from "./full";
import { HalfRatingExample } from "./half";
import { RatingInputExample } from "./input";
import { PartialRatingExample } from "./partial";
import { SwipeableRatingExample } from "./swipeable-row";

export const starRatingExamples = {
  name: "StarRating",
  examples: [
    { title: "Empty · 0", Component: EmptyRatingExample },
    { title: "Half · 0.5", Component: HalfRatingExample },
    { title: "Partial · 3.5 with count", Component: PartialRatingExample },
    { title: "Full · 5", Component: FullRatingExample },
    { title: "Input · tap, hold and scrub, or use arrow keys", Component: RatingInputExample },
    { title: "Input in a swipeable list row", Component: SwipeableRatingExample },
  ],
};
