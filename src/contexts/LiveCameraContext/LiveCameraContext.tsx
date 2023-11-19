/**
 * @file LiveCameraContext.tsx
 * @description Context for live camera related functions
 */
import { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tfjs from "@tensorflow/tfjs";
import { Platform, useWindowDimensions } from "react-native";
import {
  ICameraDimensions,
  IPrediction,
  IProps,
  globalConfig,
} from "../../config";
import { LiveCameraPage } from "../../pages/LiveCameraPage/LiveCameraPage";
import { authFetch } from "../AuthFetch";
import { calculateHeightFromWidth } from "../CameraContext/CameraContext.utils";
import { ErrorContext } from "../ErrorContext";
import { LoadingContext } from "../LoadingContext";
import { OptionsContext } from "../OptionsContext";
import { PermissionsContext } from "../PermissionsContext";
import {
  ILiveCameraContext,
  IPredictionVariables,
} from "./LiveCameraContext.types";
import {
  calculateDistance,
  getDateFromTimestamp,
  getTimestampFromDate,
} from "./LiveCameraContext.utils";

const defaultLiveCameraDimensions: ICameraDimensions = {
  width: 0,
  height: 0,
};

const defaultLiveCameraContext: ILiveCameraContext = {
  cameraRolling: false,
  predictions: [],
  liveCameraDimensions: defaultLiveCameraDimensions,
  prepareLiveCameraPage: () => {},
  switchCameraRolling: () => {},
  handleCameraStream: (_) => {},
  cameraReady: () => false,
  modelLoaded: () => false,
};

/**
 * @object
 *
 * Live camera context object.
 *
 * @description
 *
 * This context provides all the necessary functions and variables for handling
 * live camera functionality. Mainly used in the {@link LiveCameraPage} component.
 *
 * @example
 * import { LiveCameraContext } from "../contexts/LiveCameraContext/LiveCameraContext";
 *
 * const CameraPage = () => {
 *  const LiveCameraCon = useContext(LiveCameraContext);
 *
 *  LiveCameraContext.prepareLiveCameraPage();
 *  return (...)
 * };
 *
 * @see {@link ILiveCameraContext} for more information on the context object
 */
const LiveCameraContext = createContext<ILiveCameraContext>(
  defaultLiveCameraContext
);

/**
 * @component
 *
 * ForgotPassword provider component.
 *
 * @description
 *
 * This component provides the {@link LiveCameraContext} to all its children.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} props.children - The children of the component.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { LiveCameraProvider } from './LiveCameraProvider';
 *
 * const SomeComponent = () => {
 *  return (
 *    <LiveCameraProvider>
 *      <SomeOtherComponent />
 *    </LiveCameraProvider>
 *  );
 * };
 *
 * @see {@link IProps} for the props object.
 * @see {@link LiveCameraContext} for the context object.
 */
const LiveCameraProvider = ({ children }: IProps) => {
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
  const OptionsCon = useContext(OptionsContext);
  const PermissionsCon = useContext(PermissionsContext);

  // Calculate camera dimensions
  useEffect(() => {
    const height = calculateHeightFromWidth(
      OptionsCon.liveCameraOptions.ratio,
      width
    );
    setLiveCameraDimensions((prev) => {
      return { ...prev, width: width, height: height };
    });
  }, [OptionsCon.liveCameraOptions.ratio]);

  // reload camera
  useEffect(() => {
    setCameraRolling(false);
    setPredictions([]);
  }, [OptionsCon.liveCameraOptions]);

  const prepareLiveCameraPage = async () => {
    const loadTFJS = async () => {
      try {
        await tfjs.ready();
        setTfLoaded(true);
      } catch (e) {
        setTfLoaded(false);
        throw "Couldn't load tf." + e;
      }
    };

    const loadModel = async () => {
      try {
        const downloaded_model = await cocoSsd.load();
        setModel(downloaded_model);
      } catch (e) {
        setModel();
        throw "Couldn't load model." + e;
      }
    };

    LoadingCon.setDisplayLoadingCard(true);
    try {
      LoadingCon.setLoadingCardText("Loading TFJS");
      if (!tfLoaded) {
        await loadTFJS();
      }
      LoadingCon.setLoadingCardText("Loading cocoSsd model");
      if (!model) {
        await loadModel();
      }
    } catch (e) {
      ErrorCon.displayError(String(e), "error");
    } finally {
      LoadingCon.setDisplayLoadingCard(false);
    }
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
          liveCameraDimensions.height /
          OptionsCon.liveCameraOptions.resizeHeight,
        scaleWidth:
          liveCameraDimensions.width / OptionsCon.liveCameraOptions.resizeWidth,
        flipHorizontal: prev.flipHorizontal,
      };
    });
  }, [
    liveCameraDimensions.height,
    liveCameraDimensions.width,
    OptionsCon.liveCameraOptions.resizeHeight,
    OptionsCon.liveCameraOptions.resizeHeight,
  ]);

  // MAKE PREDICTIONS
  const predict = async (tensor: tfjs.Tensor3D) => {
    if (
      cameraReady() &&
      // @ts-ignore Because apparently dataId is defined as 'object'
      tensor.dataId.id % OptionsCon.liveCameraOptions.frameRate == 0 &&
      PermissionsCon.cameraPermission
    ) {
      console.warn = () => {}; // Because of outdated libraries (to silence tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead)
      model?.detect(tensor).then(async (predictions) => {
        const new_predictions: IPrediction[] = [];

        predictions.forEach((prediction) => {
          const [x, y, width, height] = prediction.bbox;

          const distance = calculateDistance(
            height * predictionVariables.scaleHeight,
            liveCameraDimensions.height,
            prediction.class
          );

          new_predictions.push({
            name: prediction.class,
            class: 0, // class attribute does not exist on cocossd predictions
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
            distance: distance,
          });
        });
        setPredictions([]); // To reset the predictions, so they dont stack
        setPredictions(new_predictions);
      });
    }

    const doSave = await checkSaveTensorOnServer();
    if (doSave) {
      saveTensorOnServer(tensor);
    }

    tfjs.dispose([tensor]);
  };

  const checkSaveTensorOnServer = async (): Promise<boolean> => {
    // Check if option for saving Photos is set
    if (!OptionsCon.serverOptions.savePhoto) {
      return false;
    }

    const lastSave = await AsyncStorage.getItem("lastTensorSavedTimestamp");

    const lastSaveDate = getDateFromTimestamp(lastSave);
    const timeDifference = new Date().getTime() - lastSaveDate.getTime();
    if (!lastSave || timeDifference > globalConfig.timeBetweenTensorSaves) {
      AsyncStorage.setItem("lastTensorSavedTimestamp", getTimestampFromDate());
      return true;
    }

    return false;
  };

  const saveTensorOnServer = async (tensor: tfjs.Tensor3D) => {
    const tensor_array = tensor.arraySync();

    authFetch
      .post(globalConfig.paths.object_detection + "/captureTensor", {
        shape: tensor.shape,
        values: tensor_array,
      })
      .catch((error) => {
        const error_code = error.response?.data || "";
        switch (error_code) {
          case "ERR_TENSOR_INVALID":
            break;
          default:
            ErrorCon.displayError(
              "Something went wrong with saving the tensor.",
              "error"
            );
            setCameraRolling(false);
            break;
        }
        // If something went wrong, retry in [RETRY] seconds
        let date_to_retry_in_5_seconds =
          new Date().getTime() - // Now
          globalConfig.timeBetweenTensorSaves + // - Time between tensor saves (without the next line, the retry would occur immediately)
          globalConfig.timeBetweenTensorSavesRetries; // + The retry timeout
        AsyncStorage.setItem(
          "lastTensorSavedTimestamp",
          getTimestampFromDate(new Date(date_to_retry_in_5_seconds))
        );
      });
  };

  const modelLoaded = () => {
    return tfLoaded && model !== undefined;
  };

  // Camera Functions
  const cameraReady = () => {
    return modelLoaded() && cameraRolling;
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

  const handleCameraStream = (tensors: IterableIterator<tfjs.Tensor3D>) => {
    const loop = async () => {
      if (tfLoaded) {
        const nextImageTensor = tensors.next().value;
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
        predictions,
        liveCameraDimensions,
        prepareLiveCameraPage,
        switchCameraRolling,
        handleCameraStream,
        modelLoaded,
        cameraReady,
      }}
    >
      {children}
    </LiveCameraContext.Provider>
  );
};

export { LiveCameraContext, LiveCameraProvider };
