import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Settings() {
  const [clientName, setClientName] = useState("iris fleet");
  const [defaultRole, setDefaultRole] = useState<"fleet" | "hub">("fleet");

  return (
    <AppLayout breadcrumb={[{ label: "Settings" }]}>
      <div className="space-y-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>

        {/* Branding Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Branding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client name</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="w-28 h-28 bg-sidebar rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                  <span className="text-sidebar-foreground/70 text-sm">Upload logo</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Defaults Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Defaults</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Default role</Label>
              <div className="flex gap-2">
                <Button
                  variant={defaultRole === "fleet" ? "default" : "outline"}
                  onClick={() => setDefaultRole("fleet")}
                  className={cn(
                    defaultRole === "fleet" && "bg-muted text-foreground hover:bg-muted/80"
                  )}
                >
                  Fleet manager
                </Button>
                <Button
                  variant={defaultRole === "hub" ? "default" : "outline"}
                  onClick={() => setDefaultRole("hub")}
                  className={cn(
                    defaultRole === "hub" && "bg-muted text-foreground hover:bg-muted/80"
                  )}
                >
                  Hub manager
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
