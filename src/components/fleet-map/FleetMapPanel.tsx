import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FleetMapPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock map positions for vehicles and hubs
const mapPositions = {
  vehicles: [
    { id: "1", x: 45, y: 35, soc: 85, name: "Fleet Mahindra eVerito", model: "eVerito Fleet", priority: "medium" },
    { id: "2", x: 62, y: 48, soc: 80, name: "Fleet Tata Ultra", model: "Ultra T.7 Electric", priority: "high" },
    { id: "3", x: 38, y: 55, soc: 88, name: "Fleet XUV400", model: "XUV400", priority: "low" },
    { id: "4", x: 72, y: 32, soc: 82, name: "Fleet Ace EV", model: "Ace EV", priority: "medium" },
    { id: "5", x: 28, y: 68, soc: 46, name: "Fleet XPRES-T", model: "XPRES-T EV", priority: "medium" },
    { id: "6", x: 55, y: 72, soc: 67, name: "Fleet e6 MPV", model: "e6 MPV", priority: "low" },
    { id: "7", x: 82, y: 45, soc: 36, name: "Fleet Pro 2055", model: "Pro 2055 EV", priority: "high" },
    { id: "8", x: 35, y: 42, soc: 42, name: "Fleet Ace EV 2", model: "Ace EV", priority: "medium" },
    { id: "9", x: 68, y: 62, soc: 53, name: "Fleet Ultra T.7", model: "Ultra T.7 Electric", priority: "low" },
    { id: "10", x: 48, y: 28, soc: 34, name: "Fleet XUV400 2", model: "XUV400", priority: "high" },
    { id: "11", x: 25, y: 52, soc: 65, name: "Fleet eVerito 2", model: "eVerito Fleet", priority: "medium" },
    { id: "12", x: 78, y: 58, soc: 53, name: "Fleet XPRES-T 2", model: "XPRES-T EV", priority: "low" },
    { id: "13", x: 90, y: 25, soc: 72, name: "Fleet e6 2", model: "e6 MPV", priority: "medium" },
    { id: "14", x: 15, y: 40, soc: 28, name: "Fleet Pro 2055 2", model: "Pro 2055 EV", priority: "high" },
    { id: "15", x: 85, y: 70, soc: 91, name: "Fleet Ace EV 3", model: "Ace EV", priority: "low" },
  ],
  hubs: [
    { id: "h1", x: 50, y: 50, name: "Coimbatore Hub", status: "normal" },
    { id: "h2", x: 35, y: 38, name: "North Ring Road Hub", status: "normal" },
    { id: "h3", x: 70, y: 40, name: "Airport Logistics", status: "near-limit" },
    { id: "h4", x: 45, y: 65, name: "Industrial Zone Hub", status: "normal" },
    { id: "h5", x: 60, y: 30, name: "City Center Yard", status: "overloaded" },
    { id: "h6", x: 80, y: 55, name: "Peru Hub", status: "normal" },
  ],
  publicChargers: [
    { id: "p1", x: 30, y: 30, type: "ac" },
    { id: "p2", x: 75, y: 55, type: "dc" },
    { id: "p3", x: 42, y: 75, type: "ac" },
    { id: "p4", x: 58, y: 42, type: "dc" },
    { id: "p5", x: 85, y: 35, type: "ac" },
    { id: "p6", x: 20, y: 60, type: "dc" },
    { id: "p7", x: 92, y: 50, type: "ac" },
  ],
};

const getSocColor = (soc: number) => {
  if (soc > 60) return "bg-soc-high";
  if (soc >= 30) return "bg-soc-medium";
  return "bg-soc-low";
};

const getHubColor = (status: string) => {
  if (status === "overloaded") return "bg-destructive";
  if (status === "near-limit") return "bg-warning";
  return "bg-info";
};

