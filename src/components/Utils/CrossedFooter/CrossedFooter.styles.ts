import { StyleSheet } from "react-native";
import { stylesConfig } from "../../../config";

export const crossedFooterStyle = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 50,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    position: "absolute",
    width: "70%",
    height: 1,
    backgroundColor: stylesConfig.colors.default_font_subtitle,
  },
  childrenBox: {
    paddingHorizontal: 10,
    backgroundColor: stylesConfig.colors.default_background_dark,
  },
});
