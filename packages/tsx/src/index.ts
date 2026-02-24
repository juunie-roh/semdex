import { readFileSync } from "node:fs";

import { parser } from "@juun-roh/spine";
import TypeScript from "tree-sitter-typescript";

const language = TypeScript.tsx;

export async function parse(file: string) {
  parser.setLanguage(language as any);

  const source = readFileSync(file, "utf-8");
  return parser.parse(source);
}

export { convert } from "./convert.js";
export { language };
