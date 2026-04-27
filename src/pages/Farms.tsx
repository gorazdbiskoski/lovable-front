import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FarmCard } from "@/components/FarmCard";
import { AddFarmDialog } from "@/components/AddFarmDialog";
import { farms } from "@/data/mockData";

const Farms = () => {
  const [addFarmOpen, setAddFarmOpen] = useState(false);

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold">Your Farms</h1>
          <p className="text-muted-foreground mt-1">
            {farms.length} {farms.length === 1 ? "farm" : "farms"} tracked
          </p>
        </div>
        <Button onClick={() => setAddFarmOpen(true)} className="gap-2">
          <Plus size={16} /> Add Farm
        </Button>
      </div>

      {farms.length === 0 ? (
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-3 text-center">
            <p className="text-muted-foreground">No farms yet. Add your first farm to start tracking.</p>
            <Button onClick={() => setAddFarmOpen(true)} className="gap-2">
              <Plus size={16} /> Add Farm
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {farms.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      )}

      <AddFarmDialog open={addFarmOpen} onOpenChange={setAddFarmOpen} />
    </div>
  );
};

export default Farms;
