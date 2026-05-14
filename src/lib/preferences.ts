import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
export type Units = "metric" | "imperial";
export type DateFormat = "dmy" | "mdy";

export interface Preferences {
  theme: Theme;
  units: Units;
  language: "en";
  dateFormat: DateFormat;
  notify: {
    highSeverity: boolean;
    dailySummary: boolean;
    weatherWarnings: boolean;
  };
  defaultFarmId: string | null;
  defaultCropType: string;
  defaultSoilType: string;
}

const KEY = "smartdrop_prefs";

const defaults: Preferences = {
  theme: "system",
  units: "metric",
  language: "en",
  dateFormat: "dmy",
  notify: {
    highSeverity: true,
    dailySummary: true,
    weatherWarnings: true,
  },
  defaultFarmId: null,
  defaultCropType: "Wheat",
  defaultSoilType: "Loam",
};

export function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return {
      ...defaults,
      ...parsed,
      notify: { ...defaults.notify, ...(parsed.notify ?? {}) },
    };
  } catch {
    return defaults;
  }
}

export function savePreferences(prefs: Preferences) {
  localStorage.setItem(KEY, JSON.stringify(prefs));
  window.dispatchEvent(new CustomEvent("smartdrop:prefs-changed"));
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", isDark);
}

export function usePreferences() {
  const [prefs, setPrefs] = useState<Preferences>(() => loadPreferences());

  useEffect(() => {
    const handler = () => setPrefs(loadPreferences());
    window.addEventListener("smartdrop:prefs-changed", handler);
    return () => window.removeEventListener("smartdrop:prefs-changed", handler);
  }, []);

  const update = (patch: Partial<Preferences>) => {
    const next = { ...prefs, ...patch };
    savePreferences(next);
    setPrefs(next);
  };

  return { prefs, update };
}
