import { createContext, useContext, useEffect, useState } from "react";

import {
  ILiveCameraContext,
  ILiveCameraOptions,
} from "./LiveCameraContext.types";
import { IProps } from "../../config.types";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import * as tfjs from "@tensorflow/tfjs";
import { ObjectDetection, load } from "@tensorflow-models/coco-ssd";
import { ErrorContext } from "../ErrorContext/ErrorContext";
import { IPrediction } from "../CameraContext/CameraContext.types";
import { CameraContext } from "../CameraContext/CameraContext";

const defaultLiveCameraOptions: ILiveCameraOptions = {
  frameRate: 20,
  resizeWidth: 200,
  resizeHeight: 200,
  resizeDepth: 3,
};

const defaultLiveCameraContext: ILiveCameraContext = {
  cameraRolling: false,
  tfLoaded: false,
  liveCameraOptions: defaultLiveCameraOptions,
  predictions: [],
  loadModel: () => {},
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
  const [tensor, setTensor] = useState<tfjs.Tensor3D[]>([]);
  const [cameraRolling, setCameraRolling] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<IPrediction[]>([]);
  const [model, setModel] = useState<ObjectDetection | void>();

  const LoadingCon = useContext(LoadingContext);
  const ErrorCon = useContext(ErrorContext);
  const CameraCon = useContext(CameraContext);

  // LOAD TFJS
  useEffect(() => {
    const tfready = async () => {
      setTfLoaded(false);
      LoadingCon.setLoading(true);
      try {
        await tfjs.ready();
        setTfLoaded(true);
      } catch {
        ErrorCon.displayError("Couldn't load tf.");
      }
      LoadingCon.setLoading(false);
    };

    tfready();
  }, []);

  // LOAD MODEL
  const loadModel = async () => {
    LoadingCon.setLoading(true);
    if (!model) {
      try {
        // const downloaded_model = await tfjs.loadGraphModel(
        //   "http://192.168.137.173:8888/getModelJSON/model.json"
        // );
        const downloaded_model = await load();
        setModel(downloaded_model);
        ErrorCon.displayError("Loaded model.", "notification");
      } catch (error) {
        setModel();
        console.log(error);
        ErrorCon.displayError("Couldn't load model.", "error");
      }
    }
    LoadingCon.setLoading(false);
  };

  // CAMERA LOOP
  useEffect(() => {
    const utilizeFrame = async () => {
      if (model && cameraRolling && tensor) {
        model.detect(tensor).then(async (response) => {
          const new_predictions: IPrediction[] = [];
          await response.forEach((element) => {
            let box = {
              x:
                (element.bbox[0] * CameraCon.cameraDimensions.width) /
                liveCameraOptions.resizeWidth,
              y:
                (element.bbox[1] * CameraCon.cameraDimensions.height) /
                liveCameraOptions.resizeHeight,
              width:
                (element.bbox[2] * CameraCon.cameraDimensions.width) /
                liveCameraOptions.resizeWidth,
              height:
                (element.bbox[3] * CameraCon.cameraDimensions.height) /
                liveCameraOptions.resizeHeight,
            };
            console.log(box);
            new_predictions.push({
              name: element.class,
              class: 0,
              confidence: element.score,
              box: {
                x:
                  (element.bbox[0] * CameraCon.cameraDimensions.width) /
                  liveCameraOptions.resizeWidth,
                y:
                  (element.bbox[1] * CameraCon.cameraDimensions.height) /
                  liveCameraOptions.resizeHeight,
                width:
                  (element.bbox[2] * CameraCon.cameraDimensions.width) /
                  liveCameraOptions.resizeWidth,
                height:
                  (element.bbox[3] * CameraCon.cameraDimensions.height) /
                  liveCameraOptions.resizeHeight,
              },
            });
          });
          setPredictions(new_predictions);
        });
        tfjs.dispose([tensor]);
      }
    };

    utilizeFrame();
  }, [tensor, cameraRolling, model]);

  const switchCameraRolling = async () => {
    LoadingCon.setLoading(true);
    if (!cameraRolling && !model) {
      ErrorCon.displayError("Must load model first.", "error");
    } else {
      setCameraRolling((prev) => !prev);
    }
    LoadingCon.setLoading(false);
  };

  const handleCameraStream = (images: IterableIterator<tfjs.Tensor3D>) => {
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
        loadModel,
        switchCameraRolling,
        handleCameraStream,
      }}
    >
      {children}
    </LiveCameraContext.Provider>
  );
};

export { LiveCameraContext, LiveCameraProvider };
