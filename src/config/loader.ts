import path, { join } from "node:path";
import { cwd } from "node:process";

import ConfigError from "./error";
import { Config } from "./types";

/**
 * Asserts that the given configuration file path is valid.
 * @param configPath The configuration file path to check.
 * @throws If `configPath` is not a non-empty string.
 */
function assertConfigPath(configPath: string): void {
  if (!configPath || typeof configPath !== "string") {
    throw new ConfigError("'configPath' must be a non-empty string");
  }
}

function resolveConfigPath(configPath: string): string {
  assertConfigPath(configPath);
  return path.resolve(join(cwd(), configPath));
}

function loadConfig(configPath: string): Config {
  const resolved = resolveConfigPath(configPath);
  const config = require(resolved);
  return config.default;
}

export { loadConfig };
