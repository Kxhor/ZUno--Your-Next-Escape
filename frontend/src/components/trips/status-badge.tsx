import { cn } from "@/lib/utils";
import type { TripStatus } from "@/types";

const statusConfig: Record<TripStatus, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground border border-border",
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-primary/10 text-primary border border-primary/20",
  },
  ongoing: {
    label: "Ongoing",
    className: "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
  },
  completed: {
    label: "Completed",
    className: "bg-muted text-muted-foreground border border-border",
  },
};

interface StatusBadgeProps {
  status: TripStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
