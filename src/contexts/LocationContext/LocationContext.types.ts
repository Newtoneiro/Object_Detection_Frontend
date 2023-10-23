import { LocationObject } from "expo-location";

export interface ILocationContext {
  trackingLocationStarted: boolean;
  location: LocationObject | null;
  calculateDangerLevelFromDistance: (_: number) => IDangerLevel;
}

export type IDangerLevel = "NONE" | "LOW" | "MEDIUM" | "HIGH";
