import { DrinkRow } from "..";
import { Text } from "../../text";
import { rose } from "./data";

export function TrailingDrinkRowExample() {
  return <DrinkRow drink={rose} trailing={<Text variant="meta">Added today</Text>} trailingLabel="added today"onPress={() => {}} />;
}
