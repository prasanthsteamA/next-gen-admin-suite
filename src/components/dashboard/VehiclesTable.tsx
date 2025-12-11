import { Vehicle } from "@/types/fleet";
import { SocBadge } from "./SocBadge";
import { RiskBadge } from "./RiskBadge";
import { MapPin, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VehiclesTableProps {
  vehicles: Vehicle[];
  title?: string;
  showViewAll?: boolean;
  compact?: boolean;
}

export function VehiclesTable({ vehicles, title, showViewAll, compact }: VehiclesTableProps) {
  return (
    <div className="bg-card rounded-lg border border-border">
      {(title || showViewAll) && (
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          {title && <h3 className="font-semibold text-foreground">{title}</h3>}
          {showViewAll && (
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              View All Vehicles →
            </button>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">VRN</TableHead>
              <TableHead className="font-semibold">Vehicle</TableHead>
              <TableHead className="font-semibold">Model</TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  SOC <Filter className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Target <Filter className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Depot <Filter className="h-3 w-3" />
                </span>
              </TableHead>
              <TableHead className="font-semibold">Next Dispatch</TableHead>
              <TableHead className="font-semibold">
                <span className="flex items-center gap-1">
                  Location <Filter className="h-3 w-3" />
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
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>
                  <SocBadge value={vehicle.soc} size="sm" />
                </TableCell>
                <TableCell>{vehicle.target}%</TableCell>
                <TableCell>{vehicle.depot}</TableCell>
                <TableCell>{vehicle.nextDispatch}</TableCell>
                <TableCell>{vehicle.location}</TableCell>
                <TableCell>
                  <RiskBadge level={vehicle.soc < 30 ? "high" : vehicle.soc < 50 ? "medium" : "low"} />
                </TableCell>
                <TableCell>
                  <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium">
                    <MapPin className="h-4 w-4" />
                    Locate
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="px-4 py-2 border-t border-border flex justify-center">
        <button className="text-sm text-muted-foreground hover:text-foreground">
          &lt; 1 &gt;
        </button>
      </div>
    </div>
  );
}
