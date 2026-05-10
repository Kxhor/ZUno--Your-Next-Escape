import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  className?: string;
  iconClassName?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  iconClassName,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "glass-panel p-6 flex flex-col gap-2",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10",
            iconClassName
          )}
        >
          <Icon className="h-5 w-5 text-secondary" />
        </div>
        {trend && (
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
            trend.value >= 0 ? "text-secondary bg-secondary/10" : "text-red-400 bg-red-400/10"
          )}>
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div className="mt-2">
        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        {subtitle && (
          <p className="text-[10px] text-white/30 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
