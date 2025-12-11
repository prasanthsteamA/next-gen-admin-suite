import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { SocBadge } from "@/components/dashboard/SocBadge";
import { GripVertical, Clock } from "lucide-react";
import { Vehicle, ScheduleSession } from "@/types/fleet";

interface DraggableScheduleGridProps {
  vehicles: Vehicle[];
  sessions: ScheduleSession[];
  timeSlots: string[];
  onSessionMove?: (sessionId: string, newVehicleId: string, newTimeSlotIndex: number) => void;
  onEmptyCellClick?: (vehicleId: string, vehicleVrn: string, timeSlot: string, timeSlotIndex: number) => void;
}

interface DragItem {
  sessionId: string;
  vehicleId: string;
  timeSlotIndex: number;
}

export function DraggableScheduleGrid({ 
  vehicles, 
  sessions, 
  timeSlots,
  onSessionMove,
  onEmptyCellClick
}: DraggableScheduleGridProps) {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dropTarget, setDropTarget] = useState<{ vehicleId: string; timeSlotIndex: number } | null>(null);
  const [localSessions, setLocalSessions] = useState(sessions);

  const getSessionForCell = useCallback((vehicleId: string, timeSlotIndex: number) => {
    return localSessions.find(s => {
      if (s.vehicleId !== vehicleId) return false;
      const sessionHour = parseInt(s.startTime.split(':')[0]);
      const slotHour = parseInt(timeSlots[timeSlotIndex].split(':')[0]);
      return sessionHour === slotHour;
    });
  }, [localSessions, timeSlots]);

  const handleDragStart = (e: React.DragEvent, sessionId: string, vehicleId: string, timeSlotIndex: number) => {
    setDraggedItem({ sessionId, vehicleId, timeSlotIndex });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', sessionId);
  };

  const handleDragOver = (e: React.DragEvent, vehicleId: string, timeSlotIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTarget({ vehicleId, timeSlotIndex });
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (e: React.DragEvent, vehicleId: string, timeSlotIndex: number) => {
    e.preventDefault();
    
    if (draggedItem) {
      // Update session with new position
      const newStartTime = timeSlots[timeSlotIndex];
      setLocalSessions(prev => prev.map(s => 
        s.id === draggedItem.sessionId 
          ? { ...s, vehicleId, startTime: newStartTime }
          : s
      ));
      
      onSessionMove?.(draggedItem.sessionId, vehicleId, timeSlotIndex);
    }
    
    setDraggedItem(null);
    setDropTarget(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropTarget(null);
  };

  const getSessionColor = (session: ScheduleSession) => {
    if (session.status === 'conflict') return 'bg-destructive/20 border-l-destructive';
    if (session.type === 'dc') return 'bg-info/20 border-l-info';
    return 'bg-primary/20 border-l-primary';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 font-semibold bg-muted/50 min-w-[220px] sticky left-0 z-10">
                Resources
              </th>
              {timeSlots.map((time) => (
                <th key={time} className="text-left p-3 font-semibold min-w-[160px] border-l border-border/50">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    {time}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-b border-border hover:bg-muted/20">
                <td className="p-3 bg-muted/30 sticky left-0 z-10">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{vehicle.vrn}</p>
                      <p className="text-xs text-muted-foreground">{vehicle.model}</p>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded",
                      vehicle.priority === "high" ? "bg-destructive/10 text-destructive" :
                      vehicle.priority === "medium" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
                    )}>
                      {vehicle.priority.charAt(0).toUpperCase() + vehicle.priority.slice(1)}
                    </span>
                    <SocBadge value={vehicle.soc} size="sm" />
                  </div>
                </td>
                {timeSlots.map((time, idx) => {
                  const session = getSessionForCell(vehicle.id, idx);
                  const isDropTarget = dropTarget?.vehicleId === vehicle.id && dropTarget?.timeSlotIndex === idx;
                  const isDragging = draggedItem?.vehicleId === vehicle.id && draggedItem?.timeSlotIndex === idx;
                  
                  return (
                    <td 
                      key={`${vehicle.id}-${time}`} 
                      className={cn(
                        "p-1 relative h-20 border-l border-border/50 transition-colors",
                        isDropTarget && "bg-primary/10",
                        !session && "hover:bg-muted/30 cursor-pointer"
                      )}
                      onDragOver={(e) => handleDragOver(e, vehicle.id, idx)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, vehicle.id, idx)}
                      onClick={() => {
                        if (!session) {
                          onEmptyCellClick?.(vehicle.id, vehicle.vrn, time, idx);
                        }
                      }}
                    >
                      {session && (
                        <div 
                          draggable
                          onDragStart={(e) => handleDragStart(e, session.id, vehicle.id, idx)}
                          onDragEnd={handleDragEnd}
                          className={cn(
                            "absolute inset-y-1 left-1 right-1 border-l-4 rounded-r px-2 py-1 cursor-grab active:cursor-grabbing transition-all",
                            getSessionColor(session),
                            isDragging && "opacity-50 scale-95",
                            "hover:shadow-md group"
                          )}
                        >
                          <div className="flex items-start gap-1">
                            <GripVertical className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium truncate">{session.location}</div>
                              <div className="text-[10px] text-muted-foreground truncate">
                                Own • {session.connector}
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <span className={cn(
                                  "text-[9px] px-1 py-0.5 rounded font-medium",
                                  session.type === 'dc' ? "bg-info/30 text-info" : "bg-primary/30 text-primary"
                                )}>
                                  {session.type.toUpperCase()}
                                </span>
                                <span className="text-[9px] text-muted-foreground">
                                  {session.power}
                                </span>
                              </div>
                              <div className="text-[9px] text-muted-foreground mt-0.5">
                                {session.startSoc}% → {session.endSoc}%
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Drop indicator */}
                      {isDropTarget && !session && (
                        <div className="absolute inset-1 border-2 border-dashed border-primary rounded-md flex items-center justify-center">
                          <span className="text-xs text-primary font-medium">Drop here</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="p-3 border-t border-border bg-muted/30 flex items-center gap-6 text-xs">
        <span className="font-medium text-muted-foreground">Legend:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-info/30 border-l-2 border-info rounded-r" />
          <span>DC Charging</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary/30 border-l-2 border-primary rounded-r" />
          <span>AC Charging</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-destructive/20 border-l-2 border-destructive rounded-r" />
          <span>Conflict</span>
        </div>
        <span className="ml-auto text-muted-foreground">
          <GripVertical className="inline h-3 w-3 mr-1" />
          Drag sessions to reschedule
        </span>
      </div>
    </div>
  );
}
