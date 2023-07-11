import { ActivityIndicator, View } from "react-native";

import { loadingOverlayStyles } from "./LoadingOverlay.styles";
import stylesConfig from "../../config.styles";

const LoadingOverlay = () => {
  return (
    <View style={loadingOverlayStyles.container}>
      <ActivityIndicator
        size="large"
        color={stylesConfig.colors.default_color_1}
      />
    </View>
  );
};

export default LoadingOverlay;
