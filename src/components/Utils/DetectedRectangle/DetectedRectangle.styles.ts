import { StyleSheet } from "react-native";
import stylesConfig from "../../../config.styles";

export const detectedRectangleStyles = StyleSheet.create({
  container: {
    position: "absolute",
    borderColor: stylesConfig.colors.red_alert,
    borderWidth: 2,
    zIndex: 5000,
  },
  label: {
    position: "absolute",
    bottom: "100%",
    left: -2,

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",

    backgroundColor: stylesConfig.colors.red_alert,
    color: stylesConfig.colors.default_font,
    gap: 10,
  },
});
