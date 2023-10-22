import { Image, View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";

import { Camera } from "expo-camera";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import { CameraPageProps } from "./CameraPage.types";
import DetectedRectangle from "../../components/Utils/DetectedRectangle/DetectedRectangle";
import PressableIcon from "../../components/Utils/PressableIcon/PressableIcon";
import { cameraPageStyles } from "./CameraPage.styles";
import stylesConfig from "../../config.styles";
import CameraButton from "../../components/Utils/CameraButton/CameraButton";
import { OptionsContext } from "../../contexts/OptionsContext/OptionsContext";
import { PermissionsContext } from "../../contexts/PermissionsContext/PermissionsContext";
import CrossedFooter from "../../components/Utils/CrossedFooter/CrossedFooter";

const CameraPage = ({ navigation }: CameraPageProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  const CameraCon = useContext(CameraContext);
  const OptionsCon = useContext(OptionsContext);
  const PermissionsCon = useContext(PermissionsContext);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setFocused(true);
    });

    navigation.addListener("blur", () => {
      setFocused(false);
    });
  }, [navigation]);

  return focused ? (
    <View style={cameraPageStyles.container}>
      <View style={cameraPageStyles.topPanel}>
        {CameraCon.capturedPhoto ? (
          <PressableIcon
            handlePress={() => CameraCon.resetCamera()}
            icon="keyboard-return"
            size={stylesConfig.fontSize.subtitle}
          />
        ) : (
          <>
            <PressableIcon
              handlePress={() => navigation.goBack()}
              icon="keyboard-return"
              size={stylesConfig.fontSize.subtitle}
            />
            <PressableIcon
              handlePress={() => CameraCon.toggleCameraType()}
              icon="flip-camera-android"
              size={stylesConfig.fontSize.subtitle}
            />
            <PressableIcon
              handlePress={() => navigation.navigate("SettingsPage")}
              icon="settings"
              size={stylesConfig.fontSize.subtitle}
            />
          </>
        )}
      </View>
      <View
        style={{
          width: CameraCon.cameraDimensions.width,
          height: CameraCon.cameraDimensions.height,
        }}
      >
        {PermissionsCon.cameraPermission ? (
          <>
            {CameraCon.capturedPhoto ? (
              <>
                <Image
                  style={{
                    width: CameraCon.cameraDimensions.width,
                    height: CameraCon.cameraDimensions.height,
                  }}
                  source={{
                    uri: CameraCon.capturedPhoto,
                  }}
                />
                {CameraCon.predictions.map((prediction, i) => {
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
              </>
            ) : (
              <Camera
                ref={(ref) => {
                  CameraCon.setCameraRef(ref);
                }}
                style={{
                  width: CameraCon.cameraDimensions.width,
                  height: CameraCon.cameraDimensions.height,
                }}
                type={OptionsCon.cameraOptions.type}
                ratio={OptionsCon.cameraOptions.ratio}
              ></Camera>
            )}
          </>
        ) : (
          <View style={cameraPageStyles.noPermissionsView}>
            <CrossedFooter>
              <Text style={cameraPageStyles.noPermissionsText}>
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
      <CameraButton handlePress={CameraCon.handleTakePicture} />
    </View>
  ) : (
    <></>
  );
};

export default CameraPage;
