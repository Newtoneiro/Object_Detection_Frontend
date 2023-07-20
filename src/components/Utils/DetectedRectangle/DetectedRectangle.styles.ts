import { StyleSheet } from "react-native";
import stylesConfig from "../../../config.styles";

export const detectedRectangleStyles = StyleSheet.create({
  container: {
    position: "absolute",
    borderColor: stylesConfig.colors.red_alert,
    borderWidth: 2,
    zIndex: 10000,
  },
});
