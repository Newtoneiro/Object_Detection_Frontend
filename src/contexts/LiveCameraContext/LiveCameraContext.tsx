import { createContext, useContext, useEffect, useState } from "react";

import config from "../../config";
import { IProps } from "../../config.types";
import { CameraContext } from "../CameraContext/CameraContext";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import { ILiveCameraContext } from "./LiveCameraContext.types";

const defaultLiveCameraContext: ILiveCameraContext = {
  openLiveConnection: () => {},
  closeLiveConnection: () => {},
  streamCameraOutput: () => {},
};

const LiveCameraContext = createContext<ILiveCameraContext>(
  defaultLiveCameraContext
);

const LiveCameraProvider = ({ children }: IProps) => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  const CameraCon = useContext(CameraContext);
  const LoadingCon = useContext(LoadingContext);

  useEffect(() => {
    if (websocket) {
      websocket.onopen = () => {
        console.log("opened");
      };

      websocket.onmessage = (e) => {
        console.log(e.data);
      };

      websocket.onclose = () => {
        console.log("closed");
      };
    }
  }, [websocket]);

  const streamCameraOutput = async () => {
    while (true) {
      await CameraCon.cameraRef
        ?.takePictureAsync({
          quality: Number(CameraCon.cameraOptions.quality),
          base64: true,
          skipProcessing: true,
        })
        .then(() => {
          console.log("pic taken");
        });
    }
  };

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

  return (
    <LiveCameraContext.Provider
      value={{ openLiveConnection, closeLiveConnection, streamCameraOutput }}
    >
      {children}
    </LiveCameraContext.Provider>
  );
};

export { LiveCameraContext, LiveCameraProvider };
