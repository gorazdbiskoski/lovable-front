export interface FieldData {
  id: string;
  farmId: string;
  name: string;
  cropType: string;
  soilType: string;
  plantingDate: string;
  moisturePercent: number;
  status: "optimal" | "warning" | "critical";
  areaHectares: number;
  predictions: DayPrediction[];
}

export interface FarmData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  locationLabel?: string;
}

export interface DayPrediction {
  date: string;
  dayLabel: string;
  irrigationMm: number;
  tempHigh: number;
  tempLow: number;
  rainfallMm: number;
  weatherIcon: "sun" | "cloud" | "rain" | "storm" | "partly-cloudy";
  weatherLabel: string;
}

export interface AlertItem {
  id: string;
  fieldId: string;
  fieldName: string;
  type: "heat" | "frost" | "water" | "optimal";
  severity: "high" | "medium" | "low";
  message: string;
  timestamp: string;
}

const today = new Date();
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDayLabel(offset: number): string {
  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return dayNames[d.getDay()];
}

function getDateStr(offset: number): string {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

export const farms: FarmData[] = [
  { id: "farm-green-valley", name: "Green Valley Estate", latitude: 40.7128, longitude: -74.006, locationLabel: "New York, USA" },
  { id: "farm-sunrise", name: "Sunrise Ridge Farm", latitude: 36.7783, longitude: -119.4179, locationLabel: "California, USA" },
  { id: "farm-meadowbrook", name: "Meadowbrook Acres", latitude: 52.3676, longitude: 4.9041, locationLabel: "Amsterdam, NL" },
];

export const fields: FieldData[] = [
  {
    id: "north-potato",
    farmId: "farm-green-valley",
    name: "North Potato Plot",
    cropType: "Potato",
    soilType: "Loam",
    plantingDate: "2026-02-15",
    moisturePercent: 34,
    status: "warning",
    areaHectares: 12.5,
    predictions: [
      { date: getDateStr(0), dayLabel: getDayLabel(0), irrigationMm: 15, tempHigh: 32, tempLow: 18, rainfallMm: 0, weatherIcon: "sun", weatherLabel: "Sunny" },
      { date: getDateStr(1), dayLabel: getDayLabel(1), irrigationMm: 12, tempHigh: 30, tempLow: 17, rainfallMm: 0, weatherIcon: "partly-cloudy", weatherLabel: "Partly Cloudy" },
      { date: getDateStr(2), dayLabel: getDayLabel(2), irrigationMm: 8, tempHigh: 27, tempLow: 16, rainfallMm: 3, weatherIcon: "cloud", weatherLabel: "Cloudy" },
      { date: getDateStr(3), dayLabel: getDayLabel(3), irrigationMm: 2, tempHigh: 22, tempLow: 14, rainfallMm: 12, weatherIcon: "rain", weatherLabel: "Rain" },
      { date: getDateStr(4), dayLabel: getDayLabel(4), irrigationMm: 0, tempHigh: 20, tempLow: 13, rainfallMm: 18, weatherIcon: "rain", weatherLabel: "Heavy Rain" },
      { date: getDateStr(5), dayLabel: getDayLabel(5), irrigationMm: 5, tempHigh: 24, tempLow: 15, rainfallMm: 2, weatherIcon: "partly-cloudy", weatherLabel: "Partly Cloudy" },
      { date: getDateStr(6), dayLabel: getDayLabel(6), irrigationMm: 10, tempHigh: 28, tempLow: 16, rainfallMm: 0, weatherIcon: "sun", weatherLabel: "Sunny" },
    ],
  },
  {
    id: "east-tomato",
    farmId: "farm-green-valley",
    name: "East Tomato Field",
    cropType: "Tomato",
    soilType: "Clay",
    plantingDate: "2026-03-01",
    moisturePercent: 62,
    status: "optimal",
    areaHectares: 8.3,
    predictions: [
      { date: getDateStr(0), dayLabel: getDayLabel(0), irrigationMm: 4, tempHigh: 24, tempLow: 14, rainfallMm: 2, weatherIcon: "partly-cloudy", weatherLabel: "Partly Cloudy" },
      { date: getDateStr(1), dayLabel: getDayLabel(1), irrigationMm: 3, tempHigh: 23, tempLow: 13, rainfallMm: 5, weatherIcon: "cloud", weatherLabel: "Overcast" },
      { date: getDateStr(2), dayLabel: getDayLabel(2), irrigationMm: 0, tempHigh: 20, tempLow: 12, rainfallMm: 14, weatherIcon: "rain", weatherLabel: "Rain" },
      { date: getDateStr(3), dayLabel: getDayLabel(3), irrigationMm: 0, tempHigh: 18, tempLow: 10, rainfallMm: 8, weatherIcon: "rain", weatherLabel: "Showers" },
      { date: getDateStr(4), dayLabel: getDayLabel(4), irrigationMm: 2, tempHigh: 21, tempLow: 11, rainfallMm: 1, weatherIcon: "cloud", weatherLabel: "Cloudy" },
      { date: getDateStr(5), dayLabel: getDayLabel(5), irrigationMm: 6, tempHigh: 25, tempLow: 14, rainfallMm: 0, weatherIcon: "sun", weatherLabel: "Sunny" },
      { date: getDateStr(6), dayLabel: getDayLabel(6), irrigationMm: 7, tempHigh: 27, tempLow: 15, rainfallMm: 0, weatherIcon: "sun", weatherLabel: "Sunny" },
    ],
  },
  {
    id: "south-corn",
    farmId: "farm-sunrise",
    name: "South Corn Valley",
    cropType: "Corn",
    soilType: "Sandy",
    plantingDate: "2026-02-20",
    moisturePercent: 28,
    status: "critical",
    areaHectares: 20.1,
    predictions: [
      { date: getDateStr(0), dayLabel: getDayLabel(0), irrigationMm: 22, tempHigh: 34, tempLow: 20, rainfallMm: 0, weatherIcon: "sun", weatherLabel: "Hot & Sunny" },
      { date: getDateStr(1), dayLabel: getDayLabel(1), irrigationMm: 20, tempHigh: 33, tempLow: 19, rainfallMm: 0, weatherIcon: "sun", weatherLabel: "Sunny" },
      { date: getDateStr(2), dayLabel: getDayLabel(2), irrigationMm: 18, tempHigh: 31, tempLow: 18, rainfallMm: 0, weatherIcon: "partly-cloudy", weatherLabel: "Partly Cloudy" },
      { date: getDateStr(3), dayLabel: getDayLabel(3), irrigationMm: 10, tempHigh: 26, tempLow: 16, rainfallMm: 6, weatherIcon: "cloud", weatherLabel: "Cloudy" },
      { date: getDateStr(4), dayLabel: getDayLabel(4), irrigationMm: 5, tempHigh: 23, tempLow: 15, rainfallMm: 10, weatherIcon: "rain", weatherLabel: "Rain" },
      { date: getDateStr(5), dayLabel: getDayLabel(5), irrigationMm: 8, tempHigh: 25, tempLow: 16, rainfallMm: 2, weatherIcon: "partly-cloudy", weatherLabel: "Partly Cloudy" },
      { date: getDateStr(6), dayLabel: getDayLabel(6), irrigationMm: 14, tempHigh: 29, tempLow: 17, rainfallMm: 0, weatherIcon: "sun", weatherLabel: "Sunny" },
    ],
  },
  {
    id: "west-wheat",
    farmId: "farm-meadowbrook",
    name: "West Wheat Terrace",
    cropType: "Wheat",
    soilType: "Loam",
    plantingDate: "2026-01-10",
    moisturePercent: 55,
    status: "optimal",
    areaHectares: 15.7,
    predictions: [
      { date: getDateStr(0), dayLabel: getDayLabel(0), irrigationMm: 3, tempHigh: 22, tempLow: 12, rainfallMm: 4, weatherIcon: "cloud", weatherLabel: "Cloudy" },
      { date: getDateStr(1), dayLabel: getDayLabel(1), irrigationMm: 2, tempHigh: 21, tempLow: 11, rainfallMm: 6, weatherIcon: "rain", weatherLabel: "Light Rain" },
      { date: getDateStr(2), dayLabel: getDayLabel(2), irrigationMm: 0, tempHigh: 19, tempLow: 10, rainfallMm: 12, weatherIcon: "rain", weatherLabel: "Rain" },
      { date: getDateStr(3), dayLabel: getDayLabel(3), irrigationMm: 0, tempHigh: 18, tempLow: 9, rainfallMm: 8, weatherIcon: "rain", weatherLabel: "Showers" },
      { date: getDateStr(4), dayLabel: getDayLabel(4), irrigationMm: 4, tempHigh: 22, tempLow: 12, rainfallMm: 0, weatherIcon: "partly-cloudy", weatherLabel: "Partly Cloudy" },
      { date: getDateStr(5), dayLabel: getDayLabel(5), irrigationMm: 5, tempHigh: 24, tempLow: 13, rainfallMm: 0, weatherIcon: "sun", weatherLabel: "Sunny" },
      { date: getDateStr(6), dayLabel: getDayLabel(6), irrigationMm: 6, tempHigh: 26, tempLow: 14, rainfallMm: 0, weatherIcon: "sun", weatherLabel: "Sunny" },
    ],
  },
];

export const alerts: AlertItem[] = [
  {
    id: "alert-1",
    fieldId: "south-corn",
    fieldName: "South Corn Valley",
    type: "heat",
    severity: "high",
    message: "Extreme heat stress detected. Soil moisture critically low at 28%. Immediate irrigation of 22mm recommended today.",
    timestamp: "10 min ago",
  },
  {
    id: "alert-2",
    fieldId: "north-potato",
    fieldName: "North Potato Plot",
    type: "water",
    severity: "high",
    message: "Soil moisture below optimal threshold. 15mm irrigation needed today to prevent yield loss during tuber formation stage.",
    timestamp: "25 min ago",
  },
  {
    id: "alert-3",
    fieldId: "east-tomato",
    fieldName: "East Tomato Field",
    type: "frost",
    severity: "medium",
    message: "Frost risk detected in 3 days. Monitor overnight temperatures closely. Consider protective covering.",
    timestamp: "1 hour ago",
  },
  {
    id: "alert-4",
    fieldId: "west-wheat",
    fieldName: "West Wheat Terrace",
    type: "optimal",
    severity: "low",
    message: "All conditions optimal. Natural rainfall expected to meet irrigation needs for the next 48 hours.",
    timestamp: "2 hours ago",
  },
];
