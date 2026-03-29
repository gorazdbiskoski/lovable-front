import { Sprout, Droplets, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FieldData } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const statusConfig = {
  optimal: { label: "Optimal", dotClass: "bg-optimal", bgClass: "bg-optimal/10 text-optimal" },
  warning: { label: "Needs Water", dotClass: "bg-warning", bgClass: "bg-warning/10 text-warning-foreground" },
  critical: { label: "Critical", dotClass: "bg-destructive", bgClass: "bg-destructive/10 text-destructive" },
};

export function FieldCard({ field }: { field: FieldData }) {
  const navigate = useNavigate();
  const status = statusConfig[field.status];
  const todayPrediction = field.predictions[0];

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30 group"
      onClick={() => navigate(`/field/${field.id}`)}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-base group-hover:text-primary transition-colors">
              {field.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {field.areaHectares} ha
            </p>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.bgClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dotClass}`} />
            {status.label}
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-sm">
            <Sprout size={15} className="text-primary" />
            <span className="text-muted-foreground">Crop:</span>
            <span className="font-medium">{field.cropType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={15} className="text-primary" />
            <span className="text-muted-foreground">Soil:</span>
            <span className="font-medium">{field.soilType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Droplets size={15} className="text-info" />
            <span className="text-muted-foreground">Moisture:</span>
            <span className="font-medium">{field.moisturePercent}%</span>
          </div>
        </div>

        {todayPrediction && todayPrediction.irrigationMm > 0 && (
          <div className="mt-4 pt-3 border-t flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Today's irrigation</span>
            <span className="text-sm font-semibold text-info">{todayPrediction.irrigationMm}mm</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
