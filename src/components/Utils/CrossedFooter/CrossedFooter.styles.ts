/**
 * @file CrossedFooter.styles.tsx
 * @description CrossedFooter Stylesheet.
 */

import { StyleSheet } from "react-native";
import { stylesConfig } from "../../../config";

/**
 * Stylesheet for the CrossedFooter component.
 */
export const crossedFooterStyle = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 50,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    position: "absolute",
    width: "70%",
    height: 1,
    backgroundColor: stylesConfig.colors.default_font_subtitle,
  },
  childrenBox: {
    paddingHorizontal: 10,
    backgroundColor: stylesConfig.colors.default_background_dark,
  },
});
