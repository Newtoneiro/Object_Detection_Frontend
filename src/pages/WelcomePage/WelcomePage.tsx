import { Text, View } from "react-native";

import Background from "../../components/Utils/Background/Background";
import GradientButton from "../../components/Utils/GradientButton/GradientButton";
import { WelcomePageProps } from "./WelcomePage.types";
import { welcomePageStyles } from "./WelcomePage.styles";

export default function WelcomePage({ navigation }: WelcomePageProps) {
  return (
    <Background handlePressFunction={null}>
      <View style={welcomePageStyles.container}>
        <Text style={welcomePageStyles.title}>Welcome.</Text>
        <Text style={welcomePageStyles.text}>
          Cupidatat ea amet reprehenderit laboris. Duis pariatur commodo non
          velit qui fugiat mollit. Irure laboris proident aliquip ex laboris et
          non laborum tempor ex. Dolore proident est sunt in nisi nisi laborum
          in.
        </Text>
        <GradientButton
          handlePressFunction={() => navigation.navigate("LoginPage")}
        >
          <Text style={welcomePageStyles.buttonText}>Jump in!</Text>
        </GradientButton>
      </View>
    </Background>
  );
}
