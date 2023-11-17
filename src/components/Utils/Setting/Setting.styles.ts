/**
 * @file Setting.styles.tsx
 * @description Setting Stylesheet.
 */
import { StyleSheet } from "react-native";
import { stylesConfig } from "../../../config";

/**
 * Stylesheet for the Setting component.
 */
export const settingStyles = StyleSheet.create({
  container: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",

    paddingHorizontal: 20,
  },
  settingBox: {
    width: "100%",
    height: 70,

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 20,

    borderBottomWidth: 1,
    borderBottomColor: stylesConfig.colors.default_low_contrast,

    backgroundColor: stylesConfig.colors.default_background_dark,
  },
  settingIcon: {
    color: stylesConfig.colors.default_font,
  },
  settingToggleSetValue: {
    flex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  settingIcon2: {
    flex: 1,
    textAlign: "right",
    color: stylesConfig.colors.default_font_subtitle,
  },
  settingDescription: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  settingName: {
    textTransform: "capitalize",
    letterSpacing: 1,
    fontSize: stylesConfig.fontSize.regular,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font,
  },
  settingValue: {
    textTransform: "capitalize",
    fontSize: stylesConfig.fontSize.regular,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font_subtitle,
  },
  changeValueModal: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  changeValueModalBackground: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",

    padding: 15,

    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  changeValueModalBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 10,

    backgroundColor: stylesConfig.colors.default_low_contrast,
    borderRadius: 5,
  },
  changeValueModalTitle: {
    width: "100%",

    textTransform: "capitalize",
    letterSpacing: 1,
    fontSize: stylesConfig.fontSize.regular,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font,
    textAlign: "left",

    padding: 10,

    borderBottomColor: stylesConfig.colors.default_font_subtitle,
    borderBottomWidth: 1,
  },
  changeValueModalOptions: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  optionIcon: {},
  changeValueOption: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 20,

    padding: 10,
  },
  changeValueOptionText: {
    textTransform: "capitalize",
    fontSize: stylesConfig.fontSize.regular,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font,
  },
});
