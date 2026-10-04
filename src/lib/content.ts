import { writeups, exercises, demos, tools } from "#site/content";
import type { OwaspCategory } from "@/types/owasp";

// Re-export typed collections
export type { writeups as Writeups, exercises as Exercises, demos as Demos, tools as Tools };

// --- Writeups ---
export function getAllWriteups() {
  return writeups.filter((w) => !w.draft).sort(sortByDate);
}

export function getWriteupBySlug(slug: string) {
  return writeups.find((w) => w.slug === slug && !w.draft);
}

export function getWriteupsByCategory(category: OwaspCategory) {
  return writeups
    .filter((w) => !w.draft && w.owaspCategory === category)
    .sort(sortByDate);
}

// --- Exercises ---
export function getAllExercises() {
  return exercises.filter((e) => !e.draft).sort(sortByDate);
}

export function getExerciseBySlug(slug: string) {
  return exercises.find((e) => e.slug === slug && !e.draft);
}

export function getExercisesByCategory(category: OwaspCategory) {
  return exercises
    .filter((e) => !e.draft && e.owaspCategory === category)
    .sort(sortByDate);
}

// --- Demos ---
export function getAllDemos() {
  return demos.filter((d) => !d.draft).sort(sortByDate);
}

export function getDemoBySlug(slug: string) {
  return demos.find((d) => d.slug === slug && !d.draft);
}

export function getDemosByCategory(category: OwaspCategory) {
  return demos
    .filter((d) => !d.draft && d.owaspCategory === category)
    .sort(sortByDate);
}

// --- Tools ---
export function getAllTools() {
  return tools.filter((t) => !t.draft).sort(sortByDate);
}

export function getToolBySlug(slug: string) {
  return tools.find((t) => t.slug === slug && !t.draft);
}

export function getToolsByCategory(category: OwaspCategory) {
  return tools
    .filter((t) => !t.draft && t.owaspCategories.includes(category))
    .sort(sortByDate);
}

// --- Stats ---
export function getContentStats() {
  return {
    writeups: getAllWriteups().length,
    exercises: getAllExercises().length,
    demos: getAllDemos().length,
    tools: getAllTools().length,
    total:
      getAllWriteups().length +
      getAllExercises().length +
      getAllDemos().length +
      getAllTools().length,
  };
}

// --- Helpers ---
function sortByDate<T extends { publishedAt: string }>(a: T, b: T): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export function getRecentContent(limit = 6) {
  const all = [
    ...getAllWriteups().map((w) => ({ ...w, type: "writeup" as const })),
    ...getAllExercises().map((e) => ({ ...e, type: "exercise" as const })),
    ...getAllDemos().map((d) => ({ ...d, type: "demo" as const })),
    ...getAllTools().map((t) => ({ ...t, type: "tool" as const })),
  ].sort(sortByDate);
  return all.slice(0, limit);
}
