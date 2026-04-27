import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Sprout, Calendar, MapPin, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fields } from "@/data/mockData";
import { MoistureGauge } from "@/components/MoistureGauge";
import { WeatherStrip } from "@/components/WeatherStrip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const FieldDetail = () => {
  const { fieldId } = useParams();
  const navigate = useNavigate();
  const field = fields.find((f) => f.id === fieldId);

  if (!field) {
    return (
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">Field not found</p>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const chartData = field.predictions.map((p) => ({
    day: p.dayLabel,
    irrigation: p.irrigationMm,
    rainfall: p.rainfallMm,
  }));

  const totalIrrigation = field.predictions.reduce((s, p) => s + p.irrigationMm, 0);

  return (
    <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <Button variant="ghost" onClick={() => navigate(field.farmId ? `/farm/${field.farmId}` : "/dashboard")} className="gap-2 -ml-2 mb-3">
          <ArrowLeft size={16} />
          Back to Farm
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-display font-bold">{field.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Sprout size={14} className="text-primary" />
                {field.cropType}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                {field.soilType} · {field.areaHectares} ha
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-primary" />
                Planted {new Date(field.plantingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Moisture Gauge */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <Droplets size={16} className="text-info" />
                Soil Moisture
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center pt-2">
              <div className="relative">
                <MoistureGauge percent={field.moisturePercent} />
              </div>
            </CardContent>
          </Card>

          {/* Today's Summary */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">7-Day Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 py-2">
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-info">{totalIrrigation}mm</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Irrigation Needed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-primary">
                    {field.predictions.reduce((s, p) => s + p.rainfallMm, 0)}mm
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Expected Rainfall</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-display font-bold">
                    {Math.round(field.predictions.reduce((s, p) => s + p.tempHigh, 0) / 7)}°C
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Avg High Temp</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prediction Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              AI Irrigation Prediction
              <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                Next 7 Days
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="hsl(var(--muted-foreground))"
                    label={{
                      value: "mm",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 12, fill: "hsl(var(--muted-foreground))" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      fontSize: 13,
                    }}
                    formatter={(value: number, name: string) => [
                      `${value}mm`,
                      name === "irrigation" ? "Irrigation Needed" : "Rainfall",
                    ]}
                  />
                  <Bar dataKey="irrigation" radius={[6, 6, 0, 0]} name="irrigation">
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          entry.irrigation >= 15
                            ? "hsl(var(--warning))"
                            : entry.irrigation >= 8
                            ? "hsl(var(--info))"
                            : "hsl(var(--primary))"
                        }
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="rainfall" radius={[6, 6, 0, 0]} fill="hsl(var(--primary) / 0.3)" name="rainfall" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weather Strip */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-base">7-Day Weather Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <WeatherStrip predictions={field.predictions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FieldDetail;
