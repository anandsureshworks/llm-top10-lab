import type { Metadata } from "next";
import { getAllTools } from "@/lib/content";
import { ToolCard } from "@/components/content/ToolCard";

export const metadata: Metadata = {
  title: "Tools",
  description: "Open-source LLM security tools, mapped to the OWASP Top 10 for LLM Applications.",
};

export default function ToolsPage() {
  const tools = getAllTools();
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold text-foreground">
          <span className="text-primary">// </span>Tools
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {tools.length} open-source tools across the ten LLM Top 10 categories
        </p>
      </div>
      {tools.length === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">
          No tools yet. <a href="/contribute" className="text-primary hover:underline">Contribute one!</a>
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => <ToolCard key={tool.slug} {...tool} />)}
        </div>
      )}
    </div>
  );
}
