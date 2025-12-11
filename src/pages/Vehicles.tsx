import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { VehiclesListTable } from "@/components/vehicles/VehiclesListTable";
import { AddVehicleDialog } from "@/components/vehicles/AddVehicleDialog";
import { ChargeNowPanel } from "@/components/vehicles/ChargeNowPanel";
import { Button } from "@/components/ui/button";
import { Plus, Map } from "lucide-react";
import { vehicles as initialVehicles, chargingHubs } from "@/data/mockData";
import { Vehicle } from "@/types/fleet";
import { useToast } from "@/hooks/use-toast";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const { toast } = useToast();

  const handleAddVehicle = (newVehicle: any) => {
    const vehicle: Vehicle = {
      id: `v-${Date.now()}`,
      vrn: `VEH-${String(vehicles.length + 1).padStart(3, "0")}`,
      name: newVehicle.name,
      make: newVehicle.make,
      model: newVehicle.model,
      soc: 100,
      target: 85,
      depot: "Coimbatore Hub",
      location: "Depot",
      priority: "low",
      avgCostPerDay: 3500,
      acMaxPower: parseInt(newVehicle.acMaxPower),
      dcMaxPower: parseInt(newVehicle.dcMaxPower),
      v2gEnabled: newVehicle.v2gEnabled,
    };
    setVehicles([vehicle, ...vehicles]);
    toast({
      title: "Vehicle added",
      description: `${vehicle.name} has been added to your fleet.`,
    });
  };

  const handleChargeNow = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleLocate = (vehicle: Vehicle) => {
    toast({
      title: "Locating vehicle",
      description: `Opening map for ${vehicle.name}...`,
    });
  };

  return (
    <AppLayout breadcrumb={[{ label: "Fleet", path: "/" }, { label: "Vehicles" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">All Vehicles</h1>
          <div className="flex items-center gap-3">
            <Button onClick={() => setAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Vehicle
            </Button>
            <Button variant="outline" className="gap-2">
              <Map className="h-4 w-4" />
              View Fleet Map
            </Button>
          </div>
        </div>

        {/* Table */}
        <VehiclesListTable
          vehicles={vehicles}
          onChargeNow={handleChargeNow}
          onLocate={handleLocate}
        />
      </div>

      <AddVehicleDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={handleAddVehicle}
      />

      {selectedVehicle && (
        <ChargeNowPanel
          vehicle={selectedVehicle}
          hubs={chargingHubs}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </AppLayout>
  );
}
