import { useState } from "react";
import { MapPin, Sparkles, CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddFieldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmId: string;
  farmName: string;
}

export function AddFieldDialog({ open, onOpenChange, farmId, farmName }: AddFieldDialogProps) {
  const [fieldName, setFieldName] = useState("");
  const [cropType, setCropType] = useState("");
  const [soilType, setSoilType] = useState("");
  const [plantingDate, setPlantingDate] = useState<Date>();

  const handleSubmit = () => {
    if (!fieldName || !cropType || !soilType || !plantingDate) {
      toast.error("Please fill in all fields");
      return;
    }
    // Backend integration: POST { farmId, fieldName, cropType, soilType, plantingDate }
    toast.success(`AI baseline generated for "${fieldName}" on ${farmName}!`);
    onOpenChange(false);
    setFieldName("");
    setCropType("");
    setSoilType("");
    setPlantingDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Add Field to {farmName}</DialogTitle>
          <DialogDescription>
            Register a field for AI-powered irrigation tracking and predictions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="fieldName">Field Name</Label>
            <Input
              id="fieldName"
              placeholder="e.g. North Potato Plot"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Crop Type</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger><SelectValue placeholder="Select crop" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Potato">Potato</SelectItem>
                  <SelectItem value="Corn">Corn</SelectItem>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Tomato">Tomato</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Soil Type</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger><SelectValue placeholder="Select soil" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sandy">Sandy</SelectItem>
                  <SelectItem value="Loam">Loam</SelectItem>
                  <SelectItem value="Clay">Clay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Planting Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !plantingDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {plantingDate ? format(plantingDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={plantingDate}
                  onSelect={setPlantingDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="rounded-lg border-2 border-dashed border-muted-foreground/20 p-6 flex flex-col items-center justify-center gap-1.5 text-muted-foreground">
            <MapPin size={28} className="opacity-40" />
            <span className="text-sm font-medium">Select Field Boundaries</span>
            <span className="text-xs">(Map drawing coming soon)</span>
          </div>

          <Button onClick={handleSubmit} className="w-full gap-2" size="lg">
            <Sparkles size={18} />
            Generate AI Baseline
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
