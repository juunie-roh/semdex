import type TSParser from "tree-sitter";

namespace Capture {
  export interface Base {
    node: TSParser.SyntaxNode;
    body: TSParser.SyntaxNode;
    /**
     * An identifier.
     */
    name?: string;
  }

  export interface Function extends Base {}

  export interface Call extends Base {}

  export interface Class extends Base {}

  export interface Import extends Base {}

  export interface Export extends Base {}
}

export type { Capture };
