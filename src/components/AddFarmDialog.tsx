import { useState } from "react";
import { Sparkles, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationPickerMap } from "./LocationPickerMap";
import { toast } from "sonner";

interface AddFarmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddFarmDialog({ open, onOpenChange }: AddFarmDialogProps) {
  const [name, setName] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Please enter a farm name");
      return;
    }
    if (!coords) {
      toast.error("Please select a location on the map");
      return;
    }
    // Backend integration: POST { name, latitude: coords.lat, longitude: coords.lng }
    toast.success(`Farm "${name}" registered at ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
    onOpenChange(false);
    setName("");
    setCoords(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Add New Farm</DialogTitle>
          <DialogDescription>
            Register a farm location. Weather forecasts will be pulled using its coordinates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="farmName">Farm Name</Label>
            <Input
              id="farmName"
              placeholder="e.g. Green Valley Estate"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin size={14} className="text-primary" />
              Click on the map to set the farm location
            </Label>
            <LocationPickerMap value={coords} onChange={setCoords} />
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-md bg-secondary px-3 py-2 text-sm">
                <span className="text-muted-foreground">Latitude:</span>{" "}
                <span className="font-medium">{coords ? coords.lat.toFixed(5) : "—"}</span>
              </div>
              <div className="rounded-md bg-secondary px-3 py-2 text-sm">
                <span className="text-muted-foreground">Longitude:</span>{" "}
                <span className="font-medium">{coords ? coords.lng.toFixed(5) : "—"}</span>
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full gap-2" size="lg">
            <Sparkles size={18} />
            Register Farm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
