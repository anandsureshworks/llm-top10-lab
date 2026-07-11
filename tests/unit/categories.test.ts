import { describe, it, expect } from "vitest";
import {
  CATEGORIES,
  CATEGORY_MAP,
  getCategoryMeta,
  getCategoryByCode,
} from "@/lib/categories";
import { OWASP_CATEGORIES } from "@/types/owasp";

describe("OWASP category data integrity", () => {
  it("defines exactly the 10 canonical categories, in order", () => {
    expect(CATEGORIES.map((c) => c.id)).toEqual([...OWASP_CATEGORIES]);
  });

  it("has unique, correctly-cased codes (LLM01..LLM10)", () => {
    const codes = CATEGORIES.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
    expect(codes).toEqual(OWASP_CATEGORIES.map((id) => id.toUpperCase()));
  });

  it("gives every category the display fields the UI depends on", () => {
    for (const c of CATEGORIES) {
      expect(c.name).toBeTruthy();
      expect(c.shortName).toBeTruthy();
      expect(c.description).toBeTruthy();
      expect(c.icon).toBeTruthy();
    }
  });

  it("CATEGORY_MAP / getCategoryMeta resolve every id", () => {
    for (const id of OWASP_CATEGORIES) {
      expect(CATEGORY_MAP[id]?.id).toBe(id);
      expect(getCategoryMeta(id).code).toBe(id.toUpperCase());
    }
  });
});

describe("getCategoryByCode", () => {
  it("looks up case-insensitively", () => {
    expect(getCategoryByCode("llm01")?.id).toBe("llm01");
    expect(getCategoryByCode("LLM01")?.id).toBe("llm01");
    expect(getCategoryByCode("Llm10")?.id).toBe("llm10");
  });

  it("returns undefined for an unknown code", () => {
    expect(getCategoryByCode("llm99")).toBeUndefined();
    expect(getCategoryByCode("")).toBeUndefined();
  });
});
