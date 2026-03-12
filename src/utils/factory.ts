import type TSParser from "tree-sitter";

import { SEPARATOR } from "@/consts";
import type { Query } from "@/models";
import type {
  CaptureConfig,
  FullCaptureResult,
  SingleCaptureResult,
} from "@/models/capture";
import type { QueryMap } from "@/query";

function createCanonicalId(
  parentID: string,
  name: string,
): `${string}${typeof SEPARATOR}${string}` {
  return `${parentID}${SEPARATOR}${name}`;
}

/**
 * Creates a capture function bound to the given query map and configuration.
 *
 * The returned function has two overloads:
 * - `capture(node)` — runs all registered queries against `node` and returns a {@link FullCaptureResult}.
 * - `capture(node, tag)` — runs a single query by `tag` and returns `RawCapture[]` for that tag.
 *
 * The single-tag overload is intended for recursive capture inside convert functions,
 * where only a specific construct is expected within a body node.
 * @template Q A type defined in form of {@link Query}.
 * @param query The query map containing compiled tree-sitter queries keyed by tag.
 * @param config Per-tag configuration declaring additional parent node types to include.
 * @returns A bound capture function.
 * @example
 * // plugin/src/index.ts
 * export const capture = createCapture<Query>(query, queryConfig);
 */
function createCapture<Q extends Query>(
  query: QueryMap<keyof Q & string>,
  config: CaptureConfig<Q>,
) {
  /**
   * Converts a single query match into a raw capture object.
   */
  function toCapture<K extends keyof Q>(
    match: TSParser.QueryMatch,
  ): SingleCaptureResult<Q[K]> {
    return Object.fromEntries(
      match.captures.map((c) => [c.name, c.node]),
    ) as SingleCaptureResult<Q[K]>;
  }

  /**
   * Captures all registered query tags against a node.
   */
  function capture(node: TSParser.SyntaxNode): FullCaptureResult<Q>;
  /**
   * Captures all matches for a single query tag.
   */
  function capture<K extends keyof Q>(
    node: TSParser.SyntaxNode,
    tag: K,
  ): SingleCaptureResult<Q[K]>[];
  function capture<K extends keyof Q>(
    node: TSParser.SyntaxNode,
    tag?: K,
  ): FullCaptureResult<Q> | SingleCaptureResult<Q[K]>[] {
    if (!tag) {
      const result = {} as FullCaptureResult<Q>;
      for (const key of query.keys()) {
        result[key] = capture(node, key);
      }
      return result;
    }

    return query
      .match(tag as keyof Q & string, node, config[tag]?.include)
      .map(toCapture);
  }

  return capture;
}

export { createCanonicalId, createCapture };
