import { useState, useCallback } from "react";
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
import { ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react";
import { vehicles, scheduleSessions } from "@/data/mockData";
import { DraggableScheduleGrid } from "@/components/schedule/DraggableScheduleGrid";
import { toast } from "sonner";

const timeSlots = ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

export default function Schedule() {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedDate] = useState("Thursday, 11 December 2025");

  const handleSessionMove = useCallback((sessionId: string, newVehicleId: string, newTimeSlotIndex: number) => {
    const newTime = timeSlots[newTimeSlotIndex];
    toast.success(`Session rescheduled to ${newTime}`, {
      description: `Moved to vehicle slot successfully.`,
    });
  }, []);

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
            <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-md bg-card">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{selectedDate}</span>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline">Today</Button>
            <Button variant="secondary">Hybrid (Past actual, future planned)</Button>
            <Button className="gap-2" onClick={() => setScheduleDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Schedule Session
            </Button>
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

        {/* Draggable Schedule Grid */}
        <DraggableScheduleGrid
          vehicles={vehicles.slice(0, 12)}
          sessions={scheduleSessions}
          timeSlots={timeSlots}
          onSessionMove={handleSessionMove}
        />
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
