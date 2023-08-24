import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

export const cameraPageStyles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",

    flex: 1,

    backgroundColor: stylesConfig.colors.default_background_dark,
  },
  camera: { width: "100%", height: "100%" },
  bottomPanel: {
    flex: 1,
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",

    paddingVertical: 20,
  },
  cameraButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",

    paddingHorizontal: 10,

    width: "100%",
  },
  cameraButton: {
    color: stylesConfig.colors.default_font,
    textAlign: "center",
  },
  bottomPanelCaptureButton: {
    width: 80,
    height: 80,

    backgroundColor: stylesConfig.colors.default_background_dark,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: stylesConfig.colors.default_font,
  },
});
