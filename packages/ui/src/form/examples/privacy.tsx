import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";

import { ChoiceSheet } from "../../sheet";
import { NavigationRow, Form, FormSection, SwitchRow } from "..";

const audiences = { everyone: "Everyone", club: "Club only", private: "Only me" } as const;
const audienceOrder = Object.keys(audiences) as (keyof typeof audiences)[];

const privacySchema = z.object({
  privateProfile: z.boolean(),
  showInDiscover: z.boolean(),
  reviewAudience: z.enum(audienceOrder),
});

type Privacy = z.infer<typeof privacySchema>;

export function PrivacySettingsExample() {
  const { control, setValue } = useForm<Privacy>({
    resolver: zodResolver(privacySchema),
    mode: "onChange",
    defaultValues: { privateProfile: true, showInDiscover: false, reviewAudience: "club" },
  });
  const audience = useWatch({ control, name: "reviewAudience" });
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <View style={{ height: 320 }}>
      <Form>
        <FormSection title="Privacy" footer="A private profile only shows your reviews to people you approve.">
          <Controller
            control={control}
            name="privateProfile"
            render={({ field }) => <SwitchRow label="Private profile" value={field.value} onValueChange={field.onChange} />}
          />
          <Controller
            control={control}
            name="showInDiscover"
            render={({ field }) => <SwitchRow label="Show in Discover" value={field.value} onValueChange={field.onChange} />}
          />
          <NavigationRow label="Who can see reviews" value={audiences[audience]} onPress={() => setSheetOpen(true)} />
        </FormSection>
      </Form>
      <ChoiceSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Who can see reviews"
        options={audienceOrder.map((key) => audiences[key])}
        selectedIndex={audienceOrder.indexOf(audience)}
        onSelect={(index) => setValue("reviewAudience", audienceOrder[index], { shouldValidate: true })}
      />
    </View>
  );
}
