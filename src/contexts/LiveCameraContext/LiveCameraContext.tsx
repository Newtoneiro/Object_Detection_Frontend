import { createContext, useContext, useEffect, useState } from "react";

import {
  ILiveCameraContext,
  ILiveCameraDimensions,
  ILiveCameraOptions,
  IPredictionVariables,
  RESIZE_HEIGHT,
  RESIZE_WIDTH,
} from "./LiveCameraContext.types";
import { IProps } from "../../config.types";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import * as tfjs from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { ErrorContext } from "../ErrorContext/ErrorContext";
import {
  ICameraDimensions,
  IPrediction,
} from "../CameraContext/CameraContext.types";
import { Platform, useWindowDimensions } from "react-native";
import { calculateHeightFromWidth } from "../CameraContext/CameraContext.utils";
import { CameraType } from "expo-camera";

const defaultLiveCameraOptions: ILiveCameraOptions = {
  type: CameraType.back,
  ratio: "4:3",
  frameRate: "20",
  resizeWidth: RESIZE_WIDTH,
  resizeHeight: RESIZE_HEIGHT,
  resizeDepth: 3,
};

const defaultLiveCameraDimensions: ILiveCameraDimensions = {
  width: 0,
  height: 0,
};

const defaultLiveCameraContext: ILiveCameraContext = {
  cameraRolling: false,
  tfLoaded: false,
  liveCameraOptions: defaultLiveCameraOptions,
  predictions: [],
  liveCameraDimensions: defaultLiveCameraDimensions,
  loadModel: () => {},
  switchCameraRolling: () => {},
  handleCameraStream: (_) => {},
  cameraReady: () => false,
  setLiveCameraOptions: (_) => {},
};

const LiveCameraContext = createContext<ILiveCameraContext>(
  defaultLiveCameraContext
);

const LiveCameraProvider = ({ children }: IProps) => {
  const [liveCameraOptions, setLiveCameraOptions] =
    useState<ILiveCameraOptions>(defaultLiveCameraOptions);
  const [liveCameraDimensions, setLiveCameraDimensions] =
    useState<ICameraDimensions>(defaultLiveCameraDimensions);
  const { width } = useWindowDimensions();

  const [tfLoaded, setTfLoaded] = useState<boolean>(false);
  const [cameraRolling, setCameraRolling] = useState<boolean>(false);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | void>();

  const [predictions, setPredictions] = useState<IPrediction[]>([]);

  const [animationFrameId, setAnimationFrameId] = useState<number>(0);

  const [predictionVariables, setPredictionVariables] =
    useState<IPredictionVariables>({
      scaleWidth: 1,
      scaleHeight: 1,
      flipHorizontal: Platform.OS == "ios" ? false : true,
    });

  const LoadingCon = useContext(LoadingContext);
  const ErrorCon = useContext(ErrorContext);

  // Calculate camera dimensions
  useEffect(() => {
    const height = calculateHeightFromWidth(liveCameraOptions.ratio, width);
    setLiveCameraDimensions((prev) => {
      return { ...prev, width: width, height: height };
    });
  }, [liveCameraOptions.ratio]);

  // reload camera
  useEffect(() => {
    setCameraRolling(false);
  }, [liveCameraOptions]);

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
          liveCameraDimensions.height / liveCameraOptions.resizeHeight,
        scaleWidth: liveCameraDimensions.width / liveCameraOptions.resizeWidth,
        flipHorizontal: prev.flipHorizontal,
      };
    });
  }, [
    liveCameraDimensions.height,
    liveCameraDimensions.width,
    liveCameraOptions.resizeHeight,
    liveCameraOptions.resizeHeight,
  ]);

  // MAKE PREDICTIONS
  const predict = async (tensor: tfjs.Tensor3D) => {
    // @ts-ignore Because apparently dataId is defined as 'object'
    if (cameraReady() && tensor.dataId.id % liveCameraOptions.frameRate == 0) {
      console.warn = () => {}; // Because of outdated libraries (to silence tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead)
      model?.detect(tensor).then(async (predictions) => {
        const new_predictions: IPrediction[] = [];

        predictions.forEach((prediction) => {
          const [x, y, width, height] = prediction.bbox;

          new_predictions.push({
            name: prediction.class,
            class: 0,
            confidence: prediction.score,
            box: {
              x:
                (predictionVariables.flipHorizontal
                  ? liveCameraDimensions.width -
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
        setPredictions([]); // To reset the predictions, so they dont stack
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
      setPredictions([]); // reset predictions
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
        liveCameraDimensions,
        loadModel,
        switchCameraRolling,
        handleCameraStream,
        cameraReady,
        setLiveCameraOptions,
      }}
    >
      {children}
    </LiveCameraContext.Provider>
  );
};

export { LiveCameraContext, LiveCameraProvider };
