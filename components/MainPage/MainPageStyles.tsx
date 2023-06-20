import config from "../../config";
import { StyleSheet } from "react-native";

const mainPageStyles = StyleSheet.create({
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
  form: {
    flex: 1,
    maxHeight: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  textInput: {
    backgroundColor: config.colors.default_background_dark,
    width: 200,
    height: 40,
    borderRadius: 20,
    padding: 10,
    textAlign: "center",
  },
  messageContainer: {
    flex: 1,
    maxHeight: 200,
    width: "100%",
    backgroundColor: config.colors.default_background_light,
    alignItems: "center",
    justifyContent: "space-evenly",

    borderColor: config.colors.default_color,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
});

export default mainPageStyles;
