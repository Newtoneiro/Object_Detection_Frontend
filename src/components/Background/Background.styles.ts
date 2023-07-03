import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

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
  decorativeBall: {
    position: "absolute",
    top: -50,
    left: -70,
    width: 210,
    height: 210,
    borderRadius: 110,
  },
  header: {
    position: "absolute",
    top: 50,
    right: 30,
    width: "100%",
    maxHeight: 80,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
    justifyContent: "flex-end",
  },
  logo: {
    position: "absolute",
    width: 105,
    resizeMode: "contain",
    tintColor: stylesConfig.colors.default_font,
  },
});
