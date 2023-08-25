import { Image, Pressable, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Camera } from "expo-camera";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import { CameraPageProps } from "./CameraPage.types";
import DetectedRectangle from "../../components/Utils/DetectedRectangle/DetectedRectangle";
import { MaterialIcons } from "@expo/vector-icons";
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
        {CameraCon.capturedPhoto && (
          <TouchableOpacity onPress={() => CameraCon.resetCamera()}>
            <MaterialIcons
              style={cameraPageStyles.cameraButton}
              name="keyboard-return"
              size={stylesConfig.fontSize.title}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => CameraCon.toggleCameraType()}>
          <MaterialIcons
            style={cameraPageStyles.cameraButton}
            name="flip"
            size={stylesConfig.fontSize.subtitle}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsPage")}>
          <MaterialIcons
            style={cameraPageStyles.cameraButton}
            name="settings"
            size={stylesConfig.fontSize.subtitle}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => AuthCon.logout()}>
          <MaterialIcons
            style={cameraPageStyles.cameraButton}
            name="logout"
            size={stylesConfig.fontSize.title}
          />
        </TouchableOpacity>
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
              style={cameraPageStyles.camera}
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
            style={cameraPageStyles.camera}
            type={CameraCon.cameraOptions.type}
          ></Camera>
        )}
      </View>
      <Pressable
        onPress={() => CameraCon.handleButtonClick()}
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
