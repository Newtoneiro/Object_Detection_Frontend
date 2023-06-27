import { View, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";

import { cameraPageStyles } from "./CameraPage.styles";

export default function CameraPage() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  console.log(permission);

  return (
    <Camera style={cameraPageStyles.container} type={type}>
      <View>
        <TouchableOpacity onPress={toggleCameraType}>
          <Text style={cameraPageStyles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
