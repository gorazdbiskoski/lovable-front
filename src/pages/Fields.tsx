import { Card, CardContent } from "@/components/ui/card";
import { FieldCard } from "@/components/FieldCard";
import { farms, fields } from "@/data/mockData";
import { MapPin } from "lucide-react";

const Fields = () => {
  const farmsWithFields = farms
    .map((farm) => ({
      farm,
      fields: fields.filter((f) => f.farmId === farm.id),
    }))
    .filter((g) => g.fields.length > 0);

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold">All Fields</h1>
        <p className="text-muted-foreground mt-1">
          {fields.length} {fields.length === 1 ? "field" : "fields"} across {farms.length} {farms.length === 1 ? "farm" : "farms"}
        </p>
      </div>

      {farmsWithFields.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No fields yet. Open a farm to add your first field.
          </CardContent>
        </Card>
      ) : (
        farmsWithFields.map(({ farm, fields: ff }) => (
          <section key={farm.id} className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} className="text-primary" />
              <span className="font-display font-semibold text-foreground">{farm.name}</span>
              <span>·</span>
              <span>{ff.length} fields</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ff.map((field) => (
                <FieldCard key={field.id} field={field} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Fields;
