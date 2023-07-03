import { Image, Pressable, SafeAreaView, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { IProps } from "../../config.types";
import { LinearGradient } from "expo-linear-gradient";
import { backgroundStyles } from "./Background.styles";
import stylesConfig from "../../config.styles";

const Background = ({ children }: IProps) => {
  return (
    <SafeAreaView style={backgroundStyles.container}>
      <LinearGradient
        start={{ x: 0.3, y: 0.6 }}
        end={{ x: 0.7, y: 0.2 }}
        colors={[
          stylesConfig.colors.default_color_1,
          stylesConfig.colors.default_color_2,
        ]}
        style={backgroundStyles.decorativeBall}
      />
      <View style={backgroundStyles.header}>
        <Image
          style={backgroundStyles.logo}
          source={require("../../../assets/logo.png")}
        />
      </View>
      {children}
    </SafeAreaView>
  );
};

export default Background;
