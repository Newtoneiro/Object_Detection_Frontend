import { useContext, useEffect } from "react";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Text, View } from "react-native";

import { Camera } from "expo-camera";
import GradientButton from "../../components/Utils/GradientButton/GradientButton";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import { LiveCameraContext } from "../../contexts/LiveCameraContext/LiveCameraContext";
import { liveCameraPageStyles } from "./LiveCameraPage.styles";
import { LiveCameraPageProps } from "./LiveCameraPage.types";

const LiveCameraPage = ({ navigation }: LiveCameraPageProps) => {
  const CameraCon = useContext(CameraContext);
  const LiveCameraCon = useContext(LiveCameraContext);

  const TensorCamera = cameraWithTensors(Camera);

  useEffect(() => {
    LiveCameraCon.openLiveConnection();
  }, []);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", () => {
        LiveCameraCon.closeLiveConnection();
      }),
    [navigation]
  );

  return (
    <View style={liveCameraPageStyles.container}>
      <GradientButton
        handlePressFunction={() => {
          LiveCameraCon.streamCameraOutput();
        }}
      >
        <Text>Start</Text>
      </GradientButton>
      <View
        style={{
          width: CameraCon.cameraDimensions.width,
          height: CameraCon.cameraDimensions.height,
        }}
      >
        <Camera
          ref={(ref) => {
            CameraCon.setCameraRef(ref);
          }}
          style={{
            width: CameraCon.cameraDimensions.width,
            height: CameraCon.cameraDimensions.height,
          }}
          type={CameraCon.cameraOptions.type}
          ratio={CameraCon.cameraOptions.ratio}
        ></Camera>
      </View>
    </View>
  );
};

export default LiveCameraPage;
