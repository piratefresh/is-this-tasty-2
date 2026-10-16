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

export async function generateStaticParams(): Promise<{ component: string; example: string }[]> {
  // Node-only work stays inside the export function; native never imports fs.
  const { readdir, readFile } = await import("node:fs/promises");
  const path = await import("node:path");
  const base = path.resolve(process.cwd(), "../../packages/ui/src");
  const params: { component: string; example: string }[] = [];
  for (const entry of await readdir(base, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const files = await readdir(path.join(base, entry.name));
    if (!files.includes("docs.mdx")) continue;
    const mdx = await readFile(path.join(base, entry.name, "docs.mdx"), "utf8");
    for (const match of mdx.matchAll(/<Preview example="([a-z0-9-]+)\/([a-z0-9-]+)"/g)) {
      params.push({ component: match[1], example: match[2] });
    }
  }
  return params;
}
