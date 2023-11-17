import { useContext, useEffect } from "react";

import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import { Text, View } from "react-native";
import { CameraButton } from "../../components/Utils/CameraButton";
import { CrossedFooter } from "../../components/Utils/CrossedFooter";
import { DetectedRectangle } from "../../components/Utils/DetectedRectangle";
import { PressableIcon } from "../../components/Utils/PressableIcon";
import { stylesConfig } from "../../config";
import { LiveCameraContext } from "../../contexts/LiveCameraContext";
import { OptionsContext } from "../../contexts/OptionsContext";
import { PermissionsContext } from "../../contexts/PermissionsContext";
import { liveCameraPageStyles } from "./LiveCameraPage.styles";
import { LiveCameraPageProps } from "./LiveCameraPage.types";

const TensorCamera = cameraWithTensors(Camera);

export const LiveCameraPage = ({ navigation }: LiveCameraPageProps) => {
  const LiveCameraCon = useContext(LiveCameraContext);
  const OptionsCon = useContext(OptionsContext);
  const PermissionsCon = useContext(PermissionsContext);

  useEffect(() => {
    LiveCameraCon.prepareLiveCameraPage();
  }, []);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", async () => {
        if (LiveCameraCon.cameraRolling) {
          LiveCameraCon.switchCameraRolling();
        }
      }),
    [navigation, LiveCameraCon]
  );

  return LiveCameraCon.modelLoaded() ? (
    <View style={liveCameraPageStyles.container}>
      <View style={liveCameraPageStyles.topPanel}>
        <PressableIcon
          handlePress={() => navigation.goBack()}
          icon="keyboard-return"
          size={stylesConfig.fontSize.subtitle}
        />
        <PressableIcon
          handlePress={() => navigation.navigate("SettingsPage")}
          icon="settings"
          size={stylesConfig.fontSize.subtitle}
        />
      </View>
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
              prediction={prediction}
              showDynamicDistance={
                OptionsCon.liveCameraOptions.showDynamicDistance
              }
            />
          );
        })}
        {PermissionsCon.cameraPermission ? (
          <>
            {LiveCameraCon.cameraReady() ? (
              <>
                {
                  // @ts-ignore BECAUSE OF LEGACY DEPENDENCIES, maybe will fix later
                  <TensorCamera
                    type={OptionsCon.liveCameraOptions.type}
                    style={{
                      width: LiveCameraCon.liveCameraDimensions.width,
                      height: LiveCameraCon.liveCameraDimensions.height,
                    }}
                    cameraTextureHeight={
                      LiveCameraCon.liveCameraDimensions.height
                    }
                    cameraTextureWidth={
                      LiveCameraCon.liveCameraDimensions.width
                    }
                    resizeHeight={OptionsCon.liveCameraOptions.resizeHeight}
                    resizeWidth={OptionsCon.liveCameraOptions.resizeWidth}
                    resizeDepth={OptionsCon.liveCameraOptions.resizeDepth}
                    onReady={LiveCameraCon.handleCameraStream}
                    autorender={true}
                  />
                }
              </>
            ) : (
              <View style={liveCameraPageStyles.cameraPlaceholder}>
                <Text style={liveCameraPageStyles.cameraPlaceholderText}>
                  Start the camera to view predictions.
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={liveCameraPageStyles.noPermissionsView}>
            <CrossedFooter>
              <Text style={liveCameraPageStyles.noPermissionsText}>
                Allow app to use camera.
              </Text>
            </CrossedFooter>
            <PressableIcon
              handlePress={() => PermissionsCon.handleRequestCameraPermission()}
              icon="lock-open"
              size={stylesConfig.fontSize.subtitle}
            />
          </View>
        )}
      </View>
      <CameraButton
        handlePress={LiveCameraCon.switchCameraRolling}
        toggle={LiveCameraCon.cameraRolling}
      />
    </View>
  ) : (
    <></>
  );
};
