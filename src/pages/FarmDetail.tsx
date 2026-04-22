import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Plus, Sprout, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { farms, fields as allFields } from "@/data/mockData";
import { FieldCard } from "@/components/FieldCard";
import { WeatherStrip } from "@/components/WeatherStrip";
import { AddFieldDialog } from "@/components/AddFieldDialog";
import { fetchForecast, WeatherForecastDay } from "@/lib/weather";
import { toast } from "sonner";

const FarmDetail = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();
  const farm = farms.find((f) => f.id === farmId);
  const farmFields = allFields.filter((f) => f.farmId === farmId);

  const [addFieldOpen, setAddFieldOpen] = useState(false);
  const [forecast, setForecast] = useState<WeatherForecastDay[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!farm) return;
    setLoading(true);
    fetchForecast(farm.latitude, farm.longitude)
      .then(setForecast)
      .catch(() => toast.error("Could not load weather forecast"))
      .finally(() => setLoading(false));
  }, [farm]);

  if (!farm) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">Farm not found</p>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const today = forecast?.[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="gap-2 -ml-2 mb-3">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-display font-bold">{farm.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-primary" />
                  {farm.locationLabel ?? "Custom location"}
                </span>
                <span className="font-mono text-xs">
                  {farm.latitude.toFixed(4)}, {farm.longitude.toFixed(4)}
                </span>
              </div>
            </div>
            <Button onClick={() => setAddFieldOpen(true)} className="gap-2">
              <Plus size={16} />
              Add Field
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Today summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">Today</CardTitle>
            </CardHeader>
            <CardContent>
              {loading || !today ? (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 size={16} className="animate-spin" /> Loading…
                </div>
              ) : (
                <div>
                  <p className="text-3xl font-display font-bold">{today.tempHigh}°C</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {today.weatherLabel} · Low {today.tempLow}°C
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-display font-bold text-primary flex items-center gap-2">
                <Sprout size={24} /> {farmFields.length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {farmFields.reduce((s, f) => s + f.areaHectares, 0).toFixed(1)} hectares total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">7-Day Rainfall</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-display font-bold text-info">
                {forecast ? `${forecast.reduce((s, d) => s + d.rainfallMm, 0)}mm` : "—"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">From live forecast</p>
            </CardContent>
          </Card>
        </div>

        {/* Weather */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-base">7-Day Weather Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-10 text-muted-foreground gap-2">
                <Loader2 size={18} className="animate-spin" /> Fetching forecast…
              </div>
            ) : forecast ? (
              <WeatherStrip predictions={forecast} />
            ) : (
              <p className="text-sm text-muted-foreground">No forecast available.</p>
            )}
          </CardContent>
        </Card>

        {/* Fields */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold">Fields on this farm</h2>
            <span className="text-sm text-muted-foreground">{farmFields.length} fields</span>
          </div>
          {farmFields.length === 0 ? (
            <Card>
              <CardContent className="py-10 flex flex-col items-center gap-3 text-center">
                <p className="text-muted-foreground">No fields yet for this farm.</p>
                <Button onClick={() => setAddFieldOpen(true)} className="gap-2">
                  <Plus size={16} /> Add Field
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {farmFields.map((field) => (
                <FieldCard key={field.id} field={field} />
              ))}
            </div>
          )}
        </div>
      </main>

      <AddFieldDialog
        open={addFieldOpen}
        onOpenChange={setAddFieldOpen}
        farmId={farm.id}
        farmName={farm.name}
      />
    </div>
  );
};

export default FarmDetail;
