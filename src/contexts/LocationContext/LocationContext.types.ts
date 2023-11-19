/**
 * @file LocationContext.types.ts
 * @description LocationContext Typescript Type Definitions.
 */
import { LocationObject } from "expo-location";

/**
 * Represents the props for the LocationContext component.
 * @interface ILocationContext
 * @exports ILocationContext
 *
 * @property {boolean} trackingLocationStarted - Whether the location tracking has started.
 * @property {LocationObject | null} location - The location object.
 * @property {(distance: number) => IDangerLevel} calculateDangerLevelFromDistance - The function to calculate the danger level from the distance.
 *
 * @see {@link IDangerLevel} for the danger level type.
 * @see {@link https://docs.expo.dev/versions/latest/sdk/location/} for the location object type.
 */
export interface ILocationContext {
  trackingLocationStarted: boolean;
  location: LocationObject | null;
  calculateDangerLevelFromDistance: (_: number) => IDangerLevel;
}

/**
 * Represents the danger level type, representing the danger based on distance
 * to object and car's velocity.
 * @typedef IDangerLevel
 * @exports IDangerLevel
 */
export type IDangerLevel = "NONE" | "LOW" | "MEDIUM" | "HIGH";
