import { Alert } from "@/types/fleet";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

interface AlertsPanelProps {
  alerts: Alert[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "info":
        return <Info className="h-5 w-5 text-info" />;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-semibold text-foreground">Alerts</h3>
      </div>
      <div className="divide-y divide-border max-h-[400px] overflow-y-auto scrollbar-thin">
        {alerts.map((alert) => (
          <div key={alert.id} className="px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-colors">
            <div className="mt-0.5">{getIcon(alert.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{alert.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
            </div>
            <button className="text-sm text-primary hover:text-primary/80 font-medium whitespace-nowrap">
              View →
            </button>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t border-border flex justify-center">
        <button className="text-sm text-muted-foreground hover:text-foreground">
          &lt; 1 &gt;
        </button>
      </div>
    </div>
  );
}
