import { createContext, useContext, useEffect, useState } from "react";

import {
  ILiveCameraContext,
  ILiveCameraOptions,
} from "./LiveCameraContext.types";
import { IProps } from "../../config.types";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import * as tfjs from "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs-core";
import { ErrorContext } from "../ErrorContext/ErrorContext";
import {
  IPrediction,
  IPredictionResponse,
} from "../CameraContext/CameraContext.types";

const defaultLiveCameraOptions: ILiveCameraOptions = {
  frameRate: 20,
  resizeWidth: 640,
  resizeHeight: 640,
  resizeDepth: 3,
};

const defaultLiveCameraContext: ILiveCameraContext = {
  cameraRolling: false,
  tfLoaded: false,
  liveCameraOptions: defaultLiveCameraOptions,
  predictions: [],
  switchCameraRolling: () => {},
  handleCameraStream: (_) => {},
};

const LiveCameraContext = createContext<ILiveCameraContext>(
  defaultLiveCameraContext
);

const LiveCameraProvider = ({ children }: IProps) => {
  const [tfLoaded, setTfLoaded] = useState<boolean>(false);
  const [liveCameraOptions, setLiveCameraOptions] =
    useState<ILiveCameraOptions>(defaultLiveCameraOptions);
  const [tensor, setTensor] = useState<tf.Tensor3D[]>([]);
  const [cameraRolling, setCameraRolling] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<IPrediction[]>([]);
  const [model, setModel] = useState<tfjs.GraphModel | void>();

  const LoadingCon = useContext(LoadingContext);
  const ErrorCon = useContext(ErrorContext);

  // LOAD TFJS
  useEffect(() => {
    const tfready = async () => {
      setTfLoaded(false);
      LoadingCon.setLoading(true);
      try {
        await tf.ready();
        const downloaded_model = await tfjs
          .loadGraphModel("http://192.168.137.173:8888/getModelJSON/model.json")
          .catch((e) => console.log(e));
        setModel(downloaded_model);
        ErrorCon.displayError("Loaded model.", "notification");
        setTfLoaded(true);
      } catch {
        ErrorCon.displayError("Couldn't load tf.");
      }
      LoadingCon.setLoading(false);
    };

    tfready();
  }, []);

  // CAMERA LOOP
  useEffect(() => {
    const utilizeFrame = async () => {
      if (model && cameraRolling && tensor) {
        const tensor_float32 = tfjs.cast(tensor, "float32");
        const response = model.predict(
          tf.reshape(tensor_float32, [
            1,
            liveCameraOptions.resizeWidth,
            liveCameraOptions.resizeWidth,
            liveCameraOptions.resizeDepth,
          ]),
          { batchSize: 1 }
        );
        console.log(response.dataSync());
        tf.dispose([tensor]);
      }
    };

    utilizeFrame();
  }, [tensor, cameraRolling, model]);

  const switchCameraRolling = async () => {
    LoadingCon.setLoading(true);
    setCameraRolling((prev) => !prev);
    LoadingCon.setLoading(false);
  };

  const handleCameraStream = (images: IterableIterator<tf.Tensor3D>) => {
    const loop = async () => {
      if (tfLoaded) {
        const nextImageTensor = images.next().value;
        if (
          nextImageTensor &&
          nextImageTensor.dataId.id % liveCameraOptions.frameRate == 0
        ) {
          setTensor(nextImageTensor);
        }
      }
      requestAnimationFrame(loop);
    };
    loop();
  };

  return (
    <LiveCameraContext.Provider
      value={{
        cameraRolling,
        tfLoaded,
        liveCameraOptions,
        predictions,
        switchCameraRolling,
        handleCameraStream,
      }}
    >
      {children}
    </LiveCameraContext.Provider>
  );
};

export { LiveCameraContext, LiveCameraProvider };
