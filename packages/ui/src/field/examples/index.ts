import { FieldErrorExample } from "./error";
import { SearchExample } from "./search";
import { SignUpExample } from "./sign-up";

export const fieldExamples = {
  id: "field",
  name: "Field",
  examples: [
    { id: "sign-up", title: "Sign up · autofill, focus order, keyboard", Component: SignUpExample },
    { id: "error", title: "Inline errors · destructive border and message", Component: FieldErrorExample },
    { id: "search", title: "Search · clear button", Component: SearchExample },
  ],
};
