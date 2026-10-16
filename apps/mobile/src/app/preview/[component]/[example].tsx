import { catalog } from "@is-this-tasty/ui/catalog";
import { Stack, useLocalSearchParams } from "expo-router";
import type { Metadata } from "expo-router/server";

import { ExampleScreen } from "@/components/catalog/example-screen";

export default function PreviewRoute() {
  const { component, example } = useLocalSearchParams<{ component: string; example: string }>();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ExampleScreen component={component} example={example} />
    </>
  );
}

export function generateMetadata(): Metadata {
  return { title: "Component preview · Is This Tasty?" };
}

// Every catalog example; documented previews are a subset (checked by scripts/record-previews.test.mjs).
export function generateStaticParams(): { component: string; example: string }[] {
  return catalog.flatMap(({ id, examples }) => examples.map((example) => ({ component: id, example: example.id })));
}
