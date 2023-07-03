import LoginPage from "../../pages/LoginPage/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { UnAuthRootStackParamList } from "./UnAuthNavigator.types";
import WelcomePage from "../../pages/WelcomePage/WelcomePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<UnAuthRootStackParamList>();

export default function UnAuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
