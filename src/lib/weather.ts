import { DayPrediction } from "@/data/mockData";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dayLabel(dateStr: string, idx: number): string {
  if (idx === 0) return "Today";
  if (idx === 1) return "Tomorrow";
  const d = new Date(dateStr);
  return dayNames[d.getDay()];
}

// WMO weather interpretation codes -> our icon set + label
function mapWeatherCode(code: number): { icon: DayPrediction["weatherIcon"]; label: string } {
  if (code === 0) return { icon: "sun", label: "Clear" };
  if ([1, 2].includes(code)) return { icon: "partly-cloudy", label: "Partly Cloudy" };
  if (code === 3) return { icon: "cloud", label: "Overcast" };
  if ([45, 48].includes(code)) return { icon: "cloud", label: "Fog" };
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: "rain", label: "Drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: "rain", label: "Rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: "cloud", label: "Snow" };
  if ([95, 96, 99].includes(code)) return { icon: "storm", label: "Thunderstorm" };
  return { icon: "cloud", label: "Cloudy" };
}

export interface WeatherForecastDay {
  date: string;
  dayLabel: string;
  tempHigh: number;
  tempLow: number;
  rainfallMm: number;
  weatherIcon: DayPrediction["weatherIcon"];
  weatherLabel: string;
}

export async function fetchForecast(
  latitude: number,
  longitude: number,
): Promise<WeatherForecastDay[]> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  const data = await res.json();
  const d = data.daily;
  return d.time.map((date: string, i: number) => {
    const m = mapWeatherCode(d.weather_code[i]);
    return {
      date,
      dayLabel: dayLabel(date, i),
      tempHigh: Math.round(d.temperature_2m_max[i]),
      tempLow: Math.round(d.temperature_2m_min[i]),
      rainfallMm: Math.round(d.precipitation_sum[i] ?? 0),
      weatherIcon: m.icon,
      weatherLabel: m.label,
    };
  });
}
