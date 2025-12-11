import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Depot {
  id: string;
  name: string;
  connectors: {
    available: number;
    occupied: number;
    faulted: number;
  };
  load: number;
  capacity: number;
  liveSessions: number;
}

const mockDepots: Depot[] = [
  { id: "1", name: "Coimbatore Hub", connectors: { available: 3, occupied: 4, faulted: 1 }, load: 520, capacity: 700, liveSessions: 3 },
  { id: "2", name: "Airport Logistics Depot", connectors: { available: 4, occupied: 3, faulted: 1 }, load: 640, capacity: 900, liveSessions: 6 },
  { id: "3", name: "North Ring Road Hub", connectors: { available: 6, occupied: 1, faulted: 1 }, load: 280, capacity: 600, liveSessions: 12 },
  { id: "4", name: "City Center Overnight Yard", connectors: { available: 4, occupied: 2, faulted: 0 }, load: 190, capacity: 450, liveSessions: 12 },
  { id: "5", name: "Industrial Zone Hub", connectors: { available: 5, occupied: 2, faulted: 1 }, load: 450, capacity: 800, liveSessions: 12 },
  { id: "6", name: "Peelamedu Station Hub", connectors: { available: 4, occupied: 1, faulted: 1 }, load: 320, capacity: 550, liveSessions: 0 },
  { id: "7", name: "RS Puram Central Depot", connectors: { available: 4, occupied: 3, faulted: 1 }, load: 480, capacity: 650, liveSessions: 0 },
  { id: "8", name: "Gandhipuram Main Hub", connectors: { available: 5, occupied: 2, faulted: 1 }, load: 590, capacity: 750, liveSessions: 0 },
  { id: "9", name: "Singanallur Logistics Yard", connectors: { available: 4, occupied: 1, faulted: 1 }, load: 240, capacity: 500, liveSessions: 0 },
  { id: "10", name: "Saibaba Colony Hub", connectors: { available: 5, occupied: 2, faulted: 1 }, load: 380, capacity: 600, liveSessions: 0 },
];

const ConnectorBadge = ({ count, type }: { count: number; type: "available" | "occupied" | "faulted" }) => {
  const colors = {
    available: "bg-soc-high text-white",
    occupied: "bg-warning text-white",
    faulted: "bg-destructive text-white",
  };
  
  return (
    <span className={cn(
      "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
      colors[type]
    )}>
      {count}
    </span>
  );
};

export default function Depots() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <AppLayout breadcrumb={[{ label: "Fleet", path: "/" }, { label: "Depots" }]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Depots</h1>
          <Button className="gap-2" onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Depot
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Depot Name</TableHead>
                <TableHead className="min-w-[200px]"># Connectors by Status</TableHead>
                <TableHead className="min-w-[300px]">Load vs Utilisation</TableHead>
                <TableHead className="text-right">Live Sessions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDepots.map((depot) => {
                const utilization = Math.round((depot.load / depot.capacity) * 100);
                const isHighUtilization = utilization >= 75;
                
                return (
                  <TableRow key={depot.id}>
                    <TableCell className="font-medium">{depot.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ConnectorBadge count={depot.connectors.available} type="available" />
                        <ConnectorBadge count={depot.connectors.occupied} type="occupied" />
                        <ConnectorBadge count={depot.connectors.faulted} type="faulted" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={utilization} 
                            className={cn(
                              "h-2 flex-1",
                              isHighUtilization && "[&>div]:bg-warning"
                            )}
                          />
                          <span className="text-sm font-medium w-12 text-right">{utilization}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {depot.load} kW / {depot.capacity} kW
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{depot.liveSessions}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 border-primary text-primary">
            1
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Add Depot Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Depot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>
                <span className="text-destructive">*</span> Depot Name
              </Label>
              <Input placeholder="e.g., Coimbatore Hub" />
            </div>
            <div className="space-y-2">
              <Label>
                <span className="text-destructive">*</span> Site Limit (kW)
              </Label>
              <Input type="number" defaultValue="500" />
            </div>
            <div className="space-y-2">
              <Label>Solar Available (kW)</Label>
              <Input type="number" defaultValue="0" />
            </div>
            <div className="space-y-2">
              <Label>
                <span className="text-destructive">*</span> Latitude
              </Label>
              <Input placeholder="e.g., 11.0142" />
            </div>
            <div className="space-y-2">
              <Label>
                <span className="text-destructive">*</span> Longitude
              </Label>
              <Input placeholder="e.g., 76.9728" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setAddDialogOpen(false)}>Add Depot</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
