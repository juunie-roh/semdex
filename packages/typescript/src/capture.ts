import type TSParser from "tree-sitter";

import type { Capture } from "./models";

function getMatches(
  node: TSParser.SyntaxNode,
  query: TSParser.Query,
  directChildrenOnly = true,
): TSParser.QueryMatch[] {
  const matches = query.matches(node);
  if (!directChildrenOnly) return matches;

  return matches.filter((match) =>
    match.captures.some(
      (captured) =>
        captured.node.parent?.id === node.id ||
        captured.node.parent?.type === "export_statement",
    ),
  );
}

function captureFunctions(
  filePath: string,
  matches: TSParser.QueryMatch[],
): Capture.Function[] {
  return matches
    .filter((match) =>
      match.captures.some((captured) => captured.name === "function"),
    )
    .map((match) => {
      const get = (name: string) =>
        match.captures.find((c) => c.name === name)?.node;

      return {
        id: `${filePath}:function:${get("name")?.text}`,
        node: get("function")!,
        body: get("body"),
        name: get("name")?.text,

        generics: get("generics")?.namedChildren.map((c) => c.text) ?? [],
        params: get("params")?.namedChildren.map((c) => c.text) ?? [],
        returnType: get("return-type")?.text,
      };
    });
}

function isExportedDeclaration(node: TSParser.SyntaxNode): boolean {
  if (!node.parent || node.parent.type !== "export_statement") return false;
  return true;
}

function capture(
  node: TSParser.SyntaxNode,
  query: TSParser.Query,
  filePath: string,
): Capture.Base[] {
  const result: Capture.Base[] = [];
  const matches = getMatches(node, query);

  captureFunctions(filePath, matches).forEach((fn) => {
    const { id, name, generics, params, returnType } = fn;
    console.log(
      JSON.stringify({ id, name, generics, params, returnType }, null, 2),
    );
    result.push(fn);
  });

  return result;
}

export { capture };
