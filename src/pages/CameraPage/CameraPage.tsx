import { Image, Pressable, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Camera } from "expo-camera";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import { CameraPageProps } from "./CameraPage.types";
import DetectedRectangle from "../../components/Utils/DetectedRectangle/DetectedRectangle";
import { MaterialIcons } from "@expo/vector-icons";
import PressableIcon from "../../components/Utils/PressableIcon/PressableIcon";
import { cameraPageStyles } from "./CameraPage.styles";
import stylesConfig from "../../config.styles";

const CameraPage = ({ navigation }: CameraPageProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  const AuthCon = useContext(AuthContext);
  const CameraCon = useContext(CameraContext);

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
            <PressableIcon
              handlePress={() => AuthCon.logout()}
              icon="logout"
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
            type={CameraCon.cameraOptions.type}
            ratio={CameraCon.cameraOptions.ratio}
          ></Camera>
        )}
      </View>
      <Pressable
        onPress={() => CameraCon.handleTakePicture()}
        style={cameraPageStyles.bottomPanelCaptureButton}
      >
        <View style={cameraPageStyles.bottomPanelCaptureButtonInside}></View>
      </Pressable>
    </View>
  ) : (
    <></>
  );
};

export default CameraPage;
