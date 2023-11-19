/**
 * @file LoadingOverlay.tsx
 * @description LoadingOverlay component.
 */
import { ActivityIndicator, Modal, View } from "react-native";

import { LoadingContext } from "../../../contexts/LoadingContext/LoadingContext";
import { loadingOverlayStyles } from "./LoadingOverlay.styles";
import { stylesConfig } from "../../../config";
import { useContext } from "react";

/**
 * @component
 *
 * LoadingOverlay component.
 *
 * @description
 *
 * This component is used to display a loading overlay.
 * It is controlled by the {@link LoadingContext}.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { LoadingOverlay } from './LoadingOverlay';
 *
 * const SomeComponent = () => {
 *  return (
 *    <>
 *      <LoadingOverlay />
 *    </>
 *  );
 * };
 *
 * @see {@link loadingOverlayStyles} for the style object.
 * @see {@link LoadingContext} for the context object.
 */
export const LoadingOverlay = () => {
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
