import { Info, AlertTriangle, AlertCircle, Lightbulb, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "danger" | "tip" | "flag";

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: React.ComponentType<{ className?: string }>;
    containerClass: string;
    borderClass: string;
    iconClass: string;
    titleClass: string;
    defaultTitle: string;
  }
> = {
  info: {
    icon: Info,
    containerClass: "bg-blue-100 dark:bg-blue-950/30",
    borderClass: "border-blue-400 dark:border-blue-800/50",
    iconClass: "text-blue-700 dark:text-blue-400",
    titleClass: "text-blue-900 dark:text-blue-300",
    defaultTitle: "Info",
  },
  warning: {
    icon: AlertTriangle,
    containerClass: "bg-yellow-100 dark:bg-yellow-950/30",
    borderClass: "border-yellow-400 dark:border-yellow-800/50",
    iconClass: "text-yellow-700 dark:text-yellow-400",
    titleClass: "text-yellow-900 dark:text-yellow-300",
    defaultTitle: "Warning",
  },
  danger: {
    icon: AlertCircle,
    containerClass: "bg-red-100 dark:bg-red-950/30",
    borderClass: "border-red-400 dark:border-red-800/50",
    iconClass: "text-red-700 dark:text-red-400",
    titleClass: "text-red-900 dark:text-red-300",
    defaultTitle: "Danger",
  },
  tip: {
    icon: Lightbulb,
    containerClass: "bg-green-100 dark:bg-green-950/30",
    borderClass: "border-green-400 dark:border-green-800/50",
    iconClass: "text-green-700 dark:text-green-400",
    titleClass: "text-green-900 dark:text-green-300",
    defaultTitle: "Tip",
  },
  flag: {
    icon: Flag,
    containerClass: "bg-purple-100 dark:bg-purple-950/30",
    borderClass: "border-purple-400 dark:border-purple-800/50",
    iconClass: "text-purple-700 dark:text-purple-400",
    titleClass: "text-purple-900 dark:text-purple-300",
    defaultTitle: "CTF Flag",
  },
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;
  const displayTitle = title ?? config.defaultTitle;

  return (
    <div
      role="note"
      aria-label={`${displayTitle} callout`}
      className={cn(
        "my-6 rounded-lg border-l-4 p-4",
        config.containerClass,
        config.borderClass
      )}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={cn("mt-0.5 size-5 shrink-0", config.iconClass)}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className={cn("mb-1 text-sm font-semibold", config.titleClass)}>
            {displayTitle}
          </p>
          <div className="text-sm text-foreground/80 dark:text-muted-foreground [&>p]:m-0 [&>p+p]:mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
