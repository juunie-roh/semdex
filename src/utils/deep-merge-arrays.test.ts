import { describe, expect, it } from "vitest";

import deepMergeArrays from "./deep-merge-arrays";

describe("deepMergeArrays", () => {
  it("returns second when first is falsy", () => {
    expect(deepMergeArrays(null as any, [1, 2])).toEqual([1, 2]);
  });

  it("returns first when second is falsy", () => {
    expect(deepMergeArrays([1, 2], null as any)).toEqual([1, 2]);
  });

  it("returns empty array when both are falsy", () => {
    expect(deepMergeArrays(null as any, null as any)).toEqual([]);
  });

  it("merges primitive arrays — second wins at matching indices", () => {
    expect(deepMergeArrays([1, 2, 3], [10, 20])).toEqual([10, 20, 3]);
  });

  it("appends extra elements from second when second is longer", () => {
    expect(deepMergeArrays([1], [10, 20, 30])).toEqual([10, 20, 30]);
  });

  it("keeps extra elements from first when first is longer", () => {
    expect(deepMergeArrays([1, 2, 3], [10])).toEqual([10, 2, 3]);
  });

  it("deeply merges objects at matching indices", () => {
    const first = [{ a: 1, b: 2 }];
    const second = [{ b: 99, c: 3 }];
    expect(deepMergeArrays(first, second)).toEqual([{ a: 1, b: 99, c: 3 }]);
  });

  it("second object wins for non-object values at the same key", () => {
    const first = [{ a: { x: 1 } }];
    const second = [{ a: 42 }];
    expect(deepMergeArrays(first, second)).toEqual([{ a: 42 }]);
  });

  it("recursively merges nested objects", () => {
    const first = [{ a: { x: 1, y: 2 } }];
    const second = [{ a: { y: 99, z: 3 } }];
    expect(deepMergeArrays(first, second)).toEqual([
      { a: { x: 1, y: 99, z: 3 } },
    ]);
  });

  it("does not mutate the original arrays", () => {
    const first = [{ a: 1 }];
    const second = [{ a: 2 }];
    deepMergeArrays(first, second);
    expect(first[0].a).toBe(1);
    expect(second[0].a).toBe(2);
  });

  it("treats arrays as non-objects — second array replaces first at index", () => {
    const first = [[1, 2]];
    const second = [[3, 4, 5]];
    expect(deepMergeArrays(first, second)).toEqual([[3, 4, 5]]);
  });
});
