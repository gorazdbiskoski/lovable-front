import { Sun, Cloud, CloudRain, CloudLightning, CloudSun } from "lucide-react";
import { DayPrediction } from "@/data/mockData";

const weatherIcons = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  storm: CloudLightning,
  "partly-cloudy": CloudSun,
};

export function WeatherStrip({ predictions }: { predictions: DayPrediction[] }) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {predictions.map((day) => {
        const Icon = weatherIcons[day.weatherIcon];
        return (
          <div
            key={day.date}
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-secondary/50 text-center"
          >
            <span className="text-xs font-medium text-muted-foreground">
              {day.dayLabel}
            </span>
            <Icon size={22} className="text-primary" />
            <span className="text-xs font-semibold">
              {day.tempHigh}° / {day.tempLow}°
            </span>
            {day.rainfallMm > 0 && (
              <span className="text-[10px] text-info font-medium">
                {day.rainfallMm}mm rain
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
