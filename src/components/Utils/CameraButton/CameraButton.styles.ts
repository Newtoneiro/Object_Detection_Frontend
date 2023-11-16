import { StyleSheet } from "react-native";
import { stylesConfig } from "../../../config";

export const cameraButtonStyles = StyleSheet.create({
  captureButton: {
    position: "absolute",
    bottom: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: 80,
    height: 80,

    borderRadius: 50,
    borderWidth: 3,
    borderColor: stylesConfig.colors.default_font,
  },
  captureButtonToggle: {
    borderColor: stylesConfig.colors.green_alert,
  },
  captureButtonInside: {
    width: "100%",
    height: "100%",

    backgroundColor: stylesConfig.colors.default_font,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: stylesConfig.colors.default_background_dark,
  },
});
