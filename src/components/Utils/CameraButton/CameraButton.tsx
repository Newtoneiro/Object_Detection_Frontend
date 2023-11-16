import { Pressable, View } from "react-native";
import { ICameraButtonProps } from "./CameraButton.types";
import { cameraButtonStyles } from "./CameraButton.styles";

export const CameraButton = ({
  handlePress,
  toggle = false,
}: ICameraButtonProps) => {
  return (
    <Pressable
      onPress={() => handlePress()}
      style={
        toggle
          ? {
              ...cameraButtonStyles.captureButton,
              ...cameraButtonStyles.captureButtonToggle,
            }
          : cameraButtonStyles.captureButton
      }
    >
      <View style={cameraButtonStyles.captureButtonInside}></View>
    </Pressable>
  );
};
