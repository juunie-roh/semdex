import classQuery from "./queries/class.scm";
import functionQuery from "./queries/function.scm";
import importQuery from "./queries/import.scm";

const queries: Record<string, string> = {
  class: classQuery,
  function: functionQuery,
  import: importQuery,
};

const queryString = [classQuery, functionQuery, importQuery].join(" ");

export { queries, queryString };
