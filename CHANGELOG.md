# Changelog

All notable changes to this project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed
- **Rebrand to `llm top 10 lab`** — positioned as an *independent* reference to
  the OWASP Top 10 for LLM Applications (not affiliated with or endorsed by
  OWASP); sole author is Anand Suresh. All identity strings now flow from a
  single source (`src/lib/site.ts`): nav, footer, hero, metadata + JSON-LD
  (WebSite + Person), the Atom feed, and all docs. LLM01-LLM10 codes and
  category names are retained nominatively. Non-affiliation line added to the
  footer and hero.
- **`labs` -> `exercises`** — content directory, Velite collection, route
  (`/exercises`, with `/labs/*` -> `/exercises/*` redirects), getters/types,
  `ExerciseCard`, nav label, and the issue template all renamed. MDX slugs kept
  so redirects map 1:1.
- **Honest exercises** — removed the "Environment Details" section and
  descriptions of a hosted sandbox that does not exist; each exercise now states
  "bring your own model — an OpenAI API key or a local Ollama model works."
  Points/flag framing kept only for the four exercises with a verifiable flag
  value (LLM01, LLM05, LLM06, LLM07); dropped elsewhere.
- **Dates & authorship from git** — `scripts/content-dates.mjs` derives
  `publishedAt`/`updatedAt` from git history and sets `author: Anand Suresh`
  across all 40 MDX files; Velite default author updated. "Recently Added" now
  follows real dates.
- **Draft badge** — `reviewStatus` is now optional in the schema and the badge
  renders only when a document explicitly declares it, so the former default no
  longer shows "Draft — unreviewed" on every entry.

### Added
- `src/lib/site.ts` single source of site identity.
- `scripts/content-dates.mjs` + `scripts/README.md`;
  `tests/unit/content-dates.test.ts` (no date earlier than 2026-03-01; no
  "Community" author).
- Attribution + licence line (OWASP Top 10 for LLM Applications 2025, CC BY-SA
  4.0) under the verbatim OWASP LLM01 definition in the prompt-injection
  write-up.
- **`/security` page and sitemap** (Pass 1).
- **CI `npm audit` step** gating pushes/PRs (Pass 1); GATE-STATUS now points at
  CI as the source of truth for audit status.

### Fixed
- Dead links and light-mode contrast on content/route pages, including
  light-mode variants for difficulty/severity/review badges (Pass 1 + Pass 2).

### Removed
- Engagement instrumentation: the `/api/collect` collector, `SignalsBeacon`,
  `FeedbackWidget`, and `src/lib/signals.ts` (Pass 1).
- Dependencies trimmed toward zero known CVEs (Pass 1).

## [0.1.0] - 2026-07-11

### Added
- **Unit test suite (vitest)** — `tests/unit` covers the pure logic in `src/lib`
  (slugify, and OWASP category data integrity + case-insensitive lookups); runs in
  CI on every push/PR as a dedicated `Unit Tests` job.
- **Dependabot** — weekly dependency-update PRs for npm and GitHub Actions
  (`.github/dependabot.yml`); non-major updates grouped to cut review noise.
- **Brand mark — woven AS monogram** — replaces the generic terminal-prompt
  (`>_`) nav icon and the default favicon. A dependency-free SVG where the "AS"
  is woven into a dense twill: green (security) threads carried *under* the white
  (application) ground, surfacing only to form the letters. Generated from a
  single committed source (`scripts/gen_mark.py`) so it can be reproduced or
  retrademarked; nav + `app/icon.svg` favicon, ~3–7 KB gzipped.
- **Content authority layer** — per-document `owaspVersion` (pinned to the OWASP
  LLM Top 10 **2025** edition), typed `references[]`, `cvssVector`, and
  `reviewStatus` / `reviewedBy`, all surfaced on write-up pages. The LLM01
  prompt-injection write-up taken to authoritative grade: verbatim OWASP
  definition + primary-source citations + a computed CVSS vector.
- **Engagement instrumentation** — feedback-first, cookieless in-browser signal
  capture; a first-party `/api/collect` collector; and a local aggregation engine
  that produces a cohort-fluency report.
- **Licensing** — `LICENSE`, `LICENSE-CODE`, and `USAGE.md`: dual, non-commercial
  (CC BY-NC-SA 4.0 for content; PolyForm Noncommercial 1.0.0 for code).
- `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1) and this `CHANGELOG.md`.

### Changed
- CI workflows repointed from `main` to `master` so they actually run on pushes
  and PRs (they had never executed).

### Fixed
- Installed `@tailwindcss/typography` so `prose` styles render — content pages
  had been unstyled walls of text.
- Removed `next-themes` (the theme was force-dark anyway) to clear a React
  "script tag while rendering" console error.

### Security
- Cleared all known dependency CVEs — `npm audit` is clean.
- Closed an SSRF in the engagement collector (CodeQL `js/request-forgery`): the
  object path is now built only from server-controlled values.

---

*This changelog was adopted partway through the project; entries above cover the
notable changes since. Future changes should be added here under `[Unreleased]`
and grouped into a tagged release on each semver bump.*
