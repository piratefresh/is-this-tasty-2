import { useState } from "react";
import { View } from "react-native";

import { Form, FormSection } from "../../form";
import { DateField } from "..";

export function LogFormDateExample() {
  const [pouredOn, setPouredOn] = useState(() => new Date());
  return (
    <View style={{ height: 200 }}>
      <Form>
        <FormSection title="Log a pour" footer="Future dates can't be picked.">
          <DateField label="Poured on" value={pouredOn} onChange={setPouredOn} />
        </FormSection>
      </Form>
    </View>
  );
}
