import CameraPage from "../../pages/CameraPage/CameraPage";
import LandingPage from "../../pages/LandingPage/LandingPage";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./Navigator.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="CameraPage" component={CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
