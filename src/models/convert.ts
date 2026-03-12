import type { SingleCaptureResult } from "./capture";
import type { Edge, Node, Query, QueryTag } from "./global";

type ConvertResult<N extends Node, E extends Edge> = {
  nodes: N[];
  edges: E[];
};

type ConvertHandler<T extends QueryTag, N extends Node, E extends Edge> = (
  captures: SingleCaptureResult<T>[],
  parentId: string,
) => ConvertResult<N, E>;

type Convert<Q extends Query, N extends Node, E extends Edge> = {
  [K in keyof Q]: ConvertHandler<Q[K], N, E>;
};

export type { Convert, ConvertHandler, ConvertResult };
