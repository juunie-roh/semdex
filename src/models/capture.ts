import type TSParser from "tree-sitter";

import type { Query, QueryTag } from "./global";

type CaptureConfig<Q extends Query> = {
  [K in keyof Q]?: { include?: string | string[] };
};

type SingleCaptureResult<T extends QueryTag> = {
  [K in T["required"]]: TSParser.SyntaxNode;
} & {
  [K in T["optional"]]?: TSParser.SyntaxNode;
};

type FullCaptureResult<Q extends Query> = {
  [K in keyof Q]: SingleCaptureResult<Q[K]>[];
};

export type { CaptureConfig, FullCaptureResult, SingleCaptureResult };
