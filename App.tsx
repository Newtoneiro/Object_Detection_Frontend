import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import MainPage from "./components/MainPage/MainPage";
import CameraPage from "./components/CameraPage/CameraPage";

type RootStackParamList = {
  MainPage: undefined;
  Camera: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "MainPage", "Camera">;

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Camera" component={CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
