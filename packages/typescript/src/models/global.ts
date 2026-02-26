import type * as Spine from "@juun-roh/spine";

type EdgeKind =
  | "call"
  | "implements"
  | "extends"
  | "alias"
  | "type-parameters"
  | "assert";

/**
 * Override {@link Spine.Edge | `Edge`}'s `type` with language specific {@link EdgeKind | kinds of edge}.
 */
interface Edge extends Spine.Edge {
  kind: EdgeKind;
}

export type { Edge };
