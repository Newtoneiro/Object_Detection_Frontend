import { StyleSheet } from "react-native";
import stylesConfig from "../../../config/config.styles";

export const backgroundStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 1,
    bottom: 1,
    width: "100%",
    height: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: stylesConfig.colors.default_background_dark,
  },
  decorativeBall1: {
    position: "absolute",
    top: -50,
    left: -70,
    width: 210,
    height: 210,
    borderRadius: 110,
  },
  decorativeBall2: {
    position: "absolute",
    bottom: 20,
    right: -40,
    width: 100,
    height: 100,
    borderRadius: 110,
  },
  header: {
    width: "100%",
    maxHeight: 80,
    height: 80,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: -40,
    paddingHorizontal: 30,
  },
  logo: {
    position: "relative",
    width: 80,
    resizeMode: "contain",
    tintColor: stylesConfig.colors.default_font,
  },
});
