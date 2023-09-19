import { useContext, useEffect } from "react";

import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import { View } from "react-native";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import { LiveCameraContext } from "../../contexts/LiveCameraContext/LiveCameraContext";
import { liveCameraPageStyles } from "./LiveCameraPage.styles";
import { LiveCameraPageProps } from "./LiveCameraPage.types";

const TensorCamera = cameraWithTensors(Camera);

const LiveCameraPage = ({ navigation }: LiveCameraPageProps) => {
  const CameraCon = useContext(CameraContext);
  const LiveCameraCon = useContext(LiveCameraContext);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", () => {
        LiveCameraCon.closeLiveConnection();
      }),
    [navigation]
  );

  return LiveCameraCon.tfLoaded ? (
    <View style={liveCameraPageStyles.container}>
      <View
        style={{
          width: CameraCon.cameraDimensions.width,
          height: CameraCon.cameraDimensions.height,
        }}
      >
        {
          // @ts-ignore  BECAUSE OF LEGACY DEPENDENCIES, maybe will fix later
          <TensorCamera
            // Standard Camera props
            type={CameraCon.cameraOptions.type}
            style={{
              width: CameraCon.cameraDimensions.width,
              height: CameraCon.cameraDimensions.height,
            }}
            cameraTextureHeight={CameraCon.cameraDimensions.height}
            cameraTextureWidth={CameraCon.cameraDimensions.width}
            resizeHeight={LiveCameraCon.liveCameraOptions.resizeHeight}
            resizeWidth={LiveCameraCon.liveCameraOptions.resizeWidth}
            resizeDepth={LiveCameraCon.liveCameraOptions.resizeDepth}
            onReady={LiveCameraCon.handleCameraStream}
            autorender={true}
          />
        }
      </View>
    </View>
  ) : (
    <></>
  );
};

export default LiveCameraPage;
