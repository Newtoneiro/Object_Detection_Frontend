import { IPrediction } from "../../../contexts/CameraContext/CameraContext.types";

export interface IDetectedRectangleProps {
  prediction: IPrediction;
  showDynamicDistance?: boolean;
}
