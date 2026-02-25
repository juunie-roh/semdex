import { Language } from "tree-sitter";

interface Config {
  plugin: {
    ext: string;
    name: string;
  }[];
}

interface PluginConfig {
  language: Language;
  convert: any;
  queryString: string;
}

export type { Config, PluginConfig };
