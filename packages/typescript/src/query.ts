import type { QueryConfig } from "symbex";
import { QueryMap } from "symbex/query";
import type TSParser from "tree-sitter";
import TypeScript from "tree-sitter-typescript";

import abstractClassQueryString from "@/queries/abstract_class.scm";
import abstractMethodQueryString from "@/queries/abstract_method.scm";
import exportClassBypassString from "@/queries/bypass/export_class.scm";
import exportFunctionBypassString from "@/queries/bypass/export_function.scm";
import classQueryString from "@/queries/class.scm";
import functionQueryString from "@/queries/function.scm";
import importQueryString from "@/queries/import.scm";
import memberQueryString from "@/queries/member.scm";
import methodQueryString from "@/queries/method.scm";
import patternQueryString from "@/queries/pattern.scm";
import variableQueryString from "@/queries/variable.scm";

export const language = TypeScript.typescript as TSParser.Language;

export const queryConfig = {
  abstract_class: {
    required: ["node", "name", "body"],
    optional: [
      "heritage",
      "extends",
      "extends_body",
      "implements",
      "type_args",
      "type_params",
    ],
  },
  abstract_method: {
    required: ["node", "name", "params", "return_type"],
    optional: ["modifier", "type_params"],
  },
  class: {
    required: ["node", "name", "body"],
    optional: [
      "heritage",
      "extends",
      "type_args",
      "extends_body",
      "implements",
      "type_params",
    ],
  },
  function: {
    required: ["node", "name", "params", "body"],
    optional: ["is_async", "type_params", "return_type"],
  },
  import: {
    required: ["node", "source"],
    optional: ["alias", "name", "is_type"],
  },
  member: {
    required: ["node", "name"],
    optional: ["modifier", "is_static", "type"],
  },
  method: {
    required: ["node", "name", "body", "params"],
    optional: [
      "modifier",
      "is_static",
      "is_async",
      "type_params",
      "return_type",
    ],
  },
  pattern: {
    required: ["node"],
    optional: ["pattern", "name", "default", "key"],
  },
  // type: {
  //   required: string,
  //   optional: string,
  // },
  variable: {
    required: ["node", "pattern", "kind"],
    optional: ["name", "type"],
  },
} as const satisfies QueryConfig;

export const query = new QueryMap<keyof typeof queryConfig>(language)
  .set("abstract_class", abstractClassQueryString)
  .set("abstract_method", abstractMethodQueryString)
  .set("class", classQueryString)
  .set("function", functionQueryString)
  .set("import", importQueryString)
  .set("member", memberQueryString)
  .set("method", methodQueryString)
  .set("pattern", patternQueryString)
  .set("variable", variableQueryString);

type BypassQueryKey = "export_class" | "export_function";

export const bypass = new QueryMap<BypassQueryKey>(language)
  .set("export_class", exportClassBypassString)
  .set("export_function", exportFunctionBypassString);
