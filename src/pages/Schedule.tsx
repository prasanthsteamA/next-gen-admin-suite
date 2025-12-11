import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { vehicles, scheduleSessions } from "@/data/mockData";
import { SocBadge } from "@/components/dashboard/SocBadge";
import { cn } from "@/lib/utils";

const timeSlots = ["14:00", "15:00", "16:00", "17:00", "18:00"];

export default function Schedule() {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedDate] = useState("Thursday, 11 December 2025");

  return (
    <AppLayout breadcrumb={[{ label: "Fleet", path: "/" }, { label: "Charging-schedule" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Vehicle Charging Schedule</h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-md">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{selectedDate}</span>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline">Today</Button>
            <Button variant="secondary">Hybrid (Past actual, future planned)</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Label className="text-sm">Depot:</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All depots" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All depots</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-sm">Priority:</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priorities</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-sm">Vehicle:</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All vehicles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All vehicles</SelectItem>
                {vehicles.slice(0, 8).map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.vrn} - {v.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-sm">SoC Range:</Label>
            <Input className="w-16" placeholder="%" />
            <span className="text-muted-foreground">to</span>
            <Input className="w-16" placeholder="%" />
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-sm">Public Chargers:</Label>
            <Switch />
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold bg-muted/50 min-w-[200px]">Resources</th>
                  {timeSlots.map((time) => (
                    <th key={time} className="text-left p-3 font-semibold min-w-[150px]">{time}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehicles.slice(0, 11).map((vehicle) => {
                  const session = scheduleSessions.find((s) => s.vehicleId === vehicle.id);
                  return (
                    <tr key={vehicle.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-3 bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{vehicle.vrn}</p>
                            <p className="text-sm text-muted-foreground">{vehicle.model}</p>
                          </div>
                          <span className={cn(
                            "text-sm font-medium",
                            vehicle.priority === "high" ? "text-destructive" :
                            vehicle.priority === "medium" ? "text-warning" : "text-muted-foreground"
                          )}>
                            {vehicle.priority.charAt(0).toUpperCase() + vehicle.priority.slice(1)}
                          </span>
                          <SocBadge value={vehicle.soc} size="sm" />
                        </div>
                      </td>
                      {timeSlots.map((time, idx) => (
                        <td key={time} className="p-1 relative h-16">
                          {session && idx === 1 && vehicle.id === "4" && (
                            <div className="absolute inset-y-1 left-0 right-0 bg-info/20 border-l-4 border-info rounded-r px-2 py-1 cursor-pointer hover:bg-info/30 transition-colors">
                              <div className="text-xs font-medium truncate">{session.location}</div>
                              <div className="text-xs text-muted-foreground truncate">Own • {session.connector}</div>
                            </div>
                          )}
                          {session && idx === 3 && vehicle.id === "7" && (
                            <div className="absolute inset-y-1 left-0 right-0 bg-destructive/10 border-l-4 border-destructive rounded-r px-2 py-1 cursor-pointer hover:bg-destructive/20 transition-colors">
                              <div className="text-xs font-medium truncate">Airport Logistics Depot</div>
                              <div className="text-xs text-muted-foreground truncate">Own • Connector 7</div>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Button onClick={() => setScheduleDialogOpen(true)}>Schedule Charging Session</Button>
      </div>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Charging Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>
                <span className="text-destructive">*</span> Vehicle ID
              </Label>
              <Input placeholder="e.g. TN38DV2027" />
            </div>
            <div className="space-y-2">
              <Label>
                <span className="text-destructive">*</span> Start SoC (%)
              </Label>
              <Input type="number" placeholder="" />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setScheduleDialogOpen(false)}>Schedule</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
