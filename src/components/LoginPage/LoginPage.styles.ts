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
    backgroundColor: stylesConfig.colors.default_background_dark,
    paddingVertical: 20,
  },
  decorativeBall: {
    position: "absolute",
    top: -50,
    left: -70,
    width: 210,
    height: 210,
    borderRadius: 110,
  },
  header: {
    width: "100%",
    maxHeight: 80,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  returnIcon: {
    color: stylesConfig.colors.default_font,
  },
  logo: {
    width: 150,
    resizeMode: "contain",
    tintColor: stylesConfig.colors.default_font,
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
  gap: {
    width: "100%",
    height: 30,
    minHeight: 30,
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