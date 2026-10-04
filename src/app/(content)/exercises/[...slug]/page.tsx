import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllExercises, getExerciseBySlug } from "@/lib/content";
import { getCategoryMeta } from "@/lib/categories";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CategoryBadge } from "@/components/content/CategoryBadge";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { MDXContent } from "@/components/mdx/MDXContent";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Target } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return getAllExercises().map((l) => ({ slug: l.slug.split("/").slice(1) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: slugParts } = await params; const slug = "exercises/" + slugParts.join("/");
  const exercise = getExerciseBySlug(slug);
  if (!exercise) return {};
  return { title: exercise.title, description: exercise.description };
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800/50",
  intermediate: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950/40 dark:text-yellow-400 dark:border-yellow-800/50",
  advanced: "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/50",
};

const CHALLENGE_LABELS: Record<string, string> = {
  "black-box": "Black-box",
  "white-box": "White-box",
  ctf: "CTF",
  guided: "Guided",
};

export default async function ExercisePage({ params }: PageProps) {
  const { slug: slugParts } = await params; const slug = "exercises/" + slugParts.join("/");
  const exercise = getExerciseBySlug(slug);
  if (!exercise) notFound();

  const category = getCategoryMeta(exercise.owaspCategory);

  return (
    <div className="flex gap-8">
      <article className="min-w-0 flex-1">
        <Breadcrumb
          items={[
            { label: "Exercises", href: "/exercises" },
            { label: category.code, href: `/categories/${exercise.owaspCategory}` },
            { label: exercise.title },
          ]}
        />

        <header className="mb-8 mt-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <CategoryBadge category={exercise.owaspCategory} />
            <span className={`rounded border px-2 py-0.5 font-mono text-xs ${DIFFICULTY_COLORS[exercise.difficulty]}`}>
              {exercise.difficulty}
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              {CHALLENGE_LABELS[exercise.challengeType]}
            </Badge>
          </div>

          <h1 className="mb-2 font-mono text-2xl font-bold text-foreground lg:text-3xl">
            {exercise.title}
          </h1>
          <p className="text-sm text-muted-foreground">{exercise.description}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            {exercise.points > 0 && (
              <span className="flex items-center gap-1.5 text-primary">
                <Trophy className="size-3.5" />
                {exercise.points} pts
              </span>
            )}
            {exercise.timeEstimate && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="size-3.5" />
                {exercise.timeEstimate}
              </span>
            )}
            {exercise.flagFormat && (
              <span className="flex items-center gap-1.5 font-mono text-muted-foreground">
                <Target className="size-3.5" />
                {exercise.flagFormat}
              </span>
            )}
            <span className="text-muted-foreground">By {exercise.author}</span>
            <time dateTime={exercise.publishedAt} className="text-muted-foreground">
              {formatDate(exercise.publishedAt)}
            </time>
          </div>

          {exercise.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {exercise.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-mono text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          <MDXContent code={exercise.body} />
        </div>
      </article>

      {exercise.toc.length > 0 && (
        <aside className="hidden w-56 shrink-0 xl:block">
          <div className="sticky top-20">
            <TableOfContents toc={exercise.toc} />
          </div>
        </aside>
      )}
    </div>
  );
}
