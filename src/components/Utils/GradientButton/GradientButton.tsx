import { Pressable, View } from "react-native";

import { IGradientButtonProps } from "./GradientButton.types";
import { LinearGradient } from "expo-linear-gradient";
import { gradientButtonStyles } from "./GradientButton.styles";
import { stylesConfig } from "../../../config";

const GradientButton = ({
  children,
  handlePressFunction,
}: IGradientButtonProps) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        stylesConfig.colors.default_color_1,
        stylesConfig.colors.default_color_2,
      ]}
      style={gradientButtonStyles.container}
    >
      <Pressable
        onPress={() => handlePressFunction()}
        style={gradientButtonStyles.pressable}
      >
        <View style={gradientButtonStyles.container}>{children}</View>
      </Pressable>
    </LinearGradient>
  );
};

export default GradientButton;
