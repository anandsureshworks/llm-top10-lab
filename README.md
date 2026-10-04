# llm top 10 lab

An independent reference to the **OWASP Top 10 for LLM Applications**. Not
affiliated with or endorsed by OWASP.

Write-ups, hands-on exercises, interactive demos, and a curated tools directory
for each of the ten risks in the OWASP Top 10 for LLM Applications (2025
edition). Built and maintained by **Anand Suresh** —
<https://www.anandsureshworks.com>. Live at <https://anandsureshworks.dev>.

The LLM01–LLM10 codes and category names are used nominatively to map this
material to the OWASP list; this site is not an OWASP project.

## How the content is organised

Content lives in `content/` as MDX, four types across the ten categories:

| Type | Path | What it is |
|------|------|-----------|
| Write-ups | `content/writeups/llmXX/` | Research articles and vulnerability analyses |
| Exercises | `content/exercises/llmXX/` | Hands-on challenges — bring your own model |
| Demos | `content/demos/llmXX/` | Interactive, in-browser demonstrations |
| Tools | `content/tools/llmXX/` | Curated open-source LLM-security tooling |

Exercises are model-agnostic: **bring your own model — an OpenAI API key or a
local Ollama model works.** There is no hosted sandbox.

Dates and authorship are derived from git history by
`scripts/content-dates.mjs` (see `scripts/README.md`), not hand-maintained.

## Run it locally

Requires Node 20+.

```sh
git clone https://github.com/anandsureshworks/llm-top10-lab.git
cd llm-top10-lab
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build` (Velite + Next build), `npm run velite`
(validate content against the schema), `npm test` (vitest).

Stack: Next.js 16 (App Router), TypeScript, MDX via Velite, Tailwind CSS,
shadcn/ui, vitest.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Open an issue first, then a PR against
`main`. All content is reviewed by the maintainer before publishing.

## Licence

This is intentionally **not** an OSI "open source" project — the licences are
source-available and non-commercial by design.

- **Content** (MDX write-ups, exercises, demos): **CC BY-NC-SA 4.0** — learn,
  adapt, and share alike, non-commercially, with credit.
- **Code** (the Next.js app, components, tooling): **PolyForm Noncommercial
  1.0.0** — see [LICENSE-CODE](./LICENSE-CODE).

See [LICENSE](./LICENSE) for the content terms and [USAGE.md](./USAGE.md) for
what that means in practice. Have a commercial use case? Reach out.
