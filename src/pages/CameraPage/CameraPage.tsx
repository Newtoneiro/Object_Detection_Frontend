import { Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Camera } from "expo-camera";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import { cameraPageStyles } from "./CameraPage.styles";
import { useContext } from "react";

export default function CameraPage() {
  const AuthCon = useContext(AuthContext);
  const CameraCon = useContext(CameraContext);

  return (
    <Camera
      style={{ ...cameraPageStyles.container }}
      type={CameraCon.type}
      ratio="16:9"
    >
      <View>
        <TouchableOpacity onPress={CameraCon.toggleCameraType}>
          <Text style={cameraPageStyles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => AuthCon.logout()}>
          <Text style={cameraPageStyles.text}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
