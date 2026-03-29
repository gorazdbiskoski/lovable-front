import { AlertTriangle, Droplets, Snowflake, CheckCircle } from "lucide-react";
import { AlertItem } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const iconMap = {
  heat: AlertTriangle,
  frost: Snowflake,
  water: Droplets,
  optimal: CheckCircle,
};

const styleMap = {
  high: "border-l-4 border-l-destructive bg-destructive/5",
  medium: "border-l-4 border-l-warning bg-warning/5",
  low: "border-l-4 border-l-optimal bg-optimal/5",
};

const iconColorMap = {
  heat: "text-destructive",
  frost: "text-info",
  water: "text-warning",
  optimal: "text-optimal",
};

export function AlertCard({ alert }: { alert: AlertItem }) {
  const navigate = useNavigate();
  const Icon = iconMap[alert.type];

  return (
    <button
      onClick={() => navigate(`/field/${alert.fieldId}`)}
      className={`w-full text-left rounded-lg p-4 transition-all hover:shadow-md ${styleMap[alert.severity]}`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${iconColorMap[alert.type]}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-sm font-semibold font-display truncate">
              {alert.fieldName}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {alert.timestamp}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {alert.message}
          </p>
        </div>
      </div>
    </button>
  );
}
