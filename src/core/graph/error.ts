import { SpineError, SpineErrorCode } from "@/shared/error";

type GraphErrorCode = Extract<SpineErrorCode, `GRAPH_${string}`>;

class GraphError extends SpineError {
  constructor(code: GraphErrorCode, message: string, options?: ErrorOptions) {
    super(code, message, options);
  }
}

export default GraphError;
