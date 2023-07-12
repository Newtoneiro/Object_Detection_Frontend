import { StyleSheet } from "react-native";

export const loadingOverlayStyles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
  },
});
