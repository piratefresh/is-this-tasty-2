import { useState } from "react";
import { View } from "react-native";

import { space } from "../../theme/tokens";
import { Field } from "..";

/** Inline error states: destructive border plus a short message. */
export function FieldErrorExample() {
  const [code, setCode] = useState("TASTY-2");
  const [password, setPassword] = useState("correct horse");
  return (
    <View style={{ gap: space[3] }}>
      <Field placeholder="Invite code" value={code} onChangeText={setCode} error="Wrong code" maxLength={6} />
      <Field
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secure
        error="Incorrect"
      />
    </View>
  );
}
