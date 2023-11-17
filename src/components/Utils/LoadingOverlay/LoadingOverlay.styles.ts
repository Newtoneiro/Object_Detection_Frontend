/**
 * @file LoadingOverlay.styles.tsx
 * @description LoadingOverlay Stylesheet.
 */
import { StyleSheet } from "react-native";

/**
 * Stylesheet for the LoadingOverlay component.
 */
export const loadingOverlayStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100000,
  },
  containerBackground: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});
