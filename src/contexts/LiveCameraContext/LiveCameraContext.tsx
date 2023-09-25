import { createContext, useContext, useEffect, useState } from "react";

import {
  ILiveCameraContext,
  ILiveCameraOptions,
} from "./LiveCameraContext.types";
import { IProps } from "../../config.types";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import config from "../../config";
import * as tf from "@tensorflow/tfjs-core";
import { ErrorContext } from "../ErrorContext/ErrorContext";
import {
  IPrediction,
  IPredictionResponse,
} from "../CameraContext/CameraContext.types";
import { CameraContext } from "../CameraContext/CameraContext";

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
  openLiveConnection: () => {},
  closeLiveConnection: () => {},
  handleCameraStream: (_) => {},
};

const LiveCameraContext = createContext<ILiveCameraContext>(
  defaultLiveCameraContext
);

const LiveCameraProvider = ({ children }: IProps) => {
  const [tfLoaded, setTfLoaded] = useState<boolean>(false);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [liveCameraOptions, setLiveCameraOptions] =
    useState<ILiveCameraOptions>(defaultLiveCameraOptions);
  const [tensor, setTensor] = useState<tf.Tensor3D[]>([]);
  const [cameraRolling, setCameraRolling] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<IPrediction[]>([]);

  const LoadingCon = useContext(LoadingContext);
  const ErrorCon = useContext(ErrorContext);
  const CameraCon = useContext(CameraContext);

  // LOAD TFJS
  useEffect(() => {
    const tfready = async () => {
      setTfLoaded(false);
      LoadingCon.setLoading(true);
      try {
        await tf.ready();
        setTfLoaded(true);
      } catch {
        ErrorCon.displayError("Couldn't load tf.");
      }
      LoadingCon.setLoading(false);
    };

    tfready();
  }, []);

  // WEBSOCKET STUFF
  useEffect(() => {
    if (websocket) {
      websocket.onopen = () => {
        console.log("opened");
      };

      websocket.onmessage = async (e) => {
        const new_predictions: IPrediction[] = [];
        const result = await JSON.parse(e.data);
        await result.forEach((element: IPredictionResponse) => {
          new_predictions.push({
            ...element,
            box: {
              x:
                ((element.box.x1 + element.box.x2) / 2) *
                CameraCon.cameraDimensions.width,
              y:
                ((element.box.y1 + element.box.y2) / 2) *
                CameraCon.cameraDimensions.height,
              width:
                (element.box.x2 - element.box.x1) *
                CameraCon.cameraDimensions.width,
              height:
                (element.box.y2 - element.box.y1) *
                CameraCon.cameraDimensions.height,
            },
          });
        });

        setPredictions(new_predictions);
      };

      websocket.onclose = () => {
        // a message was received
        console.log("closed");
      };
    }
  }, [websocket]);

  // CAMERA LOOP
  useEffect(() => {
    const utilizeFrame = async () => {
      if (cameraRolling && tensor && websocket?.readyState) {
        // @ts-ignore
        // const tensor_reshaped = tf.reshape(tensor, [
        //   liveCameraOptions.resizeDepth,
        //   liveCameraOptions.resizeWidth,
        //   liveCameraOptions.resizeHeight,
        // ]);
        // @ts-ignore
        const shape = tensor.shape;
        // @ts-ignore
        const values = tensor.arraySync();
        const data = {
          shape: shape,
          values: values,
        };

        websocket.send(new Blob([JSON.stringify(data)]));
      }
    };

    utilizeFrame();
  }, [tensor, cameraRolling, websocket]);

  const openLiveConnection = async () => {
    LoadingCon.setLoading(true);
    setWebsocket(
      new WebSocket(
        config.paths.home + config.paths.object_detection + "/liveDetection"
      )
    );
    LoadingCon.setLoading(false);
  };

  const closeLiveConnection = async () => {
    LoadingCon.setLoading(true);
    websocket?.close();
    setWebsocket(null);
    LoadingCon.setLoading(false);
  };

  const switchCameraRolling = async () => {
    LoadingCon.setLoading(true);
    if (cameraRolling) {
      await closeLiveConnection();
      setCameraRolling(false);
    } else {
      await openLiveConnection();
      setCameraRolling(true);
    }
    LoadingCon.setLoading(false);
  };

  const handleCameraStream = (tensors: IterableIterator<tf.Tensor3D>) => {
    const loop = async () => {
      const tensor = tensors.next().value;
      if (tensor && tensor.dataId.id % liveCameraOptions.frameRate === 0) {
        setTensor(tensor);
      }
      // if autorender is false you need the following two lines.
      // updatePreview();
      // gl.endFrameEXP();
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
        openLiveConnection,
        closeLiveConnection,
        handleCameraStream,
      }}
    >
      {children}
    </LiveCameraContext.Provider>
  );
};

export { LiveCameraContext, LiveCameraProvider };
