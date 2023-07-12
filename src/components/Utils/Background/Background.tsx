import { Image, Pressable, SafeAreaView, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { IBackgroundProps } from "./Background.types";
import { LinearGradient } from "expo-linear-gradient";
import { backgroundStyles } from "./Background.styles";
import stylesConfig from "../../../config.styles";

const logo = "../../../../assets/logo.png";

const Background = ({ children, handlePressFunction }: IBackgroundProps) => {
  return (
    <SafeAreaView style={backgroundStyles.container}>
      <LinearGradient
        start={{ x: 0.3, y: 0.6 }}
        end={{ x: 0.7, y: 0.2 }}
        colors={[
          stylesConfig.colors.default_color_1,
          stylesConfig.colors.default_color_2,
        ]}
        style={backgroundStyles.decorativeBall1}
      />
      <LinearGradient
        start={{ x: 0.3, y: 0.6 }}
        end={{ x: 0.7, y: 0.2 }}
        colors={[
          stylesConfig.colors.default_color_1,
          stylesConfig.colors.default_color_2,
        ]}
        style={backgroundStyles.decorativeBall2}
      />
      <View style={backgroundStyles.header}>
        <Image style={backgroundStyles.logo} source={require(logo)} />
        {handlePressFunction && (
          <Pressable
            onPress={() => handlePressFunction()}
            style={backgroundStyles.pressable}
          >
            <FontAwesome
              style={backgroundStyles.returnIcon}
              name="arrow-left"
              size={stylesConfig.fontSize.big_regular}
            />
          </Pressable>
        )}
      </View>
      {children}
    </SafeAreaView>
  );
};

export default Background;
