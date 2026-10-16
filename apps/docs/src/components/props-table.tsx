import path from "node:path";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";

const generator = createGenerator();

export function PropsTable({ path: file, name }: { path: string; name: string }) {
  if (!/^[a-z][a-z0-9-]*\/(index\.tsx|types\.ts)$/.test(file)) {
    throw new Error(`Invalid props source: ${file}`);
  }
  return (
    <AutoTypeTable
      generator={generator}
      path={path.resolve("../../packages/ui/src", file)}
      name={name}
      renderType={async (type) => <code className="text-label2">{type}</code>}
    />
  );
}
