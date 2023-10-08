import { useContext, useEffect } from "react";

import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import { View, Text } from "react-native";
import { LiveCameraContext } from "../../contexts/LiveCameraContext/LiveCameraContext";
import { liveCameraPageStyles } from "./LiveCameraPage.styles";
import { LiveCameraPageProps } from "./LiveCameraPage.types";
import GradientButton from "../../components/Utils/GradientButton/GradientButton";
import DetectedRectangle from "../../components/Utils/DetectedRectangle/DetectedRectangle";

const TensorCamera = cameraWithTensors(Camera);

const LiveCameraPage = ({ navigation }: LiveCameraPageProps) => {
  const LiveCameraCon = useContext(LiveCameraContext);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", async () => {
        if (LiveCameraCon.cameraRolling) {
          LiveCameraCon.switchCameraRolling();
        }
      }),
    [navigation, LiveCameraCon]
  );

  return LiveCameraCon.tfLoaded ? (
    <View style={liveCameraPageStyles.container}>
      <GradientButton
        handlePressFunction={() => LiveCameraCon.switchCameraRolling()}
      >
        <Text>{LiveCameraCon.cameraRolling ? "Stop" : "Start"}</Text>
      </GradientButton>
      <GradientButton handlePressFunction={() => LiveCameraCon.loadModel()}>
        <Text>Load Model</Text>
      </GradientButton>
      <View
        style={{
          width: LiveCameraCon.liveCameraDimensions.width,
          height: LiveCameraCon.liveCameraDimensions.height,
          position: "relative",
        }}
      >
        {LiveCameraCon.predictions.map((prediction, i) => {
          return (
            <DetectedRectangle
              key={i}
              name={prediction.name}
              class={prediction.class}
              confidence={prediction.confidence}
              box={prediction.box}
            />
          );
        })}
        {LiveCameraCon.cameraReady() && (
          <>
            {
              // @ts-ignore BECAUSE OF LEGACY DEPENDENCIES, maybe will fix later
              <TensorCamera
                type={LiveCameraCon.liveCameraOptions.type}
                style={{
                  width: LiveCameraCon.liveCameraDimensions.width,
                  height: LiveCameraCon.liveCameraDimensions.height,
                }}
                cameraTextureHeight={LiveCameraCon.liveCameraDimensions.height}
                cameraTextureWidth={LiveCameraCon.liveCameraDimensions.width}
                resizeHeight={LiveCameraCon.liveCameraOptions.resizeHeight}
                resizeWidth={LiveCameraCon.liveCameraOptions.resizeWidth}
                resizeDepth={LiveCameraCon.liveCameraOptions.resizeDepth}
                onReady={LiveCameraCon.handleCameraStream}
                autorender={true}
              />
            }
          </>
        )}
      </View>
    </View>
  ) : (
    <></>
  );
};

export default LiveCameraPage;
