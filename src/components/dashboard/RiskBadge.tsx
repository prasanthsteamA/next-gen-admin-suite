import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle } from "lucide-react";

interface RiskBadgeProps {
  level: "high" | "medium" | "low";
}

export function RiskBadge({ level }: RiskBadgeProps) {
  if (level === "low") return null;
  
  return (
    <span className={cn(
      "inline-flex items-center justify-center",
      level === "high" ? "text-destructive" : "text-warning"
    )}>
      {level === "high" ? (
        <AlertCircle className="h-5 w-5 fill-current" />
      ) : (
        <AlertTriangle className="h-5 w-5 fill-current text-warning" />
      )}
    </span>
  );
}
