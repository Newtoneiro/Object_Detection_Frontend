/**
 * @file UserInput.styles.tsx
 * @description UserInput Stylesheet.
 */
import { StyleSheet } from "react-native";
import { stylesConfig } from "../../../config";

/**
 * Stylesheet for the UserInput component.
 */
export const userInputStyles = StyleSheet.create({
  container: {
    minWidth: "100%",
    maxWidth: "100%",
    maxHeight: 50,
    height: 50,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,

    paddingVertical: "1%",
    paddingHorizontal: "5%",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: stylesConfig.colors.default_background_light,
    overflow: "scroll",
  },
  containerAlert: {
    borderColor: stylesConfig.colors.red_alert,
  },
  icon: {
    width: 40,
    fontSize: stylesConfig.fontSize.subtitle,
    color: stylesConfig.colors.default_font,
  },
  visibilityIcon: {
    alignSelf: "center",
    alignItems: "center",
    fontSize: stylesConfig.fontSize.regular,
    width: 20,
    color: stylesConfig.colors.default_font,
  },
  textInput: {
    flex: 1,
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.regular,
    color: stylesConfig.colors.default_font,
  },
});
