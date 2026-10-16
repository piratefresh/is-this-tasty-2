import { Redirect, Stack } from "expo-router";

import { CatalogScreen } from "@/components/catalog/catalog-screen";

export default function CatalogRoute() {
  if (!__DEV__) return <Redirect href="/" />;

  return (
    <>
      <Stack.Screen options={{ title: "Component catalog" }} />
      <CatalogScreen />
    </>
  );
}
