import { createContext, useContext, useEffect, useState } from "react";

import {
  ILiveCameraContext,
  ILiveCameraOptions,
} from "./LiveCameraContext.types";
import { IProps } from "../../config.types";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import config from "../../config";
import * as tf from "@tensorflow/tfjs-core";

const defaultLiveCameraOptions: ILiveCameraOptions = {
  resizeWidth: 200,
  resizeHeight: 152,
  resizeDepth: 3,
};

const defaultLiveCameraContext: ILiveCameraContext = {
  tfLoaded: false,
  liveCameraOptions: defaultLiveCameraOptions,
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

  const LoadingCon = useContext(LoadingContext);

  useEffect(() => {
    const tfready = async () => {
      setTfLoaded(false);
      LoadingCon.setLoading(true);
      await tf.ready();
      LoadingCon.setLoading(false);
      setTfLoaded(true);
    };

    tfready();
  }, []);

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

  const handleCameraStream = (tensors: IterableIterator<tf.Tensor3D>) => {
    // const loop = async () => {
    //   const nextImageTensor = tensors.next().value;
    //   //
    //   // do something with tensor here
    //   //
    //   // if autorender is false you need the following two lines.
    //   // updatePreview();
    //   // gl.endFrameEXP();
    //   requestAnimationFrame(loop);
    // };
    // loop();
  };

  return (
    <LiveCameraContext.Provider
      value={{
        tfLoaded,
        liveCameraOptions,
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
