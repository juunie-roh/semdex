import classHandler from "./handlers/class";
import functionHandler from "./handlers/function";
import importHandler from "./handlers/import";
import memberHandler from "./handlers/member";
import methodHandler from "./handlers/method";
import patternHandler from "./handlers/pattern";
import variableHandler from "./handlers/variable";
import type { ConvertConfig } from "./types";

export const convertConfig = {
  class: classHandler,
  function: functionHandler,
  import: importHandler,
  member: memberHandler,
  method: methodHandler,
  pattern: patternHandler,
  variable: variableHandler,
} as const satisfies ConvertConfig;
