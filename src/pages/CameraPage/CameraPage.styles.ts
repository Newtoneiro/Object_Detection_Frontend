import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

export const cameraPageStyles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",

    flex: 1,
  },
  camera: {
    position: "absolute",
    top: 0,
    left: "50%",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 100,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",

    zIndex: 1000,
  },
  text: {
    width: 100,
    backgroundColor: "white",
    textAlign: "center",
  },
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,

    width: "100%",
    height: "20%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomPanelCaptureButton: {
    width: 80,
    height: 80,

    backgroundColor: stylesConfig.colors.default_font,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: stylesConfig.colors.black,
  },
});
