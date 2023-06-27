import { StyleSheet } from "react-native";
import stylesConfig from "../../config.styles";

export const loginPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: stylesConfig.colors.default_background,
  },
  form: {
    gap: 10,
    flex: 1,
    width: "80%",
    minHeight: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  formTitle: {
    width: "100%",
    fontSize: 22,
    color: stylesConfig.colors.default_color_1,
    fontWeight: "600",
    textAlign: "left",
  },
  inputContainer: {
    minWidth: "100%",
    maxWidth: "100%",
    maxHeight: 40,
    overflow: "scroll",

    flex: 1,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    padding: 5,
    borderBottomColor: stylesConfig.colors.default_color_4,
    borderLeftColor: stylesConfig.colors.default_color_4,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  textInput: { width: "100%" },
  icon: {
    alignSelf: "center",
    alignItems: "center",
    width: 40,
  },
});
