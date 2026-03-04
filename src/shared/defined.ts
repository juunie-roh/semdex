function defined(value: boolean, message?: string): asserts value;
function defined<T>(
  value: T | null | undefined,
  message?: string,
): asserts value is T;
function defined(value: any, message?: string) {
  if (value === false || value === null || typeof value === "undefined") {
    console.warn("Not defined:", message);
    throw new Error(message);
  }
}

export { defined };
