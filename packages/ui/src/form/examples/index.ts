import { ActionRowsExample } from "./actions";
import { PrivacySettingsExample } from "./privacy";

export const formExamples = {
  id: "form",
  name: "Form",
  examples: [
    { id: "privacy", title: "Privacy · toggle and navigation rows", Component: PrivacySettingsExample },
    { id: "actions", title: "Button and destructive rows", Component: ActionRowsExample },
  ],
};
