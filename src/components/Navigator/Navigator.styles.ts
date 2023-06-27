import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

const navigatorStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: stylesConfig.colors.default_background_light,
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
    padding: 20,
  },
});

export default navigatorStyles;
