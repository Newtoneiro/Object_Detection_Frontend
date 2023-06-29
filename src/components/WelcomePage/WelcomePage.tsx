import { ImageBackground, Pressable, Text, View } from "react-native";

import { UnAuthProps } from "../UnAuthNavigator/UnAuthNavigator.types";
import { welcomePageStyles } from "./WelcomePage.styles";

export default function WelcomePage({ navigation }: UnAuthProps) {
  return (
    <View style={welcomePageStyles.container}>
      <Text style={welcomePageStyles.title}>Object Detection</Text>
      <Text style={welcomePageStyles.text}>
        Cupidatat ea amet reprehenderit laboris. Duis pariatur commodo non velit
        qui fugiat mollit. Irure laboris proident aliquip ex laboris et non
        laborum tempor ex. Dolore proident est sunt in nisi nisi laborum in.
      </Text>
      <Pressable
        style={welcomePageStyles.button}
        onPress={() => navigation.navigate("LoginPage")}
      >
        <Text style={welcomePageStyles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}
