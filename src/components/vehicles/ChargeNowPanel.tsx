import { X } from "lucide-react";
import { Vehicle, ChargingHub } from "@/types/fleet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChargeNowPanelProps {
  vehicle: Vehicle;
  hubs: ChargingHub[];
  onClose: () => void;
}

export function ChargeNowPanel({ vehicle, hubs, onClose }: ChargeNowPanelProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-[500px] bg-card border-l border-border shadow-xl animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">Charge Now - {vehicle.name}</h2>
        </div>
        
        {/* Hub list */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)] scrollbar-thin">
          {hubs.map((hub, index) => (
            <div 
              key={hub.id} 
              className="border border-primary/30 rounded-lg p-4 space-y-4 bg-card hover:border-primary/50 transition-colors"
            >
              {/* Hub header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">#{index + 1} {hub.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {hub.distance} • {hub.power} • {hub.pricePerKwh}
                  </p>
                </div>
                <Badge className="bg-success/10 text-success border-success/30 hover:bg-success/20">
                  Available
                </Badge>
              </div>
              
              {/* Cost */}
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-foreground">₹{hub.totalCost.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">total cost to business</span>
              </div>
              
              {/* Cost breakdown */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cost of downtime: ₹{hub.downtimeCost.toFixed(2)}</span>
                <span className="text-muted-foreground">Charging Cost: ₹{hub.chargingCost.toFixed(2)}</span>
              </div>
              
              {/* Target SOC */}
              <p className="text-sm text-muted-foreground">
                Target SoC: {hub.targetSoc} | Energy: {hub.energy}
              </p>
              
              {/* Action button */}
              <Button className="w-full bg-success hover:bg-success/90 text-success-foreground">
                Assign to this Charger
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
