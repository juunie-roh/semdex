import { QueryMap } from "@juun-roh/spine/query";
import type TSParser from "tree-sitter";
import TypeScript from "tree-sitter-typescript";

import type { QueryTag } from "@/models";
import classQueryString from "@/queries/class.scm";
import classBodyQueryString from "@/queries/class_body.scm";
import functionQueryString from "@/queries/function.scm";
import importQueryString from "@/queries/import.scm";
import paramsQueryString from "@/queries/params.scm";

const language = TypeScript.typescript as TSParser.Language;

const query = new QueryMap<QueryTag>(language)
  .set("function", functionQueryString)
  .set("import", importQueryString)
  .set("class", classQueryString)
  .set("class_body", classBodyQueryString)
  .set("params", paramsQueryString);

export { language, query };
