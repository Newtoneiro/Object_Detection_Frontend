/**
 * @file LoginPage.styles.ts
 * @description CSS styles for the LoginPage component
 */
import { StyleSheet } from "react-native";
import { stylesConfig } from "../../config";

/**
 * Stylesheet for the Login Page.
 */
export const loginPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: "12%",
    paddingVertical: "8%",

    marginTop: 50,
  },
  form: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  formTitle: {
    width: "100%",
    textAlign: "center",
    letterSpacing: -1,
    fontFamily: stylesConfig.fontFamily.title,
    fontSize: stylesConfig.fontSize.title,
    color: stylesConfig.colors.default_font,
  },
  formSubTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font_subtitle,
  },
  forgotPasswordFooter: {
    width: "100%",

    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  forgotPasswordText: {
    textAlign: "right",
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
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
  socialMediaTitle: {
    width: 50,

    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.default_font_subtitle,
    backgroundColor: stylesConfig.colors.default_background_dark,
    textAlign: "center",
  },
  socialMedia: {
    width: "100%",
    height: 110,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
  },
  socialMediaContainer: {
    width: "85%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",

    padding: "2%",
    borderWidth: 1,
    borderColor: stylesConfig.colors.default_font_subtitle,
    borderRadius: 12,
  },
  socialMediaText: {
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.default_font,
    textAlign: "center",
  },
  socialMediaIcon: {
    display: "flex",

    textAlign: "center",
    textAlignVertical: "center",
    color: stylesConfig.colors.default_font,
    backgroundColor: stylesConfig.colors.default_background_dark,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    gap: 5,
  },
  footerText: {
    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font_subtitle,
    textAlign: "center",
  },
  footerTextBold: {
    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font,
    textAlign: "center",
  },
});
