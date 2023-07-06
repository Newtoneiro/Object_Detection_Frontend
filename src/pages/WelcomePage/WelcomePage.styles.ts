import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

export const welcomePageStyles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    width: "100%",
    fontSize: stylesConfig.fontSize.huge_title,
    fontFamily: stylesConfig.fontFamily.title,
    color: stylesConfig.colors.default_font,
    textAlign: "center",
  },
  text: {
    width: "100%",
    fontFamily: stylesConfig.fontFamily.default,
    letterSpacing: 2,
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.default_font_subtitle,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 60,
  },
  button: {
    width: "100%",
    marginTop: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: stylesConfig.colors.default_color_1,
    borderBottomColor: stylesConfig.colors.default_color_1,
    borderBottomWidth: 1,
  },
  pressable: {
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
});
