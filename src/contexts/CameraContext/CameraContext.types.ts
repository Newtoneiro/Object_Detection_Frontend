import { CameraType, PermissionResponse } from "expo-camera";

export interface ICameraContext {
  type: CameraType;
  permission: PermissionResponse | null;
  toggleCameraType: () => void;
}

export type Ratio = "4:3" | "16:9";
