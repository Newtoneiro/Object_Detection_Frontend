import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Camera } from "expo-camera";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import DetectedRectangle from "../../components/Utils/DetectedRectangle/DetectedRectangle";
import { MaterialIcons } from "@expo/vector-icons";
import { cameraPageStyles } from "./CameraPage.styles";
import stylesConfig from "../../config.styles";
import { useContext } from "react";

export default function CameraPage() {
  const AuthCon = useContext(AuthContext);
  const CameraCon = useContext(CameraContext);

  return (
    <View style={cameraPageStyles.container}>
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
      <View style={cameraPageStyles.bottomPanel}>
        <View style={cameraPageStyles.cameraButtons}>
          <TouchableOpacity onPress={() => CameraCon.toggleCameraType()}>
            <MaterialIcons
              style={cameraPageStyles.cameraButton}
              name="flip"
              size={stylesConfig.fontSize.title}
            />
          </TouchableOpacity>
          {CameraCon.capturedPhoto && (
            <TouchableOpacity onPress={() => CameraCon.resetCamera()}>
              <MaterialIcons
                style={cameraPageStyles.cameraButton}
                name="keyboard-return"
                size={stylesConfig.fontSize.title}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => AuthCon.logout()}>
            <MaterialIcons
              style={cameraPageStyles.cameraButton}
              name="logout"
              size={stylesConfig.fontSize.title}
            />
          </TouchableOpacity>
        </View>
        <Pressable
          onPress={() => CameraCon.handleButtonClick()}
          style={cameraPageStyles.bottomPanelCaptureButton}
        ></Pressable>
      </View>
    </View>
  );
}
