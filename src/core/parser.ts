import TSParser, { Query } from "tree-sitter";

import { Config } from "@/config";

import CoreError from "./error";

const g = globalThis as unknown as { __parser?: TSParser };

/**
 * A singleton parser instance
 */
export const parser = g.__parser ?? new TSParser();

/**
 * Find nodes matching query
 * @param node a target node to look up
 * @param queryString S-expression query
 * @returns matching nodes for query
 */
export function query(node: TSParser.SyntaxNode, queryString: string) {
  const language = parser.getLanguage();
  // TODO: Query interface definition - plugin design
  const query = new Query(language, queryString);
  return query.matches(node);
}

export class Parser {
  /** A singleton parser instance */
  private static _instance: Parser | undefined;
  /** A tree-sitter parser instances */
  private _plugin: any;

  private constructor(config: Config) {
    this._plugin = config.plugin;
  }

  static get(config?: Config): Parser {
    if (!this._instance) {
      if (!config)
        throw new CoreError(
          "Configuration must be specified for initialization",
        );

      this._instance = new Parser(config);
    }

    return this._instance;
  }

  parse() {}

  get plugin() {
    return this._plugin;
  }
}
