import { View } from "react-native";

import { ButtonRow, Form, FormSection } from "..";

export function ActionRowsExample() {
  return (
    <View style={{ height: 280 }}>
      <Form>
        <FormSection title="Account">
          <ButtonRow label="Export my data" onPress={() => {}} />
          <ButtonRow label="Restore purchases" onPress={() => {}} disabled />
        </FormSection>
        <FormSection footer="Deletes your reviews and Dex. This can't be undone.">
          <ButtonRow label="Delete account" onPress={() => {}} destructive />
        </FormSection>
      </Form>
    </View>
  );
}
