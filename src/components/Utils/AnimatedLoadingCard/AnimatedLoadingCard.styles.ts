import { StyleSheet } from "react-native";
import stylesConfig from "../../../config.styles";

export const animatedLoadingCardStyles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100000,
  },
  container: {
    position: "relative",
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: stylesConfig.colors.default_background_dark,
  },
  outerLoadingBox: {
    position: "relative",
    width: 150,
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 7,
    borderColor: stylesConfig.colors.default_font,
    overflow: "hidden",
  },
  innerLoadingBox: {
    position: "absolute",
    width: "120%",
    height: "120%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 40,
    borderColor: stylesConfig.colors.default_font,
    backgroundColor: stylesConfig.colors.default_font,
  },
  outerLogo: {
    position: "absolute",
    width: 120,
    resizeMode: "contain",
    tintColor: stylesConfig.colors.default_font,
  },
  innerLogo: {
    width: 120,
    resizeMode: "contain",
    tintColor: stylesConfig.colors.black,
  },
  loadingText: {
    marginTop: 40,
    width: "100%",
    textAlign: "center",
    fontFamily: stylesConfig.fontFamily.title,
    fontSize: stylesConfig.fontSize.regular,
    color: stylesConfig.colors.default_font_subtitle,
    textTransform: "capitalize",
  },
});
