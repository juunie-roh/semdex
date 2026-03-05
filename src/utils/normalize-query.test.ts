import { describe, expect, it } from "vitest";

import { normalizeQuery } from "./normalize-query";

describe("normalize", () => {
  it("strips single-line comments", () => {
    expect(normalizeQuery("; this is a comment\n(identifier)")).toBe(
      "(identifier)",
    );
  });

  it("strips double-semicolon comments", () => {
    expect(normalizeQuery(";; this is a comment\n(identifier)")).toBe(
      "(identifier)",
    );
  });

  it("strips inline comments", () => {
    expect(normalizeQuery("(identifier) ; inline comment")).toBe(
      "(identifier)",
    );
  });

  it("collapses whitespace to single spaces", () => {
    expect(normalizeQuery("(call_expression\n  function: (identifier))")).toBe(
      "(call_expression function: (identifier))",
    );
  });

  it("handles empty input", () => {
    expect(normalizeQuery("")).toBe("");
  });

  it("handles only comments", () => {
    expect(normalizeQuery("; comment\n;; another")).toBe("");
  });
});
