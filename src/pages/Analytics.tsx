import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const costTrendsData = [
  { day: "D1", cost: 800 },
  { day: "D2", cost: 870 },
  { day: "D3", cost: 890 },
  { day: "D4", cost: 920 },
  { day: "D5", cost: 940 },
  { day: "D6", cost: 980 },
  { day: "D7", cost: 1020 },
];

const downtimeData = [
  { day: "D1", downtime: 120 },
  { day: "D2", downtime: 118 },
  { day: "D3", downtime: 105 },
  { day: "D4", downtime: 110 },
  { day: "D5", downtime: 100 },
  { day: "D6", downtime: 95 },
  { day: "D7", downtime: 78 },
];

export default function Analytics() {
  return (
    <AppLayout breadcrumb={[{ label: "Fleet", path: "/" }, { label: "Reports" }]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Cost trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => value.toString()}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      stroke="hsl(var(--info))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--info))", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Downtime Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Downtime analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={downtimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="downtime"
                      stroke="hsl(var(--warning))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Depot Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Depot analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Static mock cards summarising utilisation and congestion.
              </p>
            </CardContent>
          </Card>

          {/* V2G Contribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">V2G contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Placeholder chart for export/import energy and revenue.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
