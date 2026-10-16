import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { z } from "zod";

import { space } from "../../theme/tokens";
import { Button } from "../../button";
import { Text } from "../../text";
import { Field, type FieldRef } from "..";

const signUpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Too short"),
  inviteCode: z.string().regex(/^[A-Z0-9]{6}$/, "Wrong code"),
});

type SignUp = z.infer<typeof signUpSchema>;

/**
 * Sign-up wiring on one screen: autofill hints (email, new-password,
 * one-time-code), return-key focus order, keyboard avoidance and inline
 * errors on submit. The sign-up screen itself doesn't exist yet.
 */
export function SignUpExample() {
  const { control, handleSubmit } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", inviteCode: "" },
  });
  const [done, setDone] = useState(false);
  const passwordRef = useRef<FieldRef>(null);
  const inviteRef = useRef<FieldRef>(null);

  return (
    // The real screen wraps its content in KeyboardAvoidingView; inside the
    // catalog's scroll view this still proves the wiring.
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={{ gap: space[3] }}>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field
              placeholder="Email"
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
              keyboardType="email-address"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmit={() => passwordRef.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field
              ref={passwordRef}
              placeholder="Password"
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
              secure
              autoComplete="new-password"
              returnKeyType="next"
              onSubmit={() => inviteRef.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="inviteCode"
          render={({ field, fieldState }) => (
            <Field
              ref={inviteRef}
              placeholder="Invite code"
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
              autoComplete="one-time-code"
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={6}
              returnKeyType="done"
              onSubmit={handleSubmit(() => setDone(true))}
            />
          )}
        />
        <Button variant="primary" label="Create account" onPress={handleSubmit(() => setDone(true))} />
        {done ? (
          <Text variant="meta" color="success">
            Welcome in
          </Text>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}
