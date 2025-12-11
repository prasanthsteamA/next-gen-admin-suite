import { cn } from "@/lib/utils";

interface SocBadgeProps {
  value: number;
  size?: "sm" | "md";
}

export function SocBadge({ value, size = "md" }: SocBadgeProps) {
  const getColor = () => {
    if (value >= 60) return "bg-soc-high text-white";
    if (value >= 30) return "bg-soc-medium text-white";
    return "bg-soc-low text-white";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        getColor(),
        size === "sm" ? "px-2 py-0.5 text-xs min-w-[40px]" : "px-3 py-1 text-sm min-w-[50px]"
      )}
    >
      {value}%
    </span>
  );
}
