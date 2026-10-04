import Link from "next/link";
import type { LucideProps } from "lucide-react";
import { FileText, FlaskConical, Play, Wrench } from "lucide-react";
import { CATEGORY_MAP } from "@/lib/categories";
import { cn, formatDate } from "@/lib/utils";
import { contentHref } from "@/lib/content-href";
import type { OwaspCategory } from "@/types/owasp";

type ContentType = "writeup" | "exercise" | "demo" | "tool";

interface RecentItem {
  slug: string;
  title: string;
  description: string;
  owaspCategory: OwaspCategory;
  publishedAt: string;
  type: ContentType;
  tags: string[];
}

interface RecentContentProps {
  items: RecentItem[];
}

const exerciseConfig = {
  label: "Exercise",
  icon: FlaskConical,
  badgeClass:
    "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800/50",
};

const typeConfig: Record<
  ContentType,
  {
    label: string;
    icon: React.ComponentType<LucideProps>;
    badgeClass: string;
  }
> = {
  writeup: {
    label: "Write-up",
    icon: FileText,
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800/50",
  },
  exercise: exerciseConfig,
  demo: {
    label: "Demo",
    icon: Play,
    badgeClass: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800/50",
  },
  tool: {
    label: "Tool",
    icon: Wrench,
    badgeClass: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-800/50",
  },
};

function RecentCard({ item }: { item: RecentItem }) {
  const config = typeConfig[item.type];
  const Icon = config.icon;
  const category = CATEGORY_MAP[item.owaspCategory];
  const date = formatDate(item.publishedAt);

  return (
    <article className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-card/80">
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-xs",
            config.badgeClass
          )}
        >
          <Icon className="size-3" aria-hidden="true" />
          {config.label}
        </span>
        <span
          className={cn("font-mono text-xs", category.textColor)}
          aria-label={`Category: ${category.name}`}
        >
          {category.code}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="mb-1 font-mono text-sm font-semibold text-foreground group-hover:text-primary">
          <Link
            href={contentHref(item.slug)}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          >
            {item.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {item.description}
        </p>
      </div>

      <time
        dateTime={item.publishedAt}
        className="font-mono text-sm text-muted-foreground"
      >
        {date}
      </time>
    </article>
  );
}

export function RecentContent({ items }: RecentContentProps) {
  if (items.length === 0) return null;

  return (
    <section
      className="border-t border-border px-4 py-12 sm:px-6"
      aria-labelledby="recent-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-baseline justify-between">
          <h2
            id="recent-heading"
            className="font-mono text-lg font-semibold text-foreground"
          >
            <span className="text-primary">// </span>Recently Added
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <RecentCard key={`${item.type}-${item.slug}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
