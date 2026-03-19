import bypassExport from "./handlers/bypass/export";
import type { CaptureConfig } from "./types";

export const captureConfig = {
  abstract_class: {
    bypass: bypassExport("abstract_class"),
  },
  class: {
    bypass: bypassExport("class"),
  },
  function: {
    bypass: bypassExport("function"),
  },
  type: {
    bypass: bypassExport("type"),
  },
  variable: {
    bypass: bypassExport("variable"),
  },
} as const satisfies CaptureConfig;
