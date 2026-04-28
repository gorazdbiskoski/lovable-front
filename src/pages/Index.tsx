import { CloudSun, Bell, Droplet, Wheat, TrendingUp, Warehouse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FarmCard } from "@/components/FarmCard";
import { AlertCard } from "@/components/AlertCard";
import { farms, alerts, fields } from "@/data/mockData";
import { authStorage } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const user = authStorage.getUser();
  const firstName = user?.fullName?.split(" ")[0] ?? "Farmer";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold">
            Good morning, {firstName} 👋
          </h1>
          <p className="text-muted-foreground mt-1">{today}</p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-secondary px-4 py-2 rounded-full">
          <CloudSun size={18} className="text-primary" />
          <span className="font-medium">{farms.length} farms tracked</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Water Savings", value: "40%", icon: Droplet },
          { label: "Active Fields", value: String(fields.length), icon: Wheat },
          { label: "Managed Farms", value: String(farms.length), icon: Warehouse },
          { label: "Yield Boost", value: "+18%", icon: TrendingUp },
        ].map((stat) => (
          <Card key={stat.label} className="border shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                <stat.icon size={22} />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-display font-bold leading-none">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Bell size={18} className="text-warning" />
            AI Insights & Alerts
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/alerts")}>
            View all
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Farms Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold">Your Farms</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate("/farms")}>
            View all
          </Button>
        </div>
        {farms.length === 0 ? (
          <Card>
            <CardContent className="py-12 flex flex-col items-center gap-3 text-center">
              <p className="text-muted-foreground">No farms yet. Add your first farm to start tracking.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {farms.map((farm) => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
