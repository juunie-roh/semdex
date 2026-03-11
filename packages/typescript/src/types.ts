import type * as Spine from "@juun-roh/spine";

type QueryTag = {
  abstract_class: {
    required: "node" | "name" | "body";
    optional:
      | "heritage"
      | "extends"
      | "extends_body"
      | "implements"
      | "type_args"
      | "type_params";
  };
  abstract_method: {
    required: "node" | "name" | "params" | "return_type";
    optional: "modifier" | "type_params";
  };
  class: {
    required: "node" | "name" | "body";
    optional:
      | "heritage"
      | "extends"
      | "type_args"
      | "extends_body"
      | "implements"
      | "type_params";
  };
  function: {
    required: "node" | "name" | "params" | "body";
    optional: "is_async" | "type_params" | "return_type";
  };
  import: {
    required: "node" | "source";
    optional: "alias" | "name" | "is_type";
  };
  member: {
    required: "node" | "name";
    optional: "modifier" | "is_static" | "type";
  };
  method: {
    required: "node" | "name" | "body" | "params";
    optional:
      | "modifier"
      | "is_static"
      | "is_async"
      | "type_params"
      | "return_type";
  };
  params: {
    required: string;
    optional: string;
  };
  variable: {
    required: "node" | "name" | "kind";
    optional: "key" | "type";
  };
};

// TODO: specify other declaration kinds
type NodeKind = keyof QueryTag | "file" | "module" | "type";

/**
 * Override {@link Spine.Node | `Node`}'s `kind` with language specific {@link NodeKind | kinds of node}.
 */
type Node = Spine.Node<NodeKind>;

// TODO: specify other relationship kinds
type EdgeKind =
  | "imports"
  | "implements"
  | "extends"
  | "defines"
  | "constraints";

/**
 * Override {@link Spine.Edge | `Edge`}'s `kind` with language specific {@link EdgeKind | kinds of edge}.
 */
type Edge = Spine.Edge<EdgeKind>;

type Graph = Spine.Graph<Node, Edge>;

type Capture<K extends keyof QueryTag> = Spine.Capture<QueryTag[K]>;
type CaptureResult = Spine.CaptureResult<QueryTag>;

export type {
  Capture,
  CaptureResult,
  Edge,
  EdgeKind,
  Graph,
  Node,
  NodeKind,
  QueryTag,
};
