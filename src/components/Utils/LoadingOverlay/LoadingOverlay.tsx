import { ActivityIndicator, Modal, View } from "react-native";

import { LoadingContext } from "../../../contexts/LoadingContext/LoadingContext";
import { loadingOverlayStyles } from "./LoadingOverlay.styles";
import stylesConfig from "../../../config.styles";
import { useContext } from "react";

const LoadingOverlay = () => {
  const LoadingCon = useContext(LoadingContext);

  return (
    <>
      {LoadingCon.loading && (
        <Modal
          statusBarTranslucent={true}
          style={loadingOverlayStyles.container}
          visible={LoadingCon.loading}
          transparent={true}
        >
          <View style={loadingOverlayStyles.containerBackground}>
            <ActivityIndicator
              size="large"
              color={stylesConfig.colors.default_color_1}
            />
          </View>
        </Modal>
      )}
    </>
  );
};

export default LoadingOverlay;
