import { describe, it, expect } from "vitest";
import { writeups, exercises, demos, tools } from "#site/content";

// Dates and authorship are derived from git by scripts/content-dates.mjs.
// These invariants guard against a regression to placeholder dates / "Community".
const ALL = [...writeups, ...exercises, ...demos, ...tools];
const EARLIEST = "2026-03-01"; // repo's initial commit; nothing predates it.

describe("content dates and authorship", () => {
  it("has content to check", () => {
    expect(ALL.length).toBeGreaterThan(0);
  });

  it("no entry is published earlier than the first commit", () => {
    for (const item of ALL) {
      expect(item.publishedAt >= EARLIEST).toBe(true);
    }
  });

  it("every entry has a real author (never the old 'Community' default)", () => {
    for (const item of ALL) {
      expect(item.author).toBeTruthy();
      expect(item.author).not.toBe("Community");
    }
  });
});
