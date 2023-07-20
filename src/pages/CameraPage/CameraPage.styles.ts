import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

export const cameraPageStyles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",

    flex: 1,
    paddingVertical: 20,
  },
  header: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  cameraBox: {
    position: "relative",
    width: "100%",
  },
  camera: { width: "100%", height: "100%" },
  text: {
    width: 100,
    backgroundColor: "white",
    textAlign: "center",
  },
  bottomPanel: {
    width: "100%",
    height: 100,

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
