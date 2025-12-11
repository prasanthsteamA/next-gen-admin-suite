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
    <div className="fixed right-0 top-0 h-full w-[480px] bg-card border-l border-border shadow-xl z-50 animate-slide-in-right">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <X className="h-5 w-5 cursor-pointer hover:text-muted-foreground" onClick={onClose} />
          Charge Now - {vehicle.name}
        </h2>
      </div>
      
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)] scrollbar-thin">
        {hubs.map((hub, index) => (
          <div key={hub.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">#{index + 1} {hub.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {hub.distance} • {hub.power} • {hub.pricePerKwh}
                </p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success">
                Available
              </Badge>
            </div>
            
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">₹{hub.totalCost.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground">total cost to business</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cost of downtime: ₹{hub.downtimeCost.toFixed(2)}</span>
              <span className="text-muted-foreground">Charging Cost: ₹{hub.chargingCost.toFixed(2)}</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Target SoC: {hub.targetSoc} | Energy: {hub.energy}
            </p>
            
            <Button className="w-full" variant="success">
              Assign to this Charger
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
