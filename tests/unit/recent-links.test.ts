import { describe, it, expect } from "vitest";
import {
  getRecentContent,
  getAllWriteups,
  getAllExercises,
  getAllDemos,
  getAllTools,
} from "@/lib/content";
import { contentHref } from "@/lib/content-href";

// Regression: RecentContent prefixed the type onto slugs that already contain it,
// producing /writeups/writeups/... (404) for every "Recently Added" link.
const TYPE_SEGMENTS = ["writeups", "exercises", "demos", "tools"];

const realSlugs = new Set(
  [...getAllWriteups(), ...getAllExercises(), ...getAllDemos(), ...getAllTools()].map(
    (e) => e.slug
  )
);

describe("recent content links", () => {
  const recent = getRecentContent(6);

  it("has content to link", () => {
    expect(recent.length).toBeGreaterThan(0);
  });

  it.each(recent.map((r) => [r.slug]))("%s -> exactly one type segment", (slug) => {
    const segments = contentHref(slug).split("/").filter(Boolean);
    expect(TYPE_SEGMENTS).toContain(segments[0]);
    expect(segments.filter((s) => TYPE_SEGMENTS.includes(s))).toHaveLength(1);
  });

  it.each(recent.map((r) => [r.slug]))("%s -> matches a real content slug", (slug) => {
    expect(contentHref(slug)).toBe(`/${slug}`);
    expect(realSlugs.has(contentHref(slug).slice(1))).toBe(true);
  });
});
