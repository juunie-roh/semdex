import type * as symbex from "symbex";

export type QueryConfig = {
  class: {
    required: "node" | "name" | "body";
    optional: "extends" | "decorator";
  };
  function: {
    required: "node" | "name" | "params" | "body";
    optional: "is_async";
  };
  import: {
    required: "node" | "source";
    optional: "alias" | "name";
  };
  member: {
    required: "node" | "name";
    optional: "is_static" | "decorator";
  };
  method: {
    required: "node" | "name" | "body" | "params";
    optional: "is_static" | "is_async" | "decorator";
  };
  pattern: {
    required: "node";
    optional: "pattern" | "name" | "default" | "key";
  };
  variable: {
    required: "node" | "pattern" | "kind";
    optional: "name";
  };
};

export type BypassQueryKey = "export";

export type NodeKind = keyof QueryConfig;

export type Node = symbex.Node<NodeKind>;

export type EdgeKind = "defines" | "extends" | "imports";

export type Edge = symbex.Edge<EdgeKind>;

export type Graph = symbex.Graph<Node, Edge>;

export type CaptureConfig = symbex.CaptureConfig<QueryConfig>;

export type SingleCaptureResult<K extends keyof QueryConfig> =
  symbex.SingleCaptureResult<QueryConfig[K]>;

export type FullCaptureResult = symbex.FullCaptureResult<QueryConfig>;

export type ConvertConfig = symbex.ConvertConfig<QueryConfig, Node, Edge>;

export type ConvertContext = symbex.ConvertContext<QueryConfig, Node, Edge>;

export type ConvertResult = symbex.ConvertResult<Node, Edge>;

export type ConvertHandler<K extends keyof QueryConfig> = symbex.ConvertHandler<
  QueryConfig,
  QueryConfig[K],
  Node,
  Edge
>;

export type PluginDescriptor = symbex.PluginDescriptor<QueryConfig, Node, Edge>;
