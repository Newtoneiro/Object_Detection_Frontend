import { StyleSheet } from "react-native";
import stylesConfig from "../../../config.styles";

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
  changeValueBox: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 2,
  },
  changeValueOption: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    padding: 10,
    backgroundColor: stylesConfig.colors.default_low_contrast,

    borderBottomWidth: 1,
    borderBottomColor: stylesConfig.colors.default_background_dark,
  },
  changeValueOptionSelected: {
    borderWidth: 1,
    borderColor: stylesConfig.colors.default_color_1,
    borderBottomColor: stylesConfig.colors.default_color_1,
  },
  changeValueOptionText: {
    textTransform: "capitalize",
    fontSize: stylesConfig.fontSize.regular,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font,
  },
});
