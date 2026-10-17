import { Redirect, Stack } from "expo-router";

export default function CatalogLayout() {
  if (!__DEV__) return <Redirect href="/" />;
  return <Stack screenOptions={{ title: "Component catalog" }} />;
}
