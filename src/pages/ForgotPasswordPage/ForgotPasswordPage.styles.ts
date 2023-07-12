import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

export const forgotPasswordPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "85%",
    minHeight: "70%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  titleImage: {
    color: stylesConfig.colors.default_font,
  },
  formTitle: {
    width: "100%",

    fontFamily: stylesConfig.fontFamily.title,
    fontSize: stylesConfig.fontSize.title,
    color: stylesConfig.colors.default_font,
    textAlign: "center",
    letterSpacing: -1,
  },
  formSubTitle: {
    width: "100%",

    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font_subtitle,
    textAlign: "center",
  },
  alertMessage: {
    width: "100%",
    height: 20,
    minHeight: 20,
    maxHeight: 20,

    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.red_alert,
    textAlign: "center",
  },
  alertMessageGreen: {
    color: stylesConfig.colors.green_alert,
  },
  inputContainer: {
    minWidth: "100%",
    maxWidth: "100%",
    maxHeight: 50,
    height: 50,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,

    overflow: "scroll",
    marginVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: stylesConfig.colors.default_background_light,
  },
  textInput: {
    width: "100%",
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.regular,
    color: stylesConfig.colors.default_font,
  },
  buttonText: {
    alignContent: "center",
    width: "100%",
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.default_font,
    textAlign: "center",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  footerIcon: {
    color: stylesConfig.colors.default_font_subtitle,
  },
  footerText: {
    color: stylesConfig.colors.default_font_subtitle,
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
  },
});
