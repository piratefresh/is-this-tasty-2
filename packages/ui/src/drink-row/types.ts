/** Minimal shape until the app has a data model. */
export type Drink = {
  name: string;
  producer: string;
  genre: string;
  /** 0 to 5. */
  rating: number;
  imageUrl?: string;
};
