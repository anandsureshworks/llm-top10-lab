import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";
import {
  getAllWriteups,
  getAllExercises,
  getAllDemos,
  getAllTools,
} from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/categories", "/contribute", "/security"];
  const entries = [
    ...getAllWriteups(),
    ...getAllExercises(),
    ...getAllDemos(),
    ...getAllTools(),
  ];

  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}` })),
    ...CATEGORIES.map((c) => ({ url: `${site.url}/categories/${c.id}` })),
    ...entries.map((e) => ({
      url: `${site.url}/${e.slug}`,
      lastModified: e.publishedAt,
    })),
  ];
}
