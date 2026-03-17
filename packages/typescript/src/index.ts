import { captureConfig } from "./capture";
import { convertConfig } from "./convert";
import { language, query, queryConfig } from "./query";
import { edgeKind, nodeKind, type PluginDescriptor } from "./types";

export const descriptor = {
  language,
  nodeKind,
  edgeKind,
  query,
  queryConfig,
  captureConfig,
  convertConfig,
} satisfies PluginDescriptor;

export default descriptor;
