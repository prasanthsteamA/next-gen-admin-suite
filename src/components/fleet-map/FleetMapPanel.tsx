import { X, Plus, Minus, MapPin, Zap, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import { vehicles, chargingHubs } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface FleetMapPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock map positions for vehicles and hubs
const mapPositions = {
  vehicles: [
    { id: "1", x: 45, y: 35, soc: 85 },
    { id: "2", x: 62, y: 48, soc: 80 },
    { id: "3", x: 38, y: 55, soc: 88 },
    { id: "4", x: 72, y: 32, soc: 82 },
    { id: "5", x: 28, y: 68, soc: 46 },
    { id: "6", x: 55, y: 72, soc: 67 },
    { id: "7", x: 82, y: 45, soc: 36 },
    { id: "8", x: 35, y: 42, soc: 42 },
    { id: "9", x: 68, y: 62, soc: 53 },
    { id: "10", x: 48, y: 28, soc: 34 },
    { id: "11", x: 25, y: 52, soc: 65 },
    { id: "12", x: 78, y: 58, soc: 53 },
  ],
  hubs: [
    { id: "h1", x: 50, y: 50, name: "Coimbatore Hub", status: "normal" },
    { id: "h2", x: 35, y: 38, name: "North Ring Road Hub", status: "normal" },
    { id: "h3", x: 70, y: 40, name: "Airport Logistics", status: "near-limit" },
    { id: "h4", x: 45, y: 65, name: "Industrial Zone Hub", status: "normal" },
    { id: "h5", x: 60, y: 30, name: "City Center Yard", status: "overloaded" },
  ],
  publicChargers: [
    { id: "p1", x: 30, y: 30, type: "ac" },
    { id: "p2", x: 75, y: 55, type: "dc" },
    { id: "p3", x: 42, y: 75, type: "ac" },
    { id: "p4", x: 58, y: 42, type: "dc" },
    { id: "p5", x: 85, y: 35, type: "ac" },
  ],
};

const getSocColor = (soc: number) => {
  if (soc > 60) return "bg-soc-high";
  if (soc >= 30) return "bg-soc-medium";
  return "bg-soc-low";
};

const getHubColor = (status: string) => {
  if (status === "overloaded") return "bg-destructive text-white";
  if (status === "near-limit") return "bg-warning text-white";
  return "bg-info text-white";
};

export function FleetMapPanel({ isOpen, onClose }: FleetMapPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-4xl bg-card shadow-lg border-l border-border animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold">Fleet Map</h2>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-[calc(100vh-64px)] bg-muted/30">
          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
            <Button variant="secondary" size="icon" className="h-8 w-8 bg-card shadow">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-8 w-8 bg-card shadow">
              <Minus className="h-4 w-4" />
            </Button>
          </div>

          {/* Map Area */}
          <div className="relative w-full h-full overflow-hidden">
            {/* Map Background Grid */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              
              {/* City name */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground/30 tracking-widest">
                COIMBATORE
              </div>
            </div>

            {/* Public Chargers */}
            {mapPositions.publicChargers.map((charger) => (
              <div
                key={charger.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform"
                style={{ left: `${charger.x}%`, top: `${charger.y}%` }}
              >
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  charger.type === "ac" ? "bg-blue-400" : "bg-orange-400"
                )} />
              </div>
            ))}

            {/* Hubs */}
            {mapPositions.hubs.map((hub) => (
              <div
                key={hub.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform group"
                style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
              >
                <div className={cn(
                  "w-7 h-7 rounded flex items-center justify-center text-xs font-bold shadow-lg",
                  getHubColor(hub.status)
                )}>
                  H
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-card border border-border rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {hub.name}
                </div>
              </div>
            ))}

            {/* Vehicles */}
            {mapPositions.vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform group"
                style={{ left: `${vehicle.x}%`, top: `${vehicle.y}%` }}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md border-2 border-white",
                  getSocColor(vehicle.soc)
                )}>
                  {vehicle.soc > 60 ? "●" : vehicle.soc >= 30 ? "●" : "●"}
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-card border border-border rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  VEH-00{vehicle.id} • {vehicle.soc}% SOC
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg shadow-lg p-4 text-sm">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Legend
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Vehicles</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-soc-high border border-white" />
                    <span className="text-xs">Vehicle &gt; 60% SOC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-soc-medium border border-white" />
                    <span className="text-xs">Vehicle 30-60% SOC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-soc-low border border-white" />
                    <span className="text-xs">Vehicle &lt; 30% SOC</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Hubs</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-info text-white text-[8px] flex items-center justify-center font-bold">H</div>
                    <span className="text-xs">Hub – normal load</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-warning text-white text-[8px] flex items-center justify-center font-bold">H</div>
                    <span className="text-xs">Hub – near limit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-destructive text-white text-[8px] flex items-center justify-center font-bold">H</div>
                    <span className="text-xs">Hub – overloaded</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Public chargers</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <span className="text-xs">Public AC (blue)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-400" />
                    <span className="text-xs">Public DC (orange)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attribution */}
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">
            Map Data © Fleet Manager
          </div>
        </div>
      </div>
    </div>
  );
}
