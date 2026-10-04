import type { Metadata } from "next";
import { getAllDemos } from "@/lib/content";
import { DemoCard } from "@/components/content/DemoCard";

export const metadata: Metadata = {
  title: "Demos",
  description: "Interactive demos for each category of the OWASP Top 10 for LLM Applications.",
};

export default function DemosPage() {
  const demos = getAllDemos();
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold text-foreground">
          <span className="text-primary">// </span>Demos
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {demos.length} interactive demos across the ten LLM Top 10 categories
        </p>
      </div>
      {demos.length === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">
          No demos yet. <a href="/contribute" className="text-primary hover:underline">Contribute one!</a>
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => <DemoCard key={demo.slug} {...demo} />)}
        </div>
      )}
    </div>
  );
}
