/**
 * @file PressableIcon.styles.tsx
 * @description PressableIcon Stylesheet.
 */
import { StyleSheet } from "react-native";
import { stylesConfig } from "../../../config";

/**
 * Stylesheet for the PressableIcon component.
 */
export const pressableIconStyles = StyleSheet.create({
  icon: {
    color: stylesConfig.colors.default_font,
    textAlign: "center",
  },
});
