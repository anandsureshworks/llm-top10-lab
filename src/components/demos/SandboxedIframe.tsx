"use client";

import { ShieldAlert } from "lucide-react";

interface SandboxedIframeProps {
  srcDoc: string;
  title?: string;
  height?: number;
}

/**
 * Renders an iframe with a strict sandbox attribute.
 *
 * Security posture:
 *   - sandbox="allow-scripts"  — scripts may run inside the iframe
 *   - allow-same-origin is intentionally EXCLUDED to prevent the sandboxed
 *     page from accessing cookies, localStorage, or parent-frame APIs.
 *   - No allow-forms, allow-popups, allow-top-navigation, etc.
 */
export function SandboxedIframe({
  srcDoc,
  title = "Sandboxed Demo",
  height = 400,
}: SandboxedIframeProps) {
  return (
    <div
      className="my-6 overflow-hidden rounded-lg border border-border"
      role="region"
      aria-label={title}
    >
      {/* Warning banner */}
      <div
        role="note"
        aria-label="Sandbox security notice"
        className="flex items-start gap-2.5 border-b border-yellow-300 bg-yellow-100 dark:border-yellow-900/40 dark:bg-yellow-950/25 px-4 py-3"
      >
        <ShieldAlert
          className="mt-0.5 size-4 shrink-0 text-yellow-700 dark:text-yellow-500"
          aria-hidden="true"
        />
        <div className="text-xs text-yellow-900 dark:text-yellow-400/90">
          <span className="font-semibold">Sandboxed execution</span>
          {" — "}
          this iframe runs with{" "}
          <code className="rounded bg-yellow-200 text-yellow-900 dark:bg-yellow-950/50 dark:text-yellow-300 px-1 py-0.5 font-mono">
            sandbox="allow-scripts"
          </code>{" "}
          only. Cross-origin access, forms, popups, and top-level navigation are
          all disabled.
        </div>
      </div>

      {/* Sandboxed iframe */}
      <iframe
        title={title}
        srcDoc={srcDoc}
        // allow-same-origin is deliberately omitted
        sandbox="allow-scripts"
        width="100%"
        height={height}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="block w-full border-0 bg-white"
        aria-label={title}
      />
    </div>
  );
}
