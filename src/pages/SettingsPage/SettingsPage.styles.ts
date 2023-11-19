/**
 * @file SettingsPage.styles.ts
 * @description Style definitions for the SettingsPage component.
 */
import { StyleSheet } from "react-native";
import { stylesConfig } from "../../config";

/**
 * Stylesheet for SettingsPage component.
 */
export const settingsPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    display: "flex",
    flexDirection: "column",
    gap: 10,

    flex: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 50,
  },
  titleImage: {
    color: stylesConfig.colors.default_font,
  },
  formTitle: {
    width: "100%",
    textAlign: "center",
    letterSpacing: -1,
    fontFamily: stylesConfig.fontFamily.title,
    fontSize: stylesConfig.fontSize.title,
    color: stylesConfig.colors.default_font,
  },
  settingsTitle: {
    width: "100%",
    textAlign: "center",
    letterSpacing: -1,
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.regular,
    color: stylesConfig.colors.default_font,
  },
});
