import type TSParser from "tree-sitter";
import { vi } from "vitest";

import type LanguagePlugin from "@/core/language-plugin";

const mockPlugin = vi.mockObject({
  language: vi.mockObject({} as TSParser.Language),
} satisfies LanguagePlugin.Module);

const mockPlugin_no_language = vi.mockObject({});
