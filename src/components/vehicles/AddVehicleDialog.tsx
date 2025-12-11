import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (vehicle: any) => void;
}

const makes = ["Tata Motors", "Mahindra", "BYD", "Eicher"];

export function AddVehicleDialog({ open, onOpenChange, onAdd }: AddVehicleDialogProps) {
  const [form, setForm] = useState({
    name: "",
    make: "",
    model: "",
    acMaxPower: "7",
    dcMaxPower: "50",
    v2gEnabled: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      name: "",
      make: "",
      model: "",
      acMaxPower: "7",
      dcMaxPower: "50",
      v2gEnabled: false,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              <span className="text-destructive">*</span> Vehicle Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., Fleet Tata Ace EV"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="make">
              <span className="text-destructive">*</span> Make (Brand)
            </Label>
            <Select value={form.make} onValueChange={(v) => setForm({ ...form, make: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                {makes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">
              <span className="text-destructive">*</span> Model
            </Label>
            <Input
              id="model"
              placeholder="e.g., Ace EV"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="acPower">
              <span className="text-destructive">*</span> AC Max Power (kW)
            </Label>
            <Input
              id="acPower"
              type="number"
              value={form.acMaxPower}
              onChange={(e) => setForm({ ...form, acMaxPower: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dcPower">
              <span className="text-destructive">*</span> DC Max Power (kW)
            </Label>
            <Input
              id="dcPower"
              type="number"
              value={form.dcMaxPower}
              onChange={(e) => setForm({ ...form, dcMaxPower: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="v2g">V2G Enabled</Label>
            <Switch
              id="v2g"
              checked={form.v2gEnabled}
              onCheckedChange={(checked) => setForm({ ...form, v2gEnabled: checked })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Vehicle</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
