import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllWriteups, getWriteupBySlug } from "@/lib/content";
import { getCategoryMeta } from "@/lib/categories";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CategoryBadge } from "@/components/content/CategoryBadge";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { MDXContent } from "@/components/mdx/MDXContent";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Anchor } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return getAllWriteups().map((w) => ({ slug: w.slug.split("/").slice(1) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: slugParts } = await params; const slug = "writeups/" + slugParts.join("/");
  const writeup = getWriteupBySlug(slug);
  if (!writeup) return {};
  return {
    title: writeup.title,
    description: writeup.description,
  };
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800/50",
  intermediate: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950/40 dark:text-yellow-400 dark:border-yellow-800/50",
  advanced: "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/50",
};

const SEVERITY_COLORS: Record<string, string> = {
  low: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/50",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950/40 dark:text-yellow-400 dark:border-yellow-800/50",
  high: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800/50",
  critical: "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/50",
};

// Rendered only when an entry explicitly declares reviewStatus, so the default
// (undeclared) no longer shouts "Draft — unreviewed" across the library.
const REVIEW_STATUS: Record<string, { label: string; className: string }> = {
  draft: { label: "Draft — unreviewed", className: "bg-muted/50 text-muted-foreground border-border" },
  reviewed: { label: "Reviewed", className: "bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/50" },
  verified: { label: "Verified", className: "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800/50" },
};

const REFERENCE_LABELS: Record<string, string> = {
  owasp: "OWASP",
  paper: "Paper",
  advisory: "Advisory",
  incident: "Incident",
  tool: "Tool",
  article: "Article",
  spec: "Spec",
};

export default async function WriteupPage({ params }: PageProps) {
  const { slug: slugParts } = await params; const slug = "writeups/" + slugParts.join("/");
  const writeup = getWriteupBySlug(slug);
  if (!writeup) notFound();

  const category = getCategoryMeta(writeup.owaspCategory);

  return (
    <div className="flex gap-8">
      {/* Main content */}
      <article className="min-w-0 flex-1">
        <Breadcrumb
          items={[
            { label: "Write-ups", href: "/writeups" },
            { label: category.code, href: `/categories/${writeup.owaspCategory}` },
            { label: writeup.title },
          ]}
        />

        <header className="mb-8 mt-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <CategoryBadge category={writeup.owaspCategory} />
            <span className={`rounded border px-2 py-0.5 font-mono text-xs ${DIFFICULTY_COLORS[writeup.difficulty]}`}>
              {writeup.difficulty}
            </span>
            <span className={`rounded border px-2 py-0.5 font-mono text-xs ${SEVERITY_COLORS[writeup.severity]}`}>
              {writeup.severity}
            </span>
            {writeup.cvssScore !== undefined && (
              <span
                title={writeup.cvssVector}
                className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
              >
                CVSS {writeup.cvssScore.toFixed(1)}
              </span>
            )}
            <span className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
              OWASP {writeup.owaspVersion}
            </span>
            {writeup.reviewStatus && REVIEW_STATUS[writeup.reviewStatus] && (
              <span className={`rounded border px-2 py-0.5 font-mono text-xs ${REVIEW_STATUS[writeup.reviewStatus].className}`}>
                {REVIEW_STATUS[writeup.reviewStatus].label}
              </span>
            )}
          </div>

          <h1 className="mb-2 font-mono text-2xl font-bold text-foreground lg:text-3xl">
            {writeup.title}
          </h1>
          <p className="text-sm text-muted-foreground">{writeup.description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span>By {writeup.author}</span>
            {writeup.reviewedBy && <span>Reviewed by {writeup.reviewedBy}</span>}
            <span>
              <time dateTime={writeup.publishedAt}>
                {formatDate(writeup.publishedAt)}
              </time>
            </span>
            {writeup.cvssVector && (
              <span className="font-mono">{writeup.cvssVector}</span>
            )}
          </div>

          {writeup.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {writeup.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-mono text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {writeup.keyTakeaway && (
          <div className="mb-8 rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="mb-1.5 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              <Anchor className="size-4" aria-hidden="true" />
              The bottom line
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {writeup.keyTakeaway}
            </p>
          </div>
        )}

        <div className="prose prose-sm max-w-none dark:prose-invert">
          <MDXContent code={writeup.body} />
        </div>

        {writeup.references.length > 0 && (
          <section className="mt-12 border-t border-border pt-6">
            <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              References
            </h2>
            <ol className="space-y-2 text-sm">
              {writeup.references.map((ref, i) => (
                <li key={ref.url} className="flex gap-2">
                  <span className="select-none text-muted-foreground">[{i + 1}]</span>
                  <span>
                    <span className="mr-2 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                      {REFERENCE_LABELS[ref.type]}
                    </span>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {ref.title}
                    </a>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

      </article>

      {/* Sidebar ToC */}
      {writeup.toc.length > 0 && (
        <aside className="hidden w-56 shrink-0 xl:block">
          <div className="sticky top-20">
            <TableOfContents toc={writeup.toc} />
          </div>
        </aside>
      )}
    </div>
  );
}
