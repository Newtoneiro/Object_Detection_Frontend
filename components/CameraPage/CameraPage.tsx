import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";

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

const cameraPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  text: {
    width: "40%",
    height: 20,
    backgroundColor: "white",
    textAlign: "center",
  },
});
