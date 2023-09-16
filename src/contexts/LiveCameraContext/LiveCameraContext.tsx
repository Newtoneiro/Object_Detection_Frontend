import { createContext, useContext, useEffect } from "react";

import { IProps } from "../../config.types";
import { CameraContext } from "../CameraContext/CameraContext";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import { ILiveCameraContext } from "./LiveCameraContext.types";

import * as tf from "@tensorflow/tfjs";

const defaultLiveCameraContext: ILiveCameraContext = {};

const LiveCameraContext = createContext<ILiveCameraContext>(
  defaultLiveCameraContext
);

const LiveCameraProvider = ({ children }: IProps) => {
  const CameraCon = useContext(CameraContext);
  const LoadingCon = useContext(LoadingContext);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const model = await tf.loadLayersModel(
          "./yolov8n_saved_model/yolov8n_float32.tflite"
        );
        return model;
      } catch (error) {
        console.log("Could not load model", error);
      }
    };

    loadModel();
  }, []);

  return (
    <LiveCameraContext.Provider value={{}}>
      {children}
    </LiveCameraContext.Provider>
  );
};

export { LiveCameraContext, LiveCameraProvider };
