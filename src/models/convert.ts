import type { createCapture, createConvert } from "@/utils";

import type { SingleCaptureResult } from "./capture";
import type { Edge, Node, Query } from "./global";

type ConvertResult<N extends Node, E extends Edge> = {
  nodes: N[];
  edges: E[];
};

type ConvertContext<Q extends Query, N extends Node, E extends Edge> = {
  capture: ReturnType<typeof createCapture<Q>>;
  convert: ReturnType<typeof createConvert<Q, N, E>>;
};

type ConvertHandler<
  Q extends Query,
  T extends Query[string],
  N extends Node,
  E extends Edge,
> = (
  captures: SingleCaptureResult<T>[],
  parentId: string,
  context: ConvertContext<Q, N, E>,
) => ConvertResult<N, E>;

type ConvertConfig<Q extends Query, N extends Node, E extends Edge> = {
  [K in keyof Q]: ConvertHandler<Q, Q[K], N, E>;
};

export type { ConvertConfig, ConvertContext, ConvertHandler, ConvertResult };