export function FleetMapPanel({ isOpen, onClose }: FleetMapPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-3xl bg-card shadow-lg border-l border-border animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">Fleet Map</h2>
        </div>

        {/* Map Container */}
        <div className="relative h-[calc(100vh-64px)]">
          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-card shadow border-border">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-card shadow border-border">
              <Minus className="h-4 w-4" />
            </Button>
          </div>

          {/* Map Area - Simulated map background */}
          <div className="relative w-full h-full overflow-hidden bg-[#f2f0e6] dark:bg-slate-800">
            {/* Roads simulation */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {/* Main roads */}
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e0ddd4" strokeWidth="8" className="dark:stroke-slate-600" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e0ddd4" strokeWidth="8" className="dark:stroke-slate-600" />
              <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#e0ddd4" strokeWidth="4" className="dark:stroke-slate-600" />
              <line x1="80%" y1="0" x2="20%" y2="100%" stroke="#e0ddd4" strokeWidth="4" className="dark:stroke-slate-600" />
              {/* Secondary roads */}
              <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#e8e5dc" strokeWidth="3" className="dark:stroke-slate-700" />
              <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#e8e5dc" strokeWidth="3" className="dark:stroke-slate-700" />
              <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#e8e5dc" strokeWidth="3" className="dark:stroke-slate-700" />
              <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#e8e5dc" strokeWidth="3" className="dark:stroke-slate-700" />
            </svg>
            
            {/* City name */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-amber-700/40 dark:text-amber-500/30 tracking-[0.3em]">
              COIMBATORE
            </div>

            {/* Public Chargers */}
            {mapPositions.publicChargers.map((charger) => (
              <div
                key={charger.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-150 transition-transform z-10"
                style={{ left: `${charger.x}%`, top: `${charger.y}%` }}
                title={`Public ${charger.type.toUpperCase()} Charger`}
              >
                <div className={cn(
                  "w-2.5 h-2.5 rounded-full border border-white shadow-sm",
                  charger.type === "ac" ? "bg-blue-400" : "bg-orange-400"
                )} />
              </div>
            ))}

            {/* Hubs */}
            {mapPositions.hubs.map((hub) => (
              <div
                key={hub.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform group z-20"
                style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
              >
                <div className={cn(
                  "w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-md border border-white/50",
                  getHubColor(hub.status)
                )}>
                  H
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-card border border-border rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {hub.name}
                </div>
              </div>
            ))}

            {/* Vehicles with detailed tooltips */}
            {mapPositions.vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
                style={{ left: `${vehicle.x}%`, top: `${vehicle.y}%` }}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-white hover:scale-125 transition-transform",
                  getSocColor(vehicle.soc)
                )}>
                  <span className="text-white text-[8px] font-bold">●</span>
                </div>
                {/* Detailed tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <button className="absolute -top-1 -right-1 w-4 h-4 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground">
                    <X className="w-2 h-2" />
                  </button>
                  <p className="font-semibold text-foreground">{vehicle.name}</p>
                  <p className="text-muted-foreground">SOC: {vehicle.soc}%</p>
                  <p className="text-muted-foreground">Model: {vehicle.model}</p>
                  <p className="text-muted-foreground">Priority: {vehicle.priority}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg shadow-lg p-4 text-sm max-w-[200px]">
            <h3 className="font-semibold mb-3">Legend</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-foreground mb-1.5">Vehicles</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-soc-high border border-white shadow-sm" />
                    <span className="text-xs text-muted-foreground">Vehicle &gt; 60% SOC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-soc-medium border border-white shadow-sm" />
                    <span className="text-xs text-muted-foreground">Vehicle 30-60% SOC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-soc-low border border-white shadow-sm" />
                    <span className="text-xs text-muted-foreground">Vehicle &lt; 30% SOC</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground mb-1.5">Hubs</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-info text-white text-[8px] flex items-center justify-center font-bold">H</div>
                    <span className="text-xs text-muted-foreground">Hub – normal load</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-warning text-white text-[8px] flex items-center justify-center font-bold">H</div>
                    <span className="text-xs text-muted-foreground">Hub – near limit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-destructive text-white text-[8px] flex items-center justify-center font-bold">H</div>
                    <span className="text-xs text-muted-foreground">Hub – overloaded</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground mb-1.5">Public chargers</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    <span className="text-xs text-muted-foreground">Public AC (blue)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                    <span className="text-xs text-muted-foreground">Public DC (orange)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attribution */}
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-card/90 px-2 py-1 rounded flex items-center gap-1">
            <span>🍃 Leaflet</span>
            <span className="mx-1">|</span>
            <span>© CARTO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
