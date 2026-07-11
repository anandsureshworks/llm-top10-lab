import { describe, it, expect } from "vitest";
import { slugify, formatDate } from "@/lib/utils";

describe("slugify", () => {
  it("lowercases and hyphenates spaces", () => {
    expect(slugify("Prompt Injection")).toBe("prompt-injection");
  });
  it("strips non-word punctuation", () => {
    expect(slugify("LLM01: Prompt Injection!")).toBe("llm01-prompt-injection");
  });
  it("collapses runs of spaces and underscores to one hyphen", () => {
    expect(slugify("a  b__c")).toBe("a-b-c");
  });
  it("trims leading and trailing hyphens", () => {
    expect(slugify("  -Hello-  ")).toBe("hello");
  });
});

describe("formatDate", () => {
  it("renders a stable, human date containing the year (timezone-agnostic)", () => {
    const out = formatDate("2026-01-15");
    expect(out).toMatch(/2026/);
    expect(out.length).toBeGreaterThan(0);
  });
});
