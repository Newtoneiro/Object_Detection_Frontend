import { IAlertFieldProps } from "./AlertField.types";
import { Text } from "react-native";
import { alertFieldStyles } from "./AlertField.styles";

const AlertField = ({ text, success }: IAlertFieldProps) => {
  return (
    <Text
      style={
        success
          ? {
              ...alertFieldStyles.container,
              ...alertFieldStyles.alertPossitive,
            }
          : alertFieldStyles.container
      }
    >
      {text}
    </Text>
  );
};

export default AlertField;
