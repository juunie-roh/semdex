import type TSParser from "tree-sitter";

import type { Capture } from "./models";

/**
 * Get 1-depth children of a given node.
 */
function getMatches(
  node: TSParser.SyntaxNode,
  query: TSParser.Query,
): TSParser.QueryMatch[] {
  const matches = query.matches(node);

  return matches.filter((match) =>
    match.captures.some(
      (captured) =>
        captured.node.parent?.id === node.id ||
        // include export declarations
        captured.node.parent?.type === "export_statement",
    ),
  );
}

/**
 * Group the matches by a tag.
 */
function groupBy(
  tag: string,
  matches: TSParser.QueryMatch[],
): TSParser.QueryMatch[] {
  return matches.filter((match) =>
    match.captures.some((captured) => captured.name === tag),
  );
}

/**
 * Find a {@link TSParser.SyntaxNode | node} by name within a {@link TSParser.QueryMatch | match}.
 */
function getByName(name: string, match: TSParser.QueryMatch) {
  return match.captures.find((c) => c.name === name)?.node;
}

/**
 * Parse a single import clause child node into its {@link Capture.Import} name entries.
 */
function parseImportName(
  node: TSParser.SyntaxNode,
): NonNullable<Capture.Import["names"]> {
  if (node.type === "identifier") {
    return [{ type: "default", name: node.text }];
  }
  if (node.type === "named_imports") {
    return node.namedChildren
      .filter((p) => p.type === "import_specifier")
      .map((f) => ({
        type: "named_imports",
        name: f.childForFieldName("name")!.text,
        alias: f.childForFieldName("alias")?.text,
      }));
  }
  if (node.type === "namespace_import") {
    return [
      {
        type: "namespace_import",
        name: "*",
        alias: node.firstNamedChild?.text,
      },
    ];
  }
  return [];
}

function getImports(
  filePath: string,
  matches: TSParser.QueryMatch[],
): Capture.Import[] {
  const imports = groupBy("import", matches).map((match) => {
    const get = (name: string) => getByName(name, match);
    return {
      id: filePath,
      names: get("names")?.namedChildren.flatMap(parseImportName),
      source: get("source")!.text,
    };
  });

  // consolidate identical sources
  const map = new Map<string, Capture.Import>();
  for (const curr of imports) {
    const existing = map.get(curr.source);
    if (existing) {
      existing.names = [...(existing.names ?? []), ...(curr.names ?? [])];
    } else {
      map.set(curr.source, { ...curr });
    }
  }
  return [...map.values()];
}

function getFunctions(
  filePath: string,
  matches: TSParser.QueryMatch[],
): Capture.Function[] {
  return groupBy("function", matches).map((match) => {
    const get = (name: string) => getByName(name, match);

    return {
      id: `${filePath}:function:${get("name")?.text}`,
      node: get("function")!,
      body: get("body"),
      name: get("name")?.text,

      generics: get("generics")?.namedChildren.map((c) => c.text) ?? [],
      params: get("params")?.namedChildren.map((c) => c.text) ?? [],
      return_type: get("return_type")?.text,
    };
  });
}

function capture(
  filePath: string,
  node: TSParser.SyntaxNode,
  query: TSParser.Query,
): Capture.Result {
  const matches = getMatches(node, query);

  return {
    imports: getImports(filePath, matches),
    functions: getFunctions(filePath, matches),
  };
}

export { capture };
