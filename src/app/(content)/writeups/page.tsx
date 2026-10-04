import type { Metadata } from "next";
import { getAllWriteups } from "@/lib/content";
import { WriteupCard } from "@/components/content/WriteupCard";

export const metadata: Metadata = {
  title: "Write-ups",
  description: "Security write-ups for each category of the OWASP Top 10 for LLM Applications.",
};

export default function WriteupsPage() {
  const writeups = getAllWriteups();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold text-foreground">
          <span className="text-primary">// </span>Write-ups
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {writeups.length} research write-ups across the ten LLM Top 10 categories
        </p>
      </div>

      {writeups.length === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">
          No write-ups yet.{" "}
          <a href="/contribute" className="text-primary hover:underline">
            Contribute one!
          </a>
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {writeups.map((writeup) => (
            <WriteupCard key={writeup.slug} {...writeup} />
          ))}
        </div>
      )}
    </div>
  );
}
