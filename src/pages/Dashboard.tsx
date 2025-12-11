import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { VehiclesTable } from "@/components/dashboard/VehiclesTable";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { vehiclesNeedingCharge, alerts } from "@/data/mockData";
import { FleetMapPanel } from "@/components/fleet-map/FleetMapPanel";

export default function Dashboard() {
  const [mapOpen, setMapOpen] = useState(false);
  
  return (
    <AppLayout breadcrumb={[{ label: "Fleet", path: "/" }, { label: "Dashboard" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Fleet dashboard</h1>
          <Button className="gap-2" onClick={() => setMapOpen(true)}>
            <Map className="h-4 w-4" />
            View Fleet Map
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Vehicles Needing Charge"
            value={50}
            subtitle="Now: 5 • Today: 50"
            borderColor="orange"
          />
          <MetricCard
            title="Trips at Risk"
            value={5}
            borderColor="blue"
          />
          <MetricCard
            title="Forecast Energy Cost (Today)"
            value="₹12,350"
            trend={{ value: "8.1%", direction: "up" }}
          />
          <MetricCard
            title="Forecast Downtime Cost (Today)"
            value="₹8,900"
            subtitle="Includes travel, waiting & charge time"
          />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VehiclesTable 
              vehicles={vehiclesNeedingCharge} 
              title="Vehicles Needing Charge Soon"
              showViewAll
            />
          </div>
          <div className="lg:col-span-1">
            <AlertsPanel alerts={alerts} />
          </div>
        </div>
      </div>
      
      <FleetMapPanel isOpen={mapOpen} onClose={() => setMapOpen(false)} />
    </AppLayout>
  );
}
