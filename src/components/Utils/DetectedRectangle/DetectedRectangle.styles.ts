import { StyleSheet } from "react-native";
import stylesConfig from "../../../config/config.styles";

export const detectedRectangleStyles = StyleSheet.create({
  container: {
    position: "absolute",
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

    gap: 10,
  },
  text: {
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.default_font,
  },
});
