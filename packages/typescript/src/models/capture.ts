import type TSParser from "tree-sitter";

namespace Capture {
  export interface Base {
    id: string;
    node: TSParser.SyntaxNode;
    body?: TSParser.SyntaxNode;
    /**
     * An identifier.
     */
    name?: string;

    [k: string]: any;
  }

  export interface Function extends Base {
    generics: string[];
    params: any;
    returnType?: string;
  }

  export interface Call extends Base {}

  export interface Class extends Base {}

  export interface Import extends Base {}

  export interface Export extends Base {}
}

export type { Capture };
