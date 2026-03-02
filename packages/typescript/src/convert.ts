import { Capture, Edge, Node } from "./models";

function fromImports(imports: Capture.Import[]): Node[] {
  const nodes: Node[] = [];

  for (const imp of imports) {
    if (!imp.source) continue;

    // caller-to-callee
    const edge: Edge = {
      from: imp.id,
      to: imp.source,
      kind: "import",
    };

    nodes.push({
      id: imp.source,
      kind: "module",
      meta: {
        names: imp.names,
      },
      edges: [edge],
    });
  }

  return nodes;
}

function convert(captures: Capture.Result): Node[] {
  const nodes = fromImports(captures.imports);

  return nodes;
}

export { convert };
