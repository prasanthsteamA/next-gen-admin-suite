import { Vehicle } from "@/types/fleet";
import { SocBadge } from "@/components/dashboard/SocBadge";
import { RiskBadge } from "@/components/dashboard/RiskBadge";
import { MapPin, Zap, ArrowUpDown, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VehiclesListTableProps {
  vehicles: Vehicle[];
  onChargeNow: (vehicle: Vehicle) => void;
  onLocate: (vehicle: Vehicle) => void;
}

export function VehiclesListTable({ vehicles, onChargeNow, onLocate }: VehiclesListTableProps) {
  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Registration Number <ArrowUpDown className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Make <ArrowUpDown className="h-3 w-3" /> <Filter className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Model <ArrowUpDown className="h-3 w-3" /> <Filter className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Avg cost to business / day <ArrowUpDown className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Current SoC (%) <ArrowUpDown className="h-3 w-3" /> <Filter className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Target <ArrowUpDown className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">Depot</TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Priority <ArrowUpDown className="h-3 w-3" /> <Filter className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Location <ArrowUpDown className="h-3 w-3" /> <Filter className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">Risk</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{vehicle.vrn}</TableCell>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>₹{vehicle.avgCostPerDay.toLocaleString()}</TableCell>
                <TableCell>
                  <SocBadge value={vehicle.soc} size="sm" />
                </TableCell>
                <TableCell>{vehicle.target}%</TableCell>
                <TableCell>{vehicle.depot}</TableCell>
                <TableCell>
                  <span className={`capitalize ${
                    vehicle.priority === 'high' ? 'text-destructive' :
                    vehicle.priority === 'medium' ? 'text-warning' :
                    'text-muted-foreground'
                  }`}>
                    {vehicle.priority}
                  </span>
                </TableCell>
                <TableCell>{vehicle.location}</TableCell>
                <TableCell>
                  <RiskBadge level={vehicle.soc < 30 ? "high" : vehicle.soc < 50 ? "medium" : "low"} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onChargeNow(vehicle)}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      <Zap className="h-4 w-4" />
                      Charge Now
                    </button>
                    <button 
                      onClick={() => onLocate(vehicle)}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      <MapPin className="h-4 w-4" />
                      Locate
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
