// Velite slugs are already full paths ("writeups/llm01/foo"); the type segment
// is part of the slug. Prefixing a type again produced /writeups/writeups/... 404s.
export function contentHref(slug: string): string {
  return `/${slug}`;
}
