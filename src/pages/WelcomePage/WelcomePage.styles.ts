import { StyleSheet } from "react-native";
import stylesConfig from "../../config/config.styles";

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
    padding: "8%",
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
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.default_font_subtitle,
    letterSpacing: 2,
    paddingVertical: "8%",
    textAlign: "center",
  },
  buttonText: {
    width: "100%",
    alignContent: "center",
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.small,
    color: stylesConfig.colors.default_font,
    textAlign: "center",
  },
});
