import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Camera } from "expo-camera";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import DetectedRectangle from "../../components/Utils/DetectedRectangle/DetectedRectangle";
import LoadingOverlay from "../../components/Utils/LoadingOverlay/LoadingOverlay";
import { cameraPageStyles } from "./CameraPage.styles";
import { useContext } from "react";

export default function CameraPage() {
  const AuthCon = useContext(AuthContext);
  const CameraCon = useContext(CameraContext);

  return (
    <View style={cameraPageStyles.container}>
      <View style={cameraPageStyles.header}>
        <TouchableOpacity onPress={() => CameraCon.toggleCameraType()}>
          <Text style={cameraPageStyles.text}>Flip Camera</Text>
        </TouchableOpacity>
        {CameraCon.capturedPhoto && (
          <TouchableOpacity onPress={() => CameraCon.resetCamera()}>
            <Text style={cameraPageStyles.text}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => AuthCon.logout()}>
          <Text style={cameraPageStyles.text}>LogOut</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...cameraPageStyles.cameraBox,
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
        <Pressable
          onPress={() => CameraCon.handleButtonClick()}
          style={cameraPageStyles.bottomPanelCaptureButton}
        ></Pressable>
      </View>
    </View>
  );
}
