import { ActivityIndicator, View } from "react-native";

import { LoadingContext } from "../../../contexts/LoadingContext/LoadingContext";
import { loadingOverlayStyles } from "./LoadingOverlay.styles";
import stylesConfig from "../../../config.styles";
import { useContext } from "react";

const LoadingOverlay = () => {
  const LoadingCon = useContext(LoadingContext);

  return (
    <>
      {LoadingCon.loading && (
        <View style={loadingOverlayStyles.container}>
          <ActivityIndicator
            size="large"
            color={stylesConfig.colors.default_color_1}
          />
        </View>
      )}
    </>
  );
};

export default LoadingOverlay;
