import { Stack, useLocalSearchParams } from "expo-router";

import { ComponentScreen } from "@/components/catalog/component-screen";

export default function CatalogComponentRoute() {
  const { component } = useLocalSearchParams<{ component: string }>();
  return (
    <>
      <Stack.Screen options={{ title: component }} />
      <ComponentScreen component={component} />
    </>
  );
}
