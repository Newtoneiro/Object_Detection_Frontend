/**
 * @file AlertField.styles.tsx
 * @description AlertField Stylesheet.
 */

import { StyleSheet } from "react-native";
import { stylesConfig } from "../../../config";

/**
 * Stylesheet for the AlertField component.
 */
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
