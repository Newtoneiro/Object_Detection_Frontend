/**
 * @file ErrorPopup.tsx
 * @description ErrorPopup component.
 */

import { Modal, Text, View } from "react-native";

import { useContext } from "react";
import { ErrorContext } from "../../../contexts/ErrorContext/ErrorContext";
import { GradientButton } from "../GradientButton";
import { errorPopupStyles } from "./ErrorPopup.styles";

/**
 * @component
 *
 * ErrorPopup component.
 *
 * @description
 *
 * This component is used to display an error popup of chosen severity.
 * It is used to display errors, warnings and simple information, and
 * is controlled by the {@link ErrorContext}.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { ErrorPopup } from './ErrorPopup';
 *
 * const SomeComponent = () => {
 *  return (
 *    <>
 *      <ErrorPopup />
 *    </>
 *  );
 * };
 *
 * @see {@link errorPopupStyles} for the style object.
 * @see {@link ErrorContext} for the context object.
 */
export const ErrorPopup = () => {
  const ErrorCon = useContext(ErrorContext);

  return (
    <>
      {ErrorCon.isVisible && (
        <Modal
          statusBarTranslucent={true}
          style={errorPopupStyles.container}
          animationType="fade"
          visible={ErrorCon.isVisible}
          transparent={true}
        >
          <View style={errorPopupStyles.containerBackground}>
            <View style={errorPopupStyles.errorBox}>
              <Text style={errorPopupStyles.title}>{ErrorCon.severity}</Text>
              <Text style={errorPopupStyles.message}>{ErrorCon.message}</Text>
              <GradientButton handlePressFunction={() => ErrorCon.hideError()}>
                <Text style={errorPopupStyles.buttonText}>Ok.</Text>
              </GradientButton>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};
