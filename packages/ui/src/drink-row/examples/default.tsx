import { DrinkRow } from "..";
import { pliny } from "./data";

export function DefaultDrinkRowExample() {
  return <DrinkRow drink={pliny} onPress={() => {}} />;
}
