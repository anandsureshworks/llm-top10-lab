import Link from "next/link";
import { Github } from "lucide-react";
import { site } from "@/lib/site";

const FOOTER_LINKS: Array<{ label: string; href: string; external?: boolean }> = [
  { label: "Contributing", href: "/contribute" },
  { label: "Security Policy", href: "/security" },
  { label: "GitHub Issues", href: site.issues, external: true },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Left: copyright + non-affiliation */}
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <p className="font-mono text-sm text-muted-foreground">
              &copy; {year} {site.author}
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              {site.disclaimer}
            </p>
          </div>

          {/* Right: links + GitHub */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-1 rounded-sm font-mono text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {link.label === "GitHub Issues" && (
                    <Github className="size-3" aria-hidden="true" />
                  )}
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex min-h-11 items-center rounded-sm font-mono text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View project on GitHub"
              className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Github className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
