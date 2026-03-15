import type TSParser from "tree-sitter";

/**
 * @template T A type to make a brand on.
 * @template K A name of brand.
 * @example
 * type NodeId = Branded<string, "NodeId"> // NodeId = string & { readonly __brand: "NodeId" }
 */
export type Branded<T, K extends string> = T & { readonly __brand: K };
export type NodeSignature = Branded<string, "NODE_SIGNATURE">;

/**
 * @template K - String union of valid `kind` values for this node. Defaults to
 * `string` for untyped use; narrow it to a literal union to get type-safe `kind` access.
 * @example
 * import type * as symbex from "symbex";
 * type Node = symbex.Node<"node kind" | "string literals">;
 */
export interface Node<K extends string = string> {
  /**
   * Unique human-readable signature identifying the node.
   */
  signature: NodeSignature;
  /**
   * Encoded signature.
   */
  // id?: any;
  /**
   * Kind of this node.
   */
  kind: K;
  type: "scope" | "anonymous" | "binding";
  /**
   * A range of positions in a multi-line text document, specified both in terms of byte offsets and row/column positions.
   * @see {@link TSParser.Range | tree-sitter `Range`}
   */
  range?: TSParser.Range;
  /**
   * Language-specific property supplements.
   */
  props?: Record<string, unknown>;
}

/**
 * @template K - String union of valid `kind` values for this edge. Defaults to
 * `string` for untyped use; narrow it to a literal union to get type-safe `kind` access.
 * @example
 * import type * as symbex from "symbex";
 * type Edge = symbex.Edge<"edge kind" | "string literals">;
 */
export interface Edge<K extends string = string> {
  /**
   * ID of the source node where the relationship originates.
   */
  from: NodeSignature;
  /**
   * A name or ID of the target node where the relationship terminates.
   */
  to: NodeSignature;
  /**
   * Kind of relationship this edge represents.
   */
  kind: K;
  /**
   * Language-specific property supplements.
   */
  props?: Record<string, unknown>;
}

export type QueryTag = {
  required: string;
  optional: string;
};

export type QueryConfig = Record<string, QueryTag>;
