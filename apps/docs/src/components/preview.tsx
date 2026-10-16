import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

export async function Preview({ example }: { example: string }) {
  if (!/^[a-z][a-z0-9-]*\/[a-z][a-z0-9-]*$/.test(example)) {
    throw new Error(`Invalid preview example: ${example}`);
  }
  const [component, name] = example.split("/");
  const code = await readFile(path.resolve("../../packages/ui/src", component, "examples", `${name}.tsx`), "utf8");
  const origin = process.env.PREVIEW_ORIGIN ?? "http://localhost:8081";

  return (
    <div className="my-5 overflow-hidden rounded-md border border-separator">
      <Tabs items={["Web", "iOS", "Android"]}>
        <Tab value="Web">
          <iframe
            title={`${component}: ${name} live web example`}
            src={`${origin}/preview/${example}`}
            loading="lazy"
            className="h-96 w-full border-0 bg-bg"
          />
          <a className="mx-4 text-tint-text" href={`${origin}/preview/${example}`} target="_blank" rel="noreferrer">
            Open example in a new tab
          </a>
        </Tab>
        {(["iOS", "Android"] as const).map((platform) => {
          const file = `/previews/${example}.${platform === "iOS" ? "ios" : "android"}.mp4`;
          return (
            <Tab key={platform} value={platform}>
              {existsSync(path.join(process.cwd(), "public", file)) ? (
                <video controls playsInline preload="metadata" aria-label={`${name} on ${platform}`} className="mx-auto max-h-96">
                  <source src={file} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              ) : (
                <p className="p-5 text-label2">No {platform} recording yet. See the preview recording guide for device capture instructions.</p>
              )}
            </Tab>
          );
        })}
      </Tabs>
      <CodeBlock title={`${component}/examples/${name}.tsx`} viewportProps={{ "aria-label": `${example} source code` }}>
        <Pre><code>{code}</code></Pre>
      </CodeBlock>
    </div>
  );
}
