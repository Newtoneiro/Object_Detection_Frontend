import { Pressable, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Camera } from "expo-camera";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import { cameraPageStyles } from "./CameraPage.styles";
import { useContext } from "react";

export default function CameraPage() {
  const AuthCon = useContext(AuthContext);
  const CameraCon = useContext(CameraContext);
  console.log(CameraCon.cameraDimensions);

  return (
    <View style={cameraPageStyles.container}>
      <Camera
        style={{
          ...cameraPageStyles.camera,
          width: CameraCon.cameraDimensions.width,
          height: CameraCon.cameraDimensions.height,
          transform: [{ translateX: -CameraCon.cameraDimensions.width / 2 }],
        }}
        type={CameraCon.type}
      ></Camera>
      <View style={cameraPageStyles.header}>
        <TouchableOpacity onPress={CameraCon.toggleCameraType}>
          <Text style={cameraPageStyles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => AuthCon.logout()}>
          <Text style={cameraPageStyles.text}>LogOut</Text>
        </TouchableOpacity>
      </View>
      <View style={cameraPageStyles.bottomPanel}>
        <Pressable
          onPress={() => console.log("photo")}
          style={cameraPageStyles.bottomPanelCaptureButton}
        ></Pressable>
      </View>
    </View>
  );
}
