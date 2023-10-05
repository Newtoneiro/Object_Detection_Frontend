import { createContext, useContext, useEffect, useState } from "react";

import {
  ILiveCameraContext,
  ILiveCameraOptions,
} from "./LiveCameraContext.types";
import { IProps } from "../../config.types";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import * as tfjs from "@tensorflow/tfjs";
import { ErrorContext } from "../ErrorContext/ErrorContext";
import { IPrediction } from "../CameraContext/CameraContext.types";

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
  const [model, setModel] = useState<tfjs.GraphModel | void>();
  const [animationFrameId, setAnimationFrameId] = useState<number>(0);

  const LoadingCon = useContext(LoadingContext);
  const ErrorCon = useContext(ErrorContext);

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
        const downloaded_model = await tfjs.loadGraphModel(
          "http://192.168.90.75:8888/getModelJSON/model.json"
        );
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

  const cameraReady = () => {
    return tfLoaded && model !== undefined && cameraRolling;
  };

  // CAMERA LOOP
  // useEffect(() => {
  //   const utilizeFrame = async () => {
  //     if (model && cameraRolling && tensor) {
  //       let tensor_reshape = tensor.reshape([
  //         1,
  //         liveCameraOptions.resizeWidth,
  //         liveCameraOptions.resizeHeight,
  //         liveCameraOptions.resizeDepth,
  //       ]);
  //       tensor_reshape = tfjs.cast(tensor_reshape, "float32");
  //       let result = model.predict(tensor_reshape);
  //       // .then(async (response) => {
  //       //   const new_predictions: IPrediction[] = [];
  //       //   await response.forEach((element) => {
  //       //     let box = {
  //       //       x:
  //       //         (element.bbox[0] * CameraCon.cameraDimensions.width) /
  //       //         liveCameraOptions.resizeWidth,
  //       //       y:
  //       //         (element.bbox[1] * CameraCon.cameraDimensions.height) /
  //       //         liveCameraOptions.resizeHeight,
  //       //       width:
  //       //         (element.bbox[2] * CameraCon.cameraDimensions.width) /
  //       //         liveCameraOptions.resizeWidth,
  //       //       height:
  //       //         (element.bbox[3] * CameraCon.cameraDimensions.height) /
  //       //         liveCameraOptions.resizeHeight,
  //       //     };
  //       //     console.log(box);
  //       //     new_predictions.push({
  //       //       name: element.class,
  //       //       class: 0,
  //       //       confidence: element.score,
  //       //       box: {
  //       //         x:
  //       //           (element.bbox[0] * CameraCon.cameraDimensions.width) /
  //       //           liveCameraOptions.resizeWidth,
  //       //         y:
  //       //           (element.bbox[1] * CameraCon.cameraDimensions.height) /
  //       //           liveCameraOptions.resizeHeight,
  //       //         width:
  //       //           (element.bbox[2] * CameraCon.cameraDimensions.width) /
  //       //           liveCameraOptions.resizeWidth,
  //       //         height:
  //       //           (element.bbox[3] * CameraCon.cameraDimensions.height) /
  //       //           liveCameraOptions.resizeHeight,
  //       //       },
  //       //     });
  //       //   });
  //       // setPredictions(new_predictions);
  //       // });
  //       result.print();
  //       tfjs.dispose([tensor]);
  //       tfjs.dispose([tensor_reshape]);
  //     }
  //   };

  //   utilizeFrame();
  // }, [tensor, cameraRolling, model]);

  const transformBoxes = (boxes: tfjs.Tensor) => {
    const x1 = boxes.slice([0, 0], [84, 1]);
    const y1 = boxes.slice([0, 1], [84, 1]);
    const width = boxes.slice([0, 2], [84, 1]);
    const height = boxes.slice([0, 3], [84, 1]);

    const x2 = tfjs.add(x1, width);
    const y2 = tfjs.add(y1, height);

    return tfjs.concat([x1, y1, x2, y2], 1);
  };

  // MAKE PREDICTIONS
  const predict = async (tensor: tfjs.Tensor3D) => {
    if (cameraReady() && tensor.dataId.id % liveCameraOptions.frameRate == 0) {
      let tensor_reshape = tensor.reshape([
        1,
        liveCameraOptions.resizeWidth,
        liveCameraOptions.resizeHeight,
        liveCameraOptions.resizeDepth,
      ]);
      tensor_reshape = tfjs.cast(tensor_reshape, "float32");
      const prediction = (
        model?.execute(tensor_reshape) as tfjs.Tensor
      ).squeeze();
      prediction.print();

      tfjs.dispose([tensor_reshape]);
    }
    tfjs.dispose([tensor]);
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
