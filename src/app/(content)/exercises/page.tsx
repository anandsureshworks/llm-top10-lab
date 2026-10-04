import type { Metadata } from "next";
import { getAllExercises } from "@/lib/content";
import { ExerciseCard } from "@/components/content/ExerciseCard";

export const metadata: Metadata = {
  title: "Exercises",
  description: "Hands-on exercises for each category of the OWASP Top 10 for LLM Applications. Bring your own model.",
};

export default function ExercisesPage() {
  const exercises = getAllExercises();
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold text-foreground">
          <span className="text-primary">// </span>Exercises
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {exercises.length} hands-on exercises across the ten LLM Top 10 categories. Bring your own model: an OpenAI API key or a local Ollama model works.
        </p>
      </div>
      {exercises.length === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">
          No exercises yet. <a href="/contribute" className="text-primary hover:underline">Contribute one!</a>
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => <ExerciseCard key={exercise.slug} {...exercise} />)}
        </div>
      )}
    </div>
  );
}
