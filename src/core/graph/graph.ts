import { SEPARATOR } from "@/consts";
import type { Edge, Node } from "@/models";
import { defined } from "@/shared/defined";

import GraphError from "./error";

class Graph<N extends Node = Node, E extends Edge = Edge> {
  private _nodes: Map<Node["signature"], N>;
  private _edges: Map<
    Node["signature"],
    Map<Node["signature"], Set<E["kind"]>>
  >;
  private _edgeProps: Map<
    Node["signature"],
    Map<Node["signature"], Map<E["kind"], E["props"]>>
  >;

  constructor(nodes: N[], edges: E[]) {
    this._nodes = new Map();
    this._edges = new Map();
    this._edgeProps = new Map();

    for (const node of nodes) {
      this.addNode(node);
    }

    for (const edge of edges) {
      this.addEdge(edge);
    }
  }

  /**
   * Contains all the nodes added to the graph.
   */
  get nodes(): ReadonlyMap<Node["signature"], N> {
    return this._nodes;
  }
  /**
   * The adjacency list of the graph.
   */
  get edges(): ReadonlyMap<
    Node["signature"],
    ReadonlyMap<Node["signature"], ReadonlySet<E["kind"]>>
  > {
    return this._edges;
  }
  /**
   * Language specific metadata for each edges.
   */
  get edgeProps(): ReadonlyMap<
    Node["signature"],
    ReadonlyMap<Node["signature"], ReadonlyMap<E["kind"], E["props"]>>
  > {
    return this._edgeProps;
  }

  /**
   * Adds a node to the graph.
   */
  addNode(node: N): this {
    if (!this._nodes.has(node.signature)) {
      this._nodes.set(node.signature, node);
    }

    if (!this._edges.has(node.signature)) {
      this._edges.set(node.signature, new Map());
    }
    return this;
  }

  /**
   * Removes a node from the graph.
   */
  removeNode(node: N): this {
    this._edges.delete(node.signature);
    this._nodes.delete(node.signature);
    this._edgeProps.delete(node.signature); // outgoing props

    for (const adjacentNodes of this._edges.values()) {
      adjacentNodes.delete(node.signature);
    }

    for (const toMap of this._edgeProps.values()) {
      toMap.delete(node.signature); // incoming props
    }

    return this;
  }

  /**
   * Gets the adjacent node ids set for the given node id.
   */
  adjacent(
    id: Node["signature"],
  ): ReadonlyMap<Node["signature"], ReadonlySet<E["kind"]>> | undefined {
    return this._edges.get(id);
  }

  getEdgeProperties(
    from: Node["signature"],
    to: Node["signature"],
    kind: E["kind"],
  ): E["props"] {
    return this._edgeProps.get(from)?.get(to)?.get(kind);
  }

  /**
   * Adds an edge to the graph.
   */
  addEdge(edge: E): this {
    const { from, to, kind, props } = edge;

    if (!this._edges.has(from)) {
      throw new GraphError(
        "GRAPH_NO_NODE",
        `There is no node with id: ${from}`,
      );
    }

    const adjacentNodes = this._adjacent(from);
    defined(
      adjacentNodes,
      new GraphError(
        "GRAPH_UNDEFINED_INSTANCE",
        `No adjacency map found for node: ${from}`,
      ),
    );

    if (!adjacentNodes.has(to)) {
      adjacentNodes.set(to, new Set());
    }

    adjacentNodes.get(to)!.add(kind);

    if (props !== undefined) {
      this._setEdgeProperties(from, to, kind, props);
    }

    return this;
  }

  removeEdge(
    from: Node["signature"],
    to: Node["signature"],
    kind: E["kind"],
  ): this {
    this._edges.get(from)?.get(to)?.delete(kind);
    this._edgeProps.get(from)?.get(to)?.delete(kind);
    return this;
  }

  /**
   * Returns true if there is an edge from the `source` node to `target` node.
   */
  hasEdge(
    from: Node["signature"],
    to: Node["signature"],
    kind: E["kind"],
  ): boolean {
    return this._edges.get(from)?.get(to)?.has(kind) ?? false;
  }

  destroy() {
    this._nodes.clear();
    this._edges.clear();
    this._edgeProps.clear();
  }

  serialize(): { nodes: N[]; edges: E[] } {
    const nodes = Array.from(
      this._nodes.values().map((n) => ({
        ...n,
        range: {
          byte: `${n.range?.startIndex}:${n.range?.endIndex}`,
          line: `L${n.range?.startPosition.row}:L${n.range?.endPosition.row}`,
        },
      })),
    );
    const edges: E[] = [];

    for (const [from, toMap] of this._edges) {
      for (const [to, kinds] of toMap) {
        for (const kind of kinds) {
          const props = this._edgeProps.get(from)?.get(to)?.get(kind);
          edges.push({
            from,
            to,
            kind,
            ...(props !== undefined && { props }),
          } as E);
        }
      }
    }

    return { nodes, edges };
  }

  private _adjacent(
    id: Node["signature"],
  ): Map<Node["signature"], Set<E["kind"]>> | undefined {
    return this._edges.get(id);
  }

  /**
   * Sets the properties of the given edge.
   */
  private _setEdgeProperties(
    from: Node["signature"],
    to: Node["signature"],
    kind: E["kind"],
    props: E["props"],
  ): this {
    if (!this._edgeProps.has(from)) {
      this._edgeProps.set(from, new Map());
    }

    const fromMap = this._edgeProps.get(from);
    defined(
      fromMap,
      new GraphError(
        "GRAPH_UNDEFINED_INSTANCE",
        `No edge properties map found for node: ${from}`,
      ),
    );

    if (!fromMap.has(to)) {
      fromMap.set(to, new Map());
    }

    fromMap.get(to)!.set(kind, props);
    return this;
  }

  private _parent(id: Node["signature"]): Node["signature"] | undefined {
    const i = id.lastIndexOf(SEPARATOR);
    return i > 0 ? id.slice(0, i) : undefined;
  }

  private _resolve(name: string, from: Node["signature"]): Node["signature"] {
    // resolve id by name
    let scope: string | undefined = from; // start from caller

    while (scope !== undefined) {
      const adj = this.adjacent(scope);
      if (adj) {
        for (const [targetId] of adj) {
          if (targetId.endsWith(SEPARATOR + name)) {
            return targetId;
          }
        }
      }

      scope = this._parent(scope);
    }

    throw new GraphError(
      "GRAPH_NAME_RESOLUTION_FAILED",
      `Failed to resolve ${name} from ${from}`,
    );
  }
}

export default Graph;
