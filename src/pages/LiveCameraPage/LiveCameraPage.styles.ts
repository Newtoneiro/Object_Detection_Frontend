import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

export const liveCameraPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,

    backgroundColor: stylesConfig.colors.default_background_dark,
  },
});
