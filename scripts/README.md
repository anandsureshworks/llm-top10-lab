# scripts

## content-dates.mjs

Derives per-document dates and authorship from git history and writes them into
each `content/**/*.mdx` frontmatter:

- `publishedAt` — the date of the file's **first** commit (`git log --follow`, so
  a file renamed from `labs/` still resolves to its original add).
- `updatedAt` — the date of the file's **last** commit (omitted when it equals
  `publishedAt`).
- `author` — `Anand Suresh` (single-author site).

Stdlib only; no dependencies. Run from the repo root:

```sh
node scripts/content-dates.mjs
```

Re-run it after adding or renaming content, then commit the frontmatter changes.
The invariants it must keep are enforced by `tests/unit/content-dates.test.ts`.

## gen_mark.py

Generates the woven "AS" monogram used as the nav mark and favicon
(`src/app/icon.svg`, `public/brand/as-logo.svg`).
