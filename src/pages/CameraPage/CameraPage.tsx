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
      {CameraCon.loading && <LoadingOverlay />}
      {CameraCon.capturedPhoto ? (
        <View style={cameraPageStyles.capturedPhoto}>
          <Image
            style={cameraPageStyles.container}
            source={{
              uri: CameraCon.capturedPhoto,
            }}
          />
          {CameraCon.predictions.map((prediction, i) => {
            console.log(prediction);
            return (
              <DetectedRectangle
                key={i}
                init_x={prediction.x}
                init_y={prediction.y}
                init_width={prediction.width}
                init_height={prediction.height}
              />
            );
          })}
        </View>
      ) : (
        <Camera
          ref={(ref) => {
            CameraCon.setCameraRef(ref);
          }}
          style={{
            ...cameraPageStyles.camera,
            width: CameraCon.cameraDimensions.width,
            height: CameraCon.cameraDimensions.height,
            transform: [{ translateX: -CameraCon.cameraDimensions.width / 2 }],
          }}
          type={CameraCon.type}
        ></Camera>
      )}
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
      {!CameraCon.capturedPhoto && (
        <View style={cameraPageStyles.bottomPanel}>
          <Pressable
            onPress={() => CameraCon.capturePhoto()}
            style={cameraPageStyles.bottomPanelCaptureButton}
          ></Pressable>
        </View>
      )}
    </View>
  );
}
