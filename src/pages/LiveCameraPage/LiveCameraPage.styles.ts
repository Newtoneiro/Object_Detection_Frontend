import { StyleSheet } from "react-native";
import { stylesConfig } from "../../config";

export const liveCameraPageStyles = StyleSheet.create({
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
  cameraPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: stylesConfig.colors.default_low_contrast,
  },
  cameraPlaceholderText: {
    width: "100%",
    textAlign: "center",
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.regular,
    color: stylesConfig.colors.default_font,
  },
  topPanel: {
    width: "100%",
    height: 100,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",

    marginTop: 30,
  },
  noPermissionsView: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  noPermissionsText: {
    width: "100%",
    textAlign: "center",
    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font_subtitle,
  },
});
