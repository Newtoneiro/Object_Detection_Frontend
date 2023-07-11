import { ActivityIndicator, View } from "react-native";

import { loadingOverlayStyles } from "./LoadingOverlay.styles";

const LoadingOverlay = () => {
  return (
    <View style={loadingOverlayStyles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingOverlay;
