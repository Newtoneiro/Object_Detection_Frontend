import { StyleSheet } from "react-native";
import stylesConfig from "../../../config.styles";

export const alertFieldStyles = StyleSheet.create({
  container: {
    textAlign: "center",
    width: "100%",
    height: 20,
    minHeight: 20,
    maxHeight: 20,
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.red_alert,
  },
  alertPossitive: {
    color: stylesConfig.colors.green_alert,
  },
});
