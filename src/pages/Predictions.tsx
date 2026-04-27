import { TrendingUp, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { farms, fields } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const Predictions = () => {
  const navigate = useNavigate();

  const totalIrrigation = fields.reduce(
    (s, f) => s + f.predictions.reduce((a, p) => a + p.irrigationMm, 0),
    0,
  );
  const totalRainfall = fields.reduce(
    (s, f) => s + f.predictions.reduce((a, p) => a + p.rainfallMm, 0),
    0,
  );

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold flex items-center gap-2">
          <TrendingUp className="text-primary" /> Predictions
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-driven 7-day irrigation predictions across all your fields
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-display">Total Irrigation Needed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display font-bold text-info">{totalIrrigation}mm</p>
            <p className="text-xs text-muted-foreground mt-1">Next 7 days · all fields</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-display">Expected Rainfall</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display font-bold text-primary">{totalRainfall}mm</p>
            <p className="text-xs text-muted-foreground mt-1">Forecast aggregated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-display">Fields Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display font-bold">{fields.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Across {farms.length} farms</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {farms.map((farm) => {
          const farmFields = fields.filter((f) => f.farmId === farm.id);
          if (farmFields.length === 0) return null;
          return (
            <Card key={farm.id}>
              <CardHeader>
                <CardTitle className="font-display text-base">{farm.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {farmFields.map((field) => {
                    const total = field.predictions.reduce((s, p) => s + p.irrigationMm, 0);
                    return (
                      <button
                        key={field.id}
                        onClick={() => navigate(`/field/${field.id}`)}
                        className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border hover:border-primary/30 hover:bg-muted/40 transition-colors text-left"
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">{field.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {field.cropType} · {field.areaHectares} ha
                          </p>
                        </div>
                        <div className="flex gap-1.5">
                          {field.predictions.map((p) => {
                            const intensity =
                              p.irrigationMm >= 15
                                ? "bg-warning"
                                : p.irrigationMm >= 8
                                ? "bg-info"
                                : p.irrigationMm > 0
                                ? "bg-primary"
                                : "bg-muted";
                            return (
                              <div
                                key={p.date}
                                className="flex flex-col items-center gap-1"
                                title={`${p.dayLabel}: ${p.irrigationMm}mm`}
                              >
                                <div
                                  className={`w-6 rounded-sm ${intensity}`}
                                  style={{ height: `${Math.max(6, Math.min(40, p.irrigationMm * 1.8))}px` }}
                                />
                                <span className="text-[10px] text-muted-foreground">
                                  {p.dayLabel.slice(0, 3)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-1.5 text-info shrink-0 w-20 justify-end">
                          <Droplets size={14} />
                          <span className="font-semibold text-sm">{total}mm</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Predictions;
