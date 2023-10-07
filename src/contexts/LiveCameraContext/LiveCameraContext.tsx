import { createContext, useContext, useEffect, useState } from "react";

import {
  ILiveCameraContext,
  ILiveCameraOptions,
  IPredictionVariables,
} from "./LiveCameraContext.types";
import { IProps } from "../../config.types";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import * as tfjs from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { ErrorContext } from "../ErrorContext/ErrorContext";
import { IPrediction } from "../CameraContext/CameraContext.types";
import { CameraContext } from "../CameraContext/CameraContext";
import { Platform } from "react-native";

//TODO osobne opcje dla liveCamera + przerobic wyswietlanie niektorych

const defaultLiveCameraOptions: ILiveCameraOptions = {
  frameRate: 20,
  resizeWidth: 152,
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
  cameraReady: () => false,
};

const LiveCameraContext = createContext<ILiveCameraContext>(
  defaultLiveCameraContext
);

const LiveCameraProvider = ({ children }: IProps) => {
  const [tfLoaded, setTfLoaded] = useState<boolean>(false);
  const [liveCameraOptions, setLiveCameraOptions] =
    useState<ILiveCameraOptions>(defaultLiveCameraOptions);
  const [cameraRolling, setCameraRolling] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<IPrediction[]>([]);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | void>();
  const [animationFrameId, setAnimationFrameId] = useState<number>(0);

  const [predictionVariables, setPredictionVariables] =
    useState<IPredictionVariables>({
      scaleWidth: 1,
      scaleHeight: 1,
      flipHorizontal: Platform.OS == "ios" ? false : true,
    });

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
      } catch (e) {
        ErrorCon.displayError("Couldn't load tf." + e);
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
        const downloaded_model = await cocoSsd.load();
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

  // Run unMount for cancelling animation if it is running to avoid leaks
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationFrameId]);

  // Update PredictionVariables after change of settings
  useEffect(() => {
    setPredictionVariables((prev) => {
      return {
        scaleHeight:
          CameraCon.cameraDimensions.height / liveCameraOptions.resizeHeight,
        scaleWidth:
          CameraCon.cameraDimensions.width / liveCameraOptions.resizeWidth,
        flipHorizontal: prev.flipHorizontal,
      };
    });
  }, [liveCameraOptions.resizeHeight, liveCameraOptions.resizeHeight]);

  // MAKE PREDICTIONS
  const predict = async (tensor: tfjs.Tensor3D) => {
    // @ts-ignore Because apparently dataId is defined as 'object'
    if (cameraReady() && tensor.dataId.id % liveCameraOptions.frameRate == 0) {
      console.warn = () => {}; // Because of outdated libraries (to silence tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead)
      model?.detect(tensor).then(async (predictions) => {
        setPredictions([]);
        const new_predictions: IPrediction[] = [];

        await predictions.forEach((prediction) => {
          const [x, y, width, height] = prediction.bbox;

          new_predictions.push({
            name: prediction.class,
            class: 0,
            confidence: prediction.score,
            box: {
              x:
                (predictionVariables.flipHorizontal
                  ? CameraCon.cameraDimensions.width -
                    x * predictionVariables.scaleWidth -
                    width * predictionVariables.scaleWidth
                  : width * predictionVariables.scaleWidth) +
                (width * predictionVariables.scaleWidth) / 2,
              y:
                y * predictionVariables.scaleHeight +
                (height * predictionVariables.scaleHeight) / 2,
              width: width * predictionVariables.scaleWidth,
              height: height * predictionVariables.scaleHeight,
            },
          });
        });
        setPredictions(new_predictions);
      });
    }
    tfjs.dispose([tensor]);
  };

  // Camera Functions
  const cameraReady = () => {
    return tfLoaded && model !== undefined && cameraRolling;
  };

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
        if (nextImageTensor) {
          predict(nextImageTensor);
        }
      }
      setAnimationFrameId(requestAnimationFrame(loop));
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
        cameraReady,
      }}
    >
      {children}
    </LiveCameraContext.Provider>
  );
};

export { LiveCameraContext, LiveCameraProvider };
