import { Text, View } from "react-native";

import { ErrorContext } from "../../../contexts/ErrorContext/ErrorContext";
import GradientButton from "../GradientButton/GradientButton";
import { errorPopupStyles } from "./ErrorPopup.styles";
import { useContext } from "react";

const ErrorPopup = () => {
  const ErrorCon = useContext(ErrorContext);

  return (
    <>
      {ErrorCon.isVisible && (
        <View style={errorPopupStyles.container}>
          <View style={errorPopupStyles.errorBox}>
            <Text style={errorPopupStyles.title}>{ErrorCon.severity}</Text>
            <Text style={errorPopupStyles.message}>{ErrorCon.message}</Text>
            <GradientButton handlePressFunction={() => ErrorCon.hideError()}>
              <Text style={errorPopupStyles.buttonText}>Ok.</Text>
            </GradientButton>
          </View>
        </View>
      )}
    </>
  );
};

export default ErrorPopup;
