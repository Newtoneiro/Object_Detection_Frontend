import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

export const cameraPageStyles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",

    flex: 1,

    backgroundColor: stylesConfig.colors.default_background_dark,
  },
  topPanel: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  camera: { width: "100%", height: "100%" },
  cameraButton: {
    color: stylesConfig.colors.default_font,
    textAlign: "center",
  },
  bottomPanelCaptureButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: 80,
    height: 80,

    backgroundColor: stylesConfig.colors.default_background_dark,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: stylesConfig.colors.default_font,
  },
  bottomPanelCaptureButtonInside: {
    width: "100%",
    height: "100%",

    backgroundColor: stylesConfig.colors.default_font,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: stylesConfig.colors.default_background_dark,
  },
});
