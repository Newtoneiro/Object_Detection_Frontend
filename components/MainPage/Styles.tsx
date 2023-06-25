import config from "../../config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: config.colors.default_background_light,
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
    padding: 20,
  },
});

export default styles;
