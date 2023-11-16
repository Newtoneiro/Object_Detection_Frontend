import * as Location from "expo-location";
import { createContext, useContext, useEffect, useState } from "react";
import { IProps, globalConfig } from "../../config";
import { PermissionsContext } from "../PermissionsContext";
import { IDangerLevel, ILocationContext } from "./LocationContext.types";

const defaultLocationContext: ILocationContext = {
  trackingLocationStarted: false,
  location: null,
  calculateDangerLevelFromDistance: (_) => "NONE",
};

const LocationContext = createContext<ILocationContext>(defaultLocationContext);

const LocationProvider = ({ children }: IProps) => {
  const [trackingLocationStarted, setTrackingLocationStarted] =
    useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const PermissionsCon = useContext(PermissionsContext);

  useEffect(() => {
    (async () => {
      if (!PermissionsCon.locationPermission || trackingLocationStarted) {
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 500,
          distanceInterval: 0,
        },
        (currentLocation) => {
          setLocation(currentLocation);
        }
      );

      setTrackingLocationStarted(true);
      return () => locationSubscription.remove();
    })();
  }, [PermissionsCon.locationPermission]);

  const calculateDangerLevelFromDistance = (distance: number): IDangerLevel => {
    const currentSpeed = location?.coords.speed || 0;

    if (!PermissionsCon.locationPermission || !trackingLocationStarted) {
      return "NONE";
    } else if (
      distance >
      2 * currentSpeed + globalConfig.distance_risk_margin * currentSpeed
    ) {
      return "LOW";
    } else if (distance > 2 * currentSpeed) {
      return "MEDIUM";
    } else {
      return "HIGH";
    }
  };

  return (
    <LocationContext.Provider
      value={{
        trackingLocationStarted,
        location,
        calculateDangerLevelFromDistance,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
