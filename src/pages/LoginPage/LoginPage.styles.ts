import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

export const loginPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  pressable: {
    width: 40,
    height: 40,
  },
  header: {
    top: 30,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
    paddingHorizontal: 30,
  },
  returnIcon: {
    color: stylesConfig.colors.default_font,
  },
  form: {
    gap: 10,
    flex: 1,
    width: "85%",
    minHeight: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  formTitle: {
    width: "100%",
    fontSize: stylesConfig.fontSize.title,
    color: stylesConfig.colors.default_font,
    textAlign: "center",
    fontFamily: stylesConfig.fontFamily.title,
    marginBottom: -20,
    letterSpacing: -1,
  },
  formSubTitle: {
    width: "100%",
    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font_subtitle,
    fontWeight: "600",
    textAlign: "center",
    marginLeft: "2%",
  },
  alertMessage: {
    textAlign: "center",
    width: "100%",
    height: 20,
    minHeight: 20,
    maxHeight: 20,
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.red_alert,
  },
  inputContainer: {
    minWidth: "100%",
    maxWidth: "100%",
    maxHeight: 50,
    height: 50,
    overflow: "scroll",
    marginVertical: 3,

    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: stylesConfig.colors.default_background_light,
  },
  inputContainerAlert: {
    borderColor: stylesConfig.colors.red_alert,
  },
  textInput: {
    width: "100%",
    color: stylesConfig.colors.default_font,
  },
  icon: {
    alignSelf: "center",
    alignItems: "center",
    width: 40,
    color: stylesConfig.colors.default_font,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: stylesConfig.colors.default_color_1,
    borderBottomColor: stylesConfig.colors.default_color_1,
    borderBottomWidth: 1,
  },
  button_pressable: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  socialMedia: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  socialMediaTitle: {
    marginTop: 20,
    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font_subtitle,
    fontWeight: "600",
    textAlign: "center",
  },
  socialMediaIcon: {
    borderColor: stylesConfig.colors.default_font,
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
    textAlign: "center",
    textAlignVertical: "center",
    color: stylesConfig.colors.default_font,
    backgroundColor: stylesConfig.colors.default_background_dark,
    elevation: 3,
  },
});
