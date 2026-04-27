import { useState } from "react";
import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCard } from "@/components/AlertCard";
import { alerts } from "@/data/mockData";

type Filter = "all" | "high" | "medium" | "low";

const Alerts = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.severity === filter);

  const counts = {
    all: alerts.length,
    high: alerts.filter((a) => a.severity === "high").length,
    medium: alerts.filter((a) => a.severity === "medium").length,
    low: alerts.filter((a) => a.severity === "low").length,
  };

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "high", label: "High" },
    { key: "medium", label: "Medium" },
    { key: "low", label: "Low" },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold flex items-center gap-2">
          <Bell className="text-warning" /> Alerts
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-driven irrigation and weather alerts across your fields
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.key)}
            className="gap-2"
          >
            {f.label}
            <span className="text-xs opacity-80">({counts[f.key]})</span>
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No alerts in this category.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;
