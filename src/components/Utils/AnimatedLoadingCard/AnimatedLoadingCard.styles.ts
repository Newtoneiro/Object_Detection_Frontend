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
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: stylesConfig.colors.default_background_dark,
  },
  loadingDots: {
    width: 80,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  loadingDot: {
    width: 15,
    height: 15,
    borderRadius: 25,
    backgroundColor: stylesConfig.colors.default_font,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: stylesConfig.colors.default_font,
  },
  logo: {
    width: "80%",
    resizeMode: "contain",
    tintColor: stylesConfig.colors.black,
  },
});
