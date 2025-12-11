import { useState, useCallback } from "react";
import { format, addDays, subDays } from "date-fns";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react";
import { vehicles, scheduleSessions } from "@/data/mockData";
import { DraggableScheduleGrid } from "@/components/schedule/DraggableScheduleGrid";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const timeSlots = ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

export default function Schedule() {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 11, 11)); // Dec 11, 2025
  const [selectedVehicleVrn, setSelectedVehicleVrn] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSessionMove = useCallback((sessionId: string, newVehicleId: string, newTimeSlotIndex: number) => {
    const newTime = timeSlots[newTimeSlotIndex];
    toast.success(`Session rescheduled to ${newTime}`, {
      description: `Moved to vehicle slot successfully.`,
    });
  }, []);

  const handleEmptyCellClick = useCallback((vehicleId: string, vehicleVrn: string, timeSlot: string) => {
    setSelectedVehicleVrn(vehicleVrn);
    setSelectedTimeSlot(timeSlot);
    setScheduleDialogOpen(true);
  }, []);

  const handlePrevDay = () => setSelectedDate(prev => subDays(prev, 1));
  const handleNextDay = () => setSelectedDate(prev => addDays(prev, 1));
  const handleToday = () => setSelectedDate(new Date());

  return (
    <AppLayout breadcrumb={[{ label: "Fleet", path: "/" }, { label: "Charging-schedule" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Vehicle Charging Schedule</h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handlePrevDay}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 min-w-[220px]">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{format(selectedDate, "EEEE, d MMMM yyyy")}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setCalendarOpen(false);
                    }
                  }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <Button variant="ghost" size="icon" onClick={handleNextDay}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleToday}>Today</Button>
            <Button variant="secondary">Hybrid (Past actual, future planned)</Button>
            <Button className="gap-2" onClick={() => {
              setSelectedVehicleVrn("");
              setSelectedTimeSlot("");
              setScheduleDialogOpen(true);
            }}>
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
          onEmptyCellClick={handleEmptyCellClick}
        />
      </div>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Schedule Charging Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>
                <span className="text-destructive">*</span> Vehicle ID
              </Label>
              <Input 
                placeholder="e.g. TN38DV2027" 
                value={selectedVehicleVrn}
                onChange={(e) => setSelectedVehicleVrn(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>
                <span className="text-destructive">*</span> Date
              </Label>
              <Input 
                value={format(selectedDate, "EEEE, d MMMM yyyy")}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label>
                <span className="text-destructive">*</span> Start Time
              </Label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>
                <span className="text-destructive">*</span> Start SoC (%)
              </Label>
              <Input type="number" placeholder="e.g. 25" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast.success("Charging session scheduled", {
                  description: `${selectedVehicleVrn} at ${selectedTimeSlot}`,
                });
                setScheduleDialogOpen(false);
              }}>
                Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
