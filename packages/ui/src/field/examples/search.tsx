import { useState } from "react";

import { SearchField } from "..";

/** Discover search: clear button appears once there is text to clear. */
export function SearchExample() {
  const [query, setQuery] = useState("pliny");
  return <SearchField placeholder="Search drinks" value={query} onChangeText={setQuery} />;
}
