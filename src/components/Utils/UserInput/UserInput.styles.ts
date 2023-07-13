import { StyleSheet } from "react-native";
import stylesConfig from "../../../config.styles";

export const userInputStyles = StyleSheet.create({
  container: {
    minWidth: "100%",
    maxWidth: "100%",
    maxHeight: 50,
    height: 50,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginVertical: "1%",
    gap: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: stylesConfig.colors.default_background_light,
    overflow: "scroll",
  },
  containerAlert: {
    borderColor: stylesConfig.colors.red_alert,
  },
  icon: {
    alignSelf: "center",
    alignItems: "center",
    width: 40,
    color: stylesConfig.colors.default_font,
  },
  visibilityIcon: {
    alignSelf: "center",
    alignItems: "center",
    width: 20,
    color: stylesConfig.colors.default_font,
  },
  textInput: {
    flex: 1,
    fontFamily: stylesConfig.fontFamily.default,
    fontSize: stylesConfig.fontSize.regular,
    color: stylesConfig.colors.default_font,
  },
});
