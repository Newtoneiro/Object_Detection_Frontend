import CameraPage from "../../pages/CameraPage/CameraPage";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./Navigator.types";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
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
        <Stack.Screen name="CameraPage" component={CameraPage} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
