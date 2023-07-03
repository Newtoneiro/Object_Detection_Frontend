import { Pressable, Text, View } from "react-native";

import Background from "../../components/Background/Background";
import { LinearGradient } from "expo-linear-gradient";
import { WelcomePageProps } from "./WelcomePage.types";
import { loginPageStyles } from "../LoginPage/LoginPage.styles";
import stylesConfig from "../../config.styles";
import { welcomePageStyles } from "./WelcomePage.styles";

export default function WelcomePage({ navigation }: WelcomePageProps) {
  return (
    <Background>
      <View style={welcomePageStyles.container}>
        <Text style={welcomePageStyles.title}>Object Detection</Text>
        <Text style={welcomePageStyles.text}>
          Cupidatat ea amet reprehenderit laboris. Duis pariatur commodo non
          velit qui fugiat mollit. Irure laboris proident aliquip ex laboris et
          non laborum tempor ex. Dolore proident est sunt in nisi nisi laborum
          in.
        </Text>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[
            stylesConfig.colors.default_color_1,
            stylesConfig.colors.default_color_2,
          ]}
          style={loginPageStyles.button}
        >
          <Pressable onPress={() => navigation.navigate("LoginPage")}>
            <Text style={loginPageStyles.buttonText}>Jump in!</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </Background>
  );
}
