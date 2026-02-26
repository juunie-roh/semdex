import type * as Spine from "@juun-roh/spine";

type NodeKind = "file" | "function" | "class";

/**
 * Override {@link Spine.Node | `Node`}'s `kind` with language specific {@link NodeKind | kinds of node}.
 */
interface Node extends Spine.Node {
  kind: NodeKind;
}

type EdgeKind =
  | "call"
  | "implements"
  | "extends"
  | "alias"
  | "type-parameters"
  | "assert";

/**
 * Override {@link Spine.Edge | `Edge`}'s `kind` with language specific {@link EdgeKind | kinds of edge}.
 */
interface Edge extends Spine.Edge {
  kind: EdgeKind;
}

export type { Edge, Node };
