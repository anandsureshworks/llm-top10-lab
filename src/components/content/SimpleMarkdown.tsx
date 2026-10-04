import type { ReactNode } from "react";

// Minimal renderer for the markdown subset used by SECURITY.md: headings,
// paragraphs, bullet/numbered lists, pipe tables, **bold**, `code`, [links](url).
// Exists so the page and the repo file share one source without a markdown dependency.
// Output is React elements only (no raw HTML), so source text cannot inject markup.

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function safeHref(href: string): string | null {
  return /^(https?:\/\/|mailto:|\/|#)/.test(href) ? href : null;
}

function inline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4)
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2)
      return (
        <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (m) {
      const href = safeHref(m[2]);
      if (href)
        return (
          <a key={i} href={href} className="text-primary underline underline-offset-2 hover:no-underline">
            {m[1]}
          </a>
        );
      return m[1];
    }
    return part;
  });
}

const cells = (row: string) =>
  row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

export function SimpleMarkdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      const text = inline(h[2]);
      if (level === 1) out.push(<h1 key={k++} className="font-mono text-2xl font-bold text-foreground">{text}</h1>);
      else if (level === 2) out.push(<h2 key={k++} className="mt-10 mb-3 font-mono text-lg font-semibold text-foreground">{text}</h2>);
      else out.push(<h3 key={k++} className="mt-6 mb-2 font-mono text-base font-semibold text-foreground">{text}</h3>);
      i++;
      continue;
    }
    if (/^\s*\|/.test(line) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? "")) {
      const head = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(
        <div key={k++} className="my-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {head.map((c, j) => (
                  <th key={j} className="border-b border-border px-3 py-2 text-left font-mono font-semibold text-foreground">{inline(c)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, j) => (
                    <td key={j} className="border-b border-border px-3 py-2 text-muted-foreground">{inline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }
    const ul = /^\s*[-*]\s+/;
    const ol = /^\s*\d+\.\s+/;
    if (ul.test(line) || ol.test(line)) {
      const ordered = ol.test(line);
      const re = ordered ? ol : ul;
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i])) items.push(lines[i++].replace(re, ""));
      const Tag = ordered ? "ol" : "ul";
      out.push(
        <Tag key={k++} className={`my-3 space-y-1 pl-6 text-sm text-muted-foreground ${ordered ? "list-decimal" : "list-disc"}`}>
          {items.map((t, j) => <li key={j}>{inline(t)}</li>)}
        </Tag>
      );
      continue;
    }
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3}\s|\s*[-*]\s|\s*\d+\.\s|\s*\|)/.test(lines[i])
    )
      para.push(lines[i++]);
    out.push(<p key={k++} className="my-3 text-sm leading-relaxed text-muted-foreground">{inline(para.join(" "))}</p>);
  }

  return <>{out}</>;
}
