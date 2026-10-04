import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SimpleMarkdown } from "@/components/content/SimpleMarkdown";

export const metadata: Metadata = {
  title: "Security Policy",
  description: "How to report a vulnerability, what is in scope, and our response timeline.",
};

// Single source: the repo's SECURITY.md, read at build time (page is fully static).
const source = readFileSync(join(process.cwd(), "SECURITY.md"), "utf8");

export default function SecurityPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <SimpleMarkdown source={source} />
    </div>
  );
}
