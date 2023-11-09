import { StyleSheet } from "react-native";
import stylesConfig from "../../config/config.styles";

export const dashboardPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountDetails: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
    paddingVertical: 20,
    marginTop: 40,
  },
  userIconOuter: {
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: 1,
  },
  userIconInner: {
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,

    backgroundColor: stylesConfig.colors.default_background_dark,
  },
  userIcon: {
    color: stylesConfig.colors.default_font_subtitle,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  username: {
    width: "100%",
    textAlign: "center",
    letterSpacing: 1,
    fontSize: stylesConfig.fontSize.regular,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font,
  },
  userGreeting: {
    width: "100%",
    textAlign: "center",
    letterSpacing: 1,
    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font_subtitle,
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: stylesConfig.colors.default_low_contrast,
    borderRadius: 50,
  },
  logoutButtonText: {
    width: "100%",
    textAlign: "center",
    letterSpacing: 1,
    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font,
  },
  widgetGrid: {
    width: "100%",
    flex: 1,
  },
  widgetGridInner: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    padding: 10,
  },
  widgetGridItem: {
    position: "relative",
    width: "48%",
    height: 180,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,

    backgroundColor: stylesConfig.colors.default_low_contrast,
    borderRadius: 15,
    overflow: "hidden",
  },
  widgetGridItemProtected: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
  },
  widgetGridIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 15,

    borderRadius: 50,
  },
  widgetGridItemText: {
    width: "100%",
    textAlign: "center",
    fontSize: stylesConfig.fontSize.small,
    fontFamily: stylesConfig.fontFamily.default,
    color: stylesConfig.colors.default_font,
  },
  footer: {
    width: "100%",
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",

    backgroundColor: stylesConfig.colors.black,
    borderRadius: 15,

    elevation: 10,
  },
});
