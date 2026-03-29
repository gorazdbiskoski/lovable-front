import { useState } from "react";
import { CloudSun, Plus, Bell, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldCard } from "@/components/FieldCard";
import { AlertCard } from "@/components/AlertCard";
import { AddFieldDialog } from "@/components/AddFieldDialog";
import { fields, alerts } from "@/data/mockData";

const Index = () => {
  const [addFieldOpen, setAddFieldOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Leaf size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">SmartDrop</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {alerts.filter((a) => a.severity === "high").length}
              </span>
            </Button>
            <Button onClick={() => setAddFieldOpen(true)} className="gap-2">
              <Plus size={16} />
              Add Field
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">
              Good morning, Farmer 👋
            </h1>
            <p className="text-muted-foreground mt-1">{today}</p>
          </div>
          <div className="flex items-center gap-2 text-sm bg-secondary px-4 py-2 rounded-full">
            <CloudSun size={18} className="text-primary" />
            <span className="font-medium">Partly Cloudy, 24°C</span>
          </div>
        </div>

        {/* Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Bell size={18} className="text-warning" />
              AI Insights & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fields Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold">Your Fields</h2>
            <span className="text-sm text-muted-foreground">{fields.length} active fields</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        </div>
      </main>

      <AddFieldDialog open={addFieldOpen} onOpenChange={setAddFieldOpen} />
    </div>
  );
};

export default Index;
