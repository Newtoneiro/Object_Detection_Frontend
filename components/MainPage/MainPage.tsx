import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LandingPage from "../LandingPage/LandingPage";
import CameraPage from "../CameraPage/CameraPage";

type RootStackParamList = {
  LandingPage: undefined;
  CameraPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainPage() {
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
