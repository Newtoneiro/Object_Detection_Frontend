/**
 * @file ErrorPopup.styles.tsx
 * @description ErrorPopup Stylesheet.
 */

import { StyleSheet } from "react-native";
import { stylesConfig } from "../../../config";

/**
 * Stylesheet for the ErrorPopup component.
 */
export const errorPopupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100000,
  },
  containerBackground: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  errorBox: {
    width: "80%",
    minHeight: "30%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: 20,

    backgroundColor: stylesConfig.colors.default_background_dark,
    borderRadius: 10,
  },
  title: {
    width: "100%",
    textAlign: "center",
    letterSpacing: -1,
    fontFamily: stylesConfig.fontFamily.title,
    fontSize: stylesConfig.fontSize.title,
    color: stylesConfig.colors.default_font,
    textTransform: "capitalize",
  },
  message: {
    width: "100%",
    textAlign: "center",
    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font_subtitle,
  },
  buttonText: {
    alignContent: "center",
    width: "100%",

    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.default_font,
    textAlign: "center",
  },
});
