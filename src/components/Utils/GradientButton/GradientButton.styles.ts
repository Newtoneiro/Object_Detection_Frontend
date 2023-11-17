/**
 * @file GradientButton.styles.tsx
 * @description GradientButton Stylesheet.
 */

import { StyleSheet } from "react-native";
import { stylesConfig } from "../../../config";

/**
 * Stylesheet for the GradientButton component.
 */
export const gradientButtonStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderBottomColor: stylesConfig.colors.default_color_1,
    borderRadius: 10,
    borderBottomWidth: 1,
  },
  pressable: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  childrenBox: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
