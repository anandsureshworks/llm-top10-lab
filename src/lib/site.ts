// Single source of site identity. Every public-facing name, URL, author and
// disclaimer string must come from here so a rebrand is a one-file change.
const repo = "https://github.com/anandsureshworks/llm-top10-lab";

export const site = {
  name: "llm top 10 lab",
  shortName: "llm top 10 lab",
  tagline: "Write-ups, exercises, demos and tools for the OWASP Top 10 for LLM Applications.",
  description:
    "llm top 10 lab by Anand Suresh: an independent reference to the OWASP Top 10 for LLM Applications. Write-ups, exercises, demos, tools.",
  url: "https://anandsureshworks.dev",
  repo,
  issues: `${repo}/issues`,
  author: "Anand Suresh",
  authorUrl: "https://www.anandsureshworks.com",
  disclaimer:
    "An independent reference to the OWASP Top 10 for LLM Applications. Not affiliated with or endorsed by OWASP.",
  basedOn: "the OWASP Top 10 for LLM Applications — 2025 edition",
} as const;
