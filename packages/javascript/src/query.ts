import { QueryMap } from "symbex/query";
import type TSParser from "tree-sitter";
import JavaScript from "tree-sitter-javascript";

import exportBypassString from "@/queries/bypass/export.scm";
import classQueryString from "@/queries/class.scm";
import functionQueryString from "@/queries/function.scm";
import importQueryString from "@/queries/import.scm";
import memberQueryString from "@/queries/member.scm";
import methodQueryString from "@/queries/method.scm";
import patternQueryString from "@/queries/pattern.scm";
import variableQueryString from "@/queries/variable.scm";

import { BypassQueryKey, QueryConfig } from "./types";

export const language = JavaScript as TSParser.Language;

export const query = new QueryMap<keyof QueryConfig>(language)
  .set("class", classQueryString)
  .set("function", functionQueryString)
  .set("import", importQueryString)
  .set("member", memberQueryString)
  .set("method", methodQueryString)
  .set("pattern", patternQueryString)
  .set("variable", variableQueryString);

export const bypass = new QueryMap<BypassQueryKey>(language).set(
  "export",
  exportBypassString,
);
