import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  borderColor?: "orange" | "blue" | "default";
}

export function MetricCard({ title, value, subtitle, trend, borderColor = "default" }: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-lg p-4 border-t-4 shadow-sm",
        borderColor === "orange" && "border-t-metric-orange",
        borderColor === "blue" && "border-t-metric-blue",
        borderColor === "default" && "border-t-border"
      )}
    >
      <p className={cn(
        "text-sm font-medium mb-2",
        borderColor === "orange" && "text-metric-orange",
        borderColor === "blue" && "text-metric-blue",
        borderColor === "default" && "text-muted-foreground"
      )}>
        {title}
      </p>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      )}
      {trend && (
        <div className={cn(
          "flex items-center gap-1 mt-2 text-sm font-medium",
          trend.direction === "up" ? "text-success" : "text-destructive"
        )}>
          {trend.direction === "up" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
          <span>{trend.value} vs yesterday</span>
        </div>
      )}
    </div>
  );
}
