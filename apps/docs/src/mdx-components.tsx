import defaultComponents from "fumadocs-ui/mdx";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import type { MDXComponents } from "mdx/types";

import { Preview } from "./components/preview";
import { PropsTable } from "./components/props-table";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    pre: (props) => <CodeBlock {...props} viewportProps={{ role: "group" }}><Pre>{props.children}</Pre></CodeBlock>,
    Preview,
    PropsTable,
    ...components,
  };
}
