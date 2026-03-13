import { createCapture } from "symbex/utils";

import { query } from "./query";
import { QueryConfig } from "./types";

const capture = createCapture<QueryConfig>(query, {
  class: { typesToInclude: "export_statement" },
  function: { typesToInclude: "export_statement" },
  variable: { typesToInclude: "export_statement" },
});

export { capture };
