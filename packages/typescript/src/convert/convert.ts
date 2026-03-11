import type { CaptureResult, Edge, Node } from "@/types";

import { convertAbstractClasses } from "./abstract_class";
import { convertClasses } from "./class";
import { convertFunctions } from "./function";
import { convertImports } from "./import";
import { convertVariables } from "./variable";

function convert(
  captures: CaptureResult,
  parentId: string,
): { edges: Edge[]; nodes: Node[] } {
  const abstract_classes = convertAbstractClasses(
    captures.abstract_class,
    parentId,
  );
  const classes = convertClasses(captures.class, parentId);
  const functions = convertFunctions(captures.function, parentId);
  const imports = convertImports(captures.import, parentId);
  const variables = convertVariables(captures.variable, parentId);

  return {
    nodes: [
      ...abstract_classes.nodes,
      ...classes.nodes,
      ...functions.nodes,
      ...imports.nodes,
      ...variables.nodes,
    ],
    edges: [
      ...abstract_classes.edges,
      ...classes.edges,
      ...functions.edges,
      ...imports.edges,
      ...variables.edges,
    ],
  };
}

export { convert };
