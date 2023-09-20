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

const defaultLiveCameraOptions: ILiveCameraOptions = {
  frameRate: 20,
  resizeWidth: 200,
  resizeHeight: 152,
  resizeDepth: 3,
};

const defaultLiveCameraContext: ILiveCameraContext = {
  cameraRolling: false,
  tfLoaded: false,
  liveCameraOptions: defaultLiveCameraOptions,
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

  const LoadingCon = useContext(LoadingContext);
  const ErrorCon = useContext(ErrorContext);

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

      websocket.onmessage = (e) => {
        // a message was received
        console.log(e.data);
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
