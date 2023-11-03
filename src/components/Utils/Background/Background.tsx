import { Image, SafeAreaView, StatusBar, View } from "react-native";

import { IBackgroundProps } from "./Background.types";
import { LinearGradient } from "expo-linear-gradient";
import PressableIcon from "../PressableIcon/PressableIcon";
import { backgroundStyles } from "./Background.styles";
import stylesConfig from "../../../config/config.styles";
import { useEffect } from "react";

const logo = "../../../../assets/logo.png";

const Background = ({ children, handlePressFunction }: IBackgroundProps) => {
  useEffect(() => {
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle("light-content");
  }, []);

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
          <PressableIcon
            handlePress={() => handlePressFunction()}
            icon="chevron-left"
            size={stylesConfig.fontSize.title}
          />
        )}
      </View>
      {children}
    </SafeAreaView>
  );
};

export default Background;
