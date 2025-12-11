import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ChargingSession {
  id: string;
  transactionId: string;
  startedAt: string;
  endedAt: string;
  vrn: string;
  direction: "to-vehicle" | "to-grid";
  station: string;
  chargerConnector: string;
  roaming: boolean;
  duration: string;
  startSoc: number;
  endSoc: number;
  startedBy: string;
}

const mockSessions: ChargingSession[] = [
  { id: "1", transactionId: "sess-2025-12-11...", startedAt: "11 Dec 2025, 12:15", endedAt: "11 Dec 2025, 14:45", vrn: "VEH-004", direction: "to-vehicle", station: "City Center Overnight Yard", chargerConnector: "10004 • Connector 4", roaming: false, duration: "4h 28m", startSoc: 82, endSoc: 100, startedBy: "System" },
  { id: "2", transactionId: "sess-2025-12-11...", startedAt: "11 Dec 2025, 20:15", endedAt: "11 Dec 2025, 22:45", vrn: "VEH-004", direction: "to-vehicle", station: "City Center Overnight Yard", chargerConnector: "10005 • Connector 5", roaming: false, duration: "2h 30m", startSoc: 82, endSoc: 100, startedBy: "System" },
  { id: "3", transactionId: "sess-v2g-001", startedAt: "11 Dec 2025, 15:30", endedAt: "11 Dec 2025, 17:00", vrn: "VEH-001", direction: "to-grid", station: "Coimbatore Hub", chargerConnector: "10001 • Connector 1", roaming: false, duration: "1h 12m", startSoc: 85, endSoc: 61, startedBy: "System" },
  { id: "4", transactionId: "sess-v2g-004", startedAt: "11 Dec 2025, 15:15", endedAt: "11 Dec 2025, 16:15", vrn: "VEH-004", direction: "to-grid", station: "Coimbatore Hub", chargerConnector: "10006 • Connector 6", roaming: false, duration: "1h 27m", startSoc: 82, endSoc: 37, startedBy: "System" },
  { id: "5", transactionId: "sess-2025-12-11...", startedAt: "11 Dec 2025, 18:00", endedAt: "11 Dec 2025, 20:00", vrn: "VEH-007", direction: "to-vehicle", station: "Airport Logistics Depot", chargerConnector: "10007 • Connector 7", roaming: false, duration: "2h 0m", startSoc: 36, endSoc: 48, startedBy: "System" },
  { id: "6", transactionId: "sess-2025-12-11...", startedAt: "12 Dec 2025, 02:00", endedAt: "12 Dec 2025, 04:00", vrn: "VEH-007", direction: "to-vehicle", station: "Airport Logistics Depot", chargerConnector: "10008 • Connector 8", roaming: false, duration: "2h 0m", startSoc: 36, endSoc: 100, startedBy: "System" },
  { id: "7", transactionId: "sess-2025-12-11...", startedAt: "11 Dec 2025, 23:45", endedAt: "12 Dec 2025, 01:15", vrn: "VEH-010", direction: "to-vehicle", station: "Industrial Zone Hub", chargerConnector: "10010 • Connector 2", roaming: false, duration: "1h 30m", startSoc: 34, endSoc: 55, startedBy: "System" },
  { id: "8", transactionId: "sess-2025-12-11...", startedAt: "11 Dec 2025, 07:45", endedAt: "11 Dec 2025, 09:15", vrn: "VEH-010", direction: "to-vehicle", station: "Industrial Zone Hub", chargerConnector: "10011 • Connector 3", roaming: false, duration: "8h 58m", startSoc: 34, endSoc: 100, startedBy: "System" },
  { id: "9", transactionId: "sess-2025-12-11...", startedAt: "11 Dec 2025, 05:30", endedAt: "11 Dec 2025, 06:30", vrn: "VEH-013", direction: "to-vehicle", station: "North Ring Road Hub", chargerConnector: "10013 • Connector 5", roaming: false, duration: "11h 13m", startSoc: 74, endSoc: 100, startedBy: "System" },
  { id: "10", transactionId: "sess-2025-12-11...", startedAt: "11 Dec 2025, 13:30", endedAt: "11 Dec 2025, 14:30", vrn: "VEH-013", direction: "to-vehicle", station: "North Ring Road Hub", chargerConnector: "10014 • Connector 6", roaming: false, duration: "3h 13m", startSoc: 74, endSoc: 100, startedBy: "System" },
  { id: "11", transactionId: "sess-2025-12-11...", startedAt: "11 Dec 2025, 18:00", endedAt: "11 Dec 2025, 20:00", vrn: "VEH-019", direction: "to-vehicle", station: "City Center Overnight Yard", chargerConnector: "10019 • Connector 3", roaming: false, duration: "2h 0m", startSoc: 60, endSoc: 100, startedBy: "System" },
];

type TabType = "active" | "interrupted" | "completed";

export default function Charging() {
  const [activeTab, setActiveTab] = useState<TabType>("active");

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: "active", label: "Active", count: 45 },
    { id: "interrupted", label: "Interrupted", count: 21 },
    { id: "completed", label: "Completed", count: 19 },
  ];

  return (
    <AppLayout breadcrumb={[{ label: "Fleet", path: "/" }, { label: "Charging-sessions" }]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Charging Sessions</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label} ({tab.count})
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Id</TableHead>
                <TableHead>Session Started at</TableHead>
                <TableHead>VRN</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Charging Station</TableHead>
                <TableHead>Charger & Connector</TableHead>
                <TableHead>Roaming</TableHead>
                <TableHead>Charge Duration</TableHead>
                <TableHead>Start & Current SoC (%)</TableHead>
                <TableHead>Started by</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium text-sm">{session.transactionId}</TableCell>
                  <TableCell>
                    <div className="text-sm">{session.startedAt}</div>
                    <div className="text-xs text-muted-foreground">Ended: {session.endedAt}</div>
                  </TableCell>
                  <TableCell className="font-medium">{session.vrn}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        session.direction === "to-vehicle"
                          ? "bg-info/10 text-info border-info/30"
                          : "bg-destructive/10 text-destructive border-destructive/30"
                      )}
                    >
                      {session.direction === "to-vehicle" ? "To Vehicle" : "To Grid"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{session.station}</TableCell>
                  <TableCell className="text-sm">{session.chargerConnector}</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{session.roaming ? "Yes" : "No"}</span>
                  </TableCell>
                  <TableCell className="text-sm">{session.duration}</TableCell>
                  <TableCell className="text-sm">
                    {session.startSoc}% → {session.endSoc}%
                  </TableCell>
                  <TableCell className="text-sm">{session.startedBy}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm">
                      Stop Session
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
