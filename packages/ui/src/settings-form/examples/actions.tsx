import { View } from "react-native";

import { ButtonRow, SettingsForm, SettingsSection } from "..";

export function ActionRowsExample() {
  return (
    <View style={{ height: 280 }}>
      <SettingsForm>
        <SettingsSection title="Account">
          <ButtonRow label="Export my data" onPress={() => {}} />
          <ButtonRow label="Restore purchases" onPress={() => {}} disabled />
        </SettingsSection>
        <SettingsSection footer="Deletes your reviews and Dex. This can't be undone.">
          <ButtonRow label="Delete account" onPress={() => {}} destructive />
        </SettingsSection>
      </SettingsForm>
    </View>
  );
}
