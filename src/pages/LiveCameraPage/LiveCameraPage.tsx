import { useContext, useEffect } from "react";

import { Camera } from "expo-camera";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import GradientButton from "../../components/Utils/GradientButton/GradientButton";
import { LiveCameraContext } from "../../contexts/LiveCameraContext/LiveCameraContext";
import { LiveCameraPageProps } from "./LiveCameraPage.types";
import { Text } from "react-native";
import { View } from "react-native";
import { liveCameraPageStyles } from "./LiveCameraPage.styles";

const LiveCameraPage = ({ navigation }: LiveCameraPageProps) => {
  const CameraCon = useContext(CameraContext);
  const LiveCameraCon = useContext(LiveCameraContext);

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
