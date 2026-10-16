import { useState } from "react";

import { StarRating } from "..";

export function RatingInputExample() {
  const [value, setValue] = useState(3.5);
  return <StarRating value={value} onChange={setValue} showValue accessibilityLabel="Your rating" />;
}
