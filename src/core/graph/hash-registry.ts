import { createHash } from "crypto";

import type { NodeId, NodePath, NodePathString } from "@/models";

export class HashRegistry {
  private static readonly ID_BYTES = 10;
  private static readonly DELIMITER = "\0";
  private readonly fwd = new Map<NodePathString, NodeId>();
  private readonly inv = new Map<NodeId, NodePathString>();

  encode(nodePath: NodePath): NodeId {
    const path = this._pathToString(nodePath);
    const existing = this.fwd.get(path);
    if (existing) return existing;

    const id = this._hash(path);
    if (this.inv.has(id)) {
      throw new Error(`Hash collision on "${path}" vs "${this.inv.get(id)}"`);
    }

    this.fwd.set(path, id);
    this.inv.set(id, path);
    return id;
  }

  decode(id: NodeId): NodePath {
    const path = this.inv.get(id);
    if (!path) throw new Error(`Unknown NodeId: "${id}"`);
    return this._stringToPath(path);
  }

  has(path: NodePath): boolean;
  has(id: NodeId): boolean;
  has(target: NodePath | NodeId): boolean {
    if (Array.isArray(target)) {
      const key = this._pathToString(target);
      return this.fwd.has(key);
    }

    return this.inv.has(target);
  }

  private _hash(path: NodePathString): NodeId {
    return createHash("sha256")
      .update(path)
      .digest()
      .subarray(0, HashRegistry.ID_BYTES)
      .toString("base64url") as NodeId;
  }

  private _pathToString(
    path: NodePath,
    delimiter = HashRegistry.DELIMITER,
  ): NodePathString {
    return path.join(delimiter) as NodePathString;
  }

  private _stringToPath(
    string: NodePathString,
    delimiter: string = HashRegistry.DELIMITER,
  ): NodePath {
    return string.split(delimiter) as NodePath;
  }
}
