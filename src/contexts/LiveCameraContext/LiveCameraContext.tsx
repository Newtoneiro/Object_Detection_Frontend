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
import { AuthFetchContext } from "../AuthFetchContext/AuthFetchContext";

const modelJSON = require("./model/model.json");
// const modelWeights = require("../model/group1-shard1of4.bin");

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
  const [cameraRolling, setCameraRolling] = useState<boolean>(false);
  const [animationFrameId, setAnimationFrameId] = useState<number>(0);

  const LoadingCon = useContext(LoadingContext);
  const ErrorCon = useContext(ErrorContext);
  const AuthFetchCon = useContext(AuthFetchContext);

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

  // // LOAD MODEL
  // useEffect(() => {

  // }, []);

  // Run unMount for cancelling animation if it is running to avoid leaks
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationFrameId]);

  const switchCameraRolling = async () => {
    // LoadingCon.setLoading(true);
    // if (cameraRolling) {
    //   setCameraRolling(false);
    // } else {
    //   setCameraRolling(true);
    // }
    // LoadingCon.setLoading(false);
    LoadingCon.setLoading(true);
    try {
      const model = await tfjs.loadLayersModel(tf.io.fromMemory(modelJSON));
    } catch (e) {
      console.log(e);
    }
    LoadingCon.setLoading(false);
  };

  const handleCameraStream = (
    imageAsTensors: IterableIterator<tf.Tensor3D>
  ) => {
    const loop = async () => {
      const imageTensor = imageAsTensors.next().value;
      // @ts-ignore
      tf.dispose(imageAsTensors);

      setAnimationFrameId(requestAnimationFrame(loop));
    };

    //loop infinitely
    loop();
  };

  return (
    <LiveCameraContext.Provider
      value={{
        cameraRolling,
        tfLoaded,
        liveCameraOptions,
        switchCameraRolling,
        handleCameraStream,
      }}
    >
      {children}
    </LiveCameraContext.Provider>
  );
};

export { LiveCameraContext, LiveCameraProvider };
