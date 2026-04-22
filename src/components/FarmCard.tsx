import { MapPin, Sprout, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FarmData, fields as allFields } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

export function FarmCard({ farm }: { farm: FarmData }) {
  const navigate = useNavigate();
  const farmFields = allFields.filter((f) => f.farmId === farm.id);
  const needsAttention = farmFields.filter((f) => f.status !== "optimal").length;

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30 group"
      onClick={() => navigate(`/farm/${farm.id}`)}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-base group-hover:text-primary transition-colors truncate">
              {farm.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <MapPin size={12} />
              {farm.locationLabel ?? `${farm.latitude.toFixed(3)}, ${farm.longitude.toFixed(3)}`}
            </p>
          </div>
          <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t">
          <div>
            <p className="text-2xl font-display font-bold text-primary flex items-center gap-1.5">
              <Sprout size={18} />
              {farmFields.length}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Fields</p>
          </div>
          <div>
            <p className={`text-2xl font-display font-bold ${needsAttention > 0 ? "text-warning" : "text-optimal"}`}>
              {needsAttention}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Need attention</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
